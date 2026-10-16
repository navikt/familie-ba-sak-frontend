import { Box, Checkbox, Fieldset, Heading } from '@navikt/ds-react';
import { BehandlingstemaFelt } from '@sider/ManuellJournalføring/felter/BehandlingstemaFelt';
import { BehandlingstypeFelt } from '@sider/ManuellJournalføring/felter/BehandlingstypeFelt';
import { BehandlingsårsakFelt } from '@sider/ManuellJournalføring/felter/BehandlingsårsakFelt';
import { useManuellJournalføringContext } from './ManuellJournalføringContext';

export function KnyttTilNyBehandling() {
    const { skjema, kanKnytteJournalpostTilBehandling } = useManuellJournalføringContext();
    const { knyttTilNyBehandling, behandlingstype, behandlingsårsak, behandlingstema } = skjema.felter;
    const erLesevisning = !kanKnytteJournalpostTilBehandling();

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
                    readOnly={erLesevisning}
                >
                    Knytt til ny behandling
                </Checkbox>

                {behandlingstype.erSynlig && <BehandlingstypeFelt erLesevisning={erLesevisning} />}
                {behandlingsårsak.erSynlig && <BehandlingsårsakFelt erLesevisning={erLesevisning} />}
                {behandlingstema.erSynlig && <BehandlingstemaFelt erLesevisning={erLesevisning} />}
            </Fieldset>
        </Box>
    );
}
