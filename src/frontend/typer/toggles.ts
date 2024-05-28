export interface IToggles {
    [name: string]: boolean;
}

export enum ToggleNavn {
    // Operasjonelle
    kanBehandleTekniskEndring = 'familie-ba-sak.behandling.teknisk-endring',
    kanManueltKorrigereMedVedtaksbrev = 'familie-ba-sak.behandling.korreksjon-vedtaksbrev',
    tekniskVedlikeholdHenleggelse = 'familie-ba-sak.teknisk-vedlikehold-henleggelse.tilgangsstyring',
    kanKjoreAutmatiskValutajusteringBehandlingForEnkeltSak = 'familie-ba-sak.kan-kjore-autmatisk-valutajustering-behandling-for-enkelt-sak',

    // Release
    kanBehandleKlage = 'familie-ba-sak.klage',
    selvstendigRettInfobrev = 'familie-ba-sak.selvstendig-rett-infobrev',
    kanOppretteAutomatiskeValutakurserPåManuelleSaker = 'familie-ba-sak.kan-opprette-automatiske-valutakurser-paa-manuelle-saker',
    kanOverstyreAutomatiskeValutakurser = 'familie-ba-sak.kan-overstyre-automatiske-valutakurser',
}

export const alleTogglerAv = (): IToggles => {
    return Object.values(ToggleNavn).reduce((previousValue: IToggles, currentValue: ToggleNavn) => {
        previousValue[currentValue] = false;
        return previousValue;
    }, {});
};
