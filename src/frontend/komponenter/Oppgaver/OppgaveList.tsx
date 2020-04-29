import React from 'react';
import {
    GjelderFilter,
    OppgavetypeFilter,
    PrioritetFilter,
    EnhetFilter,
    IOppgave,
} from '../../typer/oppgave';
import { RessursStatus } from '../../typer/ressurs';
import { useOppgaver } from '../../context/OppgaverContext';
import { Flatknapp } from 'nav-frontend-knapper';

const intDatoTilNorskDato = (intDato: string) => {
    return `${intDato.substr(8, 2)}.${intDato.substr(5, 2)}.${intDato.substr(2, 2)}`;
};

const getEnheter = (enhetId: string) => {
    const index = Object.keys(EnhetFilter).findIndex(k => k === `E${enhetId}`);
    return index < 0 ? enhetId : Object.values(EnhetFilter)[index];
};

const OppgaveList: React.FunctionComponent = () => {
    const { fordelOppgave, oppgaver } = useOppgaver();

    return (
        <div className="oppgavelist">
            <table className="tabell">
                <thead className="tabell__head">
                    <tr className="tabell__head__tr">
                        <th className={'regdato'}>Reg. dato</th>
                        <th className={'oppgavetype'}>Oppgavetype</th>
                        <th className={'gjelder'}>Gjelder</th>
                        <th className={'frist'}>Frist</th>
                        <th className={'prioritet'}>Prioritet</th>
                        <th>
                            <div className={'beskrivelse'}>Beskrivelse</div>
                        </th>
                        <th className={'bruker'}>Bruker</th>
                        <th className={'enhet'}>Enhet</th>
                        <th className={'saksbehandler'}>Saksbehandler</th>
                        <th className={'handlinger'}>Handlinger</th>
                    </tr>
                </thead>
                <tbody className="tabell__body">
                    {oppgaver.status === RessursStatus.SUKSESS &&
                        oppgaver.data.map((oppg: IOppgave, index) => (
                            <tr key={index}>
                                <td className={'regdato'}>
                                    {intDatoTilNorskDato(oppg.opprettetTidspunkt)}
                                </td>
                                <td className={'oppgavetype'}>
                                    {
                                        OppgavetypeFilter[
                                            oppg.oppgavetype as keyof typeof OppgavetypeFilter
                                        ]
                                    }
                                </td>
                                <td className={'gjelder'}>
                                    {oppg.behandlingstema
                                        ? GjelderFilter[
                                              oppg.behandlingstema as keyof typeof GjelderFilter
                                          ]
                                        : 'Ikke satt'}
                                </td>
                                <td className={'frist'}>
                                    {intDatoTilNorskDato(oppg.fristFerdigstillelse)}
                                </td>
                                <td className={'prioritet'}>
                                    {
                                        PrioritetFilter[
                                            oppg.prioritet as keyof typeof PrioritetFilter
                                        ]
                                    }
                                </td>
                                <td>
                                    <div className={'beskrivelse'}>{oppg.beskrivelse}</div>
                                </td>
                                <td className={'bruker'}>{oppg.aktoerId}</td>
                                <td className={'enhet'}>{getEnheter(oppg.tildeltEnhetsnr)}</td>
                                <td className={'saksbehandler'}>
                                    {oppg.tilordnetRessurs ? oppg.tilordnetRessurs : 'Ikke tildelt'}
                                    <Flatknapp
                                        onClick={() => {
                                            fordelOppgave(oppg, 'E148211');
                                        }}
                                    >
                                        Plukk
                                    </Flatknapp>
                                </td>
                                <td className={'handlinger'}>
                                    {OppgavetypeFilter[
                                        oppg.oppgavetype as keyof typeof OppgavetypeFilter
                                    ] === OppgavetypeFilter.JFR && (
                                        <a href={`/oppgaver/journalfør/${oppg.id}`}>Gå til oppg</a>
                                    )}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default OppgaveList;
