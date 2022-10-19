import React from 'react';

import classNames from 'classnames';
import styled from 'styled-components';

import { SkjemaGruppe } from 'nav-frontend-skjema';

import { BodyShort, Checkbox, Heading } from '@navikt/ds-react';

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
    const { skjema, minimalFagsak, kanKnytteJournalpostTilBehandling } = useManuellJournalfør();
    const { knyttTilNyBehandling, behandlingstema, behandlingsårsak, behandlingstype } =
        skjema.felter;
    return (
        <SkjemaGruppe>
            <Heading size={'small'} level={'2'}>
                Knytt til ny behandling
            </Heading>
            <StyledCheckboxDiv>
                {!kanKnytteJournalpostTilBehandling() ? (
                    knyttTilNyBehandling.verdi ? (
                        <BodyShort
                            className={classNames('skjemaelement', 'lese-felt')}
                            children={'Knytt til ny behandling'}
                        />
                    ) : null
                ) : (
                    <Checkbox
                        id={knyttTilNyBehandling.id}
                        value={'Knytt til ny behandling'}
                        checked={knyttTilNyBehandling.verdi}
                        onChange={() => {
                            knyttTilNyBehandling.validerOgSettFelt(!knyttTilNyBehandling.verdi);
                        }}
                    >
                        {'Knytt til ny behandling'}
                    </Checkbox>
                )}
            </StyledCheckboxDiv>
            {behandlingstype.erSynlig && (
                <OpprettBehandlingValg
                    behandlingstype={behandlingstype}
                    behandlingsårsak={behandlingsårsak}
                    minimalFagsak={minimalFagsak}
                    visFeilmeldinger={skjema.visFeilmeldinger}
                    erLesevisning={!kanKnytteJournalpostTilBehandling()}
                    manuellJournalfør
                    behandlingstema={behandlingstema}
                />
            )}
        </SkjemaGruppe>
    );
};
