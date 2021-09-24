import React, { useState } from 'react';

import KnappBase, { Knapp } from 'nav-frontend-knapper';
import { SkjemaGruppe } from 'nav-frontend-skjema';

import { FamilieSelect } from '@navikt/familie-form-elements';
import { byggTomRessurs, hentDataFraRessurs, RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import { behandlingUnderkategori, BehandlingUnderkategori } from '../../../../../typer/behandling';
import { hentFrontendFeilmelding } from '../../../../../utils/ressursUtils';
import UIModalWrapper from '../../../../Felleskomponenter/Modal/UIModalWrapper';
import SkjultLegend from '../../../../Felleskomponenter/SkjultLegend';
import useEndreBehandling from './useEndreBehandling';

interface IProps {
    onListElementClick: () => void;
}

const EndreBehandling: React.FC<IProps> = ({ onListElementClick }) => {
    const [visModal, settVisModal] = useState(false);
    const {
        underkategori,
        settUnderkategori,
        settSubmitRessurs,
        submitRessurs,
        endreBehandlingUnderkategori,
        fjernState,
    } = useEndreBehandling(() => settVisModal(false));

    const { erLesevisning, åpenBehandling } = useBehandling();

    const lukkEndreBehandlingModal = () => {
        fjernState();
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
                Endre behandling
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
                                    endreBehandlingUnderkategori(åpenBehandling.data.behandlingId);
                                }
                            }}
                            children={'Bekreft'}
                            spinner={submitRessurs.status === RessursStatus.HENTER}
                        />,
                    ],
                    onClose: lukkEndreBehandlingModal,
                    lukkKnapp: true,
                    tittel: 'Endre behandling',
                    visModal,
                }}
            >
                <SkjemaGruppe feil={hentFrontendFeilmelding(submitRessurs)}>
                    <SkjultLegend>Endre underkategori på behandlingen</SkjultLegend>
                    <FamilieSelect
                        erLesevisning={erLesevisning()}
                        value={underkategori}
                        label={'Velg underkategori'}
                        onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
                            settUnderkategori(event.target.value as BehandlingUnderkategori);
                            settSubmitRessurs(byggTomRessurs());
                        }}
                    >
                        {Object.values(BehandlingUnderkategori).map(mapUnderkategori => {
                            return (
                                <option
                                    key={mapUnderkategori}
                                    aria-selected={underkategori === mapUnderkategori}
                                    value={mapUnderkategori}
                                    disabled={
                                        hentDataFraRessurs(åpenBehandling)?.underkategori ===
                                        mapUnderkategori
                                    }
                                >
                                    {behandlingUnderkategori[mapUnderkategori]}
                                </option>
                            );
                        })}
                    </FamilieSelect>
                </SkjemaGruppe>
            </UIModalWrapper>
        </>
    );
};

export default EndreBehandling;
