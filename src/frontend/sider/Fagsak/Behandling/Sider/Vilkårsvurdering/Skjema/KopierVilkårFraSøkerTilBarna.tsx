import { useFeatureToggles } from '@hooks/useFeatureToggles';
import { useKopierVilkårFraSøkerTilBarna } from '@hooks/useKopierVilkårFraSøkerTilBarna';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { FeatureToggle } from '@typer/featureToggles';

import { FilesIcon } from '@navikt/aksel-icons';
import { Button, LocalAlert, VStack } from '@navikt/ds-react';
import { byggSuksessRessurs } from '@navikt/familie-typer';

export function KopierVilkårFraSøkerTilBarna() {
    const { behandling, settÅpenBehandling } = useBehandlingContext();
    const toggles = useFeatureToggles();

    const {
        mutate: kopierVilkårFraSøkerTilBarna,
        isPending: kopierVilkårFraSøkerTilBarnaIsPending,
        error: kopierVilkårFraSøkerTilBarnaError,
    } = useKopierVilkårFraSøkerTilBarna({
        onSuccess: behandling => settÅpenBehandling(byggSuksessRessurs(behandling)),
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
