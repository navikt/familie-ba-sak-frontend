import { FamilieSelect } from '@navikt/familie-form-elements';
import KnappBase, { Flatknapp, Knapp } from 'nav-frontend-knapper';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import React, { useState } from 'react';
import UIModalWrapper from '../../../../Felleskomponenter/Modal/UIModalWrapper';
import {
    BehandlingStatus,
    Behandlingstype,
    behandlingÅrsak,
    BehandlingÅrsak,
} from '../../../../../typer/behandling';
import { FagsakStatus, IFagsak } from '../../../../../typer/fagsak';
import { hentAktivBehandlingPåFagsak } from '../../../../../utils/fagsak';
import useOpprettBehandling from './useOpprettBehandling';
import { byggTomRessurs, RessursStatus } from '@navikt/familie-typer';

interface IProps {
    onListElementClick: () => void;
    fagsak: IFagsak;
}

interface BehandlingstypeSelect extends HTMLSelectElement {
    value: Behandlingstype | '';
}

interface BehandlingÅrsakSelect extends HTMLSelectElement {
    value: BehandlingÅrsak | '';
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
        settSelectedBehandlingstype,
        selectedBehandlingstype,
        settSubmitRessurs,
        submitRessurs,
        settSelectedBehandlingÅrsak,
        selectedBehandlingÅrsak,
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
                            onClick={() => {
                                fjernState();
                                lukkOpprettBehandlingModal();
                            }}
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
                    onClose: () => {
                        fjernState();
                        lukkOpprettBehandlingModal();
                    },
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
                        value={selectedBehandlingstype}
                        name={'Behandling'}
                        label={'Velg type behandling'}
                        onChange={(event: React.ChangeEvent<BehandlingstypeSelect>): void => {
                            settSubmitRessurs(byggTomRessurs());
                            settSelectedBehandlingstype(event.target.value);
                        }}
                    >
                        <option disabled={true} value={''}>
                            Velg
                        </option>
                        <option
                            aria-selected={
                                selectedBehandlingstype === Behandlingstype.FØRSTEGANGSBEHANDLING
                            }
                            disabled={!førstegangsbehandlingEnabled}
                            value={Behandlingstype.FØRSTEGANGSBEHANDLING}
                        >
                            Førstegangsbehandling
                        </option>
                        <option
                            aria-selected={selectedBehandlingstype === Behandlingstype.REVURDERING}
                            disabled={!revurderingEnabled}
                            value={Behandlingstype.REVURDERING}
                        >
                            Revurdering
                        </option>
                    </FamilieSelect>

                    <FamilieSelect
                        erLesevisning={false}
                        value={selectedBehandlingÅrsak}
                        name={'Behandlingsårsak'}
                        label={'Velg årsak'}
                        onChange={(event: React.ChangeEvent<BehandlingÅrsakSelect>): void => {
                            settSubmitRessurs(byggTomRessurs());
                            settSelectedBehandlingÅrsak(event.target.value);
                        }}
                    >
                        <option disabled={true} value={''}>
                            Velg
                        </option>
                        {Object.values(BehandlingÅrsak).map(årsak => {
                            return (
                                <option
                                    key={årsak}
                                    aria-selected={selectedBehandlingÅrsak === årsak}
                                    value={årsak}
                                >
                                    {behandlingÅrsak[årsak]}
                                </option>
                            );
                        })}
                    </FamilieSelect>
                </SkjemaGruppe>
            </UIModalWrapper>
        </>
    );
};

export default OpprettBehandling;
