import { BehandlingSteg, IBehandling, Behandlingstype } from '../../../typer/behandling';

export interface ISide {
    id: string;
    href: string;
    navn: string;
    steg?: BehandlingSteg;
}

export const sider: ISide[] = [
    { id: 'SAKSOVERSIKT', href: 'saksoversikt', navn: 'Saksoversikt' },
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
        id: 'BEREGNING',
        href: 'beregning',
        navn: 'Beregning',
        steg: BehandlingSteg.VILKÅRSVURDERING,
    },
    {
        id: 'BEHANDLINGRESULTAT',
        href: 'tilkjent-ytelse',
        navn: 'Behandlingsresultat',
        steg: BehandlingSteg.VILKÅRSVURDERING,
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

    // @ts-ignore
    return side.steg <= BehandlingSteg[steg];
};

export const visSide = (side: ISide, aktivBehandling?: IBehandling) => {
    if (!aktivBehandling) {
        return !side.steg && side.steg !== 0;
    } else if (aktivBehandling.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD) {
        return side.steg !== BehandlingSteg.REGISTRERE_SØKNAD;
    } else {
        return true;
    }
};
