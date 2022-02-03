import React, { useState } from 'react';

import styled from 'styled-components';

import AlertStripe from 'nav-frontend-alertstriper';
import KnappBase, { Flatknapp, Knapp } from 'nav-frontend-knapper';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

import { useHttp } from '@navikt/familie-http';
import {
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    Ressurs,
    RessursStatus,
} from '@navikt/familie-typer';

import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import { IBehandling, settPåVentÅrsaker } from '../../../../../typer/behandling';
import { defaultFunksjonellFeil } from '../../../../../typer/feilmeldinger';
import { datoformat, formaterIsoDato } from '../../../../../utils/formatter';
import UIModalWrapper from '../../../../Felleskomponenter/Modal/UIModalWrapper';

const StyledNormaltekst = styled(Normaltekst)`
    padding-bottom: 1rem;
`;
const StyledAlertStripe = styled(AlertStripe)`
    padding-bottom: 1rem;
`;

interface IProps {
    onListElementClick: () => void;
    behandling: IBehandling;
}

const TaBehandlingAvVent: React.FC<IProps> = ({ onListElementClick, behandling }) => {
    const { request } = useHttp();
    const { settÅpenBehandling } = useBehandling();

    const [visModal, settVisModal] = useState<boolean>(!!behandling.aktivSettPåVent);
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
            <KnappBase
                mini={true}
                onClick={() => {
                    settVisModal(true);
                    onListElementClick();
                }}
            >
                Forsett behandling
            </KnappBase>

            <UIModalWrapper
                modal={{
                    tittel: <Undertittel>Fortsett behandling</Undertittel>,
                    visModal: visModal,
                    lukkKnapp: true,
                    onClose: lukkModal,
                    actions: [
                        <Flatknapp key={'Nei'} mini onClick={lukkModal} children={'Nei'} />,
                        <Knapp
                            type={'hoved'}
                            key={'Bekreft'}
                            mini={true}
                            onClick={deaktiverVentingPåBehandling}
                            children={'Ja, fortsett'}
                            spinner={submitRessurs.status === RessursStatus.HENTER}
                        />,
                    ],
                    style: {
                        minHeight: '20rem !important',
                    },
                }}
            >
                <Normaltekst>
                    Behandlingen er satt på vent.
                    {behandling?.aktivSettPåVent &&
                        ` Årsak: ${settPåVentÅrsaker[behandling?.aktivSettPåVent?.årsak]}. `}
                </Normaltekst>
                <StyledNormaltekst>
                    {`Frist: ${formaterIsoDato(
                        behandling?.aktivSettPåVent?.frist,
                        datoformat.DATO
                    )}. `}
                    Gå via meny for å endre årsak og frist på ventende behandling.
                </StyledNormaltekst>

                <StyledNormaltekst>Ønsker du å fortsette behandlingen?</StyledNormaltekst>

                {submitRessurs.status === RessursStatus.FEILET && (
                    <StyledAlertStripe className={'saksoversikt__alert'} type={'feil'}>
                        submitRessurs.feilmelding
                    </StyledAlertStripe>
                )}
            </UIModalWrapper>
        </>
    );
};

export default TaBehandlingAvVent;
