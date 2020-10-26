import {
    BehandlingSteg,
    Behandlingstype,
    hentStegNummer,
    IBehandling,
} from '../../../typer/behandling';
import { IPersonResultat, IVilkårResultat, Resultat } from '../../../typer/vilkår';
import { mapFraRestPersonResultatTilPersonResultat } from '../../../context/Vilkårsvurdering/vilkårsvurdering';
import { IFelt } from '../../../typer/felt';
import { formaterPersonIdent } from '../../../utils/formatter';
import { IOpplysningsplikt, OpplysningspliktStatus } from '../../../typer/opplysningsplikt';

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
        steg: BehandlingSteg.OPPLYSNINGSPLIKT,
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
                                (vilkårResultat: IFelt<IVilkårResultat>) => {
                                    return vilkårResultat.verdi.resultat.verdi === Resultat.KANSKJE;
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

export const erSidenInaktiv = (side: ISide, steg?: BehandlingSteg): boolean => {
    if (!side.steg && side.steg !== 0) {
        return true;
    }

    if (!steg) {
        return false;
    }

    return hentStegNummer(side.steg) <= hentStegNummer(steg);
};

export const visSide = (side: ISide, åpenBehandling: IBehandling, harOpplysningsplikt: boolean) => {
    if (
        åpenBehandling.skalBehandlesAutomatisk ||
        åpenBehandling.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD
    ) {
        return side.steg !== BehandlingSteg.REGISTRERE_SØKNAD;
    } else if (side === sider.OPPLYSNINGSPLIKT) {
        return harOpplysningsplikt;
    } else {
        return true;
    }
};

export const finnSideForBehandlingssteg = (
    steg: BehandlingSteg,
    opplysningsplikt: IOpplysningsplikt | undefined
) => {
    if (hentStegNummer(steg) >= hentStegNummer(BehandlingSteg.SEND_TIL_BESLUTTER)) {
        return sider.VEDTAK;
    } else if (opplysningsplikt && opplysningsplikt.status === OpplysningspliktStatus.IKKE_SATT) {
        return sider.OPPLYSNINGSPLIKT;
    }
    return Object.values(sider).find((side: ISide) => side.steg === steg);
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
