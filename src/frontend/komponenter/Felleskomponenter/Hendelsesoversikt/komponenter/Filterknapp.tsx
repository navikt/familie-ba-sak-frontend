import type { ReactNode } from 'react';
import React from 'react';

import styled from 'styled-components';

import {
    ABorderFocus,
    ATextAction,
    ATextDefault,
    ATextSubtle,
} from '@navikt/ds-tokens/dist/tokens';

import { randomUUID } from '../../../../utils/commons';
import FamilieBaseKnapp from '../../FamilieBaseKnapp';

interface IFilterknappProps {
    aktiv?: boolean;
    disabled?: boolean;
    children: ReactNode;
    onClick: () => void;
}

const StyledButton = styled(FamilieBaseKnapp)<IFilterknappProps>`
    min-height: 50px;
    width: 7.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: box-shadow 0.1s ease-in-out;
    cursor: ${({ disabled }) => (disabled ? 'initial' : 'pointer')};
    box-shadow: ${({ aktiv }) => (aktiv ? `inset 0 -5px 0 -1px ${ABorderFocus}` : '')};

    > * {
        transition: fill 0.1s ease-in-out;
        fill: ${({ aktiv, disabled }) => {
            if (disabled) {
                return ATextSubtle;
            } else if (aktiv) {
                return ATextAction;
            } else {
                return ATextDefault;
            }
        }};
        color: ${({ aktiv, disabled }) => {
            if (disabled) {
                return ATextSubtle;
            } else if (aktiv) {
                return ATextAction;
            } else {
                return '';
            }
        }};
    }

    :focus {
        outline: ${({ disabled }) => (!disabled ? `none` : '')};
        border: ${({ disabled }) => (!disabled ? `3px solid ${ABorderFocus}` : '')};
    }
`;

const Filterknapp = ({ children, disabled = false, onClick, aktiv }: IFilterknappProps) => {
    return (
        <StyledButton
            id={`filter_${randomUUID()}`}
            onClick={onClick}
            disabled={disabled}
            aktiv={aktiv}
        >
            {children}
        </StyledButton>
    );
};

export default Filterknapp;
