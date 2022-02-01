import React, { useState } from 'react';

import AlertStripe from 'nav-frontend-alertstriper';
import KnappBase, { Flatknapp, Knapp } from 'nav-frontend-knapper';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

import { useHttp } from '@navikt/familie-http';
import { Ressurs } from '@navikt/familie-typer';

import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import { IBehandling } from '../../../../../typer/behandling';
import UIModalWrapper from '../../../../Felleskomponenter/Modal/UIModalWrapper';

interface IProps {
    onListElementClick: () => void;
    behandling: IBehandling;
}

const DeaktiverVentingPåBehandling: React.FC<IProps> = ({ onListElementClick, behandling }) => {
    const { request } = useHttp();
    const { settÅpenBehandling } = useBehandling();

    const [visModal, settVisModal] = useState<boolean>(false);
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
                    tittel: <Undertittel>Fortsett behandlingen</Undertittel>,
                    visModal: visModal,
                    lukkKnapp: true,
                    onClose: lukkModal,
                    actions: [
                        <Flatknapp key={'Avbryt'} mini onClick={lukkModal} children={'Avbryt'} />,
                        <Knapp
                            type={'hoved'}
                            key={'Bekreft'}
                            mini={true}
                            onClick={deaktiverVentingPåBehandling}
                            children={'Bekreft'}
                            spinner={spinner}
                            disabled={spinner}
                        />,
                    ],
                    style: {
                        minHeight: '20rem !important',
                    },
                }}
            >
                <Normaltekst>Deaktiver venting og fortsett behandlingen.</Normaltekst>
                {feilMotBaSak && (
                    <AlertStripe className={'saksoversikt__alert'} type={'feil'}>
                        Noe gikk galt ved henting av utbetalinger. Prøv igjen eller kontakt
                        brukerstøtte hvis problemet vedvarer.
                    </AlertStripe>
                )}
            </UIModalWrapper>
        </>
    );
};

export default DeaktiverVentingPåBehandling;
