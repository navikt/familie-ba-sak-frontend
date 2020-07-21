import Alertstripe from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';
import 'nav-frontend-tabell-style';
import { Systemtittel } from 'nav-frontend-typografi';
import React from 'react';
import { useApp } from '../../context/AppContext';
import { useOppgaver } from '../../context/OppgaverContext';
import {
    EnhetFilter,
    GjelderFilter,
    IOppgave,
    OppgavetypeFilter,
    PrioritetFilter,
} from '../../typer/oppgave';
import { RessursStatus } from '@navikt/familie-typer';
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
import classNames from 'classnames';

const intDatoTilNorskDato = (intDato: string) => {
    return `${intDato.substr(8, 2)}.${intDato.substr(5, 2)}.${intDato.substr(2, 2)}`;
};

const getEnheter = (enhetId: string) => {
    const index = Object.keys(EnhetFilter).findIndex(k => k === `E${enhetId}`);
    return index < 0 ? enhetId : Object.values(EnhetFilter)[index];
};

const OppgaveList: React.FunctionComponent = () => {
    const { oppgaver, sortOppgave, hentOppgaveSide } = useOppgaver();
    const { innloggetSaksbehandler } = useApp();

    const [feltSortOrder, settFeltSortOrder] = React.useState<Map<ListFelt, FeltSortOrder>>(
        initFeltOrder
    );

    const onColumnSort = (felt: ListFelt) => {
        const feltSort = feltSortOrder.get(felt);

        sortOppgave(
            oppgaveFeltMap.get(felt) || 'ugyldigVerdi',
            feltSort !== FeltSortOrder.ASCENDANT
        );
        settFeltSortOrder(
            new Map<ListFelt, FeltSortOrder>([
                ...initFeltOrder,
                [
                    felt,
                    feltSort === FeltSortOrder.ASCENDANT
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

    const sortertClassName = (felt: ListFelt) =>
        feltSortOrder.get(felt) !== FeltSortOrder.NONE ? 'tabell__td--sortert' : '';

    React.useEffect(() => {
        settFeltSortOrder(initFeltOrder);
    }, [oppgaver.status]);

    return (
        <div className={'oppgavelist'}>
            <div className={'oppgavelist__header'}>
                <Systemtittel>Oppgaveliste</Systemtittel>
                <OppgavelisteNavigator />
            </div>
            <div>
                <table className="tabell">
                    <thead>
                        <tr>
                            {Object.values(ListFelt).map(felt => {
                                return feltSortOrder.get(felt) ? (
                                    <th
                                        role="columnheader"
                                        aria-sort={getAriaSort(felt)}
                                        className={classNames(
                                            getSortLenkClassName(felt),
                                            oppgaveFeltMap.get(felt)
                                        )}
                                        key={felt}
                                    >
                                        <Lenke href="#" onClick={() => onColumnSort(felt)}>
                                            {feltLabelMap.get(felt)}
                                        </Lenke>
                                    </th>
                                ) : (
                                    <th key={felt} className={oppgaveFeltMap.get(felt)}>
                                        {feltLabelMap.get(felt)}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    {oppgaver.status === RessursStatus.SUKSESS &&
                        oppgaver.data.oppgaver.length > 0 && (
                            <tbody>
                                {hentOppgaveSide().map((oppg: IOppgave, index) => (
                                    <tr key={index}>
                                        <td
                                            className={sortertClassName(
                                                ListFelt.OPPRETTET_TIDSPUNKT
                                            )}
                                        >
                                            {intDatoTilNorskDato(oppg.opprettetTidspunkt)}
                                        </td>
                                        <td
                                            className={classNames(
                                                'oppgavetype',
                                                sortertClassName(ListFelt.OPPGAVETYPE)
                                            )}
                                        >
                                            {
                                                OppgavetypeFilter[
                                                    oppg.oppgavetype as keyof typeof OppgavetypeFilter
                                                ]
                                            }
                                        </td>
                                        <td className={sortertClassName(ListFelt.BEHANDLINGSTEMA)}>
                                            {oppg.behandlingstema
                                                ? GjelderFilter[
                                                      oppg.behandlingstema as keyof typeof GjelderFilter
                                                  ]
                                                : 'Ikke satt'}
                                        </td>
                                        <td
                                            className={sortertClassName(
                                                ListFelt.FRIST_FERDIGSTILLELSE
                                            )}
                                        >
                                            {intDatoTilNorskDato(oppg.fristFerdigstillelse)}
                                        </td>
                                        <td className={sortertClassName(ListFelt.PRIORITET)}>
                                            {
                                                PrioritetFilter[
                                                    oppg.prioritet as keyof typeof PrioritetFilter
                                                ]
                                            }
                                        </td>
                                        <td>{oppg.aktoerId}</td>
                                        <td
                                            className={classNames(
                                                'tildelt-enhetsnr',
                                                sortertClassName(ListFelt.TILDELT_ENHETSNR)
                                            )}
                                        >
                                            {getEnheter(oppg.tildeltEnhetsnr)}
                                        </td>
                                        <td
                                            className={classNames(
                                                'tilordnet-ressurs',
                                                sortertClassName(ListFelt.TILORDNET_RESSURS)
                                            )}
                                        >
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
                                        <td className={'beskrivelse'}>{oppg.beskrivelse}</td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                </table>
            </div>
            {oppgaver.status === RessursStatus.SUKSESS && oppgaver.data.oppgaver.length === 0 && (
                <Alertstripe type="advarsel" className="oppgavelist__info">
                    Ingen oppgaver
                </Alertstripe>
            )}
            {oppgaver.status === RessursStatus.FEILET && (
                <Alertstripe type="feil" className="oppgavelist__info">
                    {oppgaver.frontendFeilmelding}
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
