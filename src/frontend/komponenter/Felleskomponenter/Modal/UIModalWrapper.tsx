import * as React from 'react';

import classNames from 'classnames';

import Modal from 'nav-frontend-modal';
import { Undertittel } from 'nav-frontend-typografi';

import type { IModal } from '../../../context/AppContext';
import { useApp } from '../../../context/AppContext';

interface IProps {
    modal?: IModal;
}

const UIModalWrapper: React.FunctionComponent<IProps> = ({ modal, children }) => {
    const useAppModal = useApp().modal;
    const { tittel, visModal, onClose, lukkKnapp, actions, className, innhold, style } = modal
        ? modal
        : useAppModal;

    return (
        <Modal
            appElement={document.body}
            className={classNames(className, 'uimodal')}
            isOpen={visModal}
            onRequestClose={(): void => onClose && onClose()}
            contentLabel="ui-modal"
            closeButton={lukkKnapp}
            {...style}
        >
            <div className="uimodal__content">
                <Undertittel children={tittel} className="uimodal__tittel" />
                <div className="uimodal__content--inner-content">
                    {innhold ? innhold() : children}
                </div>
                {actions && <div className="uimodal__content--actions"> {actions} </div>}
            </div>
        </Modal>
    );
};

export default UIModalWrapper;
