export interface IToggles {
    [name: string]: boolean;
}

export enum ToggleNavn {
    // Operasjonelle
    kanOppretteOgEndreSammensatteKontrollsaker = 'familie-ba-sak.kan-opprette-og-endre-sammensatte-kontrollsaker',
    skalObfuskereData = 'familie-ba-sak.anonymiser-persondata',
    skalSkjuleTestmiljøknapper = 'familie-ba-sak.skal-skjule-testmiljoknapper',

    // Release
    selvstendigRettInfobrev = 'familie-ba-sak.selvstendig-rett-infobrev',
    brukFunksjonalitetForUlovfestetMotregning = 'familie-ba-sak.ulovfestet-motregning',
    oppdaterModiaKontekst = 'familie-ba-sak.oppdater-modia-kontekst',
    tillattBehandlingAvSkjermetBarn = 'familie-ba-sak.tillatt-behandling-av-kode6-kode19',
    skalViseVarsellampeForManueltLagtTilBarn = 'familie-ba-sak.skal-vise-varsellampe-for-manuelt-lagt-til-barn',
    bosattFinnmarkNordtroms = 'familie-ba-sak.bosatt-finnmark-nord-troms',
    visOverlappendePerioderMedAndreFagsaker = 'familie-ba-sak.vis-overlappende-perioder-med-andre-fagsaker',
    skalBrukeNyttSkjemaForEndretUtbetalingAndel = 'familie-ba-sak.endret-utbetaling-andel-skjema-rhf',
}

export const alleTogglerAv = (): IToggles => {
    return Object.values(ToggleNavn).reduce((previousValue: IToggles, currentValue: ToggleNavn) => {
        previousValue[currentValue] = false;
        return previousValue;
    }, {});
};
