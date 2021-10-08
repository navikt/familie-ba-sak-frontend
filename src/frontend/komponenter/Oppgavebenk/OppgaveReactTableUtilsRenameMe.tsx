import React, { ReactNode } from 'react';

import { Column } from 'react-table';

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
    OppgavetypeFilter,
    oppgaveTypeFilter,
    PrioritetFilter,
} from '../../typer/oppgave';
import { hentFnrFraOppgaveIdenter } from '../../utils/oppgave';
import OppgaveDirektelenke from './OppgaveDirektelenke';
import OppgavelisteSaksbehandler from './OppgavelisteSaksbehandler';

export interface Accessor {
    opprettetTidspunkt: string;
    oppgavetype: string;
    behandlingstema: string;
    behandlingstype: string;
    fristFerdigstillelse: string;
    prioritet: string;
    beskrivelse: string;
    ident: string;
    tildeltEnhetsnr: string;
    tilordnetRessurs: string;
    handlinger: string;
}

export const kolonner: ReadonlyArray<Column<IOppgaveRad>> = [
    {
        accessor: 'opprettetTidspunkt',
        Header: <Lenke href="#">Reg. dato</Lenke>,
    },
    {
        accessor: 'oppgavetype',
        Header: <Lenke href="#">Oppgavetype</Lenke>,
    },
    {
        accessor: 'behandlingstema',
        Header: <Lenke href="#">Gjelder</Lenke>,
    },
    {
        accessor: 'behandlingstype',
        Header: <Lenke href="#">Behandlingstype</Lenke>,
    },
    {
        accessor: 'fristFerdigstillelse',
        Header: <Lenke href="#">Frist</Lenke>,
    },
    {
        accessor: 'prioritet',
        Header: <Lenke href="#">Prioritet</Lenke>,
    },
    {
        accessor: 'beskrivelse',
        Header: <Lenke href="#">Beskrivelse</Lenke>,
    },
    {
        accessor: 'ident',
        Header: <Lenke href="#">Bruker</Lenke>,
    },
    {
        accessor: 'tildeltEnhetsnr',
        Header: <Lenke href="#">Enhet</Lenke>,
    },
    {
        accessor: 'tilordnetRessurs',
        Header: <Lenke href="#">Saksbehandler</Lenke>,
    },
    {
        accessor: 'handlinger',
        Header: <Lenke href="#">Handlinger</Lenke>,
    },
];

export interface IOppgaveRad extends Omit<IOppgave, 'tilordnetRessurs'> {
    tilordnetRessurs: ReactNode;
    handlinger: ReactNode;
}

export const mapIOppgaverTilOppgaveRad = (
    oppgaver: IOppgave[],
    innloggetSaksbehandler?: ISaksbehandler
): IOppgaveRad[] => {
    return oppgaver.map((oppg: IOppgave) => {
        const enhet: IPar | undefined = enhetFilter[`E${oppg.tildeltEnhetsnr}` as EnhetFilter];

        return {
            ...oppg,
            ident: hentFnrFraOppgaveIdenter(oppg.identer) || 'Ukjent',
            behandlingstema: oppg.behandlingstema
                ? gjelderFilter[oppg.behandlingstema as GjelderFilter]?.navn ?? oppg.behandlingstema
                : 'Ikke satt',
            behandlingstype: oppg.behandlingstype
                ? behandlingstypeFilter[oppg.behandlingstype as BehandlingstypeFilter]?.navn ??
                  oppg.behandlingstype
                : 'Ikke satt',
            fristFerdigstillelse: oppg.fristFerdigstillelse
                ? intDatoTilNorskDato(oppg.fristFerdigstillelse)
                : 'Ukjent',
            oppgavetype: oppg.oppgavetype
                ? oppgaveTypeFilter[oppg.oppgavetype as OppgavetypeFilter]?.navn ?? oppg.oppgavetype
                : 'Ukjent',
            beskrivelse: <div className={'beskrivelse'}>{oppg.beskrivelse}</div>,
            opprettetTidspunkt: oppg.opprettetTidspunkt
                ? intDatoTilNorskDato(oppg.opprettetTidspunkt)
                : 'Ukjent',
            prioritet: PrioritetFilter[oppg.prioritet as keyof typeof PrioritetFilter],
            tilordnetRessurs: (
                <div className={'tilordnet-ressurs'}>
                    <OppgavelisteSaksbehandler
                        oppgave={oppg}
                        innloggetSaksbehandler={innloggetSaksbehandler}
                    />
                </div>
            ),
            tildeltEnhetsnr: enhet ? enhet.navn : oppg.tildeltEnhetsnr,
            handlinger: (
                <div className={'handlinger'}>
                    <OppgaveDirektelenke oppgave={oppg} />
                </div>
            ),
        };
    });
};

export const intDatoTilNorskDato = (intDato: string) => {
    return `${intDato.substr(8, 2)}.${intDato.substr(5, 2)}.${intDato.substr(2, 2)}`;
};
