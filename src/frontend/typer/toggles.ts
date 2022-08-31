export interface IToggles {
    [name: string]: boolean;
}

export enum ToggleNavn {
    kanBehandleTekniskEndring = 'familie-ba-sak.behandling.teknisk-endring',
    kanManueltKorrigereMedVedtaksbrev = 'familie-ba-sak.behandling.korreksjon-vedtaksbrev',
    brukEøs = 'familie-ba-sak.behandling.eos',
    skalIkkeStoppeMigreringsbehandlig = 'familie-ba-sak.ikke.stopp.migeringsbehandling',
    tekniskVedlikeholdHenleggelse = 'familie-ba-sak.teknisk-vedlikehold-henleggelse.tilgangsstyring',
    endreMottakerEndringsårsaker = 'familie-ba-sak.behandling.endringsperiode.endre-mottaker-aarsaker.utgivelse',
    støtterInstitusjon = 'familie-ba-sak.stotter-institusjon',
    kanBehandleEøsSekunderland = 'familie-ba-sak.behandling.eos-sekunderland',
    kanBehandleEøsToPrimerland = 'familie-ba-sak.behandling.eos-to-primerland',
    søkerForSegSelv = 'familie-ba-sak.behandling.soker-for-seg-selv',
}

export const alleTogglerAv = (): IToggles => {
    return Object.values(ToggleNavn).reduce((previousValue: IToggles, currentValue: ToggleNavn) => {
        previousValue[currentValue] = false;
        return previousValue;
    }, {});
};
