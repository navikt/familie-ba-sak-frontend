import { TextField } from '@navikt/ds-react';
import type { Felt } from '@navikt/familie-skjema';

interface EndreBrukerFeltProps {
    nyIdent: Felt<string>;
    feilMelding?: string;
}

export function EndreBrukerFelt({ nyIdent, feilMelding }: EndreBrukerFeltProps) {
    return (
        <TextField
            {...nyIdent.hentNavInputProps(!!feilMelding)}
            error={nyIdent.hentNavInputProps(!!feilMelding).feil || feilMelding}
            label={'Endre bruker'}
            description={'Skriv inn brukers/søkers fødselsnummer eller D-nummer'}
            size="small"
        />
    );
}
