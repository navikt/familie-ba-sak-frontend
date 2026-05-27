import type { PropsWithChildren } from 'react';
import { createContext, useContext } from 'react';

import { useBehandlingId } from '@hooks/useBehandlingId';
import { useHentVedtaksperioder } from '@hooks/useHentVedtaksperioder';
import type { IVedtaksperiodeMedBegrunnelser } from '@typer/vedtaksperiode';

import { BodyShort, Box, ErrorMessage, Loader, LocalAlert, Stack } from '@navikt/ds-react';

interface VedtaksperioderContext {
    vedtaksperioder: IVedtaksperiodeMedBegrunnelser[];
}

const VedtaksperioderContext = createContext<VedtaksperioderContext | undefined>(undefined);

interface Props extends PropsWithChildren {
    vedtaksperioder?: IVedtaksperiodeMedBegrunnelser[];
}

export function VedtaksperioderProvider({ children }: Props) {
    const behandlingId = useBehandlingId();

    const { data, isPending, error } = useHentVedtaksperioder(behandlingId);

    if (isPending) {
        return (
            <Box margin={'space-48'}>
                <Stack direction={'row'} justify={'center'} align={'center'} gap={'space-8'}>
                    <Loader size={'medium'} />
                    <BodyShort weight={'semibold'}>Laster vedtaksperioder...</BodyShort>
                </Stack>
            </Box>
        );
    }

    if (error) {
        return (
            <Box margin={'space-48'}>
                <LocalAlert status={'error'}>
                    <LocalAlert.Header>
                        <LocalAlert.Title>En teknisk feil oppstod.</LocalAlert.Title>
                    </LocalAlert.Header>
                    <LocalAlert.Content>
                        <Stack direction={'column'} gap={'space-16'}>
                            Klarte ikke å hente inn vedtaksperiodene.
                            <ErrorMessage>{error.message}</ErrorMessage>
                        </Stack>
                    </LocalAlert.Content>
                </LocalAlert>
            </Box>
        );
    }

    return (
        <VedtaksperioderContext.Provider value={{ vedtaksperioder: data }}>{children}</VedtaksperioderContext.Provider>
    );
}

export function useVedtaksperioderContext() {
    const context = useContext(VedtaksperioderContext);
    if (context === undefined) {
        throw new Error('useVedtaksperioderContext må brukes innenfor en VedtaksperioderProvider');
    }
    return context;
}
