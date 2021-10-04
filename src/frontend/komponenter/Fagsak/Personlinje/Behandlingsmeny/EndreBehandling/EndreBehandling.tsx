import React, { useState } from 'react';

import KnappBase, { Knapp } from 'nav-frontend-knapper';
import { SkjemaGruppe } from 'nav-frontend-skjema';

import { FamilieSelect } from '@navikt/familie-form-elements';
import { byggTomRessurs, hentDataFraRessurs, RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import {
    BehandlingKategori,
    behandlingstemaer,
    IBehandlingstema,
    tilBehandlingstema,
} from '../../../../../typer/behandling';
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
        kategori,
        settKategori,
        settSubmitRessurs,
        submitRessurs,
        endreBehandlingstema,
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
                            spinner={submitRessurs.status === RessursStatus.HENTER}
                        />,
                    ],
                    onClose: lukkEndreBehandlingModal,
                    lukkKnapp: true,
                    tittel: 'Endre behandlingstema',
                    visModal,
                }}
            >
                <SkjemaGruppe feil={hentFrontendFeilmelding(submitRessurs)}>
                    <SkjultLegend>Endre behandligstema</SkjultLegend>
                    <FamilieSelect
                        erLesevisning={erLesevisning()}
                        value={
                            kategori &&
                            underkategori &&
                            tilBehandlingstema(kategori, underkategori).id
                        }
                        label={'Behandlingstema'}
                        onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
                            const behandlingstema = behandlingstemaer[
                                event.target.value
                            ] as IBehandlingstema;
                            settUnderkategori(behandlingstema.underkategori);
                            settKategori(behandlingstema.kategori);
                            settSubmitRessurs(byggTomRessurs());
                        }}
                    >
                        {Object.values(behandlingstemaer).map(tema => {
                            return (
                                <option
                                    key={tema.id}
                                    aria-selected={
                                        kategori &&
                                        underkategori &&
                                        tilBehandlingstema(kategori, underkategori) === tema
                                    }
                                    value={tema.id}
                                    disabled={
                                        tema.kategori === BehandlingKategori.EØS ||
                                        hentDataFraRessurs(åpenBehandling)?.underkategori ===
                                            tema.underkategori
                                    }
                                >
                                    {tema.navn}
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
