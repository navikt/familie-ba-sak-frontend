import { useEffect, useState } from 'react';

import createUseContext from 'constate';
import deepEqual from 'deep-equal';

import { useHttp } from '@navikt/familie-http';
import { useFelt } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';

import useForhåndsvisning from '../hooks/useForhåndsvisning';
import { useDeltBostedSkjema } from '../komponenter/Fagsak/Dokumentutsending/DeltBosted/useDeltBostedSkjema';
import { hentEnkeltInformasjonsbrevRequest } from '../komponenter/Fagsak/Dokumentutsending/Informasjonsbrev/enkeltInformasjonsbrevUtils';
import { useKanSøkeSkjema } from '../komponenter/Fagsak/Dokumentutsending/KanSøke/useKanSøkeSkjema';
import { Informasjonsbrev } from '../komponenter/Felleskomponenter/Hendelsesoversikt/BrevModul/typer';
import { IManueltBrevRequestPåFagsak } from '../typer/dokument';
import { Målform } from '../typer/søknad';
import { hentFrontendFeilmelding } from '../utils/ressursUtils';
import { useFagsakRessurser } from './FagsakContext';

export enum DokumentÅrsak {
    DELT_BOSTED = 'DELT_BOSTED',
    FØDSEL_MINDREÅRIG = 'FØDSEL_MINDREÅRIG',
    FØDSEL_UMYNDIG = 'FØDSEL_UMYNDIG',
    KAN_SØKE = 'KAN_SØKE',
}

export const dokumentÅrsak: Record<DokumentÅrsak, string> = {
    DELT_BOSTED: 'Delt bosted',
    FØDSEL_MINDREÅRIG: 'Fødsel mindreårig',
    FØDSEL_UMYNDIG: 'Fødsel umyndig',
    KAN_SØKE: 'Kan søke',
};

export const [DokumentutsendingProvider, useDokumentutsending] = createUseContext(
    ({ fagsakId }: { fagsakId: number }) => {
        const { bruker } = useFagsakRessurser();
        const [visInnsendtBrevModal, settVisInnsendtBrevModal] = useState(false);
        const { hentForhåndsvisning, hentetForhåndsvisning } = useForhåndsvisning();

        const { request } = useHttp();

        const [sistBrukteDataVedForhåndsvisning, settSistBrukteDataVedForhåndsvisning] = useState<
            IManueltBrevRequestPåFagsak | undefined
        >(undefined);

        const {
            deltBostedSkjema,
            hentDeltBostedSkjemaData,
            nullstillDeltBostedSkjema,
            onDeltBostedSubmit,
            settVisfeilmeldingerDeltBosted,
        } = useDeltBostedSkjema();

        const {
            kanSøkeSkjema,
            hentKanSøkeSkjemaData,
            nullstillKanSøkeSkjema,
            onKanSøkeSubmit,
            settVisfeilmeldingerKanSøke,
        } = useKanSøkeSkjema();

        const årsakFelt = useFelt<DokumentÅrsak>({
            verdi: DokumentÅrsak.DELT_BOSTED,
        });

        const målformFelt = useFelt<Målform | undefined>({
            verdi: Målform.NB,
        });

        const nullstillSkjema = () => {
            målformFelt.nullstill();
            nullstillDeltBostedSkjema();
            nullstillKanSøkeSkjema();
            hentForhåndsvisningPåFagsak();
        };

        useEffect(() => {
            nullstillSkjema();
        }, [årsakFelt.verdi]);

        const hentSkjemaData = (): IManueltBrevRequestPåFagsak => {
            if (bruker.status === RessursStatus.SUKSESS) {
                switch (årsakFelt.verdi) {
                    case DokumentÅrsak.DELT_BOSTED:
                        return hentDeltBostedSkjemaData(målformFelt.verdi ?? Målform.NB);

                    case DokumentÅrsak.FØDSEL_MINDREÅRIG:
                        return hentEnkeltInformasjonsbrevRequest({
                            bruker: bruker,
                            målform: målformFelt.verdi ?? Målform.NB,
                            brevmal: Informasjonsbrev.INFORMASJONSBREV_FØDSEL_MINDREÅRIG,
                        });
                    case DokumentÅrsak.FØDSEL_UMYNDIG:
                        return hentEnkeltInformasjonsbrevRequest({
                            bruker: bruker,
                            målform: målformFelt.verdi ?? Målform.NB,
                            brevmal: Informasjonsbrev.INFORMASJONSBREV_FØDSEL_UMYNDIG,
                        });
                    case DokumentÅrsak.KAN_SØKE:
                        return hentKanSøkeSkjemaData(målformFelt.verdi ?? Målform.NB);
                }
            } else {
                throw Error('Bruker ikke hentet inn og vi kan ikke sende inn skjema');
            }
        };

        const skjemaErLåst = () => {
            switch (årsakFelt.verdi) {
                case DokumentÅrsak.DELT_BOSTED:
                    return (
                        deltBostedSkjema.submitRessurs.status === RessursStatus.HENTER ||
                        hentetForhåndsvisning.status === RessursStatus.HENTER
                    );
            }
            return hentetForhåndsvisning.status === RessursStatus.HENTER;
        };

        const senderBrev = () => {
            switch (årsakFelt.verdi) {
                case DokumentÅrsak.DELT_BOSTED:
                    return deltBostedSkjema.submitRessurs.status === RessursStatus.HENTER;
            }
        };

        const hentForhåndsvisningPåFagsak = () => {
            const skjemaData = hentSkjemaData();
            settSistBrukteDataVedForhåndsvisning(skjemaData);
            hentForhåndsvisning<IManueltBrevRequestPåFagsak>({
                method: 'POST',
                data: skjemaData,
                url: `/familie-ba-sak/api/dokument/fagsak/${fagsakId}/forhaandsvis-brev`,
            });
        };

        const sendBrevPåFagsak = () => {
            switch (årsakFelt.verdi) {
                case DokumentÅrsak.DELT_BOSTED:
                    return onDeltBostedSubmit(
                        {
                            method: 'POST',
                            data: hentSkjemaData(),
                            url: `/familie-ba-sak/api/dokument/fagsak/${fagsakId}/send-brev`,
                        },
                        () => {
                            settVisInnsendtBrevModal(true);
                            nullstillSkjema();
                        }
                    );
                case DokumentÅrsak.KAN_SØKE:
                    return onKanSøkeSubmit(
                        {
                            method: 'POST',
                            data: hentSkjemaData(),
                            url: `/familie-ba-sak/api/dokument/fagsak/${fagsakId}/send-brev`,
                        },
                        () => {
                            settVisInnsendtBrevModal(true);
                            nullstillSkjema();
                        }
                    );
                case DokumentÅrsak.FØDSEL_MINDREÅRIG:
                case DokumentÅrsak.FØDSEL_UMYNDIG:
                    return request<IManueltBrevRequestPåFagsak, void>({
                        method: 'POST',
                        data: hentSkjemaData(),
                        url: `/familie-ba-sak/api/dokument/fagsak/${fagsakId}/send-brev`,
                        påvirkerSystemLaster: true,
                    }).then(() => {
                        settVisInnsendtBrevModal(true);
                        nullstillSkjema();
                    });
            }
        };

        const settVisfeilmeldinger = (visFeilmeldinger: boolean) => {
            switch (årsakFelt.verdi) {
                case DokumentÅrsak.DELT_BOSTED:
                    return settVisfeilmeldingerDeltBosted(visFeilmeldinger);
                case DokumentÅrsak.KAN_SØKE:
                    return settVisfeilmeldingerKanSøke(visFeilmeldinger);
            }
        };

        const hentSkjemaFeilmelding = () => {
            return (
                hentFrontendFeilmelding(hentetForhåndsvisning) ||
                hentFrontendFeilmelding(deltBostedSkjema.submitRessurs) ||
                hentFrontendFeilmelding(kanSøkeSkjema.submitRessurs)
            );
        };

        return {
            deltBostedSkjema,
            kanSøkeSkjema,
            fagsakId,
            hentForhåndsvisningPåFagsak,
            hentSkjemaFeilmelding,
            hentetForhåndsvisning,
            målformFelt,
            nullstillSkjema,
            sendBrevPåFagsak,
            senderBrev,
            settVisInnsendtBrevModal,
            settVisfeilmeldinger,
            skjemaErLåst,
            visForhåndsvisningBeskjed: () =>
                !deepEqual(hentSkjemaData(), sistBrukteDataVedForhåndsvisning),
            visInnsendtBrevModal,
            årsakFelt,
        };
    }
);
