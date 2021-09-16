export interface IToggles {
    [name: string]: boolean;
}

export enum ToggleNavn {
    visTekniskOpphør = 'familie-ba-sak.behandling.vis-teknisk-opphoer',
    tilbakekreving = 'familie-ba-sak.behandling.tilbakekreving',
    medlemskap = 'familie-ba-sak.behandling.medlemskap',
    journalpostliste = 'familie-ba-sak.behandling.journalpostliste',
    brukErDeltBosted = 'familie-ba-sak.behandling.delt_bosted',
    forhåndsvisAlleBrevbegrunnelser = 'familie-ba-sak.forhaandsvis-alle-brevbegrunnelser',
    brukBegrunnelserFraSanity = 'familie-ba-sak.behandling.begrunnelse-fra-sanity',
    brukLeggTilBarnPåBehandling = 'familie-ba-sak.behandling.legg-til-barn',
    kanManueltKorrigereMedVedtaksbrev = 'familie-ba-sak.behandling.korreksjon-vedtaksbrev',
    kanBehandleUtvidet = 'familie-ba-sak.behandling.utvidet',
}

export const alleTogglerAv = (): IToggles => {
    return Object.values(ToggleNavn).reduce((previousValue: IToggles, currentValue: ToggleNavn) => {
        previousValue[currentValue] = false;
        return previousValue;
    }, {});
};
