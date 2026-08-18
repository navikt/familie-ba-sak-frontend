import { Component, type ErrorInfo, type PropsWithChildren, type ReactNode } from 'react';

import { captureException } from '@nais/apm';

import { XMarkOctagonIcon } from '@navikt/aksel-icons';
import { BodyShort, ErrorMessage, Heading, HStack, VStack } from '@navikt/ds-react';

interface State {
    hasError: boolean;
    error?: Error;
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
        captureException(error, {
            context: {
                type: 'error-boundary',
                componentStack: info.componentStack,
            },
        });
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
                    </VStack>
                </VStack>
            );
        }
        return this.props.children;
    }
}
