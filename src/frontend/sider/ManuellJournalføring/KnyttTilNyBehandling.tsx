import { Box, Checkbox, Fieldset, Heading } from '@navikt/ds-react';

import { useManuellJournalføringContext } from './ManuellJournalføringContext';
import OpprettBehandlingValg from '../../komponenter/Saklinje/Meny/OpprettBehandling/OpprettBehandlingValg';

/**
 * Legger inn lesevisning slik at på sikt
 * så kan man kanskje sjekke hvilken behandling
 * journalposten er journalført på slik at man kan klikke seg inn på behandlingen
 */
export const KnyttTilNyBehandling = () => {
    const { skjema, minimalFagsak, kanKnytteJournalpostTilBehandling } = useManuellJournalføringContext();
    const { knyttTilNyBehandling, behandlingstype } = skjema.felter;
    return (
        <Box marginBlock={'space-32 space-0'}>
            <Fieldset legend="Knytt til ny behandling" hideLegend>
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
            </Fieldset>
        </Box>
    );
};
