import { BehandlingSteg } from '../../../typer/behandling';

export interface ISide {
    id: string;
    navn: string;
    steg?: BehandlingSteg;
}

export const sider: ISide[] = [
    { id: 'SAKSOVERSIKT', navn: 'saksoversikt' },
    {
        id: 'VILKÅRSVURDERING',
        navn: 'vilkårsvurdering',
        steg: BehandlingSteg.VILKÅRSVURDERING,
    },
    { id: 'BEREGNING', navn: 'beregning', steg: BehandlingSteg.VILKÅRSVURDERING },
    { id: 'VEDTAK', navn: 'vedtak', steg: BehandlingSteg.SEND_TIL_BESLUTTER },
];

export const erSidenInaktiv = (side: ISide, steg?: BehandlingSteg) => {
    if (!side.steg) {
        return true;
    }

    if (!steg) {
        return false;
    }

    // @ts-ignore
    return side.steg <= BehandlingSteg[steg];
};
