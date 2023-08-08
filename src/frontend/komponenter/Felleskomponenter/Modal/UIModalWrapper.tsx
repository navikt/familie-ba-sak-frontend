import * as React from 'react';

import classNames from 'classnames';
import styled from 'styled-components';

import Modal from 'nav-frontend-modal';

import { Heading } from '@navikt/ds-react';

import type { IModal } from '../../../context/AppContext';
import { useApp } from '../../../context/AppContext';

interface IProps {
    modal?: IModal;
}

export const StyledButtons = styled.div`
    Button:first-of-type {
        margin-right: 1rem;
    }
`;

const UIModalWrapper: React.FunctionComponent<IProps> = ({ modal, children }) => {
    const useAppModal = useApp().modal;
    const { tittel, visModal, onClose, lukkKnapp, actions, className, innhold, style } = modal
        ? modal
        : useAppModal;

    return (
        <Modal
            className={classNames(className, 'uimodal')}
            isOpen={visModal}
            onRequestClose={(): void => onClose && onClose()}
            contentLabel="ui-modal"
            closeButton={lukkKnapp}
            {...style}
        >
            <div className="uimodal__content">
                <Heading level="2" size="small">
                    {tittel}
                </Heading>
                <div className="uimodal__content--inner-content">
                    {innhold ? innhold() : children}
                </div>
                {actions && (
                    <StyledButtons className="uimodal__content--actions">{actions}</StyledButtons>
                )}
            </div>
        </Modal>
    );
};

export default UIModalWrapper;
