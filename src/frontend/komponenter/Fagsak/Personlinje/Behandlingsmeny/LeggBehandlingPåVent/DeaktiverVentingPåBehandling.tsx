import React, { useState } from 'react';

import styled from 'styled-components';

import AlertStripe from 'nav-frontend-alertstriper';
import KnappBase, { Flatknapp, Knapp } from 'nav-frontend-knapper';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

import { useHttp } from '@navikt/familie-http';
import { Ressurs } from '@navikt/familie-typer';

import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import { IBehandling, settPåVentÅrsaker } from '../../../../../typer/behandling';
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

const DeaktiverVentingPåBehandling: React.FC<IProps> = ({ onListElementClick, behandling }) => {
    const { request } = useHttp();
    const { settÅpenBehandling } = useBehandling();

    const [visModal, settVisModal] = useState<boolean>(!!behandling.settPåVent);
    const [spinner, settSpinner] = useState<boolean>(false);
    const [feilMotBaSak, settFeilMotBaSak] = useState<boolean>(false);

    const lukkModal = () => {
        settVisModal(false);
    };

    const deaktiverVentingPåBehandling = () => {
        settSpinner(true);
        settFeilMotBaSak(false);
        request<undefined, IBehandling>({
            method: 'PUT',
            url: `/familie-ba-sak/api/sett-på-vent/${behandling.behandlingId}/fortsettbehandling`,
            påvirkerSystemLaster: true,
        })
            .then((ressurs: Ressurs<IBehandling>) => {
                settÅpenBehandling(ressurs, true);
                lukkModal();
                settSpinner(false);
            })
            .catch(() => {
                settFeilMotBaSak(true);
                settSpinner(false);
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
                            spinner={spinner}
                            disabled={spinner}
                        />,
                    ],
                    style: {
                        minHeight: '20rem !important',
                    },
                }}
            >
                <Normaltekst>
                    Behandlingen er satt på vent.
                    {behandling?.settPåVent &&
                        ` Årsak: ${settPåVentÅrsaker[behandling?.settPåVent?.årsak]}. `}
                </Normaltekst>
                <StyledNormaltekst>
                    {`Frist: ${formaterIsoDato(behandling?.settPåVent?.frist, datoformat.DATO)}.`}{' '}
                    Gå via meny for å endre årsak og frist på ventende behandling.
                </StyledNormaltekst>

                <StyledNormaltekst>Ønsker du å fortsette behandlingen?</StyledNormaltekst>

                {feilMotBaSak && (
                    <StyledAlertStripe className={'saksoversikt__alert'} type={'feil'}>
                        Noe gikk galt ved henting av utbetalinger. Prøv igjen eller kontakt
                        brukerstøtte hvis problemet vedvarer.
                    </StyledAlertStripe>
                )}
            </UIModalWrapper>
        </>
    );
};

export default DeaktiverVentingPåBehandling;
