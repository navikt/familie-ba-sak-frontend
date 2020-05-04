import React from 'react';
import {
    GjelderFilter,
    OppgavetypeFilter,
    PrioritetFilter,
    EnhetFilter,
    IOppgave,
} from '../../typer/oppgave';
import { RessursStatus } from '../../typer/ressurs';
import { useOppgaver, oppgaveSideLimit } from '../../context/OppgaverContext';
import { Systemtittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import Alertstripe from 'nav-frontend-alertstriper';
import { useOppgaver } from '../../context/OppgaverContext';
import OppgavelisteSaksbehandler from './OppgavelisteSaksbehandler';
import { ISaksbehandler } from '../../typer/saksbehandler';

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
    const {
        oppgaver,
        sortOppgave,
        hentOppgaveSide,
        sideindeks,
        forrigeSide,
        nesteSide,
        hentSidetall,
    } = useOppgaver();

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
        <div>
            {oppgaver.status === RessursStatus.SUKSESS && sideindeks >= 0 && (
                <div className={'oppgavelist-header'}>
                    <Systemtittel className={'oppgavelist-header__tittel'}>
                        Oppgaveliste - visning
                    </Systemtittel>
                    <div className={'oppgavelist-header__navigator'}>
                        |
                        <span className={'oppgavelist-header__navigator__felt'}>
                            Viser {sideindeks * oppgaveSideLimit + 1} -{' '}
                            {sideindeks * oppgaveSideLimit + hentOppgaveSide().length} av{' '}
                            {oppgaver.status === RessursStatus.SUKSESS ? oppgaver.data.length : 0}{' '}
                            oppgaver
                        </span>
                        |
                        <span className={'oppgavelist-header__navigator__felt'}>
                            Side {sideindeks + 1} av {hentSidetall()}
                        </span>
                        |
                        <span className={'oppgavelist-header__navigator__felt'}>
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
            )}
            {oppgaver.status === RessursStatus.SUKSESS && oppgaver.data.length === 0 && (
                <Alertstripe type="advarsel" className="oppgavelist-info">
                    Ingen oppgaver
                </Alertstripe>
            )}
            {oppgaver.status === RessursStatus.FEILET && (
                <Alertstripe type="feil" className="oppgavelist-info">
                    {oppgaver.melding}
                </Alertstripe>
            )}
            {oppgaver.status === RessursStatus.HENTER && (
                <Alertstripe type="info" className="oppgavelist-info">
                    Henter...
                </Alertstripe>
            )}
            {oppgaver.status === RessursStatus.SUKSESS && oppgaver.data.length > 0 && (
                <div className="oppgavelist">
                    <table className="tabell">
                        <thead className="tabell__head">
                            <tr className="tabell__head__tr">
                                <th className={'regdato'}>
                                    <Lenke
                                        href="#"
                                        onClick={() => onColumnSort('opprettetTidspunkt')}
                                    >
                                        Reg. dato
                                    </Lenke>
                                </th>
                                <th>
                                    <div className={'oppgavetype'}>
                                        <Lenke href="#" onClick={() => onColumnSort('oppgavetype')}>
                                            Oppgavetype
                                        </Lenke>
                                    </div>
                                </th>
                                <th className={'gjelder'}>
                                    <Lenke href="#" onClick={() => onColumnSort('behandlingstema')}>
                                        Gjelder
                                    </Lenke>
                                </th>
                                <th className={'frist'}>
                                    <Lenke
                                        href="#"
                                        onClick={() => onColumnSort('fristFerdigstillelse')}
                                    >
                                        Frist
                                    </Lenke>
                                </th>
                                <th className={'prioritet'}>
                                    <Lenke href="#" onClick={() => onColumnSort('prioritet')}>
                                        Prioritet
                                    </Lenke>
                                </th>
                                <th>
                                    <div className={'beskrivelse'}>Beskrivelse</div>
                                </th>
                                <th className={'bruker'}>Bruker</th>
                                <th>
                                    <div className={'enhet'}>
                                        <Lenke
                                            href="#"
                                            onClick={() => onColumnSort('tildeltEnhetsnr')}
                                        >
                                            Enhet
                                        </Lenke>
                                    </div>
                                </th>
                                <th className={'saksbehandler'}>
                                    <Lenke
                                        href="#"
                                        onClick={() => onColumnSort('tilordnetRessurs')}
                                    >
                                        Saksbehandler
                                    </Lenke>
                                </th>
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
                                    <td>
                                        <div className={'enhet'}>
                                            {getEnheter(oppg.tildeltEnhetsnr)}
                                        </div>
                                    </td>
                                    <td className={'saksbehandler'}>
                                        <OppgavelisteSaksbehandler
                                            oppgave={oppg}
                                            innloggetSaksbehandler={innloggetSaksbehandler}
                                        />
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
