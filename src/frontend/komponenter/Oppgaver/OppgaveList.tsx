import 'nav-frontend-tabell-style';

import Alertstripe from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';
import { Systemtittel } from 'nav-frontend-typografi';
import React from 'react';

import { useOppgaver } from '../../context/OppgaverContext';
import {
    EnhetFilter,
    GjelderFilter,
    IOppgave,
    OppgavetypeFilter,
    PrioritetFilter,
} from '../../typer/oppgave';
import { RessursStatus } from '../../typer/ressurs';
import { ISaksbehandler } from '../../typer/saksbehandler';
import OppgavelisteNavigator from './OppgavelisteNavigator';
import OppgavelisteSaksbehandler from './OppgavelisteSaksbehandler';
import {
    ariaSortMap,
    feltLabelMap,
    FeltSortOrder,
    initFeltOrder,
    ListFelt,
    oppgaveFeltMap,
    sortLenkClassNameMap,
} from './OppgaveListFelt';

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

    const [feltSortOrder, settFeltSortOrder] = React.useState<Map<ListFelt, FeltSortOrder>>(
        initFeltOrder
    );

    const onColumnSort = (felt: ListFelt) => {
        sortOppgave(
            oppgaveFeltMap.get(felt) || 'ugjydigVerdi',
            feltSortOrder.get(felt) !== FeltSortOrder.ASCENDANT
        );
        settFeltSortOrder(
            new Map<ListFelt, FeltSortOrder>([
                ...initFeltOrder,
                [
                    felt,
                    feltSortOrder.get(felt) === FeltSortOrder.ASCENDANT
                        ? FeltSortOrder.DESCENDANT
                        : FeltSortOrder.ASCENDANT,
                ],
            ])
        );
    };

    const getAriaSort = (felt: ListFelt) =>
        ariaSortMap.get(feltSortOrder.get(felt) || FeltSortOrder.NONE);

    const getSortLenkClassName = (felt: ListFelt) =>
        sortLenkClassNameMap.get(feltSortOrder.get(felt) || FeltSortOrder.NONE);

    React.useEffect(() => {
        settFeltSortOrder(initFeltOrder);
    }, [oppgaver.status]);

    return (
        <div className={'oppgavelist'}>
            <div className={'oppgavelist__header'}>
                <Systemtittel className={'oppgavelist__header__tittel'}>Oppgaveliste</Systemtittel>
                <OppgavelisteNavigator />
            </div>
            <div>
                <table className="tabell">
                    <thead className="tabell__head">
                        <tr className="tabell__head__tr">
                            {Object.values(ListFelt).map(felt => {
                                return feltSortOrder.get(felt) ? (
                                    <th
                                        role="columnheader"
                                        aria-sort={getAriaSort(felt)}
                                        className={getSortLenkClassName(felt)}
                                        key={felt}
                                    >
                                        <div
                                            className={
                                                'oppgavelist__tabell-' + oppgaveFeltMap.get(felt)
                                            }
                                        >
                                            <Lenke href="#" onClick={() => onColumnSort(felt)}>
                                                {feltLabelMap.get(felt)}
                                            </Lenke>
                                        </div>
                                    </th>
                                ) : (
                                    <th key={felt}>
                                        <div
                                            className={
                                                'oppgavelist__tabell-' + oppgaveFeltMap.get(felt)
                                            }
                                        >
                                            {feltLabelMap.get(felt)}
                                        </div>
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    {oppgaver.status === RessursStatus.SUKSESS && oppgaver.data.length > 0 && (
                        <tbody className="tabell__body">
                            {hentOppgaveSide().map((oppg: IOppgave, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className={'oppgavelist__tabell-opprettetTidspunkt'}>
                                            {intDatoTilNorskDato(oppg.opprettetTidspunkt)}
                                        </div>
                                    </td>
                                    <td>
                                        <div className={'oppgavelist__tabell-oppgavetype'}>
                                            {
                                                OppgavetypeFilter[
                                                    oppg.oppgavetype as keyof typeof OppgavetypeFilter
                                                ]
                                            }
                                        </div>
                                    </td>
                                    <td>
                                        <div className={'oppgavelist__tabell-behandlingstema'}>
                                            {oppg.behandlingstema
                                                ? GjelderFilter[
                                                      oppg.behandlingstema as keyof typeof GjelderFilter
                                                  ]
                                                : 'Ikke satt'}
                                        </div>
                                    </td>
                                    <td>
                                        <div className={'oppgavelist__tabell-fristFerdigstillelse'}>
                                            {intDatoTilNorskDato(oppg.fristFerdigstillelse)}
                                        </div>
                                    </td>
                                    <td>
                                        <div className={'oppgavelist__tabell-prioritet'}>
                                            {
                                                PrioritetFilter[
                                                    oppg.prioritet as keyof typeof PrioritetFilter
                                                ]
                                            }
                                        </div>
                                    </td>
                                    <td>
                                        <div className={'oppgavelist__tabell-aktoerId'}>
                                            {oppg.aktoerId}
                                        </div>
                                    </td>
                                    <td>
                                        <div className={'oppgavelist__tabell-tildeltEnhetsnr'}>
                                            {getEnheter(oppg.tildeltEnhetsnr)}
                                        </div>
                                    </td>
                                    <td>
                                        <div className={'oppgavelist__tabell-tilordnetRessurs'}>
                                            <OppgavelisteSaksbehandler
                                                oppgave={oppg}
                                                innloggetSaksbehandler={innloggetSaksbehandler}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div className={'oppgavelist__tabell-handlinger'}>
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
                                        <div className={'oppgavelist__tabell-beskrivelse'}>
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
