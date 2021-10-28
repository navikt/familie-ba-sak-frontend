import React, { useState } from 'react';

import KnappBase, { Knapp } from 'nav-frontend-knapper';
import { SkjemaGruppe } from 'nav-frontend-skjema';

import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import { hentFrontendFeilmelding } from '../../../../../utils/ressursUtils';
import { BehandlingstemaSelect } from '../../../../Felleskomponenter/BehandlingstemaSelect';
import UIModalWrapper from '../../../../Felleskomponenter/Modal/UIModalWrapper';
import SkjultLegend from '../../../../Felleskomponenter/SkjultLegend';
import useEndreBehandlingstema from './useEndreBehandlingstema';

interface IProps {
    onListElementClick: () => void;
}

const EndreBehandlingstema: React.FC<IProps> = ({ onListElementClick }) => {
    const [visModal, settVisModal] = useState(false);
    const { skjema, endreBehandlingstema, ressurs, nullstillSkjema } = useEndreBehandlingstema(() =>
        settVisModal(false)
    );

    const { erLesevisning, åpenBehandling } = useBehandling();

    const lukkEndreBehandlingModal = () => {
        nullstillSkjema();
        settVisModal(false);
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
                Endre behandlingstema
            </KnappBase>

            <UIModalWrapper
                modal={{
                    actions: [
                        <Knapp
                            key={'avbryt'}
                            mini={true}
                            onClick={lukkEndreBehandlingModal}
                            children={'Avbryt'}
                        />,
                        <Knapp
                            key={'bekreft'}
                            mini={true}
                            type={'hoved'}
                            onClick={() => {
                                if (åpenBehandling.status === RessursStatus.SUKSESS) {
                                    endreBehandlingstema(åpenBehandling.data.behandlingId);
                                }
                            }}
                            children={'Bekreft'}
                            spinner={ressurs.status === RessursStatus.HENTER}
                        />,
                    ],
                    onClose: lukkEndreBehandlingModal,
                    lukkKnapp: true,
                    tittel: 'Endre behandlingstema',
                    visModal,
                }}
            >
                <SkjemaGruppe feil={hentFrontendFeilmelding(ressurs)}>
                    <SkjultLegend>Endre behandligstema</SkjultLegend>
                    <BehandlingstemaSelect
                        behandlingstema={skjema.felter.behandlingstema}
                        erLesevisning={erLesevisning()}
                        label="Behandlingstema"
                    />
                </SkjemaGruppe>
            </UIModalWrapper>
        </>
    );
};

export default EndreBehandlingstema;
