export interface FeatureToggles {
    [name: string]: boolean;
}

export enum FeatureToggle {
    // Operasjonelle
    kanOppretteOgEndreSammensatteKontrollsaker = 'familie-ba-sak.kan-opprette-og-endre-sammensatte-kontrollsaker',
    skalObfuskereData = 'familie-ba-sak.anonymiser-persondata',
    skalSkjuleTestmiljøknapper = 'familie-ba-sak.skal-skjule-testmiljoknapper',

    // Release
    selvstendigRettInfobrev = 'familie-ba-sak.selvstendig-rett-infobrev',
    tillattOpprettingAvSkjermetBarnFagsak = 'familie-ba-sak.tillatt-oppretting-av-skjermet-barn-fagsak',
    skalBrukeNyttSkjemaForEndretUtbetalingAndel = 'familie-ba-sak.endret-utbetaling-andel-skjema-rhf',
    preutfyllingLovligOpphold = 'familie-ba-sak.preutfylling-lovlig-opphold',
    kanGenerereBarnasVilkar = 'familie-ba-sak.kan-generere-barnas-vilkar',
    kanRegistrereSøknadstidspunkt = 'familie-ba-sak.kan-registrere-soknadstidspunkt',
}
