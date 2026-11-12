import { Table } from '@navikt/ds-react';
import { BehandlingProvider } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { EkspanderbareVilkårResultatRaderProvider } from '@sider/Fagsak/Behandling/Sider/Vilkårsvurdering/EkspanderbareVilkårResultatRaderContext';
import { FagsakProvider } from '@sider/Fagsak/FagsakContext';
import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import { render, TestProviders } from '@testutils/testrender';
import type { IBehandling } from '@typer/behandling';
import type { ReactElement, ReactNode } from 'react';

interface Options {
    behandling: IBehandling;
}

function Wrapper({ behandling, children }: { behandling: IBehandling; children: ReactNode }) {
    return (
        <TestProviders>
            <FagsakProvider fagsak={lagFagsak()}>
                <BehandlingProvider behandling={behandling}>
                    <EkspanderbareVilkårResultatRaderProvider>
                        <Table>
                            <Table.Body>{children}</Table.Body>
                        </Table>
                    </EkspanderbareVilkårResultatRaderProvider>
                </BehandlingProvider>
            </FagsakProvider>
        </TestProviders>
    );
}

export function renderIVilkårsvurdering(rad: ReactElement, { behandling }: Options) {
    return render(rad, { wrapper: ({ children }) => <Wrapper behandling={behandling}>{children}</Wrapper> });
}
