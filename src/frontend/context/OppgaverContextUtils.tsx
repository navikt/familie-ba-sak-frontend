import React from 'react';

import type { Column } from 'react-table';
import styled from 'styled-components';

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

const StyledButton = styled(Button)`
    .navds-button__inner {
        font-weight: 600;
        margin: 0;
    }
`;

const LitenKnapp: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return (
        <StyledButton size="small" variant="tertiary">
            {children}
        </StyledButton>
    );
};

export const kolonner: ReadonlyArray<Column<IOppgaveRad>> = [
    {
        accessor: 'opprettetTidspunkt',
        Header: <LitenKnapp>Reg. dato</LitenKnapp>,
        Cell: ({ value: opprettetTidspunkt }) => {
            return (
                <span>
                    {opprettetTidspunkt ? intDatoTilNorskDato(opprettetTidspunkt) : 'Ukjent'}
                </span>
            );
        },
    },
    {
        accessor: 'oppgavetype',
        Header: <LitenKnapp>Oppgavetype</LitenKnapp>,
        Cell: ({ value: oppgavetype }) => {
            return (
                <span>
                    {oppgavetype
                        ? oppgaveTypeFilter[oppgavetype as OppgavetypeFilter]?.navn ?? oppgavetype
                        : 'Ukjent'}
                </span>
            );
        },
    },
    {
        accessor: 'behandlingstema',
        Header: <LitenKnapp>Gjelder</LitenKnapp>,
        Cell: ({ value: behandlingstema }) => {
            return (
                <span>
                    {behandlingstema
                        ? gjelderFilter[behandlingstema as GjelderFilter]?.navn ?? behandlingstema
                        : 'Ikke satt'}
                </span>
            );
        },
    },
    {
        accessor: 'behandlingstype',
        Header: <LitenKnapp>Behandlingstype</LitenKnapp>,
    },
    {
        accessor: 'fristFerdigstillelse',
        Header: <LitenKnapp>Frist</LitenKnapp>,
        Cell: ({ value: fristFerdigstillelse }) => {
            return (
                <span>
                    {fristFerdigstillelse ? intDatoTilNorskDato(fristFerdigstillelse) : 'Ukjent'}
                </span>
            );
        },
    },
    {
        accessor: 'prioritet',
        Header: <LitenKnapp>Prioritet</LitenKnapp>,
        Cell: ({ value: prioritet }) => {
            return <span>{PrioritetFilter[prioritet as keyof typeof PrioritetFilter]}</span>;
        },
    },
    {
        accessor: 'beskrivelse',
        Header: <LitenKnapp>Beskrivelse</LitenKnapp>,
    },
    {
        accessor: 'ident',
        Header: <LitenKnapp>Bruker</LitenKnapp>,
        Cell: ({ value: identer }) => {
            return <span>{hentFnrFraOppgaveIdenter(identer) || 'Ukjent'}</span>;
        },
    },
    {
        accessor: 'tildeltEnhetsnr',
        Header: <LitenKnapp>Enhet</LitenKnapp>,
    },
    {
        accessor: 'tilordnetRessurs',
        Header: <LitenKnapp>Saksbehandler</LitenKnapp>,
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
        Header: <LitenKnapp>Handlinger</LitenKnapp>,
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
