import { Box, Button, HStack } from '@navikt/ds-react';
import { useFelt, Valideringsstatus } from '@navikt/familie-skjema';
import { EndreBrukerFelt } from '@sider/ManuellJournalføring/felter/EndreBrukerFelt';
import { useManuellJournalføringContext } from '@sider/ManuellJournalføring/ManuellJournalføringContext';
import { identValidator } from '@utils/validators';
import { useEffect, useState } from 'react';

interface Props {
    nullstillFagsaktype: () => void;
}

export function EndreBrukerSkjema({ nullstillFagsaktype }: Props) {
    const { endreBrukerOgSettNormalFagsak } = useManuellJournalføringContext();

    const [feilMelding, settFeilMelding] = useState<string | undefined>('');
    const [spinner, settSpinner] = useState(false);

    const nyIdent = useFelt({
        verdi: '',
        valideringsfunksjon: identValidator,
    });

    useEffect(() => {
        settFeilMelding('');
    }, [nyIdent.verdi]);

    return (
        <HStack marginBlock={'space-0 space-24'} wrap={false}>
            <EndreBrukerFelt nyIdent={nyIdent} feilMelding={feilMelding} />
            <Box
                marginInline={'space-16 space-0'}
                width={'10rem'}
                marginBlock={
                    nyIdent.hentNavInputProps(!!feilMelding).feil || feilMelding ? 'auto space-28' : 'auto space-0'
                }
            >
                <Button
                    onClick={() => {
                        if (nyIdent.valideringsstatus === Valideringsstatus.OK) {
                            settSpinner(true);
                            nullstillFagsaktype();
                            endreBrukerOgSettNormalFagsak(nyIdent.verdi).finally(() => {
                                settSpinner(false);
                            });
                        } else {
                            settFeilMelding('Personident er ugyldig');
                        }
                    }}
                    loading={spinner}
                    size="small"
                    variant="secondary"
                >
                    Endre bruker
                </Button>
            </Box>
        </HStack>
    );
}
