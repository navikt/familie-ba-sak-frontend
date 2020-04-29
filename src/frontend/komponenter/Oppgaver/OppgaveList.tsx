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
import { Systemtittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import Alertstripe from 'nav-frontend-alertstriper';

const intDatoTilNorskDato = (intDato: string) => {
    return `${intDato.substr(8, 2)}.${intDato.substr(5, 2)}.${intDato.substr(2, 2)}`;
};

const getEnheter = (enhetId: string) => {
    const index = Object.keys(EnhetFilter).findIndex(k => k === `E${enhetId}`);
    return index < 0 ? enhetId : Object.values(EnhetFilter)[index];
};

const OppgaveList: React.FunctionComponent = () => {
    const {
        oppgaver,
        hentOppgaveSide,
        sideindeks,
        forrigeSide,
        nesteSide,
        hentSidetall,
    } = useOppgaver();

    return (
        <div>
            <div className={'oppgavelistHeader'}>
                <Systemtittel className={'oppgavelistHeader__tittel'}>
                    Oppgaveliste - visning
                </Systemtittel>
                <div className={'oppgavelistHeader__navigator'}>
                    |
                    <span className={'oppgavelistHeader__navigator__felt'}>
                        Vise {hentOppgaveSide().length} av{' '}
                        {oppgaver.status === RessursStatus.SUKSESS ? oppgaver.data.length : 0}{' '}
                        oppgaver
                    </span>
                    |
                    <span className={'oppgavelistHeader__navigator__felt'}>
                        Side {sideindeks + 1} av {hentSidetall()}
                    </span>
                    |
                    <span className={'oppgavelistHeader__navigator__felt'}>
                        {sideindeks <= 0 ? (
                            'Forrige'
                        ) : (
                            <Lenke href="#" onClick={() => forrigeSide()}>
                                Forrige
                            </Lenke>
                        )}{' '}
                        {sideindeks >= hentSidetall() - 1 ? (
                            'Neste'
                        ) : (
                            <Lenke href="#" onClick={() => nesteSide()}>
                                Neste
                            </Lenke>
                        )}
                    </span>
                </div>
            </div>
            {oppgaver.status === RessursStatus.SUKSESS && oppgaver.data.length === 0 && (
                <Alertstripe type="info">Ingen oppgave</Alertstripe>
            )}
            {oppgaver.status === RessursStatus.FEILET && (
                <Alertstripe type="feil">{oppgaver.melding}</Alertstripe>
            )}
            {oppgaver.status === RessursStatus.HENTER && (
                <Alertstripe type="info">Henter...</Alertstripe>
            )}
            {oppgaver.status === RessursStatus.SUKSESS && oppgaver.data.length > 0 && (
                <div className="oppgavelist">
                    <table className="tabell">
                        <thead className="tabell__head">
                            <tr className="tabell__head__tr">
                                <th className={'regdato'}>Reg. dato</th>
                                <th>
                                    <div className={'oppgavetype'}>Oppgavetype</div>
                                </th>
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
                            {hentOppgaveSide().map((oppg: IOppgave, index) => (
                                <tr key={index}>
                                    <td className={'regdato'}>
                                        {intDatoTilNorskDato(oppg.opprettetTidspunkt)}
                                    </td>
                                    <td>
                                        <div className={'oppgavetype'}>
                                            {
                                                OppgavetypeFilter[
                                                    oppg.oppgavetype as keyof typeof OppgavetypeFilter
                                                ]
                                            }
                                        </div>
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
                                        {oppg.tilordnetRessurs
                                            ? oppg.tilordnetRessurs
                                            : 'Ikke tildelt'}
                                    </td>
                                    <td className={'handlinger'}>
                                        {OppgavetypeFilter[
                                            oppg.oppgavetype as keyof typeof OppgavetypeFilter
                                        ] === OppgavetypeFilter.JFR && (
                                            <a href={`/oppgaver/journalfør/${oppg.id}`}>
                                                Gå til oppg
                                            </a>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default OppgaveList;
