import type { ISaksbehandler } from '@navikt/familie-typer';

import type { IPar } from '../../typer/common';
import type { BehandlingstypeFilter, EnhetFilter, IOppgave, IOppgaveIdent } from '../../typer/oppgave';
import { behandlingstypeFilter, enhetFilter } from '../../typer/oppgave';
import { hentFnrFraOppgaveIdenter } from '../../utils/oppgave';

export enum Sorteringsnøkkel {
    OPPRETTET_TIDSPUNKT = 'opprettetTidspunkt',
    OPPGAVETYPE = 'oppgavetype',
    BEHANDLINGSTEMA = 'behandlingstema',
    BEHANDLINGSTYPE = 'behandlingstype',
    FRIST_FERDIGSTILLELSE = 'fristFerdigstillelse',
    PRIORITET = 'prioritet',
    BESKRIVELSE = 'beskrivelse',
    IDENT = 'ident',
    TILDELT_ENHETSNR = 'tildeltEnhetsnr',
    TILORDNET_RESSURS = 'tilordnetRessurs',
    HANDLINGER = 'handlinger',
}

export interface IOppgaveRad extends Omit<IOppgave, 'tilordnetRessurs' | 'identer'> {
    ident: IOppgaveIdent[] | undefined;
    tilordnetRessurs: { oppg: IOppgave; innloggetSaksbehandler?: ISaksbehandler };
    handlinger: IOppgave;
}

export const sorterEtterNøkkel = (a: IOppgaveRad, b: IOppgaveRad, sorteringsnøkkel: Sorteringsnøkkel): number => {
    let aVerdi;
    let bVerdi;
    if (sorteringsnøkkel === Sorteringsnøkkel.IDENT) {
        aVerdi = hentFnrFraOppgaveIdenter(b.ident) || 'Ukjent';
        bVerdi = hentFnrFraOppgaveIdenter(b.ident) || 'Ukjent';
    } else if (sorteringsnøkkel === Sorteringsnøkkel.TILORDNET_RESSURS) {
        aVerdi = a.tilordnetRessurs.oppg.tilordnetRessurs || 'Ikke tildelt';
        bVerdi = b.tilordnetRessurs.oppg.tilordnetRessurs || 'Ikke tildelt';
    } else {
        aVerdi = a[sorteringsnøkkel];
        bVerdi = b[sorteringsnøkkel];
    }

    if (bVerdi < aVerdi) {
        return -1;
    }
    if (bVerdi > aVerdi) {
        return 1;
    }
    return 0;
};

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
                ? (behandlingstypeFilter[oppg.behandlingstype as BehandlingstypeFilter]?.navn ?? oppg.behandlingstype)
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
