import React from 'react';

import { behandlingsstatuser } from '../../../typer/behandling';
import type { IMinimalFagsak } from '../../../typer/fagsak';
import { datoformat, formaterIsoDato } from '../../../utils/formatter';
import type { Saksoversiktsbehandling } from './utlis';
import {
    finnÅrsak,
    hentBehandlingId,
    hentBehandlingstema,
    hentOpprettetTidspunkt,
    lagLenkePåResultat,
    lagLenkePåType,
} from './utlis';

interface IBehandlingshistorikkProps {
    minimalFagsak: IMinimalFagsak;
    saksoversiktsbehandling: Saksoversiktsbehandling;
}

export const Behandling: React.FC<IBehandlingshistorikkProps> = ({
    saksoversiktsbehandling,
    minimalFagsak,
}) => (
    <tr key={hentBehandlingId(saksoversiktsbehandling)}>
        <td
            children={`${formaterIsoDato(
                hentOpprettetTidspunkt(saksoversiktsbehandling),
                datoformat.DATO
            )}`}
        />
        <td>{finnÅrsak(saksoversiktsbehandling)}</td>
        <td>{lagLenkePåType(minimalFagsak.id, saksoversiktsbehandling)}</td>
        <td>{hentBehandlingstema(saksoversiktsbehandling)?.navn ?? '-'}</td>
        <td>{behandlingsstatuser[saksoversiktsbehandling.status]}</td>
        <td
            children={
                saksoversiktsbehandling.vedtaksdato
                    ? formaterIsoDato(saksoversiktsbehandling.vedtaksdato, datoformat.DATO)
                    : '-'
            }
        />
        <td>{lagLenkePåResultat(minimalFagsak, saksoversiktsbehandling)}</td>
    </tr>
);
