import { FamilieSelect } from '@navikt/familie-form-elements';
import KnappBase, { Flatknapp, Knapp } from 'nav-frontend-knapper';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import React, { useState } from 'react';
import UIModalWrapper from '../../../../Felleskomponenter/Modal/UIModalWrapper';
import { BehandlingStatus, Behandlingstype } from '../../../../../typer/behandling';
import { FagsakStatus, IFagsak } from '../../../../../typer/fagsak';
import { hentAktivBehandlingPåFagsak } from '../../../../../utils/fagsak';
import useOpprettBehandling from './useOpprettBehandling';
import { byggTomRessurs, RessursStatus } from '@navikt/familie-typer';

interface IProps {
    onListElementClick: () => void;
    fagsak: IFagsak;
}

const OpprettBehandling: React.FC<IProps> = ({ onListElementClick, fagsak }) => {
    const [visModal, settVisModal] = useState(false);

    const aktivBehandling = hentAktivBehandlingPåFagsak(fagsak);
    const kanOppretteBehandling =
        !aktivBehandling || aktivBehandling?.status === BehandlingStatus.AVSLUTTET;
    const førstegangsbehandlingEnabled =
        fagsak.status !== FagsakStatus.LØPENDE && kanOppretteBehandling;
    const revurderingEnabled = fagsak.behandlinger.length > 0 && kanOppretteBehandling;

    const {
        fjernState,
        onBekreft,
        settBehandlingstype,
        behandlingstype,
        settSubmitRessurs,
        submitRessurs,
    } = useOpprettBehandling(() => settVisModal(false));

    const lukkOpprettBehandlingModal = () => {
        fjernState();
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
                            spinner={submitRessurs.status === RessursStatus.HENTER}
                            disabled={submitRessurs.status === RessursStatus.HENTER}
                        />,
                    ],
                    onClose: lukkOpprettBehandlingModal,
                    lukkKnapp: true,
                    tittel: 'Opprett ny behandling',
                    visModal,
                }}
            >
                <SkjemaGruppe
                    feil={
                        submitRessurs.status === RessursStatus.FEILET
                            ? submitRessurs.frontendFeilmelding
                            : ''
                    }
                >
                    <FamilieSelect
                        erLesevisning={false}
                        value={behandlingstype}
                        name={'Behandling'}
                        onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
                            settSubmitRessurs(byggTomRessurs());
                            settBehandlingstype(
                                event.target.value
                                    ? (event.target.value as Behandlingstype)
                                    : undefined
                            );
                        }}
                    >
                        <option value={''}>Velg</option>
                        <option
                            aria-selected={
                                behandlingstype === Behandlingstype.FØRSTEGANGSBEHANDLING
                            }
                            disabled={!førstegangsbehandlingEnabled}
                            value={Behandlingstype.FØRSTEGANGSBEHANDLING}
                        >
                            Førstegangsbehandling
                        </option>
                        <option
                            aria-selected={behandlingstype === Behandlingstype.REVURDERING}
                            disabled={!revurderingEnabled}
                            value={Behandlingstype.REVURDERING}
                        >
                            Revurdering
                        </option>
                    </FamilieSelect>
                </SkjemaGruppe>
            </UIModalWrapper>
        </>
    );
};

export default OpprettBehandling;
