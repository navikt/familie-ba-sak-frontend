import React, { ReactNode } from 'react';

import { randomUUID } from '../../../../utils/commons';
import styled from 'styled-components';
import navFarger from 'nav-frontend-core';

interface IFilterknappProps {
    aktiv?: boolean;
    disabled?: boolean;
    children: ReactNode;
    onClick: () => void;
}

const StyledButton = styled.button<IFilterknappProps>`
    min-height: 50px;
    width: 7.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: box-shadow 0.1s ease-in-out;
    cursor: ${props => (props.disabled ? 'initial' : 'pointer')};
    box-shadow: ${props => (props.aktiv ? `inset 0 -5px 0 -1px ${navFarger.navBla}` : '')};

    > * {
        transition: fill 0.1s ease-in-out;
        fill: ${props => {
            if (props.disabled) {
                return navFarger.navGra60;
            } else if (props.aktiv) {
                return navFarger.navBla;
            } else {
                return navFarger.navGra80;
            }
        }};
        color: ${props => {
            if (props.disabled) {
                return navFarger.navGra60;
            } else if (props.aktiv) {
                return navFarger.navBla;
            } else {
                return '';
            }
        }};
    }

    :focus {
        outline: ${props => (!props.disabled ? `none` : '')};
        border: ${props => (!props.disabled ? `3px solid ${navFarger.fokusFarge}` : '')};
    }
`;

const Filterknapp = ({ children, disabled = false, onClick, aktiv }: IFilterknappProps) => {
    return (
        <StyledButton
            id={`filter_${randomUUID()}`}
            aria-label={`filter_${randomUUID()}`}
            onClick={onClick}
            disabled={disabled}
            aktiv={aktiv}
        >
            {children}
        </StyledButton>
    );
};

export default Filterknapp;
