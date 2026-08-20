import { Box, ErrorSummary } from '@navikt/ds-react';
import { useFormState } from 'react-hook-form';

interface Props {
    heading?: string;
}

interface Feil {
    name: string;
    message: string;
}

function flatUtFeil(feil: unknown, sti: string): Feil[] {
    if (!feil || typeof feil !== 'object') {
        return [];
    }
    if ('message' in feil && typeof feil.message === 'string' && feil.message.length > 0) {
        return [{ name: sti, message: feil.message }];
    }
    return Object.entries(feil)
        .filter(([nøkkel]) => nøkkel !== 'ref' && nøkkel !== 'types')
        .flatMap(([nøkkel, verdi]) => flatUtFeil(verdi, nøkkel === 'root' ? sti : `${sti}.${nøkkel}`));
}

export function Feilsammendrag({ heading = 'For å gå videre må du rette opp følgende feil:' }: Props) {
    const { errors } = useFormState();

    const feil = Object.entries(errors)
        .filter(([name]) => name !== 'root')
        .flatMap(([navn, feil]) => flatUtFeil(feil, navn));

    if (feil.length === 0) {
        return null;
    }

    return (
        <Box marginBlock={'space-0 space-20'} maxWidth={'50rem'}>
            <ErrorSummary heading={heading} size={'small'}>
                {feil.map(({ name, message }) => (
                    <ErrorSummary.Item key={name} href={`#${name}`}>
                        {message}
                    </ErrorSummary.Item>
                ))}
            </ErrorSummary>
        </Box>
    );
}
