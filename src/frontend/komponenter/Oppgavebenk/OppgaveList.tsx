import React from 'react';

import classNames from 'classnames';
import { Cell, ColumnInstance } from 'react-table';

import Alertstripe from 'nav-frontend-alertstriper';
import { Systemtittel } from 'nav-frontend-typografi';

import { RessursStatus } from '@navikt/familie-typer';

import { useOppgaver } from '../../context/OppgaverContext';
import { IOppgaveRad } from '../../context/OppgaverContextUtils';
import { ariaSortMap, FeltSortOrder } from './oppgavefelter';
import OppgavelisteNavigator from './OppgavelisteNavigator';

export const styleFraAccessorEllerId = (id: string) => {
    switch (id) {
        case 'beskrivelse':
            return 'beskrivelse';
        case 'tilordnetRessurs':
            return 'tilordnet-ressurs';
        case 'handlinger':
            return 'handlinger';
        default:
            return null;
    }
};

export const getAriaSort = (
    column: ColumnInstance<IOppgaveRad>
): 'none' | 'descending' | 'ascending' | undefined => {
    if (column.isSortedDesc === true) {
        return ariaSortMap.get(FeltSortOrder.DESCENDANT);
    }
    if (column.isSortedDesc === false) {
        return ariaSortMap.get(FeltSortOrder.ASCENDANT);
    }
    return ariaSortMap.get(FeltSortOrder.NONE);
};

export const getSortLenkClassName = (_: ColumnInstance<IOppgaveRad>) => {
    return 'tabell__th--sortert-desc';
};

const OppgaveList: React.FunctionComponent = () => {
    const { oppgaver, tableInstance } = useOppgaver();

    const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } = tableInstance;

    return (
        <div className={'oppgavelist'}>
            <div className={'oppgavelist__header'}>
                <Systemtittel>Oppgaveliste</Systemtittel>
                <OppgavelisteNavigator />
            </div>
            <div>
                <div className={'oppgavelist'}>
                    <table className="tabell" {...getTableProps()}>
                        <thead>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th
                                            role="columnheader"
                                            aria-sort={getAriaSort(column)}
                                            className={getSortLenkClassName(column)}
                                            {...column.getHeaderProps(
                                                column.getSortByToggleProps()
                                            )}
                                        >
                                            {column.render('Header')}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page.map(row => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map((cell: Cell<IOppgaveRad>) => (
                                            <td
                                                className={classNames([
                                                    cell.column.isSorted
                                                        ? 'tabell__td--sortert'
                                                        : '',
                                                    styleFraAccessorEllerId(cell.column.id),
                                                ])}
                                                {...cell.getCellProps()}
                                            >
                                                {cell.render('Cell')}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {oppgaver.status === RessursStatus.SUKSESS && oppgaver.data.oppgaver.length === 0 && (
                <Alertstripe type="advarsel" className="oppgavelist__info">
                    Ingen oppgaver
                </Alertstripe>
            )}
            {(oppgaver.status === RessursStatus.FEILET ||
                oppgaver.status === RessursStatus.FUNKSJONELL_FEIL ||
                oppgaver.status === RessursStatus.IKKE_TILGANG) && (
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
