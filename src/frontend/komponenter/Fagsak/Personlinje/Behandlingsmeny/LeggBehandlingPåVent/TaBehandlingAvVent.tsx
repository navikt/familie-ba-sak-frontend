import React, { useState } from 'react';

import styled from 'styled-components';

import { Alert, BodyShort, Button, Heading } from '@navikt/ds-react';
import { Dropdown } from '@navikt/ds-react';
import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';
import {
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    RessursStatus,
} from '@navikt/familie-typer';

import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import type { IBehandling } from '../../../../../typer/behandling';
import { settPåVentÅrsaker } from '../../../../../typer/behandling';
import { defaultFunksjonellFeil } from '../../../../../typer/feilmeldinger';
import { datoformat, formaterIsoDato } from '../../../../../utils/formatter';
import UIModalWrapper from '../../../../Felleskomponenter/Modal/UIModalWrapper';

const StyledBodyShort = styled(BodyShort)`
    padding-bottom: 1rem;
`;
const StyledAlert = styled(Alert)`
    padding-bottom: 1rem;
`;

interface IProps {
    behandling: IBehandling;
}

const TaBehandlingAvVent: React.FC<IProps> = ({ behandling }) => {
    const { request } = useHttp();
    const { settÅpenBehandling } = useBehandling();

    const [visModal, settVisModal] = useState<boolean>(false);
    const [submitRessurs, settSubmitRessurs] = useState(byggTomRessurs());

    const lukkModal = () => {
        settVisModal(false);
    };

    const deaktiverVentingPåBehandling = () => {
        settSubmitRessurs(byggHenterRessurs());

        request<undefined, IBehandling>({
            method: 'PUT',
            url: `/familie-ba-sak/api/sett-på-vent/${behandling.behandlingId}/fortsettbehandling`,
        })
            .then((ressurs: Ressurs<IBehandling>) => {
                settÅpenBehandling(ressurs, true);
                settSubmitRessurs(ressurs);
                lukkModal();
            })
            .catch(() => {
                settSubmitRessurs(byggFeiletRessurs(defaultFunksjonellFeil));
            });
    };

    return (
        <>
            <Dropdown.Menu.List.Item onClick={() => settVisModal(true)}>
                Fortsett behandling
            </Dropdown.Menu.List.Item>

            <UIModalWrapper
                modal={{
                    tittel: (
                        <Heading size={'small'} level={'2'}>
                            Fortsett behandling
                        </Heading>
                    ),
                    visModal: visModal,
                    lukkKnapp: true,
                    onClose: lukkModal,
                    actions: [
                        <Button
                            key={'Nei'}
                            variant="tertiary"
                            onClick={lukkModal}
                            children={'Nei'}
                        />,
                        <Button
                            key={'Bekreft'}
                            variant="primary"
                            size="small"
                            onClick={deaktiverVentingPåBehandling}
                            children={'Ja, fortsett'}
                            loading={submitRessurs.status === RessursStatus.HENTER}
                        />,
                    ],
                    style: {
                        minHeight: '20rem !important',
                    },
                }}
            >
                <BodyShort>
                    Behandlingen er satt på vent.
                    {behandling?.aktivSettPåVent &&
                        ` Årsak: ${settPåVentÅrsaker[behandling?.aktivSettPåVent?.årsak]}. `}
                </BodyShort>
                <StyledBodyShort>
                    {`Frist: ${formaterIsoDato(
                        behandling?.aktivSettPåVent?.frist,
                        datoformat.DATO
                    )}. `}
                    Gå via meny for å endre årsak og frist på ventende behandling.
                </StyledBodyShort>

                <StyledBodyShort>Ønsker du å fortsette behandlingen?</StyledBodyShort>

                {submitRessurs.status === RessursStatus.FEILET && (
                    <StyledAlert variant="error">{submitRessurs.frontendFeilmelding}</StyledAlert>
                )}
            </UIModalWrapper>
        </>
    );
};

export default TaBehandlingAvVent;
