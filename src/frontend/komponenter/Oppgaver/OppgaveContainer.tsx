import * as React from 'react';
import { Switch, Route } from 'react-router';
import VisOppgaver from './VisOppgaver';
import './visoppgave.less';
import { ISaksbehandler } from '../../typer/saksbehandler';

interface IOppgaveContainerProps {
    innloggetSaksbehandler: ISaksbehandler;
}

const OppgaveContainer: React.FunctionComponent<IOppgaveContainerProps> = props => {
    return (
        <div className="oppgavecontainer__content">
            <Switch>
                <Route
                    exact={true}
                    path="/oppgaver/vise"
                    render={() => {
                        return (
                            <VisOppgaver innloggetSaksbehandler={props.innloggetSaksbehandler} />
                        );
                    }}
                />
            </Switch>
        </div>
    );
};

export default OppgaveContainer;
