import { useState } from 'react';

import createUseContext from 'constate';

import { useFelt } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';

import useForhåndsvisning from '../hooks/useForhåndsvisning';
import { useDeltBostedSkjema } from '../komponenter/Fagsak/Dokumentutsending/DeltBosted/useDeltBostedSkjema';
import { Brevmal } from '../komponenter/Felleskomponenter/Hendelsesoversikt/BrevModul/typer';
import { IManueltBrevRequestPåFagsak } from '../typer/dokument';
import { IFagsak } from '../typer/fagsak';
import { Målform } from '../typer/søknad';
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
        const { deltBostedSkjema, onDeltBostedSubmit } = useDeltBostedSkjema();

        const årsakFelt = useFelt<DokumentÅrsak>({
            verdi: DokumentÅrsak.DELT_BOSTED,
        });

        const hentSkjemaData = (): IManueltBrevRequestPåFagsak => {
            if (bruker.status === RessursStatus.SUKSESS) {
                switch (årsakFelt.verdi) {
                    case DokumentÅrsak.DELT_BOSTED:
                        return {
                            mottakerIdent: bruker.data.personIdent,
                            multiselectVerdier: ['Test'],
                            barnIBrev: deltBostedSkjema.felter.barnaMedOpplysninger.verdi
                                .filter(barn => barn.merket)
                                .map(barn => barn.ident),
                            mottakerMålform: Målform.NB,
                            mottakerNavn: bruker.data.navn,
                            brevmal: Brevmal.INNHENTE_OPPLYSNINGER,
                        };
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

        const hentForhåndsvisningPåFagsak = () =>
            hentForhåndsvisning<IManueltBrevRequestPåFagsak>({
                method: 'POST',
                data: hentSkjemaData(),
                url: `/familie-ba-sak/api/dokument/fagsak/${fagsak.id}/forhaandsvis-brev`,
            });

        const sendBrevPåFagsak = () => {
            switch (årsakFelt.verdi) {
                case DokumentÅrsak.DELT_BOSTED:
                    onDeltBostedSubmit(
                        {
                            method: 'POST',
                            data: hentSkjemaData(),
                            url: `/familie-ba-sak/api/dokument/fagsak/${fagsak.id}/forhaandsvis-brev`,
                        },
                        () => {
                            settVisInnsendtBrevModal(true);
                        }
                    );
            }
        };

        return {
            deltBostedSkjema,
            hentForhåndsvisningPåFagsak,
            hentetForhåndsvisning,
            sendBrevPåFagsak,
            skjemaErLåst,
            visInnsendtBrevModal,
            årsakFelt,
        };
    }
);
