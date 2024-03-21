export interface IToggles {
    [name: string]: boolean;
}

export enum ToggleNavn {
    // Operasjonelle
    kanBehandleTekniskEndring = 'familie-ba-sak.behandling.teknisk-endring',
    kanManueltKorrigereMedVedtaksbrev = 'familie-ba-sak.behandling.korreksjon-vedtaksbrev',
    tekniskVedlikeholdHenleggelse = 'familie-ba-sak.teknisk-vedlikehold-henleggelse.tilgangsstyring',
    kanStarteValutajustering = 'familie-ba-sak.kan-starte-valutajustering',

    // Release
    kanBehandleKlage = 'familie-ba-sak.klage',
    selvstendigRettInfobrev = 'familie-ba-sak.selvstendig-rett-infobrev',
    manuellMottakerInfobrev = 'familie-ba-sak.manuell-mottaker-infobrev',
    journalpostUtsendingsinfo = 'familie-ba-sak.vis-dokument-utsendingsinfo',
}

export const alleTogglerAv = (): IToggles => {
    return Object.values(ToggleNavn).reduce((previousValue: IToggles, currentValue: ToggleNavn) => {
        previousValue[currentValue] = false;
        return previousValue;
    }, {});
};
