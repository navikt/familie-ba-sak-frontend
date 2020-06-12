import {
    BehandlingSteg,
    IBehandling,
    Behandlingstype,
    BehandlingResultat,
} from '../../../typer/behandling';

export interface ISide {
    id: string;
    href: string;
    navn: string;
    steg: BehandlingSteg;
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
