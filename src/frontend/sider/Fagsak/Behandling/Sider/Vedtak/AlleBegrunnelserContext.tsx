import React, { createContext, type PropsWithChildren, useContext } from 'react';

import { BodyShort, Box, ErrorMessage, Loader, LocalAlert, Stack } from '@navikt/ds-react';

import { useHentAlleBegrunnelser } from '../../../../../hooks/useHentAlleBegrunnelser';
import type { AlleBegrunnelser } from '../../../../../typer/vilkår';

interface AlleBegrunnelserContext {
    alleBegrunnelser: AlleBegrunnelser;
}

const AlleBegrunnelserContext = createContext<AlleBegrunnelserContext | undefined>(undefined);

interface Props extends PropsWithChildren {
    alleBegrunnelser?: AlleBegrunnelser;
}

export function AlleBegrunnelserProvider({ children }: Props) {
    const { data, isPending, error } = useHentAlleBegrunnelser();

    if (isPending) {
        return (
            <Box margin={'space-48'}>
                <Stack direction={'row'} justify={'center'} align={'center'} gap={'space-8'}>
                    <Loader size={'medium'} />
                    <BodyShort weight={'semibold'}>Laster begrunnelser...</BodyShort>
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
                            Klarte ikke å hente inn begrunnelser for vedtak.
                            <ErrorMessage>{error.message}</ErrorMessage>
                        </Stack>
                    </LocalAlert.Content>
                </LocalAlert>
            </Box>
        );
    }

    return (
        <AlleBegrunnelserContext.Provider value={{ alleBegrunnelser: data }}>
            {children}
        </AlleBegrunnelserContext.Provider>
    );
}

export function useAlleBegrunnelserContext() {
    const context = useContext(AlleBegrunnelserContext);
    if (context === undefined) {
        throw new Error('useAlleBegrunnelserContext må brukes innenfor en AlleBegrunnelserProvider');
    }
    return context;
}
