export interface IToggles {
    [name: string]: boolean;
}

export enum ToggleNavn {
    kanBehandleTekniskEndring = 'familie-ba-sak.behandling.teknisk-endring',
    kanBehandleSmåbarnstillegg = 'familie-ba-sak.behandling.smaabarnstillegg',
    brukBegrunnelserFraSanity = 'familie-ba-sak.behandling.begrunnelse-fra-sanity',
    kanManueltKorrigereMedVedtaksbrev = 'familie-ba-sak.behandling.korreksjon-vedtaksbrev',
    brukEøs = 'familie-ba-sak.behandling.eos',
    skalIkkeStoppeMigreringsbehandlig = 'familie-ba-sak.ikke.stopp.migeringsbehandling',
    tekniskVedlikeholdHenleggelse = 'familie-ba-sak.teknisk-vedlikehold-henleggelse.tilgangsstyring',
    ingenOverlappHenlegglese = 'familie-ba-sak.ingen-overlapp-vedtaksperioder.utgivelse',
    endreMottakerEndringsårsaker = 'familie-ba-sak.behandling.endringsperiode.endre-mottaker-aarsaker.utgivelse',
    fortsattInnvilgetMedPerioder = 'familie-ba-sak.utgivelse.behandling.fortsatt-innvilget.med-perioder',
    etterbetaling3år = 'familie-ba-sak.utgivelse.behandling.etterbetaling-3-aar',
}

export const alleTogglerAv = (): IToggles => {
    return Object.values(ToggleNavn).reduce((previousValue: IToggles, currentValue: ToggleNavn) => {
        previousValue[currentValue] = false;
        return previousValue;
    }, {});
};
