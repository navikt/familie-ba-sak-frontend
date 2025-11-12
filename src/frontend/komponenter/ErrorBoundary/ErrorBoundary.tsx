import type { PropsWithChildren } from 'react';
import * as React from 'react';

import * as Sentry from '@sentry/browser';

import { XMarkOctagonIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, ErrorMessage, Heading, HStack, VStack } from '@navikt/ds-react';
import type { ISaksbehandler } from '@navikt/familie-typer';

interface Props extends PropsWithChildren {
    autentisertSaksbehandler?: ISaksbehandler;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
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
                username: this.props.autentisertSaksbehandler
                    ? this.props.autentisertSaksbehandler.displayName
                    : 'Ukjent bruker',
                email: this.props.autentisertSaksbehandler ? this.props.autentisertSaksbehandler.email : 'Ukjent email',
            });
            Sentry.withScope(scope => {
                Object.keys(info).forEach(key => {
                    scope.setExtra(key, info[key]);
                    Sentry.captureException(error);
                });
            });
            this.visSentryDialog();
        }
    }

    render(): React.ReactNode {
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

    private visSentryDialog() {
        if (Sentry.isEnabled()) {
            Sentry.showReportDialog({
                title: 'En feil har oppstått i vedtaksløsningen',
                subtitle: '',
                subtitle2: 'Teamet har fått beskjed. Dersom du ønsker å hjelpe oss, si litt om hva som skjedde.',
                user: {
                    name: this.props.autentisertSaksbehandler?.displayName,
                    email: this.props.autentisertSaksbehandler?.email,
                },
                labelName: 'NAVN',
                labelComments: 'HVA SKJEDDE?',
                labelClose: 'Lukk',
                labelSubmit: 'Send inn rapport',
                successMessage: 'Rapport er innsendt',
            });
        }
    }
}
