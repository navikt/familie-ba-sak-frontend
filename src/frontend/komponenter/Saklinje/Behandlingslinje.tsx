import { useSaksbehandler } from '@hooks/useSaksbehandler';
import { BrevmottakerDialogProvider } from '@komponenter/Brevmottaker/Felles/BrevmottakerDialogContext';
import { HouseIcon } from '@navikt/aksel-icons';
import { Button, HStack } from '@navikt/ds-react';
import { useFagsakContext } from '@sider/Fagsak/FagsakContext';
import { FagsakStatus } from '@typer/fagsak';
import { Link as ReactRouterLink } from 'react-router';
import { Behandlingsmeny } from './Meny/Behandlingsmeny';

/** Handlingene i behandlingen, som vises til høyre i personlinjen. */
export function Behandlingslinje() {
    const { fagsak } = useFagsakContext();
    const saksbehandler = useSaksbehandler();

    return (
        <HStack gap={'space-8'} align={'center'} wrap={false}>
            <Button
                as={ReactRouterLink}
                size={'small'}
                variant={'tertiary'}
                icon={<HouseIcon aria-hidden />}
                to={`/fagsak/${fagsak.id}/saksoversikt`}
            >
                Saksoversikt
            </Button>
            {saksbehandler.harSkrivetilgang && fagsak.status !== FagsakStatus.LÅST && (
                <BrevmottakerDialogProvider>
                    <Behandlingsmeny />
                </BrevmottakerDialogProvider>
            )}
        </HStack>
    );
}
