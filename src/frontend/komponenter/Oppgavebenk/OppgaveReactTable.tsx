import React, { useMemo } from 'react';

import { Column, TableOptions, useTable } from 'react-table';

import { RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../context/AppContext';
import { useOppgaver } from '../../context/OppgaverContext';
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

    const tableOptions: TableOptions<IOppgaveRad> = {
        columns,
        data,
    };

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable<IOppgaveRad>(tableOptions);

    return (
        <div>
            <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th
                                    {...column.getHeaderProps()}
                                    style={{
                                        borderBottom: 'solid 3px red',
                                        background: 'aliceblue',
                                        color: 'black',
                                        fontWeight: 'bold',
                                    }}
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
                                {row.cells.map(cell => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                            style={{
                                                padding: '10px',
                                                border: 'solid 1px gray',
                                                background: 'papayawhip',
                                            }}
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
