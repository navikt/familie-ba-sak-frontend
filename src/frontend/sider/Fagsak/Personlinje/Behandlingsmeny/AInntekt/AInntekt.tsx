import React, { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { BodyShort, Dropdown, Loader } from '@navikt/ds-react';
import { useHttp } from '@navikt/familie-http';

import { hentAInntektUrl } from './hentAInntektUrl';
import { ModalType } from '../../../../../context/ModalContext';
import { useModal } from '../../../../../hooks/useModal';
import type { IMinimalFagsak } from '../../../../../typer/fagsak';

interface IProps {
    minimalFagsak: IMinimalFagsak;
}

export const AInntekt: React.FC<IProps> = ({ minimalFagsak }) => {
    const { request } = useHttp();
    const queryClient = useQueryClient();
    const { åpneModal } = useModal(ModalType.FEILMELDING);

    const [laster, setLaster] = useState(false);

    const handleClick = () => {
        setLaster(true);
        queryClient
            .fetchQuery({
                queryKey: ['aInntektUrl', minimalFagsak.søkerFødselsnummer],
                queryFn: () => hentAInntektUrl(request, minimalFagsak.søkerFødselsnummer),
            })
            .then(data => window.open(data, '_blank'))
            .catch(error => {
                åpneModal({
                    feilmelding: (
                        <>
                            <BodyShort spacing>
                                Vi får ikke hentet informasjon fra A-inntekt akkurat nå.
                            </BodyShort>
                            <BodyShort>Feilmelding: {error.message}</BodyShort>
                        </>
                    ),
                });
            })
            .finally(() => setLaster(false));
    };

    return (
        <Dropdown.Menu.List.Item onClick={handleClick} disabled={laster}>
            A-Inntekt {laster && <Loader size="small" />}
        </Dropdown.Menu.List.Item>
    );
};
