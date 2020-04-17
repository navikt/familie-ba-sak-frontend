import React from 'react';
import { GjelderFilter, OppgavetypeFilter, PrioritetFilter, IOppgave } from '../../typer/oppgave';
import { RessursStatus } from '../../typer/ressurs';
import { useOppgaver } from '../../context/OppgaverContext';

function intDatoTilNorskDato(intDato: string) {
    return `${intDato.substr(8, 2)}.${intDato.substr(5, 2)}.${intDato.substr(2, 2)}`;
}

const enheter = new Map<string, string>([
    ['4806', '4806 Drammen'],
    ['4811', '4811 Sandnes'],
    ['4820', '4820 Vadsø'],
    ['4833', '4833 Oslo'],
    ['4842', '4842 Stord'],
    ['4847', '4847 Levanger-Steinkjer'],
]);

const OppgaveList: React.FunctionComponent = () => {
    const { oppgaver } = useOppgaver();

    return (
        <table className="tabell">
            <thead>
                <tr>
                    <th className={'regdato'}>Reg. dato</th>
                    <th className={'oppgavetype'}>Oppgavetype</th>
                    <th className={'gjelder'}>Gjelder</th>
                    <th className={'frist'}>Frist</th>
                    <th className={'prioritet'}>Prioritet</th>
                    <th className={'beskrivelse'}>Beskrivelse</th>
                    <th className={'bruker'}>Bruker</th>
                    <th className={'enhet'}>Enhet</th>
                    <th className={'saksbehandler'}>Saksbehandler</th>
                    <th className={'handlinger'}>Handlinger</th>
                </tr>
            </thead>
            <tbody>
                {oppgaver.status == RessursStatus.SUKSESS &&
                    oppgaver.data.map((oppg: IOppgave, index) => (
                        <tr key={index}>
                            <td className={'regdato'}>
                                {intDatoTilNorskDato(oppg.opprettetTidspunkt)}
                            </td>
                            <td className={'oppgavetype'}>{OppgavetypeFilter[oppg.oppgavetype]}</td>
                            <td className={'gjelder'}>
                                {oppg.behandlingstema
                                    ? GjelderFilter[oppg.behandlingstema]
                                    : 'Ikke satt'}
                            </td>
                            <td className={'frist'}>
                                {intDatoTilNorskDato(oppg.fristFerdigstillelse)}
                            </td>
                            <td className={'prioritet'}>{PrioritetFilter[oppg.prioritet]}</td>
                            <td className={'beskrivelse'}>{oppg.beskrivelse}</td>
                            <td className={'bruker'}>{oppg.aktoerId}</td>
                            <td className={'enhet'}>{enheter.get(oppg.tildeltEnhetsnr)}</td>
                            <td className={'saksbehandler'}>
                                {oppg.tilordnetRessurs ? oppg.tilordnetRessurs : 'Ikke tildelt'}
                            </td>
                            <td className={'handlinger'}>
                                <a href="">Tildel/plukk</a>
                                <a
                                    href={
                                        oppg.oppgavetype === OppgavetypeFilter.JFR
                                            ? `/oppgaver/journalfør/${oppg.id}`
                                            : ''
                                    }
                                >
                                    Gå til oppg
                                </a>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );
};

export default OppgaveList;
