import type { PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

import { useBruker } from '@hooks/useBruker';
import { useFagsak } from '@hooks/useFagsak';
import { useForhåndsvisBrevPåFagsak } from '@hooks/useForhåndsvisBrevPåFagsak';
import { useSendInformasjonsbrev } from '@hooks/useSendInformasjonsbrev';
import { Mottaker } from '@komponenter/Saklinje/Meny/LeggTilEllerFjernBrevmottakere/useBrevmottakerSkjema';
import type { IManueltBrevRequestPåFagsak } from '@typer/dokument';
import { Distribusjonskanal } from '@typer/dokument';
import deepEqual from 'deep-equal';
import { FormProvider, useWatch } from 'react-hook-form';

import { useManuelleBrevmottakerePåFagsakContext } from '../ManuelleBrevmottakerePåFagsakContext';
import { transformerSkjemaData } from './skjema/transformerSkjemaData';
import {
    DokumentutsendingFeltnavn,
    type DokumentutsendingFormValues,
    useDokumentutsendingSkjema,
} from './skjema/useDokumentutsendingSkjema';

interface DokumentutsendingContextValue {
    forhåndsvisningUrl: string | undefined;
    forhåndsvisningLaster: boolean;
    hentForhåndsvisning: () => void;
    visForhåndsvisningBeskjed: () => boolean;
    sendBrev: (skjemaverdier: DokumentutsendingFormValues) => void;
    senderBrev: boolean;
    skjemaErLåst: boolean;
    skjemaFeilmelding: string | undefined;
    visInnsendtBrevModal: boolean;
    settVisInnsendtBrevModal: (vis: boolean) => void;
    brukerHarUtenlandskAdresse: boolean;
    brukerHarUkjentAdresse: boolean;
    distribusjonskanal: Distribusjonskanal;
}

const DokumentutsendingContext = createContext<DokumentutsendingContextValue | undefined>(undefined);

interface Props extends PropsWithChildren {
    distribusjonskanal: Distribusjonskanal;
}

export function DokumentutsendingProvider({ distribusjonskanal, children }: Props) {
    const fagsak = useFagsak();
    const bruker = useBruker();
    const { manuelleBrevmottakerePåFagsak, settManuelleBrevmottakerePåFagsak } =
        useManuelleBrevmottakerePåFagsakContext();

    const skjema = useDokumentutsendingSkjema();
    const { control, getValues, nullstillSkjemaMedÅrsak, trigger } = skjema;

    const [visInnsendtBrevModal, settVisInnsendtBrevModal] = useState(false);
    const [sistForhåndsvisteData, settSistForhåndsvisteData] = useState<IManueltBrevRequestPåFagsak | undefined>(
        undefined
    );

    const {
        mutate: forhåndsvisBrev,
        data: forhåndsvisningUrl,
        isPending: forhåndsvisningLaster,
        error: forhåndsvisningError,
    } = useForhåndsvisBrevPåFagsak(fagsak.id);

    const {
        mutateAsync: sendInformasjonsbrev,
        isPending: senderBrev,
        error: sendBrevError,
    } = useSendInformasjonsbrev(fagsak.id);

    const årsak = useWatch({ control, name: DokumentutsendingFeltnavn.ÅRSAK });
    const forrigeÅrsakRef = useRef(årsak);
    const forrigeBrukerRef = useRef(bruker);

    useEffect(() => {
        if (forrigeÅrsakRef.current === årsak && forrigeBrukerRef.current === bruker) {
            return;
        }
        forrigeÅrsakRef.current = årsak;
        forrigeBrukerRef.current = bruker;
        nullstillSkjemaMedÅrsak(årsak);
        settSistForhåndsvisteData(undefined);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [årsak, bruker]);

    const byggBrevRequest = (): IManueltBrevRequestPåFagsak =>
        transformerSkjemaData({ skjemaverdier: getValues(), manuelleBrevmottakerePåFagsak });

    const hentForhåndsvisning = () =>
        trigger().then(skjemaErGyldig => {
            if (skjemaErGyldig) {
                const brevRequest = byggBrevRequest();
                settSistForhåndsvisteData(brevRequest);
                forhåndsvisBrev(brevRequest);
            }
        });

    const sendBrev = (skjemaverdier: DokumentutsendingFormValues) =>
        sendInformasjonsbrev(transformerSkjemaData({ skjemaverdier, manuelleBrevmottakerePåFagsak })).then(() => {
            settVisInnsendtBrevModal(true);
            settManuelleBrevmottakerePåFagsak([]);
            settSistForhåndsvisteData(undefined);
        });

    const visForhåndsvisningBeskjed = () => {
        if (!getValues(DokumentutsendingFeltnavn.ÅRSAK)) {
            return false;
        }
        return !deepEqual(byggBrevRequest(), sistForhåndsvisteData);
    };

    const brukerHarUtenlandskAdresse = manuelleBrevmottakerePåFagsak.some(
        mottaker => mottaker.type === Mottaker.BRUKER_MED_UTENLANDSK_ADRESSE
    );

    const brukerHarUkjentAdresse =
        !brukerHarUtenlandskAdresse &&
        (distribusjonskanal === Distribusjonskanal.UKJENT ||
            distribusjonskanal === Distribusjonskanal.INGEN_DISTRIBUSJON);

    return (
        <FormProvider {...skjema}>
            <DokumentutsendingContext.Provider
                value={{
                    forhåndsvisningUrl,
                    forhåndsvisningLaster,
                    hentForhåndsvisning,
                    visForhåndsvisningBeskjed,
                    sendBrev,
                    senderBrev,
                    skjemaErLåst: senderBrev || forhåndsvisningLaster,
                    skjemaFeilmelding: forhåndsvisningError?.message ?? sendBrevError?.message,
                    visInnsendtBrevModal,
                    settVisInnsendtBrevModal,
                    brukerHarUtenlandskAdresse,
                    brukerHarUkjentAdresse,
                    distribusjonskanal,
                }}
            >
                {children}
            </DokumentutsendingContext.Provider>
        </FormProvider>
    );
}

export function useDokumentutsendingContext() {
    const context = useContext(DokumentutsendingContext);
    if (context === undefined) {
        throw new Error('useDokumentutsendingContext må brukes innenfor en DokumentutsendingProvider');
    }
    return context;
}
