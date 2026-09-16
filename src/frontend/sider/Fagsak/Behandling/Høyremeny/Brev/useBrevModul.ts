import { useBehandling } from '@hooks/useBehandling';
import { useBruker } from '@hooks/useBruker';
import { useFagsak } from '@hooks/useFagsak';
import { useSendBehandlingBrev } from '@hooks/useSendBehandlingBrev';
import { Valideringsstatus } from '@navikt/familie-skjema';
import { byggSuksessRessurs } from '@navikt/familie-typer';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import type { IBehandling } from '@typer/behandling';
import { BehandlingKategori } from '@typer/behandlingstema';
import type { IManueltBrevRequestPåBehandling } from '@typer/dokument';
import type { IMinimalFagsak } from '@typer/fagsak';
import { FagsakType } from '@typer/fagsak';
import type { IGrunnlagPerson, IPersonInfo } from '@typer/person';
import { PersonType } from '@typer/person';
import type { IBarnMedOpplysninger, Målform } from '@typer/søknad';
import { hentMuligeBrevmalerImplementering, mottakersMålformImplementering } from '@utils/brevmal';
import type { IsoDatoString } from '@utils/dato';
import { Datoformat, dateTilIsoDatoStringEllerUndefined, isoStringTilFormatertString } from '@utils/dato';
import { hentBarnMedOpplysningerFraBruker } from '@utils/deltBostedSkjemaFelter';
import { useEffect } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
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
    DATO_AVTALE = 'datoAvtale',
    ANTALL_UKER_SVARFRIST = 'antallUkerSvarfrist',
    MOTTAKERLAND_SED = 'mottakerlandSed',
}

export interface BrevAvtaleOmDeltBosted {
    dato: IsoDatoString;
}

export interface FritekstKulepunkt {
    tekst: string;
    valideringsmelding?: string;
}

export type BarnMedDeltBosted = IBarnMedOpplysninger & {
    avtalerOmDeltBosted: BrevAvtaleOmDeltBosted[];
};

export interface BrevModulFormValues {
    [BrevmodulFeltnavn.MOTTAKER_IDENT]: string;
    [BrevmodulFeltnavn.BREVMAL]: Brevmal | '';
    [BrevmodulFeltnavn.DOKUMENTER]: ISelectOptionMedBrevtekst[];
    [BrevmodulFeltnavn.FRITEKST_KULEPUNKTER]: FritekstKulepunkt[];
    [BrevmodulFeltnavn.FRITEKST_AVSNITT]: string | null;
    [BrevmodulFeltnavn.BARN_MED_DELT_BOSTED]: BarnMedDeltBosted[];
    [BrevmodulFeltnavn.BARN_BREVET_GJELDER]: IBarnMedOpplysninger[];
    [BrevmodulFeltnavn.DATO_AVTALE]: Date | null;
    [BrevmodulFeltnavn.ANTALL_UKER_SVARFRIST]: number | '';
    [BrevmodulFeltnavn.MOTTAKERLAND_SED]: string[];
}

const velgMottaker = (fagsak: IMinimalFagsak, personer: IGrunnlagPerson[]): string | undefined => {
    if (fagsak.fagsakType === FagsakType.INSTITUSJON && fagsak.institusjon) {
        return fagsak.institusjon.orgNummer;
    }
    if (fagsak.fagsakType === FagsakType.BARN_ENSLIG_MINDREÅRIG) {
        return personer[0]?.personIdent;
    }
    return personer.find(person => person.type === PersonType.SØKER)?.personIdent;
};

const hentBarnBrevetGjelder = (personer: IGrunnlagPerson[]): IBarnMedOpplysninger[] =>
    personer
        .filter(person => person.type === PersonType.BARN)
        .map(
            (person): IBarnMedOpplysninger => ({
                ident: person.personIdent,
                fødselsdato: person.fødselsdato,
                navn: person.navn,
                merket: false,
                manueltRegistrert: false,
                erFolkeregistrert: true,
            })
        );

const hentBarnMedDeltBosted = (bruker: IPersonInfo): BarnMedDeltBosted[] =>
    hentBarnMedOpplysningerFraBruker(bruker).map(barn => ({ ...barn, avtalerOmDeltBosted: [] }));

export const brevModulSkjemaStandardverdier = (
    behandling: IBehandling,
    fagsak: IMinimalFagsak,
    bruker: IPersonInfo
): BrevModulFormValues => {
    const personer = behandling.personer ?? [];

    return {
        [BrevmodulFeltnavn.MOTTAKER_IDENT]: velgMottaker(fagsak, personer) ?? '',
        [BrevmodulFeltnavn.BREVMAL]: '',
        [BrevmodulFeltnavn.DOKUMENTER]: [],
        [BrevmodulFeltnavn.FRITEKST_KULEPUNKTER]: [],
        [BrevmodulFeltnavn.FRITEKST_AVSNITT]: null,
        [BrevmodulFeltnavn.BARN_MED_DELT_BOSTED]: hentBarnMedDeltBosted(bruker),
        [BrevmodulFeltnavn.BARN_BREVET_GJELDER]: hentBarnBrevetGjelder(personer),
        [BrevmodulFeltnavn.DATO_AVTALE]: null,
        [BrevmodulFeltnavn.ANTALL_UKER_SVARFRIST]: behandling.kategori === BehandlingKategori.EØS ? 8 : 3,
        [BrevmodulFeltnavn.MOTTAKERLAND_SED]: [],
    };
};

const hentMottakersMålform = (personer: IGrunnlagPerson[], mottakerIdent: string): Målform =>
    mottakersMålformImplementering(
        personer,
        mottakerIdent.length >= 1 ? Valideringsstatus.OK : Valideringsstatus.IKKE_VALIDERT,
        mottakerIdent
    );

export function useMottakersMålform(): Målform {
    const behandling = useBehandling();
    const { watch } = useFormContext<BrevModulFormValues>();
    const mottakerIdent = watch(BrevmodulFeltnavn.MOTTAKER_IDENT);
    return hentMottakersMålform(behandling.personer ?? [], mottakerIdent);
}

const hentDeltBostedMultiselectVerdierForBarn = (barn: BarnMedDeltBosted): string[] =>
    barn.avtalerOmDeltBosted.map(
        avtale =>
            `Barn født ${isoStringTilFormatertString({
                isoString: barn.fødselsdato,
                tilFormat: Datoformat.DATO,
            })}. Avtalen gjelder fra ${isoStringTilFormatertString({
                isoString: avtale.dato,
                tilFormat: Datoformat.DATO_FORLENGET,
            })}.`
    );

interface Props {
    onSubmitSuccess: () => void;
}

export const useBrevModul = ({ onSubmitSuccess }: Props) => {
    const fagsak = useFagsak();
    const { behandling, settÅpenBehandling } = useBehandlingContext();
    const bruker = useBruker();

    const personer = behandling.personer ?? [];
    const brevmottakere = behandling.brevmottakere ?? [];
    const institusjon = fagsak.institusjon;

    const form = useForm<BrevModulFormValues>({
        defaultValues: brevModulSkjemaStandardverdier(behandling, fagsak, bruker),
    });

    const { setValue, setError } = form;

    /**
     * Nullstill enkelte felter i skjemaet ved oppdatering av åpenbehandling i staten.
     * Dette fordi at man kan ha gjort endring på målform.
     */
    // biome-ignore lint/correctness/useExhaustiveDependencies: skal kun kjøre når behandlingen endres
    useEffect(() => {
        setValue(BrevmodulFeltnavn.DOKUMENTER, []);
        setValue(BrevmodulFeltnavn.BARN_MED_DELT_BOSTED, hentBarnMedDeltBosted(bruker));
        setValue(BrevmodulFeltnavn.BARN_BREVET_GJELDER, hentBarnBrevetGjelder(personer));
    }, [behandling]);

    const hentMuligeBrevMaler = (): Brevmal[] => hentMuligeBrevmalerImplementering(behandling, !!institusjon);

    const hentVarselOmRevurderingDeltBostedSkjemaData = (
        values: BrevModulFormValues
    ): IManueltBrevRequestPåBehandling => {
        const merkedeBarn = values.barnMedDeltBosted.filter(barn => barn.merket);

        return {
            multiselectVerdier: merkedeBarn.flatMap(barn => hentDeltBostedMultiselectVerdierForBarn(barn)),
            barnIBrev: merkedeBarn.map(barn => barn.ident),
            brevmal: Brevmal.VARSEL_OM_REVURDERING_DELT_BOSTED_PARAGRAF_14,
            behandlingKategori: behandling.kategori,
            antallUkerSvarfrist: Number(values.antallUkerSvarfrist),
        };
    };

    const hentSkjemaData = (values: BrevModulFormValues): IManueltBrevRequestPåBehandling => {
        const erVarselOmRevurderingDeltBosted =
            values.brevmal === Brevmal.VARSEL_OM_REVURDERING_DELT_BOSTED_PARAGRAF_14;

        if (erVarselOmRevurderingDeltBosted) {
            return hentVarselOmRevurderingDeltBostedSkjemaData(values);
        }

        const mottakerMålform = hentMottakersMålform(personer, values.mottakerIdent);

        const multiselectVerdier = [
            ...values.dokumenter.map((selectOption: ISelectOptionMedBrevtekst) =>
                selectOption.brevtekst ? selectOption.brevtekst[mottakerMålform] : selectOption.value
            ),
            ...values.fritekstKulepunkter.map(fritekst => fritekst.tekst),
        ];

        const barnBrevetGjelder = values.barnBrevetGjelder.filter(barn => barn.merket);

        return {
            multiselectVerdier: multiselectVerdier,
            brevmal: values.brevmal as Brevmal,
            barnIBrev: [],
            barnasFødselsdager: barnBrevetGjelder.map(barn => barn.fødselsdato || ''),
            datoAvtale: dateTilIsoDatoStringEllerUndefined(values.datoAvtale),
            behandlingKategori: behandling.kategori,
            antallUkerSvarfrist: Number(values.antallUkerSvarfrist),
            mottakerMålform: mottakerMålform,
            mottakerlandSed: values.mottakerlandSed,
            fritekstAvsnitt: values.fritekstAvsnitt ?? undefined,
        };
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
        brevmottakere,
    };
};
