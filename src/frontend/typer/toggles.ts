export interface IToggles {
    [name: string]: boolean;
}

export enum ToggleNavn {
    visTekniskOpphør = 'familie-ba-sak.behandling.vis-teknisk-opphoer',
    visAvslag = 'familie-ba-sak.behandling.vis-avslag',
    visOpphørsperioder = 'familie-ba-sak.behandling.vis-opphoersperioder',
    visSimulering = 'familie-ba-sak.behandling.vis-simulering',
    begrgrunnelseFritekst = 'familie-ba-sak.behandling.begrunnelse-fritekst',
}

export const alleTogglerAv = (): IToggles => {
    return Object.values(ToggleNavn).reduce((previousValue: IToggles, currentValue: ToggleNavn) => {
        previousValue[currentValue] = false;
        return previousValue;
    }, {});
};
