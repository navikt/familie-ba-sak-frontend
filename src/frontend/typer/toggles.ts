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

    // Release
    kanBehandleKlage = 'familie-ba-sak.klage',
    selvstendigRettInfobrev = 'familie-ba-sak.selvstendig-rett-infobrev',
    erEtterbetaling3MndGyldigÅrsak = 'familie-ba-sak.etterbetaling-3-mnd',
}

export const alleTogglerAv = (): IToggles => {
    return Object.values(ToggleNavn).reduce((previousValue: IToggles, currentValue: ToggleNavn) => {
        previousValue[currentValue] = false;
        return previousValue;
    }, {});
};
