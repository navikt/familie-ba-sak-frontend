import { BehandlingSteg, BehandlingÅrsak, hentStegnummer, type IBehandling } from '@typer/behandling';
import { Resultat } from '@typer/vilkår';

import { mapFraRestPersonResultatTilPersonResultat } from './Vilkårsvurdering/utils';

export interface Side {
    id: SideId;
    href: string;
    navn: string;
    steg: BehandlingSteg;
    undersider?: (behandling: IBehandling) => Underside[];
    visSide?: (behandling: IBehandling) => boolean;
}

export interface Underside {
    navn: string;
    ident: string;
    antallAksjonspunkter: () => number;
    hash: string;
    skjermesForBruker?: boolean;
}

export interface Kontrollside {
    id: SideId;
    navn: string;
    kontrollertStatus: KontrollertStatus;
}

export enum KontrollertStatus {
    IKKE_KONTROLLERT,
    KONTROLLERT,
    MANGLER_KONTROLL,
}

export enum SideId {
    REGISTRER_INSTITUSJON = 'REGISTRER_INSTITUSJON',
    REGISTRERE_SØKNAD = 'REGISTRERE_SØKNAD',
    FILTRERINGSREGLER = 'FILTRERINGSREGLER',
    VILKÅRSVURDERING = 'VILKÅRSVURDERING',
    BEHANDLINGRESULTAT = 'BEHANDLINGRESULTAT',
    SIMULERING = 'SIMULERING',
    VEDTAK = 'VEDTAK',
}

export const sider: Record<SideId, Side> = {
    REGISTRER_INSTITUSJON: {
        id: SideId.REGISTRER_INSTITUSJON,
        href: 'registrer-institusjon',
        navn: 'Info om institusjon',
        steg: BehandlingSteg.REGISTRERE_INSTITUSJON,
        visSide: behandling => {
            const registrereInstitusjonSteg = behandling.stegTilstand.find(
                value => value.behandlingSteg === BehandlingSteg.REGISTRERE_INSTITUSJON
            );
            return registrereInstitusjonSteg !== undefined;
        },
    },
    REGISTRERE_SØKNAD: {
        id: SideId.REGISTRERE_SØKNAD,
        href: 'registrer-soknad',
        navn: 'Registrer søknad',
        steg: BehandlingSteg.REGISTRERE_SØKNAD,
        visSide: behandling => {
            return (
                behandling.årsak === BehandlingÅrsak.SØKNAD ||
                behandling.årsak === BehandlingÅrsak.AUTOMATISK_BEHANDLING_AV_SØKNAD
            );
        },
    },
    FILTRERINGSREGLER: {
        id: SideId.FILTRERINGSREGLER,
        href: 'filtreringsregler',
        navn: 'Filtreringsregler',
        steg: BehandlingSteg.FILTRERING_AUTOMATISK_BEHANDLING,
        visSide: behandling => {
            return (
                behandling.årsak === BehandlingÅrsak.FØDSELSHENDELSE ||
                behandling.årsak === BehandlingÅrsak.AUTOMATISK_BEHANDLING_AV_SØKNAD
            );
        },
    },
    VILKÅRSVURDERING: {
        id: SideId.VILKÅRSVURDERING,
        href: 'vilkaarsvurdering',
        navn: 'Vilkårsvurdering',
        steg: BehandlingSteg.VILKÅRSVURDERING,
        undersider: behandling => {
            const personResultater = mapFraRestPersonResultatTilPersonResultat(
                behandling.personResultater,
                behandling.personer
            );

            return personResultater.map((personResultat, index): Underside => {
                return {
                    navn: personResultat.person.navn,
                    ident: personResultat.person.personIdent,
                    hash: `${index}_${personResultat.person.fødselsdato}`,
                    skjermesForBruker: personResultat.person.skjermesForBruker,
                    antallAksjonspunkter: () => {
                        const vilkårSomErIkkeVurdert = personResultat.vilkårResultater.filter(
                            vilkårResultat => vilkårResultat.resultat === Resultat.IKKE_VURDERT
                        );
                        return vilkårSomErIkkeVurdert.length;
                    },
                };
            });
        },
    },
    BEHANDLINGRESULTAT: {
        id: SideId.BEHANDLINGRESULTAT,
        href: 'tilkjent-ytelse',
        navn: 'Behandlingsresultat',
        steg: BehandlingSteg.BEHANDLINGSRESULTAT,
    },
    SIMULERING: {
        id: SideId.SIMULERING,
        href: 'simulering',
        navn: 'Simulering',
        steg: BehandlingSteg.VURDER_TILBAKEKREVING,
        visSide: behandling => {
            return (
                !behandling.skalBehandlesAutomatisk ||
                behandling.årsak === BehandlingÅrsak.AUTOMATISK_BEHANDLING_AV_SØKNAD
            );
        },
    },
    VEDTAK: {
        id: SideId.VEDTAK,
        href: 'vedtak',
        navn: 'Vedtak',
        steg: BehandlingSteg.SEND_TIL_BESLUTTER,
        visSide: behandling => {
            return behandling.årsak !== BehandlingÅrsak.SATSENDRING;
        },
    },
};

/**
 * Sjekker om stegA kommer etter stegB ut fra rekkefølgen i backend. Flere steg har samme rekkefølge i backend
 * (f.eks. REGISTRERE_INSTITUSJON og REGISTRERE_SØKNAD), så da brukes rekkefølgen på sidene som avgjørende.
 */
export function erStegEtter(stegA: BehandlingSteg, stegB: BehandlingSteg): boolean {
    const stegnummerA = hentStegnummer(stegA);
    const stegnummerB = hentStegnummer(stegB);
    if (stegnummerA !== stegnummerB) {
        return stegnummerA > stegnummerB;
    }

    const stegForSider = Object.values(sider).map(side => side.steg);
    const indeksA = stegForSider.indexOf(stegA);
    const indeksB = stegForSider.indexOf(stegB);
    if (indeksA === -1 || indeksB === -1) {
        return false;
    }

    return indeksA > indeksB;
}

export function erSidenAktiv(side: Side, behandling: IBehandling): boolean {
    const steg = finnGjeldendeSteg(behandling);

    if (!side.steg && side.steg !== 0) {
        return true;
    }

    if (!steg) {
        return false;
    }

    return !erStegEtter(side.steg, steg);
}

export function finnSiderForBehandling(behandling: IBehandling) {
    return Object.values(sider).filter(side => side.visSide?.(behandling) ?? true);
}

export function hentSideFraUrl(url: string) {
    return Object.entries(sider).find(([_, side]) => side.href === url)?.[0] as SideId;
}

export function finnSideForBehandlingssteg(behandling: IBehandling): Side | undefined {
    const steg = finnGjeldendeSteg(behandling);

    if (!steg) {
        return undefined;
    }

    if (hentStegnummer(steg) >= hentStegnummer(BehandlingSteg.SEND_TIL_BESLUTTER)) {
        if (sider.VEDTAK.visSide?.(behandling)) {
            return sider.VEDTAK;
        }
        if (sider.SIMULERING.visSide?.(behandling)) {
            return sider.SIMULERING;
        }
        return sider.BEHANDLINGRESULTAT;
    }

    const siderForBehandling = finnSiderForBehandling(behandling);

    return siderForBehandling.find(side => side.steg === steg);
}

function finnGjeldendeSteg(behandling: IBehandling): BehandlingSteg | undefined {
    const erHenlagt = behandling.stegTilstand.some(it => it.behandlingSteg === BehandlingSteg.HENLEGG_BEHANDLING);
    return erHenlagt ? finnStegBehandlingenBleHenlagtPå(behandling) : behandling.steg;
}

// Backend sorterer stegtilstanden kronologisk og legger til henleggelsessteget etter steget behandlingen ble henlagt på.
function finnStegBehandlingenBleHenlagtPå(behandling: IBehandling): BehandlingSteg | undefined {
    const stegene = behandling.stegTilstand.map(it => it.behandlingSteg);
    return stegene[stegene.indexOf(BehandlingSteg.HENLEGG_BEHANDLING) - 1];
}
