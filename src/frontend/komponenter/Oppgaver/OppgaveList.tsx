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
import 'nav-frontend-tabell-style';

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

enum ListFelt {
    OPPRETTET_TIDSPUNKT = 'OPPRETTET_TIDSPUNKT',
    OPPGAVETYPE = 'OPPGAVETYPE',
    BEHANDLINGSTEMA = 'BEHANDLINGSTEMA',
    FRIST_FERDIGSTILLELSE = 'FRIST_FERDIGSTILLELSE',
    PRIORITET = 'PRIORITET',
    AKTOER_ID = 'AKTOER_ID',
    TILDELT_ENHETSNR = 'TILDELT_ENHETSNR',
    TILORDNET_RESSURS = 'TILORDNET_RESSURS',
    HANDLINGER = 'HANDLINGER',
    BESKRIVELSE = 'BESKRIVELSE',
}

enum FeltSortOrder {
    NONE = 'none',
    ASCENDANT = 'ascendant',
    DESCENDANT = 'descendant',
}

const feltLabelMap = new Map<ListFelt, string>([
    [ListFelt.OPPRETTET_TIDSPUNKT, 'Reg. dato'],
    [ListFelt.OPPGAVETYPE, 'Oppgavetype'],
    [ListFelt.BEHANDLINGSTEMA, 'Gjelder'],
    [ListFelt.FRIST_FERDIGSTILLELSE, 'Frist'],
    [ListFelt.PRIORITET, 'Prioritet'],
    [ListFelt.AKTOER_ID, 'Bruker'],
    [ListFelt.TILDELT_ENHETSNR, 'Enhet'],
    [ListFelt.TILORDNET_RESSURS, 'Saksbehandler'],
    [ListFelt.HANDLINGER, 'Handlinger'],
    [ListFelt.BESKRIVELSE, 'Beskrivelse'],
]);

const oppgaveFeltMap = new Map<ListFelt, string>([
    [ListFelt.OPPRETTET_TIDSPUNKT, 'opprettetTidspunkt'],
    [ListFelt.OPPGAVETYPE, 'oppgavetype'],
    [ListFelt.BEHANDLINGSTEMA, 'behandlingstema'],
    [ListFelt.FRIST_FERDIGSTILLELSE, 'fristFerdigstillelse'],
    [ListFelt.PRIORITET, 'prioritet'],
    [ListFelt.AKTOER_ID, 'aktoerId'],
    [ListFelt.TILDELT_ENHETSNR, 'tildeltEnhetsnr'],
    [ListFelt.TILORDNET_RESSURS, 'tilordnetRessurs'],
    [ListFelt.HANDLINGER, 'handlinger'],
    [ListFelt.BESKRIVELSE, 'beskrivelse'],
]);

const ariaSortMap = new Map<FeltSortOrder, 'none' | 'descending' | 'ascending'>([
    [FeltSortOrder.NONE, 'none'],
    [FeltSortOrder.DESCENDANT, 'descending'],
    [FeltSortOrder.ASCENDANT, 'ascending'],
]);

const sortLenkClassNameMap = new Map<
    FeltSortOrder,
    '' | 'tabell__th--sortert-desc' | 'tabell__th--sortert-asc'
>([
    [FeltSortOrder.NONE, ''],
    [FeltSortOrder.DESCENDANT, 'tabell__th--sortert-desc'],
    [FeltSortOrder.ASCENDANT, 'tabell__th--sortert-asc'],
]);

const initFeltOrder = new Map<ListFelt, FeltSortOrder>([
    [ListFelt.OPPRETTET_TIDSPUNKT, FeltSortOrder.NONE],
    [ListFelt.OPPGAVETYPE, FeltSortOrder.NONE],
    [ListFelt.BEHANDLINGSTEMA, FeltSortOrder.NONE],
    [ListFelt.FRIST_FERDIGSTILLELSE, FeltSortOrder.NONE],
    [ListFelt.PRIORITET, FeltSortOrder.NONE],
    [ListFelt.TILDELT_ENHETSNR, FeltSortOrder.NONE],
    [ListFelt.TILORDNET_RESSURS, FeltSortOrder.NONE],
]);

const OppgaveList: React.FunctionComponent<IOppgaveListProps> = ({ innloggetSaksbehandler }) => {
    const { oppgaver, sortOppgave, hentOppgaveSide } = useOppgaver();

    const [feltSortOrder, settFeltSortOrder] = React.useState<Map<ListFelt, FeltSortOrder>>(
        initFeltOrder
    );

    const onColumnSort = (felt: ListFelt) => {
        sortOppgave(oppgaveFeltMap.get(felt)!, feltSortOrder.get(felt) !== FeltSortOrder.ASCENDANT);
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

    const getAriaSort = (felt: ListFelt) => ariaSortMap.get(feltSortOrder.get(felt)!);

    const getSortLenkClassName = (felt: ListFelt) =>
        sortLenkClassNameMap.get(feltSortOrder.get(felt)!);

    React.useEffect(() => {
        settFeltSortOrder(initFeltOrder);
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
                            {Object.values(ListFelt).map(felt => {
                                return feltSortOrder.get(felt) ? (
                                    <th
                                        role="columnheader"
                                        aria-sort={getAriaSort(felt)}
                                        className={getSortLenkClassName(felt)}
                                    >
                                        <div
                                            className={
                                                'oppgavelist__tabell__' + oppgaveFeltMap.get(felt)
                                            }
                                        >
                                            <Lenke href="#" onClick={() => onColumnSort(felt)}>
                                                {feltLabelMap.get(felt)}
                                            </Lenke>
                                        </div>
                                    </th>
                                ) : (
                                    <th>
                                        <div
                                            className={
                                                'oppgavelist__tabell__' + oppgaveFeltMap.get(felt)
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
                                        <div className={'oppgavelist__tabell__opprettetTidspunkt'}>
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
                                        <div className={'oppgavelist__tabell__behandlingstema'}>
                                            {oppg.behandlingstema
                                                ? GjelderFilter[
                                                      oppg.behandlingstema as keyof typeof GjelderFilter
                                                  ]
                                                : 'Ikke satt'}
                                        </div>
                                    </td>
                                    <td>
                                        <div
                                            className={'oppgavelist__tabell__fristFerdigstillelse'}
                                        >
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
                                        <div className={'oppgavelist__tabell__aktoerId'}>
                                            {oppg.aktoerId}
                                        </div>
                                    </td>
                                    <td>
                                        <div className={'oppgavelist__tabell__tildeltEnhetsnr'}>
                                            {getEnheter(oppg.tildeltEnhetsnr)}
                                        </div>
                                    </td>
                                    <td>
                                        <div className={'oppgavelist__tabell__tilordnetRessurs'}>
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
