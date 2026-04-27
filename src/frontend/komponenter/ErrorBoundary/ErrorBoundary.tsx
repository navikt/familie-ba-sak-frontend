import { Component, type PropsWithChildren, type ReactNode } from 'react';
import React from 'react';

import * as Sentry from '@sentry/browser';

import { XMarkOctagonIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, ErrorMessage, Heading, HStack, VStack } from '@navikt/ds-react';

import { useSaksbehandler } from '../../hooks/useSaksbehandler';
import type { Saksbehandler } from '../../typer/saksbehandler';

interface Props extends PropsWithChildren {
    saksbehandler?: Saksbehandler;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    public constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
        this.visSentryDialog = this.visSentryDialog.bind(this);
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    // eslint-disable-next-line
    public componentDidCatch(error: any, info: any): void {
        console.error(error, info);
        if (Sentry.isEnabled()) {
            Sentry.setUser({
                username: this.props.saksbehandler?.displayName ?? 'Ukjent navn',
                email: this.props.saksbehandler?.email ?? 'Ukjent e-post',
            });
            Sentry.withScope(scope => {
                Object.keys(info).forEach(key => {
                    scope.setExtra(key, info[key]);
                    Sentry.captureException(error);
                });
            });
        }
    }

    private visSentryDialog() {
        if (Sentry.isEnabled()) {
            Sentry.showReportDialog({
                title: 'En feil har oppstått i vedtaksløsningen',
                subtitle: '',
                subtitle2: 'Teamet har fått beskjed. Dersom du ønsker å hjelpe oss, si litt om hva som skjedde.',
                user: {
                    name: this.props.saksbehandler?.displayName ?? 'Ukjent navn',
                    email: this.props.saksbehandler?.email ?? 'Ukjent e-post',
                },
                labelName: 'NAVN',
                labelComments: 'HVA SKJEDDE?',
                labelClose: 'Lukk',
                labelSubmit: 'Send inn rapport',
                successMessage: 'Rapport er innsendt',
            });
        }
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
                        {Sentry.isEnabled() && (
                            <HStack justify={'end'}>
                                <div>
                                    <Button variant={'tertiary'} onClick={this.visSentryDialog}>
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

export function ErrorBoundaryMedSaksbehandler({ children }: PropsWithChildren) {
    const saksbehandler = useSaksbehandler();
    return <ErrorBoundary saksbehandler={saksbehandler}>{children}</ErrorBoundary>;
}
