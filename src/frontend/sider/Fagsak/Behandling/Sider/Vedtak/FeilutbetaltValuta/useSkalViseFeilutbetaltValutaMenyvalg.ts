import { useBehandling } from '@hooks/useBehandling';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { useFeilutbetaltValutaTabellContext } from '@sider/Fagsak/Behandling/Sider/Vedtak/FeilutbetaltValuta/FeilutbetaltValutaTabellContext';
import { Behandlingstype } from '@typer/behandling';
import { BehandlingKategori } from '@typer/behandlingstema';

export function useSkalViseFeilutbetaltValutaMenyvalg() {
    const erLesevisning = useErLesevisning();
    const behandling = useBehandling();

    const { erFeilutbetaltValutaTabellSynlig } = useFeilutbetaltValutaTabellContext();

    return (
        behandling.type === Behandlingstype.REVURDERING &&
        behandling.kategori === BehandlingKategori.EØS &&
        !erLesevisning &&
        !erFeilutbetaltValutaTabellSynlig
    );
}
