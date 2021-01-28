import React from 'react';

import styled from 'styled-components';

import { CheckboksPanelGruppe } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';

import { useManuellJournalfør } from '../../context/ManuellJournalførContext';
import { Behandlingstype, BehandlingÅrsak } from '../../typer/behandling';
import {
    BehandlingstypeSelect,
    BehandlingsårsakSelect,
} from '../Felleskomponenter/Behandlingsprops/BehandlingspropSelect';

const StyledSelectDiv = styled.div`
    width: 20rem;
`;

const StyledCheckboxDiv = styled.div`
    width: 20rem;
`;

export const KnyttTilNyBehandling: React.FC = () => {
    const {
        knyttTilNyBehandling,
        settKnyttTilNyBehandling,
        nyBehandlingstype,
        settNyBehandlingstype,
        nyBehandlingsårsak,
        settNyBehandlingsårsak,
    } = useManuellJournalfør();
    return (
        <>
            <br />
            <Undertittel>Knytt til ny behandling</Undertittel>
            <br />
            <StyledCheckboxDiv>
                <CheckboksPanelGruppe
                    checkboxes={[
                        {
                            label: 'Knytt til ny behandling',
                            value: 'Knytt til ny behandling',
                            id: 'Knytt til ny behandling',
                            checked: knyttTilNyBehandling,
                        },
                    ]}
                    onChange={() => {
                        settKnyttTilNyBehandling(!knyttTilNyBehandling);
                    }}
                />
            </StyledCheckboxDiv>
            {knyttTilNyBehandling && (
                <StyledSelectDiv>
                    <br />
                    <BehandlingstypeSelect
                        options={[
                            Behandlingstype.FØRSTEGANGSBEHANDLING,
                            Behandlingstype.REVURDERING,
                        ]}
                        value={nyBehandlingstype}
                        label={'Behandlingstype'}
                        onChange={value => settNyBehandlingstype(value)}
                    />
                </StyledSelectDiv>
            )}
            {knyttTilNyBehandling && nyBehandlingstype === Behandlingstype.REVURDERING && (
                <StyledSelectDiv>
                    <BehandlingsårsakSelect
                        options={[BehandlingÅrsak.SØKNAD, BehandlingÅrsak.NYE_OPPLYSNINGER]}
                        value={nyBehandlingsårsak}
                        label={'Årsak'}
                        onChange={value => settNyBehandlingsårsak(value)}
                    />
                </StyledSelectDiv>
            )}
        </>
    );
};
