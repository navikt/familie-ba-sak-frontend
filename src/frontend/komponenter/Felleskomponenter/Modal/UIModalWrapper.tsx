import Modal from 'nav-frontend-modal';
import { Undertittel } from 'nav-frontend-typografi';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import * as React from 'react';
import { useApp, IModal } from '../../../context/AppContext';

interface IProps {
    modal?: IModal;
}

const UIModalWrapper: React.FunctionComponent<IProps> = ({ modal }) => {
    const { tittel, content, visModal, onClose, lukkKnapp, actions } = modal
        ? modal
        : useApp().modal;

    return (
        <Modal
            appElement={document.body}
            className="uimodal"
            isOpen={visModal}
            onRequestClose={() => onClose && onClose()}
            contentLabel="ui-modal"
            closeButton={lukkKnapp}
        >
            <div className="uimodal__content">
                <Undertittel children={tittel} />
                <br />
                <Normaltekst>{content}</Normaltekst>
            </div>
            {actions && <div className="uimodal__actions"> {actions} </div>}
        </Modal>
    );
};

export default UIModalWrapper;
