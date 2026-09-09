import { BehandlingKategori } from '@typer/behandlingstema';

import { Brevmal } from './typer';

export const skalViseFritekstKulepunkter = (brevmal: Brevmal | ''): boolean =>
    brevmal !== '' &&
    ![
        Brevmal.SVARTIDSBREV,
        Brevmal.VARSEL_OM_REVURDERING_DELT_BOSTED_PARAGRAF_14,
        Brevmal.VARSEL_OM_REVURDERING_SAMBOER,
        Brevmal.SVARTIDSBREV_INSTITUSJON,
        Brevmal.VARSEL_OM_ÅRLIG_REVURDERING_EØS,
        Brevmal.UTBETALING_ETTER_KA_VEDTAK,
        Brevmal.UTBETALING_ETTER_KA_VEDTAK_INSTITUSJON,
    ].includes(brevmal);

export const skalViseFritekstAvsnitt = (brevmal: Brevmal | ''): boolean =>
    brevmal !== '' &&
    [
        Brevmal.INNHENTE_OPPLYSNINGER_ETTER_SØKNAD_I_SED,
        Brevmal.INNHENTE_OPPLYSNINGER,
        Brevmal.INNHENTE_OPPLYSNINGER_INSTITUSJON,
        Brevmal.UTBETALING_ETTER_KA_VEDTAK,
        Brevmal.UTBETALING_ETTER_KA_VEDTAK_INSTITUSJON,
    ].includes(brevmal);

export const skalViseAntallUkerSvarfrist = (brevmal: Brevmal | ''): boolean =>
    brevmal !== '' && [Brevmal.FORLENGET_SVARTIDSBREV, Brevmal.FORLENGET_SVARTIDSBREV_INSTITUSJON].includes(brevmal);

export const skalViseDatoAvtale = (brevmal: Brevmal | ''): boolean => brevmal === Brevmal.VARSEL_OM_REVURDERING_SAMBOER;

export const skalViseDokumenter = (brevmal: Brevmal | ''): boolean =>
    brevmal !== '' &&
    [
        Brevmal.INNHENTE_OPPLYSNINGER,
        Brevmal.INNHENTE_OPPLYSNINGER_ETTER_SØKNAD_I_SED,
        Brevmal.INNHENTE_OPPLYSNINGER_INSTITUSJON,
        Brevmal.INNHENTE_OPPLYSNINGER_OG_INFORMASJON_OM_AT_ANNEN_FORELDER_MED_SELVSTENDIG_RETT_HAR_SØKT,
        Brevmal.VARSEL_OM_ÅRLIG_REVURDERING_EØS_MED_INNHENTING_AV_OPPLYSNINGER,
    ].includes(brevmal);

export const skalViseBarnBrevetGjelder = (brevmal: Brevmal | ''): boolean =>
    brevmal !== '' &&
    [
        Brevmal.INNHENTE_OPPLYSNINGER_ETTER_SØKNAD_I_SED,
        Brevmal.INNHENTE_OPPLYSNINGER_OG_INFORMASJON_OM_AT_ANNEN_FORELDER_MED_SELVSTENDIG_RETT_HAR_SØKT,
        Brevmal.VARSEL_OM_VEDTAK_ETTER_SØKNAD_I_SED,
        Brevmal.VARSEL_ANNEN_FORELDER_MED_SELVSTENDIG_RETT_SØKT,
    ].includes(brevmal);

export const skalViseMottakerlandSed = (brevmal: Brevmal | '', behandlingKategori?: BehandlingKategori): boolean => {
    // På svartidsbrev vises feltet kun for EØS-behandlinger.
    if (brevmal === Brevmal.SVARTIDSBREV) {
        return behandlingKategori === BehandlingKategori.EØS;
    }
    return (
        brevmal !== '' &&
        [
            Brevmal.VARSEL_OM_ÅRLIG_REVURDERING_EØS,
            Brevmal.VARSEL_OM_ÅRLIG_REVURDERING_EØS_MED_INNHENTING_AV_OPPLYSNINGER,
        ].includes(brevmal)
    );
};

export const skalViseDeltBosted = (brevmal: Brevmal | ''): boolean =>
    brevmal === Brevmal.VARSEL_OM_REVURDERING_DELT_BOSTED_PARAGRAF_14;

export const erBrevmalMedObligatoriskFritekstKulepunkt = (brevmal: Brevmal): boolean =>
    [
        Brevmal.VARSEL_OM_REVURDERING,
        Brevmal.VARSEL_OM_REVURDERING_INSTITUSJON,
        Brevmal.VARSEL_OM_REVURDERING_FRA_NASJONAL_TIL_EØS,
        Brevmal.VARSEL_OM_VEDTAK_ETTER_SØKNAD_I_SED,
        Brevmal.FORLENGET_SVARTIDSBREV,
        Brevmal.FORLENGET_SVARTIDSBREV_INSTITUSJON,
        Brevmal.VARSEL_ANNEN_FORELDER_MED_SELVSTENDIG_RETT_SØKT,
    ].includes(brevmal);
