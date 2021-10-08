import React, { useMemo } from 'react';

import classNames from 'classnames';
import {
    Cell,
    Column,
    TableInstance,
    useSortBy,
    UseSortByInstanceProps,
    useTable,
} from 'react-table';

import { RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../context/AppContext';
import { useOppgaver } from '../../context/OppgaverContext';
import {
    getAriaSort,
    getSortLenkClassName,
    IOppgaveRad,
    kolonner,
    mapIOppgaverTilOppgaveRad,
    styleFraAccessorEllerId,
} from './OppgaveTabellUtils';

export const OppgaveTabell = () => {
    const { innloggetSaksbehandler } = useApp();
    const { oppgaver } = useOppgaver();

    const columns: ReadonlyArray<Column<IOppgaveRad>> = useMemo(() => kolonner, []);
    const data: ReadonlyArray<IOppgaveRad> = useMemo(() => {
        return oppgaver.status === RessursStatus.SUKSESS && oppgaver.data.oppgaver.length > 0
            ? mapIOppgaverTilOppgaveRad(oppgaver.data.oppgaver, innloggetSaksbehandler)
            : [];
    }, [oppgaver]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    }: TableInstance<IOppgaveRad> & UseSortByInstanceProps<IOppgaveRad> = useTable<IOppgaveRad>(
        {
            columns,
            data,
        },
        useSortBy
    );

    return (
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
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                >
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell: Cell<IOppgaveRad>) => (
                                    <td
                                        className={classNames([
                                            cell.column.isSorted ? 'tabell__td--sortert' : '',
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
    );
};
