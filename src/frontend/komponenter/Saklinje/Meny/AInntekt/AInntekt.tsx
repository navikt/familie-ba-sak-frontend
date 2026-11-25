import { useVisTekniskFeilModal } from '@context/TekniskFeilModalContext';
import { useFagsak } from '@hooks/useFagsak';
import { useGenererAInntektUrl } from '@hooks/useGenererAInntektUrl';
import { ActionMenu, Loader } from '@navikt/ds-react';

export function AInntekt() {
    const fagsak = useFagsak();
    const visTekniskFeilModal = useVisTekniskFeilModal();

    const { isPending, mutate } = useGenererAInntektUrl({
        onSuccess: url => window.open(url, '_blank'),
        onError: error => visTekniskFeilModal(error),
    });

    return (
        <ActionMenu.Item onSelect={() => mutate({ ident: fagsak.søkerFødselsnummer })} disabled={isPending}>
            A-Inntekt {isPending && <Loader size="small" />}
        </ActionMenu.Item>
    );
}
