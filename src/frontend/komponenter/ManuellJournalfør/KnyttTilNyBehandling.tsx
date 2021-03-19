import React from 'react';

import styled from 'styled-components';

import { CheckboksPanelGruppe } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';

import { useManuellJournalfør } from '../../context/ManuellJournalførContext';
import OpprettBehandlingValg from '../Fagsak/Personlinje/Behandlingsmeny/OpprettBehandling/OpprettBehandlingValg';

const StyledCheckboxDiv = styled.div`
    width: 20rem;
`;

export const KnyttTilNyBehandling: React.FC = () => {
    const { skjema, fagsak } = useManuellJournalfør();
    return (
        <>
            <Undertittel>Knytt til ny behandling</Undertittel>
            <br />
            <StyledCheckboxDiv>
                <CheckboksPanelGruppe
                    checkboxes={[
                        {
                            label: 'Knytt til ny behandling',
                            value: 'Knytt til ny behandling',
                            id: 'Knytt til ny behandling',
                            checked: skjema.felter.knyttTilNyBehandling.verdi,
                        },
                    ]}
                    onChange={() => {
                        skjema.felter.knyttTilNyBehandling.validerOgSettFelt(
                            !skjema.felter.knyttTilNyBehandling.verdi
                        );
                    }}
                />
            </StyledCheckboxDiv>
            {skjema.felter.knyttTilNyBehandling.verdi && (
                <>
                    <br />
                    <OpprettBehandlingValg
                        behandlingstype={skjema.felter.behandlingstype}
                        behandlingsårsak={skjema.felter.behandlingsårsak}
                        fagsak={fagsak}
                        visFeilmeldinger={skjema.visFeilmeldinger}
                    />
                </>
            )}
        </>
    );
};
