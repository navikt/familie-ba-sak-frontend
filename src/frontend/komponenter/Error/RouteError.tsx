import { useEffect, useState } from 'react';

import * as Sentry from '@sentry/browser';
import { isRouteErrorResponse, useRouteError } from 'react-router';

import { XMarkOctagonIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, ErrorMessage, Heading, HStack, VStack } from '@navikt/ds-react';

import { showSentryReportDialog } from '../../sentry';

function captureSentryException(error: unknown) {
    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            return undefined;
        }
        const routerError = new Error(`Route error ${error.status}: ${error.statusText}`);
        return Sentry.captureException(routerError, {
            tags: { type: 'route-error' },
            contexts: {
                router: {
                    status: error.status,
                    statusText: error.statusText,
                },
            },
        });
    }
    return Sentry.captureException(error, { tags: { type: 'route-error' } });
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

    const [sentryEventId, setSentryEventId] = useState<string | undefined>();

    useEffect(() => {
        const eventId = captureSentryException(error);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSentryEventId(eventId);
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
                {Sentry.isEnabled() && sentryEventId && (
                    <HStack justify={'end'}>
                        <div>
                            <Button variant={'tertiary'} onClick={() => showSentryReportDialog(sentryEventId)}>
                                Gi en mer utfyllende beskjed
                            </Button>
                        </div>
                    </HStack>
                )}
            </VStack>
        </VStack>
    );
}
