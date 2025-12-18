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
    skalSkjuleTestmiljøknapper = 'familie-ba-sak.skal-skjule-testmiljoknapper',

    // Release
    selvstendigRettInfobrev = 'familie-ba-sak.selvstendig-rett-infobrev',
    kanOppretteRevurderingMedAarsakIverksetteKaVedtak = 'familie-ba-sak.kan-opprette-revurdering-med-aarsak-iverksette-ka-vedtak',
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
