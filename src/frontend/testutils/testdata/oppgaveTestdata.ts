import { IdentGruppe, type IHentOppgaveDto, type IOppgave } from '../../typer/oppgave';

export function lagOppgave(oppgave: Partial<IOppgave> = {}): IOppgave {
    return {
        id: '1',
        identer: [{ ident: '12345678910', gruppe: IdentGruppe.FOLKEREGISTERIDENT }],
        tildeltEnhetsnr: '4833',
        journalpostId: '',
        saksreferanse: '',
        aktoerId: '1234567891011',
        behandlingstema: 'ab0180',
        behandlingstype: 'ae0118',
        beskrivelse: 'Behandle sak',
        fristFerdigstillelse: '2026-10-15',
        oppgavetype: 'BEH_SAK',
        opprettetTidspunkt: '2026-10-01T08:00:00.000',
        prioritet: 'NORM',
        status: 'OPPRETTET',
        tilordnetRessurs: undefined,
        ...oppgave,
    };
}

export function lagHentOppgaveDto(oppgaver: IOppgave[] = [lagOppgave()]): IHentOppgaveDto {
    return {
        antallTreffTotalt: oppgaver.length,
        oppgaver,
    };
}

export * as OppgaveTestdata from './oppgaveTestdata';
