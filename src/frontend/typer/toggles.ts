export interface IToggles {
    [name: string]: boolean;
}

export enum ToggleNavn {
    visTekniskOpphør = 'familie-ba-sak.behandling.vis-teknisk-opphoer',
    visSimulering = 'familie-ba-sak.behandling.vis-simulering',
    tilbakekreving = 'familie-ba-sak.behandling.tilbakekreving',
    skjønnsvurdering = 'familie-ba-sak.behandling.skjonnsvurdering',
}

export const alleTogglerAv = (): IToggles => {
    return Object.values(ToggleNavn).reduce((previousValue: IToggles, currentValue: ToggleNavn) => {
        previousValue[currentValue] = false;
        return previousValue;
    }, {});
};
