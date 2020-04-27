import React, { Component } from 'react';
import { Knapp, KnappBaseProps } from 'nav-frontend-knapper';

interface IProps extends KnappBaseProps {
    visLeseversjon: boolean;
}

class KnappLesbar extends Component<IProps> {
    render() {
        const { visLeseversjon, onClick, mini, type, spinner, children } = this.props;
        return (
            !visLeseversjon && (
                <Knapp onClick={onClick} mini={mini} type={type} spinner={spinner}>
                    {children}
                </Knapp>
            )
        );
    }
}

export default KnappLesbar;
