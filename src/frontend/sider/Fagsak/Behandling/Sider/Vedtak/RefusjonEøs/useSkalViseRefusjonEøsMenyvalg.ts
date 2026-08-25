import { useBehandling } from '@hooks/useBehandling';
import { useFagsak } from '@hooks/useFagsak';
import { useRefusjonEøsTabellContext } from '@sider/Fagsak/Behandling/Sider/Vedtak/RefusjonEøs/RefusjonEøsTabellContext';
import { FagsakType } from '@typer/fagsak';
import { vedtakHarFortsattUtbetaling } from '@utils/vedtakUtils';

export function useSkalViseRefusjonEøsMenyvalg() {
    const fagsak = useFagsak();
    const behandling = useBehandling();

    const { erRefusjonEøsTabellSynlig } = useRefusjonEøsTabellContext();

    return (
        fagsak.fagsakType === FagsakType.NORMAL &&
        vedtakHarFortsattUtbetaling(behandling.resultat) &&
        !erRefusjonEøsTabellSynlig
    );
}
