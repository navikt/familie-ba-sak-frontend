import React from 'react';

import styled from 'styled-components';

import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';

import { FamilieCheckbox } from '@navikt/familie-form-elements';

import { useManuellJournalfør } from '../../context/ManuellJournalførContext';
import OpprettBehandlingValg from '../Fagsak/Personlinje/Behandlingsmeny/OpprettBehandling/OpprettBehandlingValg';

const StyledCheckboxDiv = styled.div`
    width: 20rem;
`;

/**
 * Legger inn lesevisning slik at på sikt
 * så kan man kanskje sjekke hvilken behandling
 * journalposten er journalført på slik at man kan klikke seg inn på behandlingen
 */
export const KnyttTilNyBehandling: React.FC = () => {
    const { skjema, fagsak, erLesevisning } = useManuellJournalfør();
    const { knyttTilNyBehandling, behandlingstema, behandlingsårsak, behandlingstype } =
        skjema.felter;
    return (
        <SkjemaGruppe>
            <Undertittel>Knytt til ny behandling</Undertittel>
            <br />
            <StyledCheckboxDiv>
                <FamilieCheckbox
                    id={knyttTilNyBehandling.id}
                    erLesevisning={erLesevisning()}
                    label={'Knytt til ny behandling'}
                    checked={knyttTilNyBehandling.verdi}
                    onChange={() => {
                        knyttTilNyBehandling.validerOgSettFelt(!knyttTilNyBehandling.verdi);
                    }}
                />
            </StyledCheckboxDiv>
            {behandlingstype.erSynlig && (
                <OpprettBehandlingValg
                    behandlingstype={behandlingstype}
                    behandlingsårsak={behandlingsårsak}
                    fagsak={fagsak}
                    visFeilmeldinger={skjema.visFeilmeldinger}
                    erLesevisning={erLesevisning()}
                    manuellJournalfør
                    behandlingstema={behandlingstema}
                />
            )}
        </SkjemaGruppe>
    );
};
