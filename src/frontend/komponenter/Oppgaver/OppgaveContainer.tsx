import * as React from 'react';
import { Switch, Route } from 'react-router';
import VisOppgaver from './VisOppgaver';
import './oppgavecontainer.less';

const OppgaveContainer: React.FunctionComponent = () => {
    return (
        <div className="oppgavercontainer__content">
            <Switch>
                <Route
                    exact={true}
                    path="/oppgaver/vise"
                    render={() => {
                        return <VisOppgaver />;
                    }}
                />
            </Switch>
        </div>
    );
};

export default OppgaveContainer;
