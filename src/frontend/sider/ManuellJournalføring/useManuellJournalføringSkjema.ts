import { useHentDataForManuellJournalføring } from '@hooks/useHentDataForManuellJournalføring';
import type { IDokumentInfo } from '@navikt/familie-typer';
import type { Behandlingstype, BehandlingÅrsak } from '@typer/behandling';
import type { IBehandlingstema } from '@typer/behandlingstema';
import { FagsakType } from '@typer/fagsak';
import type { Klagebehandlingstype } from '@typer/klage';
import type { TilknyttetBehandling } from '@typer/manuell-journalføring';
import { finnBehandlingstemaFraOppgave } from '@typer/oppgave';
import type { IPersonInfo } from '@typer/person';
import type { ISamhandlerInfo } from '@typer/samhandler';
import type { Tilbakekrevingsbehandlingstype } from '@typer/tilbakekrevingsbehandling';
import { hentDefaultBehandlingstema } from '@utils/behandling';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';

export enum ManuellJournalføringFelter {
    JOURNALPOST_TITTEL = 'journalpostTittel',
    DOKUMENT_TITTEL = 'dokumentTittel',
    DOKUMENT_TILLEGGSINFO = 'dokumentTilleggsinfo',
    DOKUMENTER = 'dokumenter', // TODO fjern?
    BRUKER = 'bruker',
    AVSENDER_NAVN = 'avsenderNavn',
    AVSENDER_IDENT = 'avsenderIdent',
    KNYTT_TIL_NY_BEHANDLING = 'knyttTilNyBehandling',
    TILKNYTTEDE_BEHANDLINGER = 'tilknyttedeBehandlinger',
    FAGSAK_TYPE = 'fagsakType',
    SAMHANDLER = 'samhandler',
    BEHANDLINGSTYPE = 'behandlingstype',
    BEHANDLINGSÅRSAK = 'behandlingsårsak',
    BEHANDLINGSTEMA = 'behandlingstema',
}

export interface ManuellJournalføringFormValues {
    journalpostTittel: string;
    dokumenter: IDokumentInfo[]; // TODO: finn ut hvordan disse skal håndteres i skjemaet
    bruker: IPersonInfo | undefined;
    avsenderNavn: string;
    avsenderIdent: string;
    knyttTilNyBehandling: boolean;
    tilknyttedeBehandlinger: TilknyttetBehandling[];
    fagsakType: FagsakType;
    samhandler: ISamhandlerInfo | undefined;
    behandlingstype: Behandlingstype | Tilbakekrevingsbehandlingstype | Klagebehandlingstype | '';
    behandlingsårsak: BehandlingÅrsak | '';
    behandlingstema: IBehandlingstema | undefined;
}

interface TransformedManuellJournalføringFormValues {
    journalpostTittel: string;
    dokumenter: IDokumentInfo[];
    bruker: IPersonInfo | undefined; // TODO: finn ut om bruker kan være undefined når vi sender til BE
    avsenderNavn: string;
    avsenderIdent: string;
    knyttTilNyBehandling: boolean;
    tilknyttedeBehandlinger: TilknyttetBehandling[];
    fagsakType: FagsakType;
    samhandler: ISamhandlerInfo | undefined; // TODO: finn ut om samhandler kan være undefined når vi sender til BE
    behandlingstype: Behandlingstype | Tilbakekrevingsbehandlingstype | Klagebehandlingstype;
    behandlingsårsak: BehandlingÅrsak;
    behandlingstema: IBehandlingstema | undefined; // TODO: finn ut om behandlingstema kan være undefined når vi sender til BE
}

export function useManuellJournalføringSkjema() {
    const { oppgaveId } = useParams<{ oppgaveId: string }>();
    // TODO: if oppgaveId - må håndtere om den ikke er definert
    // TODO: må også erstatte resten av hentDataForManuellJournalføring her eller et annet sted
    const {
        data: dataForManuellJournalføring,
        isPending: isPendingDataForManuellJournalføring,
        error: dataForManuellJournalføringError,
    } = useHentDataForManuellJournalføring(oppgaveId!);

    const form = useForm<ManuellJournalføringFormValues, unknown, TransformedManuellJournalføringFormValues>({
        defaultValues: {
            // TODO: skal egt være good, men må testes og se over uans
            journalpostTittel: dataForManuellJournalføring?.journalpost.tittel ?? '',
            dokumenter: dataForManuellJournalføring?.journalpost.dokumenter ?? [],
            bruker: dataForManuellJournalføring?.person ?? undefined,
            avsenderNavn: dataForManuellJournalføring?.journalpost.avsenderMottaker?.navn ?? '',
            avsenderIdent: dataForManuellJournalføring?.journalpost.avsenderMottaker?.id ?? '',
            knyttTilNyBehandling: false,
            tilknyttedeBehandlinger: [],
            fagsakType: dataForManuellJournalføring?.minimalFagsak?.fagsakType || FagsakType.NORMAL,
            samhandler: undefined,
            behandlingstype: '',
            behandlingsårsak: '',
            // TODO: ikke force !!, og skal vi returnere null som i opprettBehandling istdf. undefined?
            behandlingstema:
                finnBehandlingstemaFraOppgave(dataForManuellJournalføring?.oppgave) ||
                hentDefaultBehandlingstema(dataForManuellJournalføring?.minimalFagsak?.fagsakType),
        },
    });

    const { setError } = form;

    // TODO: kanskje flytt dette et annet sted, og rename?
    const fagsakTypeVerdi = form.watch(ManuellJournalføringFelter.FAGSAK_TYPE);
    const samhandlerVerdi = form.watch(ManuellJournalføringFelter.SAMHANDLER);
    function validerOgJournalfør() {
        if (fagsakTypeVerdi === FagsakType.INSTITUSJON && samhandlerVerdi === undefined) {
            setError(ManuellJournalføringFelter.SAMHANDLER, {
                message:
                    'Det er registrert at søker er institusjon. For å journalføre, må fagsak av typen institusjon først opprettes i saksbehandlingsløsningen. Deretter kan fagsaken velges i nedtrekkslisten i bruker/søker-panelet over.',
            });
        } // else journalFør();
    }

    // TODO: mangler to useEffects fra ManuellJournalføringContext.tsx

    async function onSubmit(values: TransformedManuellJournalføringFormValues) {
        // Enten kalles validerOgJournalfør eller lukkOppgaveOgKnyttJournalpostTilBehandling
        console.log('Skjema sendt inn med verdier:', values);
        /*
    const {
      journalpostTittel,
      dokumenter,
      bruker,
      avsenderNavn,
      avsenderIdent,
      knyttTilNyBehandling,
      tilknyttedeBehandlinger,
      fagsakType,
      samhandler,
      behandlingstype,
      behandlingsårsak,
      behandlingstema
    } = values;
     */
    }

    return {
        form,
        onSubmit,
    };
}
