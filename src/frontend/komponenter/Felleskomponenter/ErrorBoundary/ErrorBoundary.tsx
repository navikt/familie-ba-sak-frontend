import * as React from 'react';

import { showReportDialog } from '@sentry/browser';
import { configureScope, withScope, captureException } from '@sentry/core';

import type { ISaksbehandler } from '@navikt/familie-typer';

interface IProps {
    autentisertSaksbehandler?: ISaksbehandler;
}

class ErrorBoundary extends React.Component<IProps> {
    public constructor(props: IProps) {
        super(props);
    }

    // eslint-disable-next-line
    public componentDidCatch(error: any, info: any): void {
        // eslint-disable-next-line: no-console
        console.log(error, info);
        if (process.env.NODE_ENV !== 'development') {
            configureScope(scope => {
                scope.setUser({
                    username: this.props.autentisertSaksbehandler
                        ? this.props.autentisertSaksbehandler.displayName
                        : 'Ukjent bruker',
                    email: this.props.autentisertSaksbehandler
                        ? this.props.autentisertSaksbehandler.email
                        : 'Ukjent email',
                });
            });

            withScope(scope => {
                Object.keys(info).forEach(key => {
                    scope.setExtra(key, info[key]);
                    captureException(error);
                });
            });

            showReportDialog({
                title: 'En feil har oppstått i vedtaksløsningen',
                subtitle: '',
                subtitle2:
                    'Teamet har fått beskjed. Dersom du ønsker å hjelpe oss, si litt om hva som skjedde.',
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

    render(): React.ReactNode {
        return this.props.children;
    }
}

export default ErrorBoundary;
