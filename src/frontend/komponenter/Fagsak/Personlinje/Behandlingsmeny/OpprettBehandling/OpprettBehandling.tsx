import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import KnappBase, { Flatknapp, Knapp } from 'nav-frontend-knapper';
import { SkjemaGruppe } from 'nav-frontend-skjema';

import { RessursStatus } from '@navikt/familie-typer';

import type { IMinimalFagsak } from '../../../../../typer/fagsak';
import { hentFrontendFeilmelding } from '../../../../../utils/ressursUtils';
import UIModalWrapper from '../../../../Felleskomponenter/Modal/UIModalWrapper';
import SkjultLegend from '../../../../Felleskomponenter/SkjultLegend';
import OpprettBehandlingValg from './OpprettBehandlingValg';
import useOpprettBehandling from './useOpprettBehandling';

interface IProps {
    onListElementClick: () => void;
    minimalFagsak: IMinimalFagsak;
}

const OpprettBehandling: React.FC<IProps> = ({ onListElementClick, minimalFagsak }) => {
    const [visModal, settVisModal] = useState(false);
    const [visBekreftelseTilbakekrevingModal, settVisBekreftelseTilbakekrevingModal] =
        useState(false);
    const navigate = useNavigate();

    const { onBekreft, opprettBehandlingSkjema, nullstillSkjemaStatus, bruker } =
        useOpprettBehandling(
            () => settVisModal(false),
            () => {
                settVisModal(false);
                settVisBekreftelseTilbakekrevingModal(true);
            }
        );
    const {
        behandlingsårsak,
        behandlingstype,
        behandlingstema,
        migreringsdato,
        søknadMottattDato,
        valgteBarn,
    } = opprettBehandlingSkjema.felter;

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
                            onClick={() =>
                                onBekreft(
                                    minimalFagsak.søkerFødselsnummer,
                                    minimalFagsak.fagsakType
                                )
                            }
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
                        behandlingstype={behandlingstype}
                        behandlingsårsak={behandlingsårsak}
                        behandlingstema={behandlingstema}
                        migreringsdato={migreringsdato}
                        søknadMottattDato={søknadMottattDato}
                        minimalFagsak={minimalFagsak}
                        visFeilmeldinger={opprettBehandlingSkjema.visFeilmeldinger}
                        bruker={bruker}
                        valgteBarn={valgteBarn}
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
                                    navigate(`/fagsak/${minimalFagsak.id}/saksoversikt`);
                                }}
                                children={'Gå til saksoversikten'}
                            />,
                            <Knapp
                                key={'oppgavebenk'}
                                type={'hoved'}
                                mini={true}
                                onClick={() => {
                                    settVisBekreftelseTilbakekrevingModal(false);
                                    navigate('/oppgaver');
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
