import { TextField } from '@navikt/ds-react';
import { useManuellJournalføringContext } from '@sider/ManuellJournalføring/ManuellJournalføringContext';

interface AvsenderIdentFeltProps {
    lesevisning: boolean | undefined;
    brukerErAvsender: boolean;
}

export function AvsenderIdentFelt({ lesevisning, brukerErAvsender }: AvsenderIdentFeltProps) {
    const { skjema } = useManuellJournalføringContext();
    return (
        <TextField
            {...skjema.felter.avsenderIdent.hentNavInputProps(skjema.visFeilmeldinger)}
            readOnly={lesevisning}
            label={'Ident'}
            size={'medium'}
            placeholder={'Fnr/dnr/orgnr'}
            disabled={brukerErAvsender}
        />
    );
}
