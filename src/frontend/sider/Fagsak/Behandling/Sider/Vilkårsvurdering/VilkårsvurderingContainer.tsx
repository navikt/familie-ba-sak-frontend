import { EkspanderbareVilkårResultatRaderProvider } from '@sider/Fagsak/Behandling/Sider/Vilkårsvurdering/EkspanderbareVilkårResultatRaderContext';
import { EkspanderbareVilkårsvurderingPanelerProvider } from '@sider/Fagsak/Behandling/Sider/Vilkårsvurdering/EkspanderbareVilkårsvurderingPanelerContext';
import { Vilkårsvurdering } from '@sider/Fagsak/Behandling/Sider/Vilkårsvurdering/Vilkårsvurdering';
import { VilkårsvurderingProvider } from '@sider/Fagsak/Behandling/Sider/Vilkårsvurdering/VilkårsvurderingContext';

export function VilkårsvurderingContainer() {
    return (
        <VilkårsvurderingProvider>
            <EkspanderbareVilkårsvurderingPanelerProvider>
                <EkspanderbareVilkårResultatRaderProvider>
                    <Vilkårsvurdering />
                </EkspanderbareVilkårResultatRaderProvider>
            </EkspanderbareVilkårsvurderingPanelerProvider>
        </VilkårsvurderingProvider>
    );
}
