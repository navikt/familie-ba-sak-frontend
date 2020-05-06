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
import OppgavelisteSaksbehandler from './OppgavelisteSaksbehandler';
import { ISaksbehandler } from '../../typer/saksbehandler';
import OppgavelisteNavigator from './OppgavelisteNavigator';

const intDatoTilNorskDato = (intDato: string) => {
    return `${intDato.substr(8, 2)}.${intDato.substr(5, 2)}.${intDato.substr(2, 2)}`;
};

const getEnheter = (enhetId: string) => {
    const index = Object.keys(EnhetFilter).findIndex(k => k === `E${enhetId}`);
    return index < 0 ? enhetId : Object.values(EnhetFilter)[index];
};

interface IOppgaveListProps {
    innloggetSaksbehandler?: ISaksbehandler;
}

const OppgaveList: React.FunctionComponent<IOppgaveListProps> = ({ innloggetSaksbehandler }) => {
    const { oppgaver, sortOppgave, hentOppgaveSide } = useOppgaver();

    interface IFeltOrder {
        [key: string]: boolean;
    }

    const initFeltOrder: IFeltOrder = {
        opprettetTidspunkt: true,
        oppgavetype: true,
        behandlingstema: true,
        fristFerdigstillelse: true,
        prioritet: true,
        tildeltEnhetsnr: true,
        tilordnetRessurs: true,
    };

    const [feltOrder, settFeltOrder] = React.useState<IFeltOrder>(initFeltOrder);

    const onColumnSort = (felt: string) => {
        sortOppgave(felt, feltOrder[felt]);
        settFeltOrder({
            ...feltOrder,
            [felt]: !feltOrder[felt],
        });
    };

    React.useEffect(() => {
        settFeltOrder(initFeltOrder);
    }, [oppgaver.status]);

    return (
        <div className={'oppgavelist'}>
            <div className={'oppgavelist__header'}>
                <Systemtittel className={'oppgavelist__header__tittel'}>
                    Oppgaveliste - visning
                </Systemtittel>
                <OppgavelisteNavigator />
            </div>
            <div>
                <table className="tabell">
                    <thead className="tabell__head">
                        <tr className="tabell__head__tr">
                            <th>
                                <div className={'oppgavelist__tabell__regdato'}>
                                    <Lenke
                                        href="#"
                                        onClick={() => onColumnSort('opprettetTidspunkt')}
                                    >
                                        Reg. dato
                                    </Lenke>
                                </div>
                            </th>
                            <th>
                                <div className={'oppgavelist__tabell__oppgavetype'}>
                                    <Lenke href="#" onClick={() => onColumnSort('oppgavetype')}>
                                        Oppgavetype
                                    </Lenke>
                                </div>
                            </th>
                            <th>
                                <div className={'oppgavelist__tabell__gjelder'}>
                                    <Lenke href="#" onClick={() => onColumnSort('behandlingstema')}>
                                        Gjelder
                                    </Lenke>
                                </div>
                            </th>
                            <th>
                                <div className={'oppgavelist__tabell__frist'}>
                                    <Lenke
                                        href="#"
                                        onClick={() => onColumnSort('fristFerdigstillelse')}
                                    >
                                        Frist
                                    </Lenke>
                                </div>
                            </th>
                            <th>
                                <div className={'oppgavelist__tabell__prioritet'}>
                                    <Lenke href="#" onClick={() => onColumnSort('prioritet')}>
                                        Prioritet
                                    </Lenke>
                                </div>
                            </th>
                            <th>
                                <div className={'oppgavelist__tabell__bruker'}>Bruker</div>
                            </th>
                            <th>
                                <div className={'oppgavelist__tabell__enhet'}>
                                    <Lenke href="#" onClick={() => onColumnSort('tildeltEnhetsnr')}>
                                        Enhet
                                    </Lenke>
                                </div>
                            </th>
                            <th>
                                <div className={'oppgavelist__tabell__saksbehandler'}>
                                    <Lenke
                                        href="#"
                                        onClick={() => onColumnSort('tilordnetRessurs')}
                                    >
                                        Saksbehandler
                                    </Lenke>
                                </div>
                            </th>
                            <th>
                                <div className={'oppgavelist__tabell__handlinger'}>Handlinger</div>
                            </th>
                            <th>
                                <div className={'oppgavelist__tabell__beskrivelse'}>
                                    Beskrivelse
                                </div>
                            </th>
                        </tr>
                    </thead>
                    {oppgaver.status === RessursStatus.SUKSESS && oppgaver.data.length > 0 && (
                        <tbody className="tabell__body">
                            {hentOppgaveSide().map((oppg: IOppgave, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className={'oppgavelist__tabell__regdato'}>
                                            {intDatoTilNorskDato(oppg.opprettetTidspunkt)}
                                        </div>
                                    </td>
                                    <td>
                                        <div className={'oppgavelist__tabell__oppgavetype'}>
                                            {
                                                OppgavetypeFilter[
                                                    oppg.oppgavetype as keyof typeof OppgavetypeFilter
                                                ]
                                            }
                                        </div>
                                    </td>
                                    <td>
                                        <div className={'oppgavelist__tabell__gjelder'}>
                                            {oppg.behandlingstema
                                                ? GjelderFilter[
                                                      oppg.behandlingstema as keyof typeof GjelderFilter
                                                  ]
                                                : 'Ikke satt'}
                                        </div>
                                    </td>
                                    <td>
                                        <div className={'oppgavelist__tabell__frist'}>
                                            {intDatoTilNorskDato(oppg.fristFerdigstillelse)}
                                        </div>
                                    </td>
                                    <td>
                                        <div className={'oppgavelist__tabell__prioritet'}>
                                            {
                                                PrioritetFilter[
                                                    oppg.prioritet as keyof typeof PrioritetFilter
                                                ]
                                            }
                                        </div>
                                    </td>
                                    <td>
                                        <div className={'oppgavelist__tabell__bruker'}>
                                            {oppg.aktoerId}
                                        </div>
                                    </td>
                                    <td>
                                        <div className={'oppgavelist__tabell__enhet'}>
                                            {getEnheter(oppg.tildeltEnhetsnr)}
                                        </div>
                                    </td>
                                    <td>
                                        <div className={'oppgavelist__tabell__saksbehandler'}>
                                            <OppgavelisteSaksbehandler
                                                oppgave={oppg}
                                                innloggetSaksbehandler={innloggetSaksbehandler}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div className={'oppgavelist__tabell__handlinger'}>
                                            {OppgavetypeFilter[
                                                oppg.oppgavetype as keyof typeof OppgavetypeFilter
                                            ] === OppgavetypeFilter.JFR && (
                                                <a href={`/oppgaver/journalfør/${oppg.id}`}>
                                                    Gå til oppg
                                                </a>
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        <div className={'oppgavelist__tabell__beskrivelse'}>
                                            {oppg.beskrivelse}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
            {oppgaver.status === RessursStatus.SUKSESS && oppgaver.data.length === 0 && (
                <Alertstripe type="advarsel" className="oppgavelist__info">
                    Ingen oppgaver
                </Alertstripe>
            )}
            {oppgaver.status === RessursStatus.FEILET && (
                <Alertstripe type="feil" className="oppgavelist__info">
                    {oppgaver.melding}
                </Alertstripe>
            )}
            {oppgaver.status === RessursStatus.HENTER && (
                <Alertstripe type="info" className="oppgavelist__info">
                    Henter...
                </Alertstripe>
            )}
        </div>
    );
};

export default OppgaveList;
