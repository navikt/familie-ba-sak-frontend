import { useEffect } from 'react';

import { captureException } from '@nais/apm';
import { isRouteErrorResponse, useRouteError } from 'react-router';

import { XMarkOctagonIcon } from '@navikt/aksel-icons';
import { BodyShort, ErrorMessage, Heading, HStack, VStack } from '@navikt/ds-react';

function captureRouteException(error: unknown) {
    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            return undefined;
        }
        const routerError = new Error(`Route error ${error.status}: ${error.statusText}`);
        captureException(routerError, {
            context: {
                type: 'route-error',
                status: error.status,
                statusText: error.statusText,
            },
        });
        return;
    }
    captureException(error, { context: { type: 'route-error' } });
}

function utledFeilmelding(error: unknown) {
    if (isRouteErrorResponse(error)) {
        return `${error.status}: ${error.statusText}`;
    }
    if (error instanceof Error) {
        return error.message;
    }
    return 'En ukjent feil oppstod.';
}

export function RouteError() {
    const error = useRouteError();

    useEffect(() => {
        captureRouteException(error);
    }, [error]);

    const feilmelding = utledFeilmelding(error);

    return (
        <VStack height={'100%'} width={'100%'} align={'center'} justify={'center'}>
            <VStack gap={'space-32'}>
                <VStack gap={'space-8'}>
                    <Heading size={'medium'} level={'1'}>
                        <HStack gap={'space-8'} align={'center'} justify={'start'}>
                            <XMarkOctagonIcon fontSize={'1.5rem'} />
                            En feil har oppstått i vedtaksløsningen
                        </HStack>
                    </Heading>
                    <BodyShort>Teamet har fått beskjed.</BodyShort>
                </VStack>
                <VStack gap={'space-8'}>
                    <BodyShort>Feilmelding:</BodyShort>
                    <ErrorMessage>{feilmelding}</ErrorMessage>
                </VStack>
            </VStack>
        </VStack>
    );
}
