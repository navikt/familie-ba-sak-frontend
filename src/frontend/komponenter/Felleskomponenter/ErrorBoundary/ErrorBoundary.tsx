import * as React from 'react';

import { showReportDialog } from '@sentry/browser';
import { configureScope, withScope, captureException } from '@sentry/core';

import { ISaksbehandler } from '@navikt/familie-typer';

import { apiLoggFeil } from '../../../api/axios';

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
                });
            });

            withScope(scope => {
                Object.keys(info).forEach(key => {
                    scope.setExtra(key, info[key]);
                    captureException(error);
                });
            });

            apiLoggFeil(`En feil har oppstått i vedtaksløsningen: \n*Error*: ${error}`);

            showReportDialog();
        }
    }

    render(): React.ReactNode {
        return this.props.children;
    }
}

export default ErrorBoundary;
