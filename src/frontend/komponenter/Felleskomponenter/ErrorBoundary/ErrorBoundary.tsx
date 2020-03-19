import * as React from 'react';
import { configureScope, withScope, captureException } from '@sentry/core';
import { slackNotify } from '../../../api/axios';
import { slackKanaler } from '../../../typer/slack';
import { showReportDialog } from '@sentry/browser';
import { ISaksbehandler } from '../../../typer/saksbehandler';

interface IProps {
    innloggetSaksbehandler?: ISaksbehandler;
}

class ErrorBoundary extends React.Component<IProps> {
    public constructor(props: any) {
        super(props);
    }

    public componentDidCatch(error: any, info: any) {
        if (process.env.NODE_ENV !== 'development') {
            configureScope(scope => {
                scope.setUser({
                    username: this.props.innloggetSaksbehandler
                        ? this.props.innloggetSaksbehandler.displayName
                        : 'Ukjent bruker',
                });
            });

            withScope(scope => {
                Object.keys(info).forEach(key => {
                    scope.setExtra(key, info[key]);
                    captureException(error);
                });
            });

            slackNotify(
                `En feil har oppstått i vedtaksløsningen: \n*Error*: ${error}`,
                slackKanaler.alert
            );
            showReportDialog();
        }
    }

    render() {
        return this.props.children;
    }
}

export default ErrorBoundary;
