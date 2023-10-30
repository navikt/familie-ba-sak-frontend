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
    kanBehandleKlage = 'familie-ba-sak.klage',

    støtterEnsligMindreårig = 'familie-ba-sak.behandling.enslig-mindreaarig',
    støtterRefusjonEøs = 'familie-ba-sak.behandling.refusjon-eos',
    organiserAvslag = 'familie-ba-sak-frontend.vedtaksperiode-organisering',
    selvstendigRettInfobrev = 'familie-ba-sak.selvstendig-rett-infobrev',
}

export const alleTogglerAv = (): IToggles => {
    return Object.values(ToggleNavn).reduce((previousValue: IToggles, currentValue: ToggleNavn) => {
        previousValue[currentValue] = false;
        return previousValue;
    }, {});
};
