export interface IToggles {
    [name: string]: boolean;
}

export enum ToggleNavn {
    visTekniskOpphør = 'familie-ba-sak.behandling.vis-teknisk-opphoer',
    tilbakekreving = 'familie-ba-sak.behandling.tilbakekreving',
    medlemskap = 'familie-ba-sak.behandling.medlemskap',
    brukNyeVedtaksperioder = 'familie-ba-sak.behandling.vedtakstype-med-begrunnelser',
    brukErDeltBosted = 'familie-ba-sak.behandling.delt_bosted',
}

export const alleTogglerAv = (): IToggles => {
    return Object.values(ToggleNavn).reduce((previousValue: IToggles, currentValue: ToggleNavn) => {
        previousValue[currentValue] = false;
        return previousValue;
    }, {});
};
