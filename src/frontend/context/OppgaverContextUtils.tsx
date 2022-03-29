import React from 'react';

import type { Column } from 'react-table';

import { Button } from '@navikt/ds-react';
import type { ISaksbehandler } from '@navikt/familie-typer';

import OppgaveDirektelenke from '../komponenter/Oppgavebenk/OppgaveDirektelenke';
import OppgavelisteSaksbehandler from '../komponenter/Oppgavebenk/OppgavelisteSaksbehandler';
import type { IPar } from '../typer/common';
import type {
    BehandlingstypeFilter,
    EnhetFilter,
    GjelderFilter,
    IOppgave,
    IOppgaveIdent,
    OppgavetypeFilter,
} from '../typer/oppgave';
import {
    behandlingstypeFilter,
    enhetFilter,
    gjelderFilter,
    oppgaveTypeFilter,
    PrioritetFilter,
} from '../typer/oppgave';
import { hentFnrFraOppgaveIdenter } from '../utils/oppgave';

export const kolonner: ReadonlyArray<Column<IOppgaveRad>> = [
    {
        accessor: 'opprettetTidspunkt',
        Header: (
            <Button size="small" variant="tertiary">
                Reg. dato
            </Button>
        ),
        Cell: ({ value: opprettetTidspunkt }) => {
            return opprettetTidspunkt ? intDatoTilNorskDato(opprettetTidspunkt) : 'Ukjent';
        },
    },
    {
        accessor: 'oppgavetype',
        Header: (
            <Button size="small" variant="tertiary">
                Oppgavetype
            </Button>
        ),
        Cell: ({ value: oppgavetype }) => {
            return oppgavetype
                ? oppgaveTypeFilter[oppgavetype as OppgavetypeFilter]?.navn ?? oppgavetype
                : 'Ukjent';
        },
    },
    {
        accessor: 'behandlingstema',
        Header: (
            <Button size="small" variant="tertiary">
                Gjelder
            </Button>
        ),
        Cell: ({ value: behandlingstema }) => {
            return behandlingstema
                ? gjelderFilter[behandlingstema as GjelderFilter]?.navn ?? behandlingstema
                : 'Ikke satt';
        },
    },
    {
        accessor: 'behandlingstype',
        Header: (
            <Button size="small" variant="tertiary">
                Behandlingstype
            </Button>
        ),
    },
    {
        accessor: 'fristFerdigstillelse',
        Header: (
            <Button size="small" variant="tertiary">
                Frist
            </Button>
        ),
        Cell: ({ value: fristFerdigstillelse }) => {
            return fristFerdigstillelse ? intDatoTilNorskDato(fristFerdigstillelse) : 'Ukjent';
        },
    },
    {
        accessor: 'prioritet',
        Header: (
            <Button size="small" variant="tertiary">
                Prioritet
            </Button>
        ),
        Cell: ({ value: prioritet }) => {
            return PrioritetFilter[prioritet as keyof typeof PrioritetFilter];
        },
    },
    {
        accessor: 'beskrivelse',
        Header: (
            <Button size="small" variant="tertiary">
                Beskrivelse
            </Button>
        ),
    },
    {
        accessor: 'ident',
        Header: (
            <Button size="small" variant="tertiary">
                Bruker
            </Button>
        ),
        Cell: ({ value: identer }) => {
            return hentFnrFraOppgaveIdenter(identer) || 'Ukjent';
        },
    },
    {
        accessor: 'tildeltEnhetsnr',
        Header: (
            <Button size="small" variant="tertiary">
                Enhet
            </Button>
        ),
    },
    {
        accessor: 'tilordnetRessurs',
        Header: (
            <Button size="small" variant="tertiary">
                Saksbehandler
            </Button>
        ),
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
        Header: (
            <Button size="small" variant="tertiary">
                Handlinger
            </Button>
        ),
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
