import { queryKeys } from '@hooks/keys/queryKeys';
import { useBehandlingId } from '@hooks/useBehandlingId';
import { useOpprettSammensattKontrollsak } from '@hooks/useOpprettSammensattKontrollsak';
import { TasklistStartIcon } from '@navikt/aksel-icons';
import { ActionMenu, HStack, Loader } from '@navikt/ds-react';
import { useQueryClient } from '@tanstack/react-query';

export function OpprettSammensattKontrollsak() {
    const queryClient = useQueryClient();
    const behandlingId = useBehandlingId();

    const { mutate: opprettSammensattKontrollsak, isPending: opprettSammensattKontrollsakIsPending } =
        useOpprettSammensattKontrollsak(behandlingId, {
            onSuccess: sammensattKontrollsak => {
                queryClient.setQueryData(queryKeys.sammensattKontrollsak(behandlingId), sammensattKontrollsak);
                queryClient.invalidateQueries({ queryKey: queryKeys.historikkinnslag(behandlingId) });
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
