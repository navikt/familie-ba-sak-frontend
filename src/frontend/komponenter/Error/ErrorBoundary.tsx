import { Component, type ErrorInfo, type PropsWithChildren, type ReactNode } from 'react';

import * as Sentry from '@sentry/browser';

import { XMarkOctagonIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, ErrorMessage, Heading, HStack, VStack } from '@navikt/ds-react';

import { showSentryReportDialog } from '../../sentry';

interface State {
    hasError: boolean;
    error?: Error;
    sentryEventId?: string;
}

export class ErrorBoundary extends Component<PropsWithChildren, State> {
    public constructor(props: PropsWithChildren) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, info: ErrorInfo): void {
        const eventId = Sentry.captureException(error, {
            tags: { type: 'error-boundary' },
            extra: {
                componentStack: info.componentStack,
            },
        });
        this.setState({ sentryEventId: eventId });
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return (
                <VStack height={'100vh'} align={'center'} justify={'center'}>
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
                        {this.state.error?.message && (
                            <VStack gap={'space-8'}>
                                <BodyShort>Feilmelding:</BodyShort>
                                <ErrorMessage>{this.state.error?.message}</ErrorMessage>
                            </VStack>
                        )}
                        {Sentry.isEnabled() && this.state.sentryEventId && (
                            <HStack justify={'end'}>
                                <div>
                                    <Button
                                        variant={'tertiary'}
                                        onClick={() => showSentryReportDialog(this.state.sentryEventId)}
                                    >
                                        Gi en mer utfyllende beskjed
                                    </Button>
                                </div>
                            </HStack>
                        )}
                    </VStack>
                </VStack>
            );
        }
        return this.props.children;
    }
}
