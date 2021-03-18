import React, { useState } from 'react';

import KnappBase, { Flatknapp, Knapp } from 'nav-frontend-knapper';
import { SkjemaGruppe } from 'nav-frontend-skjema';

import { RessursStatus } from '@navikt/familie-typer';

import { IFagsak } from '../../../../../typer/fagsak';
import { hentFrontendFeilmelding } from '../../../../../utils/ressursUtils';
import UIModalWrapper from '../../../../Felleskomponenter/Modal/UIModalWrapper';
import SkjultLegend from '../../../../Felleskomponenter/SkjultLegend';
import OpprettBehandlingValg from './OpprettBehandlingValg';
import useOpprettBehandling from './useOpprettBehandling';

interface IProps {
    onListElementClick: () => void;
    fagsak: IFagsak;
}

const OpprettBehandling: React.FC<IProps> = ({ onListElementClick, fagsak }) => {
    const [visModal, settVisModal] = useState(false);

    const { onBekreft, opprettBehandlingSkjema, nullstillSkjema } = useOpprettBehandling(() =>
        settVisModal(false)
    );

    const lukkOpprettBehandlingModal = () => {
        nullstillSkjema();
        settVisModal(false);
    };

    return (
        <>
            <KnappBase
                mini={true}
                onClick={() => {
                    onListElementClick();
                    settVisModal(true);
                }}
            >
                Opprett behandling
            </KnappBase>

            <UIModalWrapper
                modal={{
                    actions: [
                        <Flatknapp
                            key={'avbryt'}
                            mini={true}
                            onClick={lukkOpprettBehandlingModal}
                            children={'Avbryt'}
                        />,
                        <Knapp
                            key={'bekreft'}
                            type={'hoved'}
                            mini={true}
                            onClick={() => onBekreft(fagsak.søkerFødselsnummer)}
                            children={'Bekreft'}
                            spinner={
                                opprettBehandlingSkjema.submitRessurs.status ===
                                RessursStatus.HENTER
                            }
                            disabled={
                                opprettBehandlingSkjema.submitRessurs.status ===
                                RessursStatus.HENTER
                            }
                        />,
                    ],
                    onClose: lukkOpprettBehandlingModal,
                    lukkKnapp: true,
                    tittel: 'Opprett ny behandling',
                    visModal,
                }}
            >
                <SkjemaGruppe feil={hentFrontendFeilmelding(opprettBehandlingSkjema.submitRessurs)}>
                    <SkjultLegend>Opprett ny behandling</SkjultLegend>
                    <OpprettBehandlingValg
                        fagsak={fagsak}
                        opprettBehandlingSkjema={opprettBehandlingSkjema}
                    />
                </SkjemaGruppe>
            </UIModalWrapper>
        </>
    );
};

export default OpprettBehandling;
