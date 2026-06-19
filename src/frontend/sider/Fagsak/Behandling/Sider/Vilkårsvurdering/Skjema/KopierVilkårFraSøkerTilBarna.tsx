import { useFeatureToggles } from '@hooks/useFeatureToggles';
import { useKopierVilkårFraSøkerTilBarna } from '@hooks/useKopierVilkårFraSøkerTilBarna';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { useEkspanderbareVilkårResultatRader } from '@sider/Fagsak/Behandling/Sider/Vilkårsvurdering/EkspanderbareVilkårResultatRaderContext';
import { useEkspanderbareVilkårsvurderingPaneler } from '@sider/Fagsak/Behandling/Sider/Vilkårsvurdering/EkspanderbareVilkårsvurderingPanelerContext';
import { FeatureToggle } from '@typer/featureToggles';
import { PersonType } from '@typer/person';
import { VilkårType } from '@typer/vilkår';

import { FilesIcon } from '@navikt/aksel-icons';
import { Button, LocalAlert, VStack } from '@navikt/ds-react';
import { byggSuksessRessurs } from '@navikt/familie-typer';

const VILKÅRTYPER_SOM_SKAL_ÅPNES = [VilkårType.BOR_MED_SØKER, VilkårType.BOSATT_I_RIKET];

export function KopierVilkårFraSøkerTilBarna() {
    const { behandling, settÅpenBehandling } = useBehandlingContext();
    const { ekspanderPanel, kollapsPanel } = useEkspanderbareVilkårsvurderingPaneler();
    const { ekspanderRad, kollapsRad } = useEkspanderbareVilkårResultatRader();
    const toggles = useFeatureToggles();

    const {
        mutate: kopierVilkårFraSøkerTilBarna,
        isPending: kopierVilkårFraSøkerTilBarnaIsPending,
        error: kopierVilkårFraSøkerTilBarnaError,
    } = useKopierVilkårFraSøkerTilBarna({
        onSuccess: behandling => {
            settÅpenBehandling(byggSuksessRessurs(behandling));

            const barnasIdenter = behandling.personer
                .filter(it => it.type === PersonType.BARN)
                .map(it => it.personIdent);

            behandling.personResultater
                .filter(it => barnasIdenter.includes(it.personIdent))
                .forEach(it => {
                    const ukompletteKopierteVilkårResultat = it.vilkårResultater
                        .filter(it => VILKÅRTYPER_SOM_SKAL_ÅPNES.includes(it.vilkårType))
                        .filter(it => it.utdypendeVilkårsvurderinger.length === 0)
                        .map(it => it.id);

                    if (ukompletteKopierteVilkårResultat.length > 0) {
                        ekspanderPanel(it.personIdent);
                        ukompletteKopierteVilkårResultat.forEach(it => ekspanderRad(it));
                    } else {
                        kollapsPanel(it.personIdent);
                    }

                    const andreVilkårResultat = it.vilkårResultater
                        .filter(it => !VILKÅRTYPER_SOM_SKAL_ÅPNES.includes(it.vilkårType))
                        .map(it => it.id);

                    andreVilkårResultat.forEach(it => kollapsRad(it));
                });
        },
    });

    if (!toggles[FeatureToggle.kanGenerereBarnasVilkar]) {
        return null;
    }

    return (
        <VStack gap={'space-8'} marginBlock={'space-48 space-0'} width={'fit-content'}>
            {kopierVilkårFraSøkerTilBarnaError && (
                <LocalAlert status={'error'} size={'small'}>
                    <LocalAlert.Header>
                        <LocalAlert.Title>
                            {kopierVilkårFraSøkerTilBarnaError?.message ?? 'En ukjent feil oppstod.'}
                        </LocalAlert.Title>
                    </LocalAlert.Header>
                </LocalAlert>
            )}
            <div>
                <Button
                    variant={'secondary'}
                    icon={<FilesIcon title="a11y-title" fontSize="1.5rem" />}
                    onClick={() => kopierVilkårFraSøkerTilBarna({ behandlingId: behandling.behandlingId })}
                    loading={kopierVilkårFraSøkerTilBarnaIsPending}
                >
                    Kopier vilkår fra søker til barna
                </Button>
            </div>
        </VStack>
    );
}
