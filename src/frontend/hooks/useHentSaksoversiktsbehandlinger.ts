import { useHentBehandlinger } from './useHentBehandlinger';
import {
    Saksoversiktbehandlingstype,
    type Saksoversiktsbehandling,
} from '../komponenter/Fagsak/Saksoversikt/utils';
import type { VisningBehandling } from '../komponenter/Fagsak/Saksoversikt/visningBehandling';
import type { IMinimalFagsak } from '../typer/fagsak';
import type { IKlagebehandling } from '../typer/klage';
import type { ITilbakekrevingsbehandling } from '../typer/tilbakekrevingsbehandling';

type QueryData = {
    barnetrygdbehandlinger: VisningBehandling[];
    klagebehandlinger: IKlagebehandling[] | undefined;
    tilbakekrevingsbehandlinger: ITilbakekrevingsbehandling[] | undefined;
};

function transformer(queryData: QueryData): Saksoversiktsbehandling[] | undefined {
    if (queryData === undefined) {
        return undefined;
    }

    const saksoversiktBarnetrygdbehandlinger: Saksoversiktsbehandling[] =
        queryData.barnetrygdbehandlinger.map(behandling => ({
            ...behandling,
            saksoversiktbehandlingstype: Saksoversiktbehandlingstype.BARNETRYGD,
        }));

    const saksoversiktKlagebehandlinger: Saksoversiktsbehandling[] = (
        queryData.klagebehandlinger ?? []
    ).map(behandling => ({
        ...behandling,
        saksoversiktbehandlingstype: Saksoversiktbehandlingstype.KLAGE,
    }));

    const saksoversiktTilbakekrevingsbehandlinger: Saksoversiktsbehandling[] = (
        queryData.tilbakekrevingsbehandlinger ?? []
    ).map(behandling => ({
        ...behandling,
        saksoversiktbehandlingstype: Saksoversiktbehandlingstype.TILBAKEBETALING,
    }));

    return [
        ...saksoversiktBarnetrygdbehandlinger,
        ...saksoversiktTilbakekrevingsbehandlinger,
        ...saksoversiktKlagebehandlinger,
    ];
}

export function useHentSaksoversiktsbehandlinger(fagsak: IMinimalFagsak) {
    const query = useHentBehandlinger(fagsak);
    return {
        ...query,
        data: transformer(query.data),
    };
}
