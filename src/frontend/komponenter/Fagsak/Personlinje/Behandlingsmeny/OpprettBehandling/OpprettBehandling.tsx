import React, { useState } from 'react';

import { useHistory } from 'react-router';

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
    const [visBekreftelseTilbakekrevingModal, settVisBekreftelseTilbakekrevingModal] =
        useState(false);
    const history = useHistory();

    const { onBekreft, opprettBehandlingSkjema, nullstillSkjemaStatus } = useOpprettBehandling(
        () => settVisModal(false),
        fagsak,
        () => {
            settVisModal(false);
            settVisBekreftelseTilbakekrevingModal(true);
        }
    );

    const lukkOpprettBehandlingModal = () => {
        nullstillSkjemaStatus();
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
                        behandlingstype={opprettBehandlingSkjema.felter.behandlingstype}
                        behandlingsårsak={opprettBehandlingSkjema.felter.behandlingsårsak}
                        fagsak={fagsak}
                        visFeilmeldinger={opprettBehandlingSkjema.visFeilmeldinger}
                    />
                </SkjemaGruppe>
            </UIModalWrapper>

            {visBekreftelseTilbakekrevingModal && (
                <UIModalWrapper
                    modal={{
                        tittel: 'Tilbakekreving opprettes...',
                        lukkKnapp: false,
                        visModal: visBekreftelseTilbakekrevingModal,
                        actions: [
                            <Knapp
                                key={'saksoversikt'}
                                mini={true}
                                onClick={() => {
                                    settVisBekreftelseTilbakekrevingModal(false);
                                    history.push(`/fagsak/${fagsak.id}/saksoversikt`);
                                }}
                                children={'Gå til saksoversikten'}
                            />,
                            <Knapp
                                key={'oppgavebenk'}
                                type={'hoved'}
                                mini={true}
                                onClick={() => {
                                    settVisBekreftelseTilbakekrevingModal(false);
                                    history.push('/oppgaver');
                                }}
                                children={'Gå til oppgavebenken'}
                            />,
                        ],
                    }}
                >
                    Tilbakekrevingsbehandling opprettes, men det kan ta litt tid (ca 30 sekunder)
                    før den blir tilgjengelig i saksoversikten og oppgavebenken.
                </UIModalWrapper>
            )}
        </>
    );
};

export default OpprettBehandling;
