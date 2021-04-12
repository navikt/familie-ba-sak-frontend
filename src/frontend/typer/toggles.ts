export interface IToggles {
    [name: string]: boolean;
}

export enum ToggleNavn {
    visTekniskOpphør = 'familie-ba-sak.behandling.vis-teknisk-opphoer',
    visAvslag = 'familie-ba-sak.behandling.vis-avslag',
    visSimulering = 'familie-ba-sak.behandling.vis-simulering',
    begrunnelseFritekst = 'familie-ba-sak.behandling.begrunnelse-fritekst',
}

export const alleTogglerAv = (): IToggles => {
    return Object.values(ToggleNavn).reduce((previousValue: IToggles, currentValue: ToggleNavn) => {
        previousValue[currentValue] = false;
        return previousValue;
    }, {});
};
