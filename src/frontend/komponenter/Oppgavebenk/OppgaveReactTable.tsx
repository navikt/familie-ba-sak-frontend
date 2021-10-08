import React, { useMemo } from 'react';

import {
    Cell,
    Column,
    ColumnInstance,
    TableInstance,
    useSortBy,
    UseSortByInstanceProps,
    useTable,
} from 'react-table';

import { RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../context/AppContext';
import { useOppgaver } from '../../context/OppgaverContext';
import { ariaSortMap, FeltSortOrder } from './oppgavefelter';
import { IOppgaveRad, kolonner, mapIOppgaverTilOppgaveRad } from './OppgaveReactTableUtilsRenameMe';

export const OppgaveReactTable = () => {
    const { innloggetSaksbehandler } = useApp();
    const { oppgaver } = useOppgaver();

    const columns: ReadonlyArray<Column<IOppgaveRad>> = useMemo(() => kolonner, []);
    const data: ReadonlyArray<IOppgaveRad> = useMemo(() => {
        return oppgaver.status === RessursStatus.SUKSESS && oppgaver.data.oppgaver.length > 0
            ? mapIOppgaverTilOppgaveRad(oppgaver.data.oppgaver, innloggetSaksbehandler)
            : [];
    }, [oppgaver]);

    const instance: TableInstance<IOppgaveRad> & UseSortByInstanceProps<IOppgaveRad> =
        useTable<IOppgaveRad>(
            {
                columns,
                data,
            },
            useSortBy
        );
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = instance;

    const getAriaSort = (
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

    const getSortLenkClassName = (_: ColumnInstance<IOppgaveRad>) => {
        return 'tabell__th--sortert-desc';
    };

    return (
        <div className={'oppgavelist'}>
            <table className="tabell" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => {
                                return (
                                    <th
                                        role="columnheader"
                                        aria-sort={getAriaSort(column)}
                                        className={getSortLenkClassName(column)}
                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                    >
                                        {column.render('Header')}
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell: Cell<IOppgaveRad>) => {
                                    return (
                                        <td
                                            className={
                                                cell.column.isSorted ? 'tabell__td--sortert' : ''
                                            }
                                            {...cell.getCellProps()}
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
