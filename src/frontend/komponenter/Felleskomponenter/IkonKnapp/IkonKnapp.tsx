import React, { Component } from 'react';
import { randomUUID } from '../../../utils/commons';
import KnappBase from 'nav-frontend-knapper';

interface IProps {
    id: string;
    visLeseversjon?: boolean;
    onClick: () => void;
}

class IkonKnapp extends Component<IProps> {
    render() {
        const { id, visLeseversjon, children, onClick } = this.props;
        return (
            !visLeseversjon && (
                <KnappBase
                    aria-label={`utfør_${randomUUID()}`}
                    className={'ikon-knapp'}
                    id={id}
                    onClick={onClick}
                    type="flat"
                    kompakt={true}
                >
                    {children}
                </KnappBase>
            )
        );
    }
}

export default IkonKnapp;
