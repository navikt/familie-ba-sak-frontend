import React from 'react';

import { Table } from '@navikt/ds-react';

import type { Saksoversiktsbehandling } from './utils';
import {
    finnÅrsak,
    hentBehandlingId,
    hentBehandlingstema,
    hentOpprettetTidspunkt,
    lagLenkePåResultat,
    lagLenkePåType,
} from './utils';
import { behandlingsstatuser } from '../../../typer/behandling';
import type { IMinimalFagsak } from '../../../typer/fagsak';
import { Datoformat } from '../../../utils/dato';
import { formaterIsoDato } from '../../../utils/formatter';

interface IBehandlingshistorikkProps {
    minimalFagsak: IMinimalFagsak;
    saksoversiktsbehandling: Saksoversiktsbehandling;
}

export const Behandling: React.FC<IBehandlingshistorikkProps> = ({
    saksoversiktsbehandling,
    minimalFagsak,
}) => (
    <Table.Row key={hentBehandlingId(saksoversiktsbehandling)}>
        <Table.DataCell
            children={`${formaterIsoDato(
                hentOpprettetTidspunkt(saksoversiktsbehandling),
                Datoformat.DATO
            )}`}
        />
        <Table.DataCell>{finnÅrsak(saksoversiktsbehandling)}</Table.DataCell>
        <Table.DataCell>{lagLenkePåType(minimalFagsak.id, saksoversiktsbehandling)}</Table.DataCell>
        <Table.DataCell>{hentBehandlingstema(saksoversiktsbehandling)?.navn ?? '-'}</Table.DataCell>
        <Table.DataCell>{behandlingsstatuser[saksoversiktsbehandling.status]}</Table.DataCell>
        <Table.DataCell
            children={
                saksoversiktsbehandling.vedtaksdato
                    ? formaterIsoDato(saksoversiktsbehandling.vedtaksdato, Datoformat.DATO)
                    : '-'
            }
        />
        <Table.DataCell>
            {lagLenkePåResultat(minimalFagsak, saksoversiktsbehandling)}
        </Table.DataCell>
    </Table.Row>
);
