export interface IToggles {
    [name: string]: boolean;
}

export enum ToggleNavn {
    // Operasjonelle
    kanBehandleTekniskEndring = 'familie-ba-sak.behandling.teknisk-endring',
    kanManueltKorrigereMedVedtaksbrev = 'familie-ba-sak.behandling.korreksjon-vedtaksbrev',
    skalIkkeStoppeMigreringsbehandlig = 'familie-ba-sak.ikke.stopp.migeringsbehandling',
    tekniskVedlikeholdHenleggelse = 'familie-ba-sak.teknisk-vedlikehold-henleggelse.tilgangsstyring',
    kanAutomatiskSetteVilkår = 'familie-ba-sak.kan-automatisk-sette-vilkaar',

    // Release
    endreMottakerEndringsårsaker = 'familie-ba-sak.behandling.endringsperiode.endre-mottaker-aarsaker.utgivelse',
    trekkILøpendeUtbetaling = 'familie-ba-sak.trekk-i-loepende-utbetaling',
    kanBehandleKlage = 'familie-ba-sak.klage',
    støtterEnsligMindreårig = 'familie-ba-sak.behandling.enslig-mindreaarig',
    kanKjøreSatsendringManuelt = 'familie-ba-sak.kan-kjore-satsendring-manuelt',
    nyMåteÅBeregneBehandlingsresultat = 'familie-ba-sak.behandling.behandlingsresultat',
    manuellPostering = 'familie-ba-sak.manuell-postering',
}

export const alleTogglerAv = (): IToggles => {
    return Object.values(ToggleNavn).reduce((previousValue: IToggles, currentValue: ToggleNavn) => {
        previousValue[currentValue] = false;
        return previousValue;
    }, {});
};
