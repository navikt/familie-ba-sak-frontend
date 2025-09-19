import React from 'react';

import styled from 'styled-components';

import { Checkbox, Fieldset, Heading } from '@navikt/ds-react';
import { ASpacing8 } from '@navikt/ds-tokens/dist/tokens';

import { useManuellJournalføringContext } from './ManuellJournalføringContext';
import OpprettBehandlingValg from '../Fagsak/Fagsaklinje/Behandlingsmeny/OpprettBehandling/OpprettBehandlingValg';

const StyledFieldset = styled(Fieldset)`
    margin-top: ${ASpacing8};
`;

/**
 * Legger inn lesevisning slik at på sikt
 * så kan man kanskje sjekke hvilken behandling
 * journalposten er journalført på slik at man kan klikke seg inn på behandlingen
 */
export const KnyttTilNyBehandling: React.FC = () => {
    const { skjema, minimalFagsak, kanKnytteJournalpostTilBehandling } = useManuellJournalføringContext();
    const { knyttTilNyBehandling, behandlingstype } = skjema.felter;
    return (
        <StyledFieldset legend="Knytt til ny behandling" hideLegend>
            <Heading size={'small'} level={'2'}>
                Knytt til ny behandling
            </Heading>
            <Checkbox
                id={knyttTilNyBehandling.id}
                value={'Knytt til ny behandling'}
                checked={knyttTilNyBehandling.verdi}
                onChange={() => {
                    knyttTilNyBehandling.validerOgSettFelt(!knyttTilNyBehandling.verdi);
                }}
                readOnly={!kanKnytteJournalpostTilBehandling()}
            >
                {'Knytt til ny behandling'}
            </Checkbox>
            {behandlingstype.erSynlig && (
                <OpprettBehandlingValg
                    skjema={skjema}
                    minimalFagsak={minimalFagsak}
                    erLesevisning={!kanKnytteJournalpostTilBehandling()}
                    manuellJournalfør
                />
            )}
        </StyledFieldset>
    );
};
