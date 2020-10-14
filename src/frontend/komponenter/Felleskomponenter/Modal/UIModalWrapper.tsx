import Modal from 'nav-frontend-modal';
import { Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { useApp, IModal } from '../../../context/AppContext';
import classNames = require('classnames');

interface IProps {
    modal?: IModal;
}

const UIModalWrapper: React.FunctionComponent<IProps> = ({ modal, children }) => {
    const useAppModal = useApp().modal;
    const { tittel, visModal, onClose, lukkKnapp, actions, className, innhold } = modal
        ? modal
        : useAppModal;

    console.log(innhold);
    return (
        <Modal
            appElement={document.body}
            className={classNames(className, 'uimodal')}
            isOpen={visModal}
            onRequestClose={(): void => onClose && onClose()}
            contentLabel="ui-modal"
            closeButton={lukkKnapp}
        >
            <div className="uimodal__content">
                <Undertittel children={tittel} />
                <div className="uimodal__content--inner-content">
                    {innhold ? innhold() : children}
                </div>
                {actions && <div className="uimodal__content--actions"> {actions} </div>}
            </div>
        </Modal>
    );
};

export default UIModalWrapper;
