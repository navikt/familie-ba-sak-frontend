import React from 'react';

import { Column, ColumnInstance } from 'react-table';

import Lenke from 'nav-frontend-lenker';

import { ISaksbehandler } from '@navikt/familie-typer';

import { IPar } from '../../typer/common';
import {
    BehandlingstypeFilter,
    behandlingstypeFilter,
    EnhetFilter,
    enhetFilter,
    GjelderFilter,
    gjelderFilter,
    IOppgave,
    IOppgaveIdent,
    OppgavetypeFilter,
    oppgaveTypeFilter,
    PrioritetFilter,
} from '../../typer/oppgave';
import { hentFnrFraOppgaveIdenter } from '../../utils/oppgave';
import OppgaveDirektelenke from './OppgaveDirektelenke';
import { ariaSortMap, FeltSortOrder } from './oppgavefelter';
import OppgavelisteSaksbehandler from './OppgavelisteSaksbehandler';

export const kolonner: ReadonlyArray<Column<IOppgaveRad>> = [
    {
        accessor: 'opprettetTidspunkt',
        Header: <Lenke href="#">Reg. dato</Lenke>,
        Cell: ({ value: opprettetTidspunkt }) => {
            return opprettetTidspunkt ? intDatoTilNorskDato(opprettetTidspunkt) : 'Ukjent';
        },
    },
    {
        accessor: 'oppgavetype',
        Header: <Lenke href="#">Oppgavetype</Lenke>,
        Cell: ({ value: oppgavetype }) => {
            return oppgavetype
                ? oppgaveTypeFilter[oppgavetype as OppgavetypeFilter]?.navn ?? oppgavetype
                : 'Ukjent';
        },
    },
    {
        accessor: 'behandlingstema',
        Header: <Lenke href="#">Gjelder</Lenke>,
        Cell: ({ value: behandlingstema }) => {
            return behandlingstema
                ? gjelderFilter[behandlingstema as GjelderFilter]?.navn ?? behandlingstema
                : 'Ikke satt';
        },
    },
    {
        accessor: 'behandlingstype',
        Header: <Lenke href="#">Behandlingstype</Lenke>,
    },
    {
        accessor: 'fristFerdigstillelse',
        Header: <Lenke href="#">Frist</Lenke>,
        Cell: ({ value: fristFerdigstillelse }) => {
            return fristFerdigstillelse ? intDatoTilNorskDato(fristFerdigstillelse) : 'Ukjent';
        },
    },
    {
        accessor: 'prioritet',
        Header: <Lenke href="#">Prioritet</Lenke>,
        Cell: ({ value: prioritet }) => {
            return PrioritetFilter[prioritet as keyof typeof PrioritetFilter];
        },
    },
    {
        accessor: 'beskrivelse',
        Header: <Lenke href="#">Beskrivelse</Lenke>,
    },
    {
        accessor: 'ident',
        Header: <Lenke href="#">Bruker</Lenke>,
        Cell: ({ value: identer }) => {
            return hentFnrFraOppgaveIdenter(identer) || 'Ukjent';
        },
    },
    {
        accessor: 'tildeltEnhetsnr',
        Header: <Lenke href="#">Enhet</Lenke>,
    },
    {
        accessor: 'tilordnetRessurs',
        Header: <Lenke href="#">Saksbehandler</Lenke>,
        Cell: ({ value: tilordnetRessurs }) => {
            return (
                <OppgavelisteSaksbehandler
                    oppgave={tilordnetRessurs.oppg}
                    innloggetSaksbehandler={tilordnetRessurs.innloggetSaksbehandler}
                />
            );
        },
    },
    {
        accessor: 'handlinger',
        Header: <Lenke href="#">Handlinger</Lenke>,
        Cell: ({ value: handlinger }) => {
            return <OppgaveDirektelenke oppgave={handlinger} />;
        },
    },
];

export interface IOppgaveRad extends Omit<IOppgave, 'tilordnetRessurs' | 'identer'> {
    ident: IOppgaveIdent[] | undefined;
    tilordnetRessurs: { oppg: IOppgave; innloggetSaksbehandler?: ISaksbehandler };
    handlinger: IOppgave;
}

export const mapIOppgaverTilOppgaveRad = (
    oppgaver: IOppgave[],
    innloggetSaksbehandler?: ISaksbehandler
): IOppgaveRad[] =>
    oppgaver.map((oppg: IOppgave) => {
        const enhet: IPar | undefined = enhetFilter[`E${oppg.tildeltEnhetsnr}` as EnhetFilter];
        return {
            ...oppg,
            ident: oppg.identer,
            behandlingstema: oppg.behandlingstema,
            behandlingstype: oppg.behandlingstype
                ? behandlingstypeFilter[oppg.behandlingstype as BehandlingstypeFilter]?.navn ??
                  oppg.behandlingstype
                : 'Ikke satt',
            fristFerdigstillelse: oppg.fristFerdigstillelse,
            oppgavetype: oppg.oppgavetype,
            beskrivelse: oppg.beskrivelse,
            opprettetTidspunkt: oppg.opprettetTidspunkt,
            prioritet: oppg.prioritet,
            tilordnetRessurs: { oppg, innloggetSaksbehandler },
            tildeltEnhetsnr: enhet ? enhet.navn : oppg.tildeltEnhetsnr,
            handlinger: oppg,
        };
    });

export const intDatoTilNorskDato = (intDato: string) =>
    `${intDato.substr(8, 2)}.${intDato.substr(5, 2)}.${intDato.substr(2, 2)}`;

export const styleFraAccessorEllerId = (id: string) => {
    switch (id) {
        case 'beskrivelse':
            return 'beskrivelse';
        case 'tilordnetRessurs':
            return 'tilordnet-ressurs';
        case 'handlinger':
            return 'handlinger';
        default:
            return null;
    }
};

export const getAriaSort = (
    column: ColumnInstance<IOppgaveRad>
): 'none' | 'descending' | 'ascending' | undefined => {
    if (column.isSortedDesc === true) {
        return ariaSortMap.get(FeltSortOrder.DESCENDANT);
    }
    if (column.isSortedDesc === false) {
        return ariaSortMap.get(FeltSortOrder.ASCENDANT);
    }
    return ariaSortMap.get(FeltSortOrder.NONE);
};

export const getSortLenkClassName = (_: ColumnInstance<IOppgaveRad>) => {
    return 'tabell__th--sortert-desc';
};
