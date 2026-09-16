import { useBruker } from '@hooks/useBruker';
import { useFagsak } from '@hooks/useFagsak';
import { useSendBehandlingBrev } from '@hooks/useSendBehandlingBrev';
import type { Regionkode } from '@komponenter/FlaggCombobox';
import { byggSuksessRessurs } from '@navikt/familie-typer';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import type { IBehandling } from '@typer/behandling';
import { BehandlingKategori } from '@typer/behandlingstema';
import type { IManueltBrevRequestPåBehandling } from '@typer/dokument';
import type { IMinimalFagsak } from '@typer/fagsak';
import { FagsakType } from '@typer/fagsak';
import type { IGrunnlagPerson, IPersonInfo } from '@typer/person';
import { PersonType } from '@typer/person';
import type { IBarnMedOpplysninger } from '@typer/søknad';
import type { IsoDatoString } from '@utils/dato';
import { Datoformat, dateTilIsoDatoStringEllerUndefined, isoStringTilFormatertString } from '@utils/dato';
import { hentBarnMedOpplysningerFraBruker } from '@utils/deltBostedSkjemaFelter';
import { useForm } from 'react-hook-form';
import type { ISelectOptionMedBrevtekst } from './typer';
import { Brevmal } from './typer';
import { hentMottakersMålform } from './useMottakersMålform';

export enum SendManueltBrevFeltnavn {
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

export interface SendManueltBrevFormValues {
    [SendManueltBrevFeltnavn.MOTTAKER_IDENT]: string;
    [SendManueltBrevFeltnavn.BREVMAL]: Brevmal | '';
    [SendManueltBrevFeltnavn.DOKUMENTER]: ISelectOptionMedBrevtekst[];
    [SendManueltBrevFeltnavn.FRITEKST_KULEPUNKTER]: FritekstKulepunkt[];
    [SendManueltBrevFeltnavn.FRITEKST_AVSNITT]: string | null;
    [SendManueltBrevFeltnavn.BARN_MED_DELT_BOSTED]: BarnMedDeltBosted[];
    [SendManueltBrevFeltnavn.BARN_BREVET_GJELDER]: IBarnMedOpplysninger[];
    [SendManueltBrevFeltnavn.DATO_AVTALE]: Date | null;
    [SendManueltBrevFeltnavn.ANTALL_UKER_SVARFRIST]: number | '';
    [SendManueltBrevFeltnavn.MOTTAKERLAND_SED]: Regionkode[];
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

export const sendManueltBrevSkjemaStandardverdier = (
    behandling: IBehandling,
    fagsak: IMinimalFagsak,
    bruker: IPersonInfo
): SendManueltBrevFormValues => {
    const personer = behandling.personer;

    return {
        [SendManueltBrevFeltnavn.MOTTAKER_IDENT]: velgMottaker(fagsak, personer) ?? '',
        [SendManueltBrevFeltnavn.BREVMAL]: '',
        [SendManueltBrevFeltnavn.DOKUMENTER]: [],
        [SendManueltBrevFeltnavn.FRITEKST_KULEPUNKTER]: [],
        [SendManueltBrevFeltnavn.FRITEKST_AVSNITT]: null,
        [SendManueltBrevFeltnavn.BARN_MED_DELT_BOSTED]: hentBarnMedDeltBosted(bruker),
        [SendManueltBrevFeltnavn.BARN_BREVET_GJELDER]: hentBarnBrevetGjelder(personer),
        [SendManueltBrevFeltnavn.DATO_AVTALE]: null,
        [SendManueltBrevFeltnavn.ANTALL_UKER_SVARFRIST]: behandling.kategori === BehandlingKategori.EØS ? 8 : 3,
        [SendManueltBrevFeltnavn.MOTTAKERLAND_SED]: [],
    };
};

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

export const useSendManueltBrevForm = ({ onSubmitSuccess }: Props) => {
    const fagsak = useFagsak();
    const { behandling, settÅpenBehandling } = useBehandlingContext();
    const bruker = useBruker();

    const personer = behandling.personer;

    const form = useForm<SendManueltBrevFormValues>({
        values: sendManueltBrevSkjemaStandardverdier(behandling, fagsak, bruker),
        resetOptions: {
            keepDirtyValues: true,
        },
    });

    const { setError } = form;

    const hentVarselOmRevurderingDeltBostedSkjemaData = (
        values: SendManueltBrevFormValues
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

    const hentSkjemaData = (values: SendManueltBrevFormValues): IManueltBrevRequestPåBehandling => {
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

    const onSubmit = async (values: SendManueltBrevFormValues) => {
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
    };
};
