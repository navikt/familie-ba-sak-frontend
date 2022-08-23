import type { FeltState } from '@navikt/familie-skjema';

import { mapFraRestPersonResultatTilPersonResultat } from '../../../context/Vilkårsvurdering/vilkårsvurdering';
import type { IBehandling } from '../../../typer/behandling';
import {
    BehandlingSteg,
    BehandlingStegStatus,
    BehandlingÅrsak,
    hentStegNummer,
} from '../../../typer/behandling';
import type { IPersonResultat, IVilkårResultat } from '../../../typer/vilkår';
import { Resultat } from '../../../typer/vilkår';
import { formaterIdent } from '../../../utils/formatter';

export interface ISide {
    href: string;
    navn: string;
    steg: BehandlingSteg;
    undersider?: (åpenBehandling: IBehandling) => IUnderside[];
    visSide?: (åpenBehandling: IBehandling) => boolean;
}

export interface IUnderside {
    navn: string;
    antallAksjonspunkter: () => number;
    hash: string;
}

export interface ITrinn extends ISide {
    kontrollert: KontrollertStatus;
}

export enum KontrollertStatus {
    IKKE_KONTROLLERT,
    KONTROLLERT,
    MANGLER_KONTROLL,
}

export enum SideId {
    REGISTRERE_MOTTAKER = 'REGISTRERE_MOTTAKER',
    REGISTRERE_SØKNAD = 'REGISTRERE_SØKNAD',
    FILTRERING_FØDSELSHENDELSER = 'FILTRERING_FØDSELSHENDELSER',
    VILKÅRSVURDERING = 'VILKÅRSVURDERING',
    BEHANDLINGRESULTAT = 'BEHANDLINGRESULTAT',
    SIMULERING = 'SIMULERING',
    VEDTAK = 'VEDTAK',
}

export const sider: Record<SideId, ISide> = {
    REGISTRERE_MOTTAKER: {
        href: 'registrer-mottaker',
        navn: 'Registrer mottaker',
        steg: BehandlingSteg.REGISTRERE_INSTITUSJON_OG_VERGE,
        visSide: (åpenBehandling: IBehandling) => {
            return (
                åpenBehandling.stegTilstand.find(
                    value => value.behandlingSteg === BehandlingSteg.REGISTRERE_INSTITUSJON_OG_VERGE
                ) !== undefined
            );
        },
    },
    REGISTRERE_SØKNAD: {
        href: 'registrer-soknad',
        navn: 'Registrer søknad',
        steg: BehandlingSteg.REGISTRERE_SØKNAD,
        visSide: (åpenBehandling: IBehandling) => {
            return åpenBehandling.årsak === BehandlingÅrsak.SØKNAD;
        },
    },
    FILTRERING_FØDSELSHENDELSER: {
        href: 'filtreringsregler',
        navn: 'Filtreringsregler',
        steg: BehandlingSteg.FILTRERING_FØDSELSHENDELSER,
        visSide: (åpenBehandling: IBehandling) => {
            return åpenBehandling.årsak === BehandlingÅrsak.FØDSELSHENDELSE;
        },
    },
    VILKÅRSVURDERING: {
        href: 'vilkaarsvurdering',
        navn: 'Vilkårsvurdering',
        steg: BehandlingSteg.VILKÅRSVURDERING,
        undersider: (åpenBehandling: IBehandling) => {
            const personResultater = mapFraRestPersonResultatTilPersonResultat(
                åpenBehandling.personResultater,
                åpenBehandling.personer
            );

            return personResultater.map(
                (personResultat: IPersonResultat, index: number): IUnderside => {
                    return {
                        navn: `${personResultat.person.navn}, ${formaterIdent(
                            personResultat.person.personIdent
                        )}`,
                        hash: `${index}_${personResultat.person.fødselsdato}`,
                        antallAksjonspunkter: () =>
                            personResultat.vilkårResultater.filter(
                                (vilkårResultat: FeltState<IVilkårResultat>) => {
                                    return (
                                        vilkårResultat.verdi.resultat.verdi ===
                                        Resultat.IKKE_VURDERT
                                    );
                                }
                            ).length,
                    };
                }
            );
        },
    },
    BEHANDLINGRESULTAT: {
        href: 'tilkjent-ytelse',
        navn: 'Behandlingsresultat',
        steg: BehandlingSteg.BEHANDLINGSRESULTAT,
    },
    SIMULERING: {
        href: 'simulering',
        navn: 'Simulering',
        steg: BehandlingSteg.VURDER_TILBAKEKREVING,
        visSide: (åpenBehandling: IBehandling) => {
            return !åpenBehandling.skalBehandlesAutomatisk;
        },
    },
    VEDTAK: {
        href: 'vedtak',
        navn: 'Vedtak',
        steg: BehandlingSteg.SEND_TIL_BESLUTTER,
        visSide: (åpenBehandling: IBehandling) => {
            return åpenBehandling.årsak !== BehandlingÅrsak.SATSENDRING;
        },
    },
};

export const erSidenAktiv = (side: ISide, behandling: IBehandling): boolean => {
    const steg = finnSteg(behandling);

    if (!side.steg && side.steg !== 0) {
        return true;
    }

    if (!steg) {
        return false;
    }

    return hentStegNummer(side.steg) <= hentStegNummer(steg);
};

export const hentTrinnForBehandling = (
    åpenBehandling: IBehandling
): { [sideId: string]: ISide } => {
    const visSide = (side: ISide) => {
        if (side.visSide) {
            return side.visSide(åpenBehandling);
        } else {
            return true;
        }
    };
    return Object.entries(sider)
        .filter(([_, side]) => visSide(side))
        .reduce((acc, [sideId, side]) => {
            return {
                ...acc,
                [sideId]: side,
            };
        }, {});
};

export const finnSideForBehandlingssteg = (behandling: IBehandling): ISide | undefined => {
    const steg = finnSteg(behandling);

    if (hentStegNummer(steg) >= hentStegNummer(BehandlingSteg.SEND_TIL_BESLUTTER)) {
        return sider.VEDTAK.visSide && sider.VEDTAK.visSide(behandling)
            ? sider.VEDTAK
            : sider.SIMULERING;
    }

    const sideForSteg = Object.entries(sider).find(([_, side]) => side.steg === steg);

    return sideForSteg ? sideForSteg[1] : undefined;
};

export const erViPåUdefinertFagsakSide = (pathname: string) => {
    return (
        Object.values(sider).filter((side: ISide) => pathname.includes(side.href)).length === 0 &&
        !pathname.includes('saksoversikt') &&
        !pathname.includes('ny-behandling')
    );
};

export const erViPåUlovligSteg = (pathname: string, behandlingSide?: ISide) => {
    if (!behandlingSide) return false;

    const ønsketSteg: ISide | undefined = Object.values(sider).find((side: ISide) =>
        pathname.includes(side.href)
    );

    if (ønsketSteg) {
        if (hentStegNummer(ønsketSteg?.steg) > hentStegNummer(behandlingSide.steg)) {
            return true;
        }
    }

    return false;
};

const finnSteg = (behandling: IBehandling): BehandlingSteg => {
    const erHenlagt = inneholderSteg(behandling, BehandlingSteg.HENLEGG_BEHANDLING);

    if (erHenlagt) {
        if (inneholderSteg(behandling, BehandlingSteg.SEND_TIL_BESLUTTER))
            return BehandlingSteg.SEND_TIL_BESLUTTER;
        if (inneholderSteg(behandling, BehandlingSteg.VILKÅRSVURDERING))
            return BehandlingSteg.VILKÅRSVURDERING;
        if (inneholderSteg(behandling, BehandlingSteg.FILTRERING_FØDSELSHENDELSER))
            return BehandlingSteg.FILTRERING_FØDSELSHENDELSER;
        return BehandlingSteg.REGISTRERE_SØKNAD;
    } else {
        return behandling.steg;
    }
};

const inneholderSteg = (behandling: IBehandling, behandlingSteg: BehandlingSteg): boolean =>
    behandling.stegTilstand
        .filter(
            stegTilstand => stegTilstand.behandlingStegStatus !== BehandlingStegStatus.IKKE_UTFØRT
        )
        .some(stegTilstand => stegTilstand.behandlingSteg === behandlingSteg);
