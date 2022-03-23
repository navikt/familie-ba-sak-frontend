import { Valideringsstatus } from '@navikt/familie-skjema';
import type { ISaksbehandler } from '@navikt/familie-typer';

import type { INøkkelPar, IPar } from '../../typer/common';
import { hentPar } from '../../typer/common';
import { harTilgangTilEnhet } from '../../typer/enhet';
import {
    BehandlingstypeFilter,
    behandlingstypeFilter,
    EnhetFilter,
    enhetFilter,
    GjelderFilter,
    gjelderFilter,
    OppgavetypeFilter,
    oppgaveTypeFilter,
    SaksbehandlerFilter,
    saksbehandlerFilter,
} from '../../typer/oppgave';

export enum FeltSortOrder {
    NONE = 'NONE',
    ASCENDANT = 'ASCENDANT',
    DESCENDANT = 'DESCENDANT',
}

export interface IOppgaveFilter {
    selectedValue?: string;
    initialValue?: string;
    type: 'dato' | 'select';
    nøkkelPar?: INøkkelPar;
}

export interface IOppgaveFelt {
    nøkkel: string;
    label: string;
    filter?: IOppgaveFilter;
    order?: FeltSortOrder;
    // TODO: midlertidig - ønsker å bruke FeltState og Skjema-hook
    valideringsstatus?: Valideringsstatus;
    feilmelding?: string;
    erSynlig?: (par: IPar, innloggetSaksbehandler?: ISaksbehandler) => boolean;
}

export interface IOppgaveFelter {
    [key: string]: IOppgaveFelt;
    ident: IOppgaveFelt;
    behandlingstema: IOppgaveFelt;
    behandlingstype: IOppgaveFelt;
    beskrivelse: IOppgaveFelt;
    fristFerdigstillelse: IOppgaveFelt;
    handlinger: IOppgaveFelt;
    oppgavetype: IOppgaveFelt;
    opprettetTidspunkt: IOppgaveFelt;
    prioritet: IOppgaveFelt;
    tildeltEnhetsnr: IOppgaveFelt;
    tilordnetRessurs: IOppgaveFelt;
}

export const initialOppgaveFelter = (innloggetSaksbehandler?: ISaksbehandler): IOppgaveFelter => {
    const searchParams = JSON.parse(localStorage.getItem('oppgaveFeltVerdier') || '{}');

    return {
        opprettetTidspunkt: {
            nøkkel: 'opprettetTidspunkt',
            label: 'Reg. dato',
            filter: {
                type: 'dato',
                selectedValue: searchParams['opprettetTidspunkt']?.toString() ?? '',
                initialValue: '',
            },
            order: FeltSortOrder.NONE,
            valideringsstatus: Valideringsstatus.IKKE_VALIDERT,
        },
        oppgavetype: {
            nøkkel: 'oppgavetype',
            label: 'Oppgavetype',
            filter: {
                type: 'select',
                selectedValue: hentPar(
                    searchParams['oppgavetype']?.toString(),
                    oppgaveTypeFilter,
                    OppgavetypeFilter.ALLE
                ),
                initialValue: OppgavetypeFilter.ALLE,
                nøkkelPar: oppgaveTypeFilter,
            },
            order: FeltSortOrder.NONE,
        },
        behandlingstema: {
            nøkkel: 'behandlingstema',
            label: 'Gjelder',
            filter: {
                type: 'select',
                selectedValue: hentPar(
                    searchParams['behandlingstema']?.toString(),
                    gjelderFilter,
                    GjelderFilter.ALLE
                ),
                initialValue: GjelderFilter.ALLE,
                nøkkelPar: gjelderFilter,
            },
            order: FeltSortOrder.NONE,
        },
        behandlingstype: {
            nøkkel: 'behandlingstype',
            label: 'Behandlingstype',
            filter: {
                type: 'select',
                selectedValue: hentPar(
                    searchParams['behandlingstype']?.toString(),
                    behandlingstypeFilter,
                    BehandlingstypeFilter.ALLE
                ),
                initialValue: BehandlingstypeFilter.ALLE,
                nøkkelPar: behandlingstypeFilter,
            },
            order: FeltSortOrder.NONE,
        },
        fristFerdigstillelse: {
            nøkkel: 'fristFerdigstillelse',
            label: 'Frist',
            filter: {
                type: 'dato',
                selectedValue: searchParams['fristFerdigstillelse']?.toString() ?? '',
                initialValue: '',
            },
            order: FeltSortOrder.NONE,
            valideringsstatus: Valideringsstatus.IKKE_VALIDERT,
        },
        prioritet: {
            nøkkel: 'prioritet',
            label: 'Prioritet',
            order: FeltSortOrder.NONE,
        },
        beskrivelse: {
            nøkkel: 'beskrivelse',
            label: 'Beskrivelse',
        },
        ident: {
            nøkkel: 'ident',
            label: 'Bruker',
        },
        tildeltEnhetsnr: {
            nøkkel: 'tildeltEnhetsnr',
            label: 'Enhet',
            filter: {
                type: 'select',
                selectedValue: hentPar(
                    searchParams['tildeltEnhetsnr']?.toString(),
                    enhetFilter,
                    EnhetFilter.VELG
                ),
                initialValue: EnhetFilter.VELG,
                nøkkelPar: enhetFilter,
            },
            order: FeltSortOrder.NONE,
            erSynlig: (par: IPar, innloggetSaksbehandler?: ISaksbehandler) => {
                return harTilgangTilEnhet(
                    par.id.replace('E', ''),
                    innloggetSaksbehandler?.groups ?? []
                );
            },
        },
        tilordnetRessurs: {
            nøkkel: 'tilordnetRessurs',
            label: 'Saksbehandler',
            filter: {
                type: 'select',
                selectedValue: hentPar(
                    searchParams['tilordnetRessurs']?.toString(),
                    saksbehandlerFilter(innloggetSaksbehandler),
                    SaksbehandlerFilter.ALLE
                ),
                initialValue: SaksbehandlerFilter.ALLE,
                nøkkelPar: saksbehandlerFilter(innloggetSaksbehandler),
            },
            order: FeltSortOrder.NONE,
        },
        handlinger: {
            nøkkel: 'handlinger',
            label: 'Handlinger',
        },
    };
};

export const ariaSortMap = new Map<FeltSortOrder, 'none' | 'descending' | 'ascending'>([
    [FeltSortOrder.NONE, 'none'],
    [FeltSortOrder.DESCENDANT, 'descending'],
    [FeltSortOrder.ASCENDANT, 'ascending'],
]);

export const sortLenkClassNameMap = new Map<
    FeltSortOrder,
    '' | 'tabell__th--sortert-desc' | 'tabell__th--sortert-asc'
>([
    [FeltSortOrder.NONE, ''],
    [FeltSortOrder.DESCENDANT, 'tabell__th--sortert-desc'],
    [FeltSortOrder.ASCENDANT, 'tabell__th--sortert-asc'],
]);
