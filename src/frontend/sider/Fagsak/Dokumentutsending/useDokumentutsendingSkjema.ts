import { useBruker } from '@hooks/useBruker';
import { useFagsak } from '@hooks/useFagsak';
import { useForhåndsvisBrevPåFagsak } from '@hooks/useForhåndsvisBrevPåFagsak';
import { useOnFormSubmitSuccessful } from '@hooks/useOnFormSubmitSuccessful';
import { useSendInformasjonsbrev } from '@hooks/useSendInformasjonsbrev';
import type { DokumentÅrsak } from '@sider/Fagsak/Dokumentutsending/dokumentÅrsakTyper';
import { useManuelleBrevmottakerePåFagsakContext } from '@sider/Fagsak/ManuelleBrevmottakerePåFagsakContext';
import type { IManueltBrevRequestPåFagsak } from '@typer/dokument';
import type { IPersonInfo } from '@typer/person';
import { ForelderBarnRelasjonRolle } from '@typer/person';
import { type IBarnMedOpplysninger, Målform } from '@typer/søknad';
import type { IsoDatoString } from '@utils/dato';
import deepEqual from 'deep-equal';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { transformerSkjemaData } from './transformerSkjemaData';

export enum DokumentutsendingFeltnavn {
    ÅRSAK = 'årsak',
    MÅLFORM = 'målform',
    FRITEKSTER = 'fritekster',
    FRITEKST_AVSNITT = 'fritekstAvsnitt',
    DOKUMENTER = 'dokumenter',
    VALGTE_BARN = 'valgteBarn',
}

export interface DokumentutsendingFritekst {
    tekst: string;
}

export interface DokumentutsendingAvtaleDato {
    dato: IsoDatoString;
}

export type DokumentutsendingBarn = IBarnMedOpplysninger & {
    avtalerOmDeltBosted: DokumentutsendingAvtaleDato[];
};

export interface DokumentutsendingFormValues {
    [DokumentutsendingFeltnavn.ÅRSAK]: DokumentÅrsak | '';
    [DokumentutsendingFeltnavn.MÅLFORM]: Målform | null;
    [DokumentutsendingFeltnavn.FRITEKSTER]: DokumentutsendingFritekst[];
    [DokumentutsendingFeltnavn.FRITEKST_AVSNITT]: string;
    [DokumentutsendingFeltnavn.DOKUMENTER]: string[];
    [DokumentutsendingFeltnavn.VALGTE_BARN]: DokumentutsendingBarn[];
}

const hentBarnMedOpplysningerFraBruker = (bruker: IPersonInfo): DokumentutsendingBarn[] =>
    bruker.forelderBarnRelasjon
        .filter(relasjon => relasjon.relasjonRolle === ForelderBarnRelasjonRolle.BARN)
        .map(
            (relasjon): DokumentutsendingBarn => ({
                merket: false,
                ident: relasjon.personIdent,
                navn: relasjon.navn,
                fødselsdato: relasjon.fødselsdato,
                manueltRegistrert: false,
                erFolkeregistrert: true,
                avtalerOmDeltBosted: [],
            })
        );

export const dokumentutsendingSkjemaStandardverdier = (bruker: IPersonInfo): DokumentutsendingFormValues => ({
    [DokumentutsendingFeltnavn.ÅRSAK]: '',
    [DokumentutsendingFeltnavn.MÅLFORM]: Målform.NB,
    [DokumentutsendingFeltnavn.FRITEKSTER]: [],
    [DokumentutsendingFeltnavn.FRITEKST_AVSNITT]: '',
    [DokumentutsendingFeltnavn.DOKUMENTER]: [],
    [DokumentutsendingFeltnavn.VALGTE_BARN]: hentBarnMedOpplysningerFraBruker(bruker),
});

interface Props {
    åpneBrevSendtDialog: () => void;
    settForhåndsvisningUrl: (url: string) => void;
}

export function useDokumentutsendingSkjema({ åpneBrevSendtDialog, settForhåndsvisningUrl }: Props) {
    const bruker = useBruker();
    const fagsak = useFagsak();

    const { manuelleBrevmottakerePåFagsak, settManuelleBrevmottakerePåFagsak } =
        useManuelleBrevmottakerePåFagsakContext();

    const form = useForm<DokumentutsendingFormValues>({
        defaultValues: dokumentutsendingSkjemaStandardverdier(bruker),
    });

    const { getValues, trigger, reset, setError, control } = form;

    useWatch({ control });
    useOnFormSubmitSuccessful(control, () => reset(dokumentutsendingSkjemaStandardverdier(bruker)));

    const [sistForhåndsvisteBrevRequest, settSistForhåndsvisteBrevRequest] = useState<IManueltBrevRequestPåFagsak>();

    const { mutateAsync: forhåndsvisBrev, isPending: forhåndsvisningLaster } = useForhåndsvisBrevPåFagsak(fagsak.id);
    const { mutateAsync: sendInformasjonsbrev } = useSendInformasjonsbrev(fagsak.id);

    const byggBrevRequest = (skjemaverdier: DokumentutsendingFormValues) =>
        transformerSkjemaData({ skjemaverdier, manuelleBrevmottakerePåFagsak });

    const hentForhåndsvisning = () =>
        trigger().then(skjemaErGyldig => {
            if (skjemaErGyldig) {
                const skjemaverdier = getValues();
                const brevRequest = byggBrevRequest(skjemaverdier);
                forhåndsvisBrev(brevRequest)
                    .then(url => settForhåndsvisningUrl(url))
                    .then(() => settSistForhåndsvisteBrevRequest(brevRequest))
                    .catch(error => setError('root', { message: error.message }));
            }
        });

    const onSubmit = async (skjemaverdier: DokumentutsendingFormValues) => {
        return sendInformasjonsbrev(byggBrevRequest(skjemaverdier))
            .then(() => {
                åpneBrevSendtDialog();
                settManuelleBrevmottakerePåFagsak([]);
                settSistForhåndsvisteBrevRequest(undefined);
            })
            .catch(error => setError('root', { message: error.message }));
    };

    const skjemaverdier = getValues();
    const visForhåndsvisningBeskjed =
        !!skjemaverdier.årsak && !deepEqual(byggBrevRequest(skjemaverdier), sistForhåndsvisteBrevRequest);

    return {
        form,
        onSubmit,
        hentForhåndsvisning,
        forhåndsvisningLaster,
        visForhåndsvisningBeskjed,
    };
}
