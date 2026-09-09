import { useFagsak } from '@hooks/useFagsak';
import { useSendBehandlingBrev } from '@hooks/useSendBehandlingBrev';
import { Valideringsstatus } from '@navikt/familie-skjema';
import { byggSuksessRessurs } from '@navikt/familie-typer';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { useBrukerContext } from '@sider/Fagsak/BrukerContext';
import { BehandlingKategori } from '@typer/behandlingstema';
import type { IManueltBrevRequestPåBehandling } from '@typer/dokument';
import { FagsakType } from '@typer/fagsak';
import type { IGrunnlagPerson } from '@typer/person';
import { PersonType } from '@typer/person';
import type { IBarnMedOpplysninger, Målform } from '@typer/søknad';
import { hentMuligeBrevmalerImplementering, mottakersMålformImplementering } from '@utils/brevmal';
import { dateTilIsoDatoStringEllerUndefined } from '@utils/dato';
import {
    hentBarnMedOpplysningerFraBruker,
    hentDeltBostedMulitiselectVerdierForBarn,
} from '@utils/deltBostedSkjemaFelter';
import type { IFritekstFelt } from '@utils/fritekstfelter';
import { genererIdBasertPåAndreFritekstKulepunkter, lagInitiellFritekst } from '@utils/fritekstfelter';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import type { ISelectOptionMedBrevtekst } from './typer';
import { Brevmal } from './typer';

export interface BrevModulFormValues {
    mottakerIdent: string;
    brevmal: Brevmal | '';
    dokumenter: ISelectOptionMedBrevtekst[];
    fritekstKulepunkter: IFritekstFelt[];
    fritekstAvsnitt: string | undefined;
    barnMedDeltBosted: IBarnMedOpplysninger[];
    barnBrevetGjelder: IBarnMedOpplysninger[];
    avtalerOmDeltBostedPerBarn: Record<string, string[]>;
    datoAvtale: Date | undefined;
    antallUkerSvarfrist: number | '';
    mottakerlandSed: string[];
}

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

interface Props {
    onSubmitSuccess: () => void;
}

export const useBrevModul = ({ onSubmitSuccess }: Props) => {
    const fagsak = useFagsak();
    const { behandling, settÅpenBehandling } = useBehandlingContext();
    const { bruker } = useBrukerContext();

    const [visFritekstAvsnittTekstboks, settVisFritekstAvsnittTekstboks] = useState(false);

    const behandlingKategori = behandling?.kategori;

    const personer = behandling?.personer ?? [];
    const brevmottakere = behandling?.brevmottakere ?? [];
    const institusjon = fagsak.institusjon;

    const velgMottaker = (): string | undefined => {
        if (fagsak.fagsakType === FagsakType.INSTITUSJON && institusjon) {
            return institusjon.orgNummer;
        }
        if (fagsak.fagsakType === FagsakType.BARN_ENSLIG_MINDREÅRIG) {
            return personer[0].personIdent;
        }
        return personer.find(person => person.type === PersonType.SØKER)?.personIdent;
    };

    const hentBarnBrevetGjelder = (): IBarnMedOpplysninger[] =>
        personer
            .filter(person => person.type === PersonType.BARN)
            .map(
                (person: IGrunnlagPerson): IBarnMedOpplysninger => ({
                    ident: person.personIdent,
                    fødselsdato: person.fødselsdato,
                    navn: person.navn,
                    merket: false,
                    manueltRegistrert: false,
                    erFolkeregistrert: true,
                })
            );

    const form = useForm<BrevModulFormValues>({
        defaultValues: {
            mottakerIdent: velgMottaker() || '',
            brevmal: '',
            dokumenter: [],
            fritekstKulepunkter: [],
            fritekstAvsnitt: undefined,
            barnMedDeltBosted: [],
            barnBrevetGjelder: [],
            avtalerOmDeltBostedPerBarn: {},
            datoAvtale: undefined,
            antallUkerSvarfrist: behandlingKategori === BehandlingKategori.EØS ? 8 : 3,
            mottakerlandSed: [],
        },
    });

    const { watch, setValue, getValues, setError, reset } = form;

    const brevmalVerdi = watch('brevmal');
    const fritekstKulepunkterLength = watch('fritekstKulepunkter').length;

    /**
     * Nullstill enkelte felter i skjemaet ved oppdatering av åpenbehandling i staten.
     * Dette fordi at man kan ha gjort endring på målform
     */
    useEffect(() => {
        setValue('dokumenter', []);
        setValue('avtalerOmDeltBostedPerBarn', {});
        setValue('barnMedDeltBosted', hentBarnMedOpplysningerFraBruker(bruker));
        setValue('barnBrevetGjelder', hentBarnBrevetGjelder());
    }, [behandling]);

    /**
     * Nullstill relevante felter når brevmal endres. Vi bruker reset (fremfor setValue) slik at
     * innsendt-tilstanden og eventuelle valideringsfeil også nullstilles. Ellers ville feilmeldinger
     * fra en tidligere innsending/forhåndsvisning blitt vist umiddelbart på de tomme feltene i den nye brevmalen.
     */
    useEffect(() => {
        reset({
            ...getValues(),
            dokumenter: [],
            fritekstKulepunkter: [],
            fritekstAvsnitt: undefined,
            datoAvtale: undefined,
            antallUkerSvarfrist: behandlingKategori === BehandlingKategori.EØS ? 8 : 3,
            avtalerOmDeltBostedPerBarn: {},
            barnMedDeltBosted: hentBarnMedOpplysningerFraBruker(bruker),
            mottakerlandSed: [],
            barnBrevetGjelder: hentBarnBrevetGjelder(),
        });
    }, [brevmalVerdi]);

    const leggTilFritekstKulepunkt = (valideringsmelding?: string) => {
        const fritekstKulepunkter = getValues('fritekstKulepunkter');
        setValue('fritekstKulepunkter', [
            ...fritekstKulepunkter,
            lagInitiellFritekst('', genererIdBasertPåAndreFritekstKulepunkter(fritekstKulepunkter), valideringsmelding),
        ]);
    };

    /**
     * Legger til initielt fritekstpunkt for brevmaler med obligatorisk fritekst
     */
    useEffect(() => {
        if (
            fritekstKulepunkterLength === 0 &&
            brevmalVerdi !== '' &&
            erBrevmalMedObligatoriskFritekstKulepunkt(brevmalVerdi)
        ) {
            const valideringsmelding = 'Dette kulepunktet er obligatorisk. Du må skrive tekst i feltet.';
            leggTilFritekstKulepunkt(valideringsmelding);
        }
    }, [brevmalVerdi, fritekstKulepunkterLength]);

    const mottakersMålform = (mottakerIdent: string): Målform =>
        mottakersMålformImplementering(
            personer,
            mottakerIdent.length >= 1 ? Valideringsstatus.OK : Valideringsstatus.IKKE_VALIDERT,
            mottakerIdent
        );

    const hentMuligeBrevMaler = (): Brevmal[] => hentMuligeBrevmalerImplementering(behandling, !!institusjon);

    const hentVarselOmRevurderingDeltBostedSkjemaData = (
        values: BrevModulFormValues
    ): IManueltBrevRequestPåBehandling => {
        const merkedeBarn = values.barnMedDeltBosted.filter(barn => barn.merket);

        return {
            multiselectVerdier: merkedeBarn.flatMap(barn =>
                hentDeltBostedMulitiselectVerdierForBarn(barn, values.avtalerOmDeltBostedPerBarn)
            ),
            barnIBrev: merkedeBarn.map(barn => barn.ident),
            brevmal: Brevmal.VARSEL_OM_REVURDERING_DELT_BOSTED_PARAGRAF_14,
            behandlingKategori,
            antallUkerSvarfrist: Number(values.antallUkerSvarfrist),
        };
    };

    const hentSkjemaData = (values: BrevModulFormValues): IManueltBrevRequestPåBehandling => {
        const erVarselOmRevurderingDeltBosted =
            values.brevmal === Brevmal.VARSEL_OM_REVURDERING_DELT_BOSTED_PARAGRAF_14;

        if (erVarselOmRevurderingDeltBosted) {
            return hentVarselOmRevurderingDeltBostedSkjemaData(values);
        } else {
            const multiselectVerdier = [
                ...values.dokumenter.map((selectOption: ISelectOptionMedBrevtekst) => {
                    if (selectOption.brevtekst) {
                        return selectOption.brevtekst[mottakersMålform(values.mottakerIdent)];
                    } else {
                        return selectOption.value;
                    }
                }),
                ...values.fritekstKulepunkter.map(fritekst => fritekst.tekst),
            ];

            const barnBrevetGjelder = values.barnBrevetGjelder.filter(barn => barn.merket);

            return {
                multiselectVerdier: multiselectVerdier,
                brevmal: values.brevmal as Brevmal,
                barnIBrev: [],
                barnasFødselsdager: barnBrevetGjelder.map(barn => barn.fødselsdato || ''),
                datoAvtale: dateTilIsoDatoStringEllerUndefined(values.datoAvtale),
                behandlingKategori,
                antallUkerSvarfrist: Number(values.antallUkerSvarfrist),
                mottakerMålform: mottakersMålform(values.mottakerIdent),
                mottakerlandSed: values.mottakerlandSed,
                fritekstAvsnitt: values.fritekstAvsnitt,
            };
        }
    };

    const { mutateAsync: sendBrev } = useSendBehandlingBrev(behandling.behandlingId);

    const onSubmit = async (values: BrevModulFormValues) => {
        try {
            const oppdatertBehandling = await sendBrev(hentSkjemaData(values));
            onSubmitSuccess();
            settÅpenBehandling(byggSuksessRessurs(oppdatertBehandling));
        } catch (error) {
            const message = error instanceof Error ? error.message : 'En ukjent feil oppstod.';
            setError('root', { message });
        }
    };

    return {
        form,
        onSubmit,
        hentSkjemaData,
        hentMuligeBrevMaler,
        mottakersMålform,
        leggTilFritekstKulepunkt,
        institusjon,
        brevmottakere,
        visFritekstAvsnittTekstboks,
        settVisFritekstAvsnittTekstboks,
    };
};
