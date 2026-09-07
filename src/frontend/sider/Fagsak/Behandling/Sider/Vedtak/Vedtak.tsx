import { Layout } from '@sider/Fagsak/Behandling/Sider/Vedtak/Layout/Layout';
import { useErBehandlingMedVedtaksbrev } from '@sider/Fagsak/Behandling/Sider/Vedtak/useErBehandlingMedVedtaksbrev';
import { BehandlingUtenVedtaksbrevAdvarsel } from './BehandlingUtenVedtaksbrevAdvarsel';
import { VedtaksbrevBygger } from './VedtaksbrevBygger';

export function Vedtak() {
    const erBehandlingMedVedtaksbrev = useErBehandlingMedVedtaksbrev();

    if (!erBehandlingMedVedtaksbrev) {
        return (
            <Layout>
                <BehandlingUtenVedtaksbrevAdvarsel />
            </Layout>
        );
    }

    return (
        <Layout>
            <VedtaksbrevBygger />
        </Layout>
    );
}
