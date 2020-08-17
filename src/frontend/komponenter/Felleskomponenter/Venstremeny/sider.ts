import {
    BehandlingResultat,
    BehandlingSteg,
    Behandlingstype,
    IBehandling,
} from '../../../typer/behandling';
import { IPersonResultat, IVilkårResultat, Resultat } from '../../../typer/vilkår';
import { mapFraRestPersonResultatTilPersonResultat } from '../../../context/Vilkårsvurdering/vilkårsvurdering';
import { IFelt } from '../../../typer/felt';
import { formaterPersonIdent } from '../../../utils/formatter';

export interface ISide {
    id: string;
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

export const sider: ISide[] = [
    {
        id: 'REGISTRERE_SØKNAD',
        href: 'registrer-soknad',
        navn: 'Registrer søknad',
        steg: BehandlingSteg.REGISTRERE_SØKNAD,
    },
    {
        id: 'VILKÅRSVURDERING',
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
    {
        id: 'BEHANDLINGRESULTAT',
        href: 'tilkjent-ytelse',
        navn: 'Behandlingsresultat',
        steg: BehandlingSteg.SEND_TIL_BESLUTTER,
    },
    { id: 'VEDTAK', href: 'vedtak', navn: 'Vedtak', steg: BehandlingSteg.SEND_TIL_BESLUTTER },
];

export const erSidenInaktiv = (side: ISide, steg?: BehandlingSteg): boolean => {
    if (!side.steg && side.steg !== 0) {
        return true;
    }

    if (!steg) {
        return false;
    }

    /**
     * Litt stygg cast for å gjøre tsc fornøyd.
     * Skrives kanskje om når vi har mer logikk rundt hvilke steg som skal være aktive i en behandling senere.
     *  */
    return side.steg !== undefined
        ? side.steg <= ((BehandlingSteg[steg] as unknown) as BehandlingSteg)
        : false;
};

export const visSide = (side: ISide, åpenBehandling?: IBehandling) => {
    if (!åpenBehandling) {
        return !side.steg && side.steg !== 0;
    } else if (åpenBehandling.samletResultat === BehandlingResultat.OPPHØRT) {
        return !side.steg && side.steg !== 0;
    } else if (åpenBehandling.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD) {
        return side.steg !== BehandlingSteg.REGISTRERE_SØKNAD;
    } else {
        return true;
    }
};

export const finnSideForBehandlingssteg = (steg: BehandlingSteg) => {
    return Object.values(sider).find((side: ISide) => side.steg === steg);
};

export const erViPåUdefinertFagsakSide = (pathname: string) => {
    return (
        Object.values(sider).filter((side: ISide) => pathname.includes(side.href)).length === 0 &&
        !pathname.includes('saksoversikt') &&
        !pathname.includes('ny-behandling')
    );
};
