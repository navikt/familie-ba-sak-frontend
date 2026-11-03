import { dekodAnker } from '@hooks/useScrollTilAnker';
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

/** Samlet resultat for alle periodene til et vilkår (eller alle vilkårene til en person). */
export enum Vilkårstatus {
    IKKE_VURDERT = 'IKKE_VURDERT',
    OPPFYLT = 'OPPFYLT',
    DELVIS_OPPFYLT = 'DELVIS_OPPFYLT',
    IKKE_OPPFYLT = 'IKKE_OPPFYLT',
}

export const vilkårstatusVisningsnavn: Record<Vilkårstatus, string> = {
    IKKE_VURDERT: 'Ikke vurdert',
    OPPFYLT: 'Oppfylt',
    DELVIS_OPPFYLT: 'Delvis oppfylt',
    IKKE_OPPFYLT: 'Ikke oppfylt',
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

/**
 * Ikke vurdert så lenge minst én periode ikke er vurdert. Ellers: kun oppfylt → oppfylt, kun ikke oppfylt → ikke oppfylt,
 * og en blanding av oppfylte og ikke oppfylte perioder → delvis oppfylt.
 */
export function utledVilkårstatus(vilkårResultater: IRestVilkårResultat[]): Vilkårstatus {
    if (vilkårResultater.length === 0 || vilkårResultater.some(vr => vr.resultat === Resultat.IKKE_VURDERT)) {
        return Vilkårstatus.IKKE_VURDERT;
    }
    const harOppfylt = vilkårResultater.some(vr => vr.resultat === Resultat.OPPFYLT);
    const harIkkeOppfylt = vilkårResultater.some(vr => vr.resultat === Resultat.IKKE_OPPFYLT);
    if (harOppfylt && harIkkeOppfylt) {
        return Vilkårstatus.DELVIS_OPPFYLT;
    }
    return harIkkeOppfylt ? Vilkårstatus.IKKE_OPPFYLT : Vilkårstatus.OPPFYLT;
}

/** Den mest alvorlige statusen blant vilkårene vinner; personen er bare oppfylt når alle vilkårene er det. */
export function utledPersonstatus(vilkårstatuser: Vilkårstatus[]): Vilkårstatus {
    if (vilkårstatuser.some(status => status === Vilkårstatus.IKKE_OPPFYLT)) {
        return Vilkårstatus.IKKE_OPPFYLT;
    }
    if (vilkårstatuser.some(status => status === Vilkårstatus.DELVIS_OPPFYLT)) {
        return Vilkårstatus.DELVIS_OPPFYLT;
    }
    if (vilkårstatuser.length > 0 && vilkårstatuser.every(status => status === Vilkårstatus.OPPFYLT)) {
        return Vilkårstatus.OPPFYLT;
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
