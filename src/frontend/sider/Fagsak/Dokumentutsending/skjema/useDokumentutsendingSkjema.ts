import { useBruker } from '@hooks/useBruker';
import { useOnFormSubmitSuccessful } from '@hooks/useOnFormSubmitSuccessful';
import type { IPersonInfo } from '@typer/person';
import { ForelderBarnRelasjonRolle } from '@typer/person';
import type { IBarnMedOpplysninger, Målform } from '@typer/søknad';
import type { IsoDatoString } from '@utils/dato';
import { useForm } from 'react-hook-form';

import type { DokumentÅrsak } from '../dokumentÅrsakTyper';

export enum DokumentutsendingFeltnavn {
    ÅRSAK = 'årsak',
    MÅLFORM = 'målform',
    FRITEKSTER = 'fritekster',
    FRITEKST_AVSNITT = 'fritekstAvsnitt',
    DOKUMENTER = 'dokumenter',
    VALGTE_BARN = 'valgteBarn',
    AVTALER_OM_DELT_BOSTED_PER_BARN = 'avtalerOmDeltBostedPerBarn',
}

export interface DokumentutsendingFritekst {
    tekst: string;
}

export interface DokumentutsendingAvtaleDato {
    dato: IsoDatoString;
}

export interface DokumentutsendingFormValues {
    [DokumentutsendingFeltnavn.ÅRSAK]: DokumentÅrsak | '';
    [DokumentutsendingFeltnavn.MÅLFORM]: Målform | undefined;
    [DokumentutsendingFeltnavn.FRITEKSTER]: DokumentutsendingFritekst[];
    [DokumentutsendingFeltnavn.FRITEKST_AVSNITT]: string;
    [DokumentutsendingFeltnavn.DOKUMENTER]: string[];
    [DokumentutsendingFeltnavn.VALGTE_BARN]: IBarnMedOpplysninger[];
    [DokumentutsendingFeltnavn.AVTALER_OM_DELT_BOSTED_PER_BARN]: Record<string, DokumentutsendingAvtaleDato[]>;
}

const hentBarnMedOpplysningerFraBruker = (bruker: IPersonInfo): IBarnMedOpplysninger[] =>
    bruker.forelderBarnRelasjon
        .filter(relasjon => relasjon.relasjonRolle === ForelderBarnRelasjonRolle.BARN)
        .map(
            (relasjon): IBarnMedOpplysninger => ({
                merket: false,
                ident: relasjon.personIdent,
                navn: relasjon.navn,
                fødselsdato: relasjon.fødselsdato,
                manueltRegistrert: false,
                erFolkeregistrert: true,
            })
        );

const dokumentutsendingSkjemaStandardverdier = (bruker: IPersonInfo): DokumentutsendingFormValues => ({
    [DokumentutsendingFeltnavn.ÅRSAK]: '',
    [DokumentutsendingFeltnavn.MÅLFORM]: undefined,
    [DokumentutsendingFeltnavn.FRITEKSTER]: [],
    [DokumentutsendingFeltnavn.FRITEKST_AVSNITT]: '',
    [DokumentutsendingFeltnavn.DOKUMENTER]: [],
    [DokumentutsendingFeltnavn.VALGTE_BARN]: hentBarnMedOpplysningerFraBruker(bruker),
    [DokumentutsendingFeltnavn.AVTALER_OM_DELT_BOSTED_PER_BARN]: {},
});

export function useDokumentutsendingSkjema() {
    const bruker = useBruker();

    const form = useForm<DokumentutsendingFormValues>({
        defaultValues: dokumentutsendingSkjemaStandardverdier(bruker),
    });

    const { reset, control } = form;

    useOnFormSubmitSuccessful(control, reset);

    const nullstillSkjemaMedÅrsak = (årsak: DokumentÅrsak | '') =>
        reset({
            ...dokumentutsendingSkjemaStandardverdier(bruker),
            [DokumentutsendingFeltnavn.ÅRSAK]: årsak,
        });

    return {
        ...form,
        nullstillSkjemaMedÅrsak,
    };
}
