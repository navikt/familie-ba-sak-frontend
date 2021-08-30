import { useEffect, useState } from 'react';

import createUseContext from 'constate';

import { useFelt } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';

import useForhåndsvisning from '../hooks/useForhåndsvisning';
import { useDeltBostedSkjema } from '../komponenter/Fagsak/Dokumentutsending/DeltBosted/useDeltBostedSkjema';
import { IManueltBrevRequestPåFagsak } from '../typer/dokument';
import { IFagsak } from '../typer/fagsak';
import { Målform } from '../typer/søknad';
import { hentFrontendFeilmelding } from '../utils/ressursUtils';
import { useFagsakRessurser } from './FagsakContext';

export enum DokumentÅrsak {
    DELT_BOSTED = 'DELT_BOSTED',
}

export const dokumentÅrsak: Record<DokumentÅrsak, string> = {
    DELT_BOSTED: 'Delt bosted',
};

export const [DokumentutsendingProvider, useDokumentutsending] = createUseContext(
    ({ fagsak }: { fagsak: IFagsak }) => {
        const { bruker } = useFagsakRessurser();
        const [visInnsendtBrevModal, settVisInnsendtBrevModal] = useState(false);
        const { hentForhåndsvisning, hentetForhåndsvisning } = useForhåndsvisning();
        const {
            deltBostedSkjema,
            hentDeltBostedSkjemaData,
            nullstillDeltBostedSkjema,
            onDeltBostedSubmit,
            settVisfeilmeldingerDeltBosted,
        } = useDeltBostedSkjema();

        const årsakFelt = useFelt<DokumentÅrsak>({
            verdi: DokumentÅrsak.DELT_BOSTED,
        });

        const målformFelt = useFelt<Målform | undefined>({
            verdi: Målform.NB,
        });

        const nullstillSkjema = () => {
            målformFelt.nullstill();
            nullstillDeltBostedSkjema();
            hentForhåndsvisningPåFagsak();
        };

        useEffect(() => {
            nullstillSkjema();
        }, [årsakFelt.verdi]);

        const hentSkjemaData = (): IManueltBrevRequestPåFagsak => {
            if (bruker.status === RessursStatus.SUKSESS) {
                switch (årsakFelt.verdi) {
                    case DokumentÅrsak.DELT_BOSTED:
                        return hentDeltBostedSkjemaData();
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
        };

        const senderBrev = () => {
            switch (årsakFelt.verdi) {
                case DokumentÅrsak.DELT_BOSTED:
                    return deltBostedSkjema.submitRessurs.status === RessursStatus.HENTER;
            }
        };

        const hentForhåndsvisningPåFagsak = () =>
            hentForhåndsvisning<IManueltBrevRequestPåFagsak>({
                method: 'POST',
                data: { ...hentSkjemaData(), målform: målformFelt.verdi },
                url: `/familie-ba-sak/api/dokument/fagsak/${fagsak.id}/forhaandsvis-brev`,
            });

        const sendBrevPåFagsak = () => {
            switch (årsakFelt.verdi) {
                case DokumentÅrsak.DELT_BOSTED:
                    onDeltBostedSubmit(
                        {
                            method: 'POST',
                            data: { ...hentSkjemaData(), målform: målformFelt.verdi },
                            url: `/familie-ba-sak/api/dokument/fagsak/${fagsak.id}/send-brev`,
                        },
                        () => {
                            settVisInnsendtBrevModal(true);
                            nullstillSkjema();
                        }
                    );
            }
        };

        const settVisfeilmeldinger = (visFeilmeldinger: boolean) => {
            switch (årsakFelt.verdi) {
                case DokumentÅrsak.DELT_BOSTED:
                    settVisfeilmeldingerDeltBosted(visFeilmeldinger);
            }
        };

        const hentSkjemaFeilmelding = () => {
            return (
                hentFrontendFeilmelding(hentetForhåndsvisning) ||
                hentFrontendFeilmelding(deltBostedSkjema.submitRessurs)
            );
        };

        return {
            deltBostedSkjema,
            fagsak,
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
            visInnsendtBrevModal,
            årsakFelt,
        };
    }
);
