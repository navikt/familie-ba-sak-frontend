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
import { erBrevmalMedObligatoriskFritekstKulepunkt } from './brevmalRegler';
import type { ISelectOptionMedBrevtekst } from './typer';
import { Brevmal } from './typer';

export enum BrevmodulFeltnavn {
    MOTTAKER_IDENT = 'mottakerIdent',
    BREVMAL = 'brevmal',
    DOKUMENTER = 'dokumenter',
    FRITEKST_KULEPUNKTER = 'fritekstKulepunkter',
    FRITEKST_AVSNITT = 'fritekstAvsnitt',
    BARN_MED_DELT_BOSTED = 'barnMedDeltBosted',
    BARN_BREVET_GJELDER = 'barnBrevetGjelder',
    AVTALER_OM_DELT_BOSTED_PER_BARN = 'avtalerOmDeltBostedPerBarn',
    DATO_AVTALE = 'datoAvtale',
    ANTALL_UKER_SVARFRIST = 'antallUkerSvarfrist',
    MOTTAKERLAND_SED = 'mottakerlandSed',
}

export interface BrevModulFormValues {
    [BrevmodulFeltnavn.MOTTAKER_IDENT]: string;
    [BrevmodulFeltnavn.BREVMAL]: Brevmal | '';
    [BrevmodulFeltnavn.DOKUMENTER]: ISelectOptionMedBrevtekst[];
    [BrevmodulFeltnavn.FRITEKST_KULEPUNKTER]: IFritekstFelt[];
    [BrevmodulFeltnavn.FRITEKST_AVSNITT]: string | undefined;
    [BrevmodulFeltnavn.BARN_MED_DELT_BOSTED]: IBarnMedOpplysninger[];
    [BrevmodulFeltnavn.BARN_BREVET_GJELDER]: IBarnMedOpplysninger[];
    [BrevmodulFeltnavn.AVTALER_OM_DELT_BOSTED_PER_BARN]: Record<string, string[]>;
    [BrevmodulFeltnavn.DATO_AVTALE]: Date | undefined;
    [BrevmodulFeltnavn.ANTALL_UKER_SVARFRIST]: number | '';
    [BrevmodulFeltnavn.MOTTAKERLAND_SED]: string[];
}

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
            [BrevmodulFeltnavn.MOTTAKER_IDENT]: velgMottaker() || '',
            [BrevmodulFeltnavn.BREVMAL]: '',
            [BrevmodulFeltnavn.DOKUMENTER]: [],
            [BrevmodulFeltnavn.FRITEKST_KULEPUNKTER]: [],
            [BrevmodulFeltnavn.FRITEKST_AVSNITT]: undefined,
            [BrevmodulFeltnavn.BARN_MED_DELT_BOSTED]: [],
            [BrevmodulFeltnavn.BARN_BREVET_GJELDER]: [],
            [BrevmodulFeltnavn.AVTALER_OM_DELT_BOSTED_PER_BARN]: {},
            [BrevmodulFeltnavn.DATO_AVTALE]: undefined,
            [BrevmodulFeltnavn.ANTALL_UKER_SVARFRIST]: behandlingKategori === BehandlingKategori.EØS ? 8 : 3,
            [BrevmodulFeltnavn.MOTTAKERLAND_SED]: [],
        },
    });

    const { setValue, getValues, setError, reset } = form;

    /**
     * Nullstill enkelte felter i skjemaet ved oppdatering av åpenbehandling i staten.
     * Dette fordi at man kan ha gjort endring på målform
     */
    useEffect(() => {
        setValue(BrevmodulFeltnavn.DOKUMENTER, []);
        setValue(BrevmodulFeltnavn.AVTALER_OM_DELT_BOSTED_PER_BARN, {});
        setValue(BrevmodulFeltnavn.BARN_MED_DELT_BOSTED, hentBarnMedOpplysningerFraBruker(bruker));
        setValue(BrevmodulFeltnavn.BARN_BREVET_GJELDER, hentBarnBrevetGjelder());
    }, [behandling]);

    const leggTilFritekstKulepunkt = (valideringsmelding?: string) => {
        const fritekstKulepunkter = getValues(BrevmodulFeltnavn.FRITEKST_KULEPUNKTER);
        setValue(BrevmodulFeltnavn.FRITEKST_KULEPUNKTER, [
            ...fritekstKulepunkter,
            lagInitiellFritekst('', genererIdBasertPåAndreFritekstKulepunkter(fritekstKulepunkter), valideringsmelding),
        ]);
    };

    /**
     * Nullstiller relevante felter når brevmal endres, og legger til et initielt obligatorisk
     * fritekstpunkt for brevmaler som krever det. Vi bruker reset (fremfor setValue) slik at
     * innsendt-tilstanden og eventuelle valideringsfeil også nullstilles. Ellers ville feilmeldinger
     * fra en tidligere innsending/forhåndsvisning blitt vist umiddelbart på de tomme feltene i den nye brevmalen.
     */
    const onEndreBrevmal = (nyBrevmal: Brevmal | '') => {
        reset({
            ...getValues(),
            [BrevmodulFeltnavn.BREVMAL]: nyBrevmal,
            [BrevmodulFeltnavn.DOKUMENTER]: [],
            [BrevmodulFeltnavn.FRITEKST_KULEPUNKTER]: [],
            [BrevmodulFeltnavn.FRITEKST_AVSNITT]: undefined,
            [BrevmodulFeltnavn.DATO_AVTALE]: undefined,
            [BrevmodulFeltnavn.ANTALL_UKER_SVARFRIST]: behandlingKategori === BehandlingKategori.EØS ? 8 : 3,
            [BrevmodulFeltnavn.AVTALER_OM_DELT_BOSTED_PER_BARN]: {},
            [BrevmodulFeltnavn.BARN_MED_DELT_BOSTED]: hentBarnMedOpplysningerFraBruker(bruker),
            [BrevmodulFeltnavn.MOTTAKERLAND_SED]: [],
            [BrevmodulFeltnavn.BARN_BREVET_GJELDER]: hentBarnBrevetGjelder(),
        });

        if (nyBrevmal !== '' && erBrevmalMedObligatoriskFritekstKulepunkt(nyBrevmal)) {
            leggTilFritekstKulepunkt('Dette kulepunktet er obligatorisk. Du må skrive tekst i feltet.');
        }
    };

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
        onEndreBrevmal,
        mottakersMålform,
        leggTilFritekstKulepunkt,
        institusjon,
        brevmottakere,
        visFritekstAvsnittTekstboks,
        settVisFritekstAvsnittTekstboks,
    };
};
