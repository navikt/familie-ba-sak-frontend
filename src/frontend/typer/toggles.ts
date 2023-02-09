export interface IToggles {
    [name: string]: boolean;
}

export enum ToggleNavn {
    kanBehandleTekniskEndring = 'familie-ba-sak.behandling.teknisk-endring',
    kanManueltKorrigereMedVedtaksbrev = 'familie-ba-sak.behandling.korreksjon-vedtaksbrev',
    skalIkkeStoppeMigreringsbehandlig = 'familie-ba-sak.ikke.stopp.migeringsbehandling',
    tekniskVedlikeholdHenleggelse = 'familie-ba-sak.teknisk-vedlikehold-henleggelse.tilgangsstyring',
    endreMottakerEndringsårsaker = 'familie-ba-sak.behandling.endringsperiode.endre-mottaker-aarsaker.utgivelse',
    leggTilMottaker = 'familie-ba-sak.behandling.legg-til-mottaker',
    trekkILøpendeUtbetaling = 'familie-ba-sak.trekk-i-loepende-utbetaling',
    kanBehandleKlage = 'familie-ba-sak.klage',
    støtterEnsligMindreårig = 'familie-ba-sak.behandling.enslig-mindreaarig',
    kanKjøreSatsendringManuelt = 'familie-ba-sak.kan-kjore-satsendring-manuelt',
    kanAutomatiskSetteVilkår = 'familie-ba-sak.kan-automatisk-sette-vilkaar',
}

export const alleTogglerAv = (): IToggles => {
    return Object.values(ToggleNavn).reduce((previousValue: IToggles, currentValue: ToggleNavn) => {
        previousValue[currentValue] = false;
        return previousValue;
    }, {});
};
