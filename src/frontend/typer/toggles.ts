export interface IToggles {
    [name: string]: boolean;
}

export enum ToggleNavn {
    visTekniskOpphør = 'familie-ba-sak.behandling.vis-teknisk-opphoer', // Deprecated, bruk kanBehandleTekniskEndring istedet.
    kanBehandleTekniskEndring = 'familie-ba-sak.behandling.teknisk-endring',
    kanBehandleSmåbarnstillegg = 'familie-ba-sak.behandling.smaabarnstillegg',
    tilbakekreving = 'familie-ba-sak.behandling.tilbakekreving',
    brukErDeltBosted = 'familie-ba-sak.behandling.delt_bosted',
    brukBegrunnelserFraSanity = 'familie-ba-sak.behandling.begrunnelse-fra-sanity',
    kanManueltKorrigereMedVedtaksbrev = 'familie-ba-sak.behandling.korreksjon-vedtaksbrev',
    kanEndretUtbetalingAndel = 'familie-ba-sak.behandling.kan-endre-utbetalingsperiode',
    kanBehandleUtvidet = 'familie-ba-sak.behandling.utvidet',
    brukEøs = 'familie-ba-sak.behandling.eos',
    kanManueltMigrereTilbakeITid = 'familie-ba-sak.behandling.manuell-migrering-tilbake-i-tid',
}

export const alleTogglerAv = (): IToggles => {
    return Object.values(ToggleNavn).reduce((previousValue: IToggles, currentValue: ToggleNavn) => {
        previousValue[currentValue] = false;
        return previousValue;
    }, {});
};
