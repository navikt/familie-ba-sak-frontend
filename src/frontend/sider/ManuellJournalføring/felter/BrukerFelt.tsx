import { TextField } from '@navikt/ds-react';
import { useManuellJournalføringContext } from '@sider/ManuellJournalføring/ManuellJournalføringContext';
import {
    ManuellJournalføringFelter,
    type ManuellJournalføringFormValues,
} from '@sider/ManuellJournalføring/useManuellJournalføringSkjema';
import { sjekkEr11Tall, sjekkErGyldigIdent } from '@utils/validators';
import { useController, useFormContext } from 'react-hook-form';

function validerIdent(ident: string | undefined): string | undefined {
    if (!ident) {
        return 'Fødselsnummer eller D-nummer må oppgis.';
    }
    if (!sjekkEr11Tall(ident)) {
        return 'Fødselsnummer eller D-nummer må være 11 siffer.';
    }
    if (!sjekkErGyldigIdent(ident)) {
        return 'Fødselsnummer eller D-nummer er ugyldig.';
    }
    return undefined;
}

export function BrukerFelt() {
    const { erLesevisning } = useManuellJournalføringContext();
    const { control } = useFormContext<ManuellJournalføringFormValues>();

    const {
        field: { onChange },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: ManuellJournalføringFelter.BRUKER,
        control,
        rules: {
            required: 'Fødselsnummer eller D-nummer må oppgis.',
            validate: value => validerIdent(value?.personIdent), // TODO: se over denne
        },
    });

    return (
        <TextField
            label={'Endre bruker'}
            description={'Skriv inn brukers/søkers fødselsnummer eller D-nummer.'}
            onChange={onChange}
            readOnly={isSubmitting || erLesevisning()}
            error={error?.message}
            size={'small'}
        />
    );
}
