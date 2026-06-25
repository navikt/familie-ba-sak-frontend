import type { IBehandling } from '@typer/behandling';
import { BehandlingSteg, BehandlingStegStatus, BehandlingÅrsak, hentStegNummer } from '@typer/behandling';
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

export interface Trinn extends Side {
    kontrollert: KontrollertStatus;
}

export enum KontrollertStatus {
    IKKE_KONTROLLERT,
    KONTROLLERT,
    MANGLER_KONTROLL,
}

export enum SideId {
    REGISTRER_INSTITUSJON = 'REGISTRER_INSTITUSJON',
    REGISTRERE_SØKNAD = 'REGISTRERE_SØKNAD',
    FILTRERING_FØDSELSHENDELSER = 'FILTRERING_FØDSELSHENDELSER',
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
            return behandling.årsak === BehandlingÅrsak.SØKNAD;
        },
    },
    FILTRERING_FØDSELSHENDELSER: {
        id: SideId.FILTRERING_FØDSELSHENDELSER,
        href: 'filtreringsregler',
        navn: 'Filtreringsregler',
        steg: BehandlingSteg.FILTRERING_FØDSELSHENDELSER,
        visSide: behandling => {
            return behandling.årsak === BehandlingÅrsak.FØDSELSHENDELSE;
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
                            vilkårResultat => vilkårResultat.verdi.resultat.verdi === Resultat.IKKE_VURDERT
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
            return !behandling.skalBehandlesAutomatisk;
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

export function erSidenAktiv(side: Side, behandling: IBehandling): boolean {
    const steg = finnSteg(behandling);

    if (!side.steg && side.steg !== 0) {
        return true;
    }

    if (!steg) {
        return false;
    }

    return hentStegNummer(side.steg) <= hentStegNummer(steg);
}

export function finnSiderForBehandling(behandling: IBehandling) {
    return Object.values(sider).filter(side => side.visSide?.(behandling) ?? true);
}

export function hentTrinnForBehandling(behandling: IBehandling): { [sideId: string]: Side } {
    const visSide = (side: Side) => {
        if (side.visSide) {
            return side.visSide(behandling);
        } else {
            return true;
        }
    };
    return Object.entries(sider)
        .filter(([_, side]) => visSide(side))
        .reduce((acc, [sideId, side]) => {
            return { ...acc, [sideId]: side };
        }, {});
}

export function hentSideFraUrl(url: string) {
    return Object.entries(sider).find(([_, side]) => side.href === url)?.[0] as SideId;
}

export function finnSideForBehandlingssteg(behandling: IBehandling): Side | undefined {
    const steg = finnSteg(behandling);

    if (hentStegNummer(steg) >= hentStegNummer(BehandlingSteg.SEND_TIL_BESLUTTER)) {
        if (sider.VEDTAK.visSide && sider.VEDTAK.visSide(behandling)) {
            return sider.VEDTAK;
        }
        if (sider.SIMULERING.visSide && sider.SIMULERING.visSide(behandling)) {
            return sider.SIMULERING;
        }
        return sider.BEHANDLINGRESULTAT;
    }

    const sideForSteg = Object.entries(sider).find(([_, side]) => side.steg === steg);

    return sideForSteg ? sideForSteg[1] : undefined;
}

export function erViPåUdefinertFagsakSide(pathname: string) {
    return (
        Object.values(sider).filter((side: Side) => pathname.includes(side.href)).length === 0 &&
        !pathname.includes('saksoversikt') &&
        !pathname.includes('ny-behandling')
    );
}

export function erViPåUlovligSteg(pathname: string, behandlingSide?: Side) {
    if (!behandlingSide) return false;

    const ønsketSteg = Object.values(sider).find((side: Side) => pathname.includes(side.href));

    if (ønsketSteg) {
        if (hentStegNummer(ønsketSteg?.steg) > hentStegNummer(behandlingSide.steg)) {
            return true;
        }
    }

    return false;
}

function finnSteg(behandling: IBehandling): BehandlingSteg {
    const erHenlagt = inneholderSteg(behandling, BehandlingSteg.HENLEGG_BEHANDLING);
    if (erHenlagt) {
        if (inneholderSteg(behandling, BehandlingSteg.SEND_TIL_BESLUTTER)) {
            return BehandlingSteg.SEND_TIL_BESLUTTER;
        }
        if (inneholderSteg(behandling, BehandlingSteg.VILKÅRSVURDERING)) {
            return BehandlingSteg.VILKÅRSVURDERING;
        }
        if (inneholderSteg(behandling, BehandlingSteg.FILTRERING_FØDSELSHENDELSER)) {
            return BehandlingSteg.FILTRERING_FØDSELSHENDELSER;
        }
        return BehandlingSteg.REGISTRERE_SØKNAD;
    } else {
        return behandling.steg;
    }
}

function inneholderSteg(behandling: IBehandling, behandlingSteg: BehandlingSteg): boolean {
    return behandling.stegTilstand
        .filter(stegTilstand => stegTilstand.behandlingStegStatus !== BehandlingStegStatus.IKKE_UTFØRT)
        .some(stegTilstand => stegTilstand.behandlingSteg === behandlingSteg);
}
