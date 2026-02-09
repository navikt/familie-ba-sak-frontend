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
    tillattBehandlingAvSkjermetBarn = 'familie-ba-sak.tillatt-behandling-av-kode6-kode19',
    skalViseVarsellampeForManueltLagtTilBarn = 'familie-ba-sak.skal-vise-varsellampe-for-manuelt-lagt-til-barn',
    skalBrukeNyttSkjemaForEndretUtbetalingAndel = 'familie-ba-sak.endret-utbetaling-andel-skjema-rhf',
    skalKunneBehandleBaInstitusjonFagsaker = 'familie-klage.skal-kunne-behandle-ba-institusjon-fagsaker',
}
