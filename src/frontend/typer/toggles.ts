export interface IToggles {
    [name: string]: boolean;
}

export enum ToggleNavn {
    kanBehandleTekniskEndring = 'familie-ba-sak.behandling.teknisk-endring',
    kanManueltKorrigereMedVedtaksbrev = 'familie-ba-sak.behandling.korreksjon-vedtaksbrev',
    skalIkkeStoppeMigreringsbehandlig = 'familie-ba-sak.ikke.stopp.migeringsbehandling',
    tekniskVedlikeholdHenleggelse = 'familie-ba-sak.teknisk-vedlikehold-henleggelse.tilgangsstyring',
    endreMottakerEndringsårsaker = 'familie-ba-sak.behandling.endringsperiode.endre-mottaker-aarsaker.utgivelse',
    støtterInstitusjon = 'familie-ba-sak.stotter-institusjon',
    kunneKorrigereVedtak = 'familie-ba-sak.kunne-korrigere-vedtak',
    leggTilMottaker = 'familie-ba-sak.behandling.legg-til-mottaker',
    trekkILøpendeUtbetaling = 'familie-ba-sak.trekk-i-loepende-utbetaling',
    kanBehandleKlage = 'familie-ba-sak.klage',
    støtterEnsligMindreårig = 'familie-ba-sak.behandling.enslig-mindreaarig',
}

export const alleTogglerAv = (): IToggles => {
    return Object.values(ToggleNavn).reduce((previousValue: IToggles, currentValue: ToggleNavn) => {
        previousValue[currentValue] = false;
        return previousValue;
    }, {});
};
