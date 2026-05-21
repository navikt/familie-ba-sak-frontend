import { useFeatureToggles } from '@hooks/useFeatureToggles';
import { useUtfyllVilkårForBarnaAutomatisk } from '@hooks/useUtfyllVilkårForBarnaAutomatisk';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { FeatureToggle } from '@typer/featureToggles';

import { Button, LocalAlert, VStack } from '@navikt/ds-react';
import { byggSuksessRessurs } from '@navikt/familie-typer';

export function UtfyllVilkårForBarnaAutomatisk() {
    const { behandling, settÅpenBehandling } = useBehandlingContext();
    const toggles = useFeatureToggles();

    const {
        mutate: utfyllVilkårForBarnaAutomatisk,
        isPending: utfyllVilkårForBarnaAutomatiskIsPending,
        error: utfyllVilkårForBarnaAutomatiskError,
    } = useUtfyllVilkårForBarnaAutomatisk({
        onSuccess: behandling => settÅpenBehandling(byggSuksessRessurs(behandling)),
    });

    if (!toggles[FeatureToggle.kanGenerereBarnasVilkar]) {
        return null;
    }

    return (
        <VStack gap={'space-8'} marginBlock={'space-48 space-0'} width={'fit-content'}>
            {utfyllVilkårForBarnaAutomatiskError && (
                <LocalAlert status={'error'} size={'small'}>
                    <LocalAlert.Header>
                        <LocalAlert.Title>
                            {utfyllVilkårForBarnaAutomatiskError?.message ?? 'En ukjent feil oppstod.'}
                        </LocalAlert.Title>
                    </LocalAlert.Header>
                </LocalAlert>
            )}
            <div>
                <Button
                    variant={'primary'}
                    onClick={() => utfyllVilkårForBarnaAutomatisk({ behandlingId: behandling.behandlingId })}
                    loading={utfyllVilkårForBarnaAutomatiskIsPending}
                >
                    Fyll ut vilkår for barna automatisk
                </Button>
            </div>
        </VStack>
    );
}
