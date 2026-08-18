import { Table } from '@navikt/ds-react';
import { behandlingsstatuser } from '../../../typer/behandling';
import { Datoformat, isoStringTilFormatertString } from '../../../utils/dato';
import { useFagsakContext } from '../FagsakContext';
import type { Saksoversiktsbehandling } from './utils';
import {
    finnÅrsak,
    hentBehandlingId,
    hentBehandlingstema,
    hentOpprettetTidspunkt,
    lagLenkePåResultat,
    lagLenkePåType,
} from './utils';

interface Props {
    saksoversiktsbehandling: Saksoversiktsbehandling;
}

export function Behandling({ saksoversiktsbehandling }: Props) {
    const { fagsak } = useFagsakContext();

    return (
        <Table.Row key={hentBehandlingId(saksoversiktsbehandling)}>
            <Table.DataCell>
                {`${isoStringTilFormatertString({
                    isoString: hentOpprettetTidspunkt(saksoversiktsbehandling),
                    tilFormat: Datoformat.DATO,
                })}`}
            </Table.DataCell>
            <Table.DataCell>{finnÅrsak(saksoversiktsbehandling)}</Table.DataCell>
            <Table.DataCell>{lagLenkePåType(fagsak.id, saksoversiktsbehandling)}</Table.DataCell>
            <Table.DataCell>{hentBehandlingstema(saksoversiktsbehandling)?.navn ?? '-'}</Table.DataCell>
            <Table.DataCell>{behandlingsstatuser[saksoversiktsbehandling.status]}</Table.DataCell>
            <Table.DataCell>
                {isoStringTilFormatertString({
                    isoString: saksoversiktsbehandling.vedtaksdato,
                    tilFormat: Datoformat.DATO,
                    defaultString: '-',
                })}
            </Table.DataCell>
            <Table.DataCell>{lagLenkePåResultat(fagsak.id, saksoversiktsbehandling)}</Table.DataCell>
        </Table.Row>
    );
}
