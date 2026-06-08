import { useBehandlingId } from '@hooks/useBehandlingId';
import { HentHistorikkinnslagQueryKeyFactory } from '@hooks/useHentHistorikkinnslag';
import { HentSammensattKontrollsakQueryKeyFactory } from '@hooks/useHentSammensattKontrollsak';
import { useSlettSammensattKontrollsak } from '@hooks/useSlettSammensattKontrollsak';
import { useQueryClient } from '@tanstack/react-query';
import type { IRestSammensattKontrollsak } from '@typer/sammensatt-kontrollsak';

import { ArrowUndoIcon } from '@navikt/aksel-icons';
import { ActionMenu, HStack, Loader } from '@navikt/ds-react';

interface Props {
    sammensattKontrollsak: IRestSammensattKontrollsak;
}

export function AngreSammensattKontrollsak({ sammensattKontrollsak }: Props) {
    const queryClient = useQueryClient();
    const behandlingId = useBehandlingId();

    const { mutate: slettSammensattKontrollsak, isPending: slettSammensattKontrollsakIsPending } =
        useSlettSammensattKontrollsak(behandlingId, {
            onSuccess: async () => {
                await queryClient.invalidateQueries({
                    queryKey: HentSammensattKontrollsakQueryKeyFactory.behandling(behandlingId),
                });
                queryClient.invalidateQueries({
                    queryKey: HentHistorikkinnslagQueryKeyFactory.historikkinnslag(behandlingId),
                });
            },
        });

    return (
        <ActionMenu.Item
            onSelect={() => slettSammensattKontrollsak(sammensattKontrollsak)}
            disabled={slettSammensattKontrollsakIsPending}
        >
            <HStack gap={'space-8'}>
                <ArrowUndoIcon fontSize={'1.4rem'} />
                Angre sammensatt kontrollsak
                {slettSammensattKontrollsakIsPending && <Loader size={'xsmall'} />}
            </HStack>
        </ActionMenu.Item>
    );
}
