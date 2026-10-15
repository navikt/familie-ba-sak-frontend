import { captureException } from '@nais/apm';
import { XMarkOctagonIcon } from '@navikt/aksel-icons';
import { BodyShort, ErrorMessage, Heading, HStack, VStack } from '@navikt/ds-react';
import { logger, tilLoggFeil } from '@utils/logger';
import { isRouteErrorResponse, useRouteError } from 'react-router';

/**
 * Rapporterer feil fra React Router til APM. Kalles fra `onError` på `RouterProvider`, som kjører én gang per feil
 * og gir Reacts komponentstakk ved renderfeil. Stakken viser hvilken komponent som feilet, også når
 * JavaScript-stacktracen bare inneholder React-interne funksjoner (f.eks. «Minified React error #31»).
 */
export function captureRouteException(error: unknown, componentStack?: string | null, rute?: string) {
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
        logger.error(`Route-feil ${error.status}: ${error.statusText}`);
        return;
    }
    captureException(error, { context: { type: 'route-error', componentStack, rute } });
    logger.error(`Route-feil: ${error instanceof Error ? error.message : 'ukjent feil'}`, tilLoggFeil(error));
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
