import { mapFraRestPersonResultatTilPersonResultat } from '../../../context/Vilkårsvurdering/vilkårsvurdering';
import { FeltState } from '../../../familie-skjema/typer';
import {
    BehandlingSteg,
    BehandlingStegStatus,
    BehandlingÅrsak,
    hentStegNummer,
    IBehandling,
} from '../../../typer/behandling';
import { IOpplysningsplikt, OpplysningspliktStatus } from '../../../typer/opplysningsplikt';
import { IPersonResultat, IVilkårResultat, Resultat } from '../../../typer/vilkår';
import { formaterPersonIdent } from '../../../utils/formatter';

export interface ISide {
    href: string;
    navn: string;
    steg: BehandlingSteg;
    undersider?: (åpenBehandling: IBehandling) => IUnderside[];
}

export interface IUnderside {
    navn: string;
    antallAksjonspunkter: () => number;
    hash: string;
}

export enum SideId {
    REGISTRERE_SØKNAD = 'REGISTRERE_SØKNAD',
    OPPLYSNINGSPLIKT = 'OPPLYSNINGSPLIKT',
    VILKÅRSVURDERING = 'VILKÅRSVURDERING',
    BEHANDLINGRESULTAT = 'BEHANDLINGRESULTAT',
    VEDTAK = 'VEDTAK',
}

export const sider: Record<SideId, ISide> = {
    REGISTRERE_SØKNAD: {
        href: 'registrer-soknad',
        navn: 'Registrer søknad',
        steg: BehandlingSteg.REGISTRERE_SØKNAD,
    },
    OPPLYSNINGSPLIKT: {
        href: 'opplysningsplikt',
        navn: 'Opplysningsplikt',
        steg: BehandlingSteg.VILKÅRSVURDERING,
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
                        navn: `${personResultat.person.navn}, ${formaterPersonIdent(
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
        steg: BehandlingSteg.SEND_TIL_BESLUTTER,
    },
    VEDTAK: {
        href: 'vedtak',
        navn: 'Vedtak',
        steg: BehandlingSteg.SEND_TIL_BESLUTTER,
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

export const visSide = (side: ISide, åpenBehandling: IBehandling, harOpplysningsplikt: boolean) => {
    if (side === sider.OPPLYSNINGSPLIKT) {
        return harOpplysningsplikt;
    } else if (
        åpenBehandling.skalBehandlesAutomatisk ||
        åpenBehandling.årsak !== BehandlingÅrsak.SØKNAD
    ) {
        return side.steg !== BehandlingSteg.REGISTRERE_SØKNAD;
    } else {
        return true;
    }
};

export const finnSideForBehandlingssteg = (
    behandling: IBehandling,
    opplysningsplikt: IOpplysningsplikt | undefined
): ISide | undefined => {
    const steg = finnSteg(behandling);

    if (hentStegNummer(steg) >= hentStegNummer(BehandlingSteg.SEND_TIL_BESLUTTER)) {
        return sider.VEDTAK;
    } else if (opplysningsplikt && opplysningsplikt.status === OpplysningspliktStatus.IKKE_SATT) {
        return sider.OPPLYSNINGSPLIKT;
    }

    const sideForSteg = Object.entries(sider)
        .filter(([sideId, _]) => sideId !== SideId.OPPLYSNINGSPLIKT)
        .find(([_, side]) => side.steg === steg);

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

export const finnSteg = (behandling: IBehandling): BehandlingSteg => {
    const erHenlagt = inneholderSteg(behandling, BehandlingSteg.HENLEGG_SØKNAD);

    if (erHenlagt) {
        if (inneholderSteg(behandling, BehandlingSteg.SEND_TIL_BESLUTTER))
            return BehandlingSteg.SEND_TIL_BESLUTTER;
        if (inneholderSteg(behandling, BehandlingSteg.VILKÅRSVURDERING))
            return BehandlingSteg.VILKÅRSVURDERING;
        return BehandlingSteg.REGISTRERE_SØKNAD;
    } else {
        return behandling.steg;
    }
};

export const inneholderSteg = (behandling: IBehandling, behandlingSteg: BehandlingSteg): boolean =>
    behandling.stegTilstand
        .filter(
            stegTilstand => stegTilstand.behandlingStegStatus !== BehandlingStegStatus.IKKE_UTFØRT
        )
        .some(stegTilstand => stegTilstand.behandlingSteg === behandlingSteg);
