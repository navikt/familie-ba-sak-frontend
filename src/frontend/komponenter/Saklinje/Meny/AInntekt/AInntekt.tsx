import { ActionMenu, BodyShort, Loader } from '@navikt/ds-react';

import { useHentAInntektUrl } from './useHentAInntektUrl';
import { ModalType } from '../../../../context/ModalContext';
import { useModal } from '../../../../hooks/useModal';
import { useFagsakContext } from '../../../../sider/Fagsak/FagsakContext';

function Feilmelding({ error }: { error: Error }) {
    return (
        <>
            <BodyShort spacing>Vi får ikke hentet informasjon fra A-inntekt akkurat nå.</BodyShort>
            <BodyShort>Feilmelding: {error.message}</BodyShort>
        </>
    );
}

export function AInntekt() {
    const { fagsak } = useFagsakContext();
    const { åpneModal } = useModal(ModalType.FEILMELDING);

    const { isFetching, refetch } = useHentAInntektUrl({
        søkerFødselsnummer: fagsak.søkerFødselsnummer,
        onSuccess: url => window.open(url, '_blank'),
        onError: error => åpneModal({ feilmelding: <Feilmelding error={error} /> }),
        enabled: false,
    });

    return (
        <ActionMenu.Item onSelect={() => refetch()} disabled={isFetching}>
            A-Inntekt {isFetching && <Loader data-testid={'loader'} size="small" />}
        </ActionMenu.Item>
    );
}
