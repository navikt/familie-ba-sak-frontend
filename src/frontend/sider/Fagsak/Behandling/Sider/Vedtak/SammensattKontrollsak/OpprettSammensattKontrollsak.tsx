import { useBehandlingId } from '@hooks/useBehandlingId';
import { HentHistorikkinnslagQueryKeyFactory } from '@hooks/useHentHistorikkinnslag';
import { HentSammensattKontrollsakQueryKeyFactory } from '@hooks/useHentSammensattKontrollsak';
import { useOpprettSammensattKontrollsak } from '@hooks/useOpprettSammensattKontrollsak';
import { useQueryClient } from '@tanstack/react-query';

import { TasklistStartIcon } from '@navikt/aksel-icons';
import { ActionMenu, HStack, Loader } from '@navikt/ds-react';

export function OpprettSammensattKontrollsak() {
    const queryClient = useQueryClient();
    const behandlingId = useBehandlingId();

    const { mutate: opprettSammensattKontrollsak, isPending: opprettSammensattKontrollsakIsPending } =
        useOpprettSammensattKontrollsak(behandlingId, {
            onSuccess: sammensattKontrollsak => {
                queryClient.setQueryData(
                    HentSammensattKontrollsakQueryKeyFactory.behandling(behandlingId),
                    sammensattKontrollsak
                );
                queryClient.invalidateQueries({
                    queryKey: HentHistorikkinnslagQueryKeyFactory.historikkinnslag(behandlingId),
                });
            },
        });

    return (
        <ActionMenu.Item
            onSelect={() => opprettSammensattKontrollsak({ behandlingId, fritekst: '' })}
            disabled={opprettSammensattKontrollsakIsPending}
        >
            <HStack gap={'space-8'}>
                <TasklistStartIcon fontSize={'1.4rem'} />
                Opprett sammensatt kontrollsak
                {opprettSammensattKontrollsakIsPending && <Loader size={'xsmall'} />}
            </HStack>
        </ActionMenu.Item>
    );
}
