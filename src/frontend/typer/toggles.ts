export interface IToggles {
    [name: string]: boolean;
}

export enum ToggleNavn {
    visTekniskOpphør = 'familie-ba-sak.behandling.vis-teknisk-opphoer',
    tilbakekreving = 'familie-ba-sak.behandling.tilbakekreving',
    medlemskap = 'familie-ba-sak.behandling.medlemskap',
    journalpostliste = 'familie-ba-sak.behandling.journalpostliste',
    brukNyeVedtaksperioder = 'familie-ba-sak.behandling.vedtakstype-med-begrunnelser',
    brukErDeltBosted = 'familie-ba-sak.behandling.delt_bosted',
    manuellSatsendring = 'familie-ba-sak.manuell-satsendring',
}

export const alleTogglerAv = (): IToggles => {
    return Object.values(ToggleNavn).reduce((previousValue: IToggles, currentValue: ToggleNavn) => {
        previousValue[currentValue] = false;
        return previousValue;
    }, {});
};
