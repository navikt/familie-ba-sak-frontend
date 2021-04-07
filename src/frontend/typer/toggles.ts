export interface IToggles {
    [name: string]: boolean;
}

export enum ToggleNavn {
    visTekniskOpphør = 'familie-ba-sak.behandling.vis-teknisk-opphoer',
    visAvslag = 'familie-ba-sak.behandling.vis-avslag',
    visOpphørsperioder = 'familie-ba-sak.behandling.vis-opphoersperioder',
    visSimulering = 'familie-ba-sak.behandling.vis-simulering',
    begrunnelseFritekst = 'familie-ba-sak.behandling.begrunnelse-fritekst',
    visLeggTilUregistrerteBarn = 'familie-ba-sak.behandling.vis-legg-til-uregistrerte-barn',
}

export const alleTogglerAv = (): IToggles => {
    return Object.values(ToggleNavn).reduce((previousValue: IToggles, currentValue: ToggleNavn) => {
        previousValue[currentValue] = false;
        return previousValue;
    }, {});
};
