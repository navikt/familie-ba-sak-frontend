export interface IToggles {
    [name: string]: boolean;
}

export enum ToggleNavn {
    // Operasjonelle
    kanBehandleTekniskEndring = 'familie-ba-sak.behandling.teknisk-endring',
    kanManueltKorrigereMedVedtaksbrev = 'familie-ba-sak.behandling.korreksjon-vedtaksbrev',
    tekniskVedlikeholdHenleggelse = 'familie-ba-sak.teknisk-vedlikehold-henleggelse.tilgangsstyring',
    kanKjøreAutomatiskValutajusteringBehandlingForEnkeltSak = 'familie-ba-sak.kan-kjore-autmatisk-valutajustering-behandling-for-enkelt-sak',
    kanOppretteOgEndreSammensatteKontrollsaker = 'familie-ba-sak.kan-opprette-og-endre-sammensatte-kontrollsaker',
    skalObfuskereData = 'familie-ba-sak.anonymiser-persondata',
    kanBehandleSakerSomBrukerUlovfestetMotregning = 'familie-ba-sak.kan-behandle-saker-som-bruker-ulovfestet-motregning',

    // Release
    kanBehandleKlage = 'familie-ba-sak.klage',
    selvstendigRettInfobrev = 'familie-ba-sak.selvstendig-rett-infobrev',
    kanOppretteRevurderingMedAarsakIverksetteKaVedtak = 'familie-ba-sak.kan-opprette-revurdering-med-aarsak-iverksette-ka-vedtak',
    brukFunksjonalitetForUlovfestetMotregning = 'familie-ba-sak.ulovfestet-motregning',
}

export const alleTogglerAv = (): IToggles => {
    return Object.values(ToggleNavn).reduce((previousValue: IToggles, currentValue: ToggleNavn) => {
        previousValue[currentValue] = false;
        return previousValue;
    }, {});
};
