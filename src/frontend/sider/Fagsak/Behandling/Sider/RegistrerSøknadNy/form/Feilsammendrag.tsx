import type { RegistrerSøknadFormValues } from '@sider/Fagsak/Behandling/Sider/RegistrerSøknadNy/form/useRegistrerSøknadForm';
import { useFormState } from 'react-hook-form';

import { Box, ErrorSummary } from '@navikt/ds-react';

function hentFeilmelding(feil: unknown): string | undefined {
    if (!feil || typeof feil !== 'object') {
        return undefined;
    }
    if ('message' in feil && typeof feil.message === 'string') {
        return feil.message;
    }
    if ('root' in feil) {
        return hentFeilmelding(feil.root);
    }
    return undefined;
}

export function Feilsammendrag() {
    const { errors } = useFormState<RegistrerSøknadFormValues>();

    const feil = Object.entries(errors)
        .filter(([name]) => name !== 'root')
        .flatMap(([name, error]) => {
            const message = hentFeilmelding(error);
            return message ? [{ name, message }] : [];
        });

    if (feil.length === 0) {
        return null;
    }

    return (
        <Box marginBlock={'space-0 space-20'} maxWidth={'50rem'}>
            <ErrorSummary heading={'For å gå videre må du rette opp følgende feil:'} size={'small'}>
                {feil.map(({ name, message }) => (
                    <ErrorSummary.Item key={name} href={`#${name}`}>
                        {message}
                    </ErrorSummary.Item>
                ))}
            </ErrorSummary>
        </Box>
    );
}
