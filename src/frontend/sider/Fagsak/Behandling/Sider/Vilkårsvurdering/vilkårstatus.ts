import { dekodAnker } from '@hooks/useScrollTilAnker';
import { BehandlingSteg, type IBehandling } from '@typer/behandling';
import { PersonType } from '@typer/person';
import {
    type IPersonResultat,
    type IRestVilkårResultat,
    type IVilkårConfig,
    Resultat,
    vilkårConfig,
} from '@typer/vilkår';

import { annenVurderingFeilmeldingId } from './GeneriskAnnenVurdering/AnnenVurderingTabell';
import { vilkårFeilmeldingId } from './GeneriskVilkår/VilkårTabell';

export enum Vilkårstatus {
    IKKE_VURDERT = 'IKKE_VURDERT',
    TRENGER_OPPMERKSOMHET = 'TRENGER_OPPMERKSOMHET',
    VURDERT = 'VURDERT',
}

export const vilkårstatusVisningsnavn: Record<Vilkårstatus, string> = {
    IKKE_VURDERT: 'Ikke vurdert',
    TRENGER_OPPMERKSOMHET: 'Trenger oppmerksomhet',
    VURDERT: 'Vurdert',
};

export interface VilkårForPerson {
    vilkårFraConfig: IVilkårConfig;
    vilkårResultater: IRestVilkårResultat[];
}

export function lagPersonHash(index: number, personResultat: IPersonResultat) {
    return `${index}_${personResultat.person.fødselsdato}`;
}

export function lagVilkårHash(personHash: string, vilkårFraConfig: IVilkårConfig) {
    return `${personHash}_${vilkårFraConfig.key}`;
}

export function finnVilkårForPerson(personResultat: IPersonResultat): VilkårForPerson[] {
    return Object.values(vilkårConfig)
        .filter(vc => vc.parterDetteGjelderFor.includes(personResultat.person.type))
        .map(vc => ({
            vilkårFraConfig: vc,
            vilkårResultater: personResultat.vilkårResultater.filter(vr => vr.vilkårType === vc.key),
        }))
        .filter(
            // For barn ønsker vi alltid å vise alle vilkår slik at man evt kan legge til tom periode
            ({ vilkårResultater }) => vilkårResultater.length > 0 || personResultat.person.type !== PersonType.SØKER
        );
}

function måKontrolleres(vilkårResultat: IRestVilkårResultat, behandling: IBehandling) {
    return (
        behandling.steg === BehandlingSteg.VILKÅRSVURDERING &&
        vilkårResultat.erOpprinneligPreutfyltIBehandling === behandling.behandlingId &&
        vilkårResultat.begrunnelseForManuellKontroll !== null
    );
}

export function utledVilkårstatus(vilkårResultater: IRestVilkårResultat[], behandling: IBehandling): Vilkårstatus {
    if (vilkårResultater.some(vilkårResultat => måKontrolleres(vilkårResultat, behandling))) {
        return Vilkårstatus.TRENGER_OPPMERKSOMHET;
    }
    const antallIkkeVurdert = vilkårResultater.filter(vr => vr.resultat === Resultat.IKKE_VURDERT).length;
    if (vilkårResultater.length === 0 || antallIkkeVurdert === vilkårResultater.length) {
        return Vilkårstatus.IKKE_VURDERT;
    }
    if (antallIkkeVurdert > 0) {
        return Vilkårstatus.TRENGER_OPPMERKSOMHET;
    }
    return Vilkårstatus.VURDERT;
}

export function utledPersonstatus(vilkårstatuser: Vilkårstatus[]): Vilkårstatus {
    if (vilkårstatuser.every(status => status === Vilkårstatus.VURDERT)) {
        return Vilkårstatus.VURDERT;
    }
    if (vilkårstatuser.some(status => status === Vilkårstatus.TRENGER_OPPMERKSOMHET)) {
        return Vilkårstatus.TRENGER_OPPMERKSOMHET;
    }
    return Vilkårstatus.IKKE_VURDERT;
}

export function erAutomatiskVurdert(vilkårResultater: IRestVilkårResultat[]) {
    return vilkårResultater.length > 0 && vilkårResultater.every(vr => vr.erAutomatiskVurdert);
}

/**
 * Finner hvilken person som skal vises i vilkårsvurderingen ut fra ankeret i URL-en.
 * Ankeret kan peke på personen, et av personens vilkår eller en feilmelding (fra ErrorSummary).
 * Faller tilbake til første person.
 */
export function finnValgtPersonIndex(hash: string, vilkårsvurdering: IPersonResultat[]): number {
    const anker = dekodAnker(hash.replace(/^#/, ''));
    if (!anker) {
        return 0;
    }
    const index = vilkårsvurdering.findIndex((personResultat, index) => {
        const personHash = lagPersonHash(index, personResultat);
        return (
            anker === personHash ||
            anker.startsWith(`${personHash}_`) ||
            personResultat.vilkårResultater.some(vr => vilkårFeilmeldingId(vr) === anker) ||
            personResultat.andreVurderinger.some(av => annenVurderingFeilmeldingId(av) === anker)
        );
    });
    return Math.max(index, 0);
}
