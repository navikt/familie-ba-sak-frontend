import React from 'react';

import { BodyShort, Dropdown, Loader } from '@navikt/ds-react';

import { useHentAInntektUrl } from './useHentAInntektUrl';
import { ModalType } from '../../../../../context/ModalContext';
import { useModal } from '../../../../../hooks/useModal';
import type { IMinimalFagsak } from '../../../../../typer/fagsak';

function Feilmelding({ error }: { error: Error }) {
    return (
        <>
            <BodyShort spacing>Vi får ikke hentet informasjon fra A-inntekt akkurat nå.</BodyShort>
            <BodyShort>Feilmelding: {error.message}</BodyShort>
        </>
    );
}

interface Props {
    minimalFagsak: IMinimalFagsak;
}

export function AInntekt({ minimalFagsak }: Props) {
    const { åpneModal } = useModal(ModalType.FEILMELDING);

    const { isFetching, refetch } = useHentAInntektUrl({
        søkerFødselsnummer: minimalFagsak.søkerFødselsnummer,
        onSuccess: url => window.open(url, '_blank'),
        onError: error => åpneModal({ feilmelding: <Feilmelding error={error} /> }),
        enabled: false,
    });

    return (
        <Dropdown.Menu.List.Item onClick={() => refetch()} disabled={isFetching}>
            A-Inntekt {isFetching && <Loader size="small" />}
        </Dropdown.Menu.List.Item>
    );
}
