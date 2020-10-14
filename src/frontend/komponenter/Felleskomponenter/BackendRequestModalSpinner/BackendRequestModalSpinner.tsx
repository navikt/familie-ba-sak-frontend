import NavFrontendSpinner from 'nav-frontend-spinner';
import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { useApp } from '../../../context/AppContext';

const BackendRequestModalSpinner = () => {
    const { modalSpinnerBeskrivelse } = useApp();

    return (
        <div className={'modal-spinner'}>
            <div className={'modal-spinner__content'}>
                <NavFrontendSpinner
                    className={'modal-spinner__content--spinner'}
                    transparent={true}
                    type="XL"
                />
                <Normaltekst
                    className={'modal-spinner__content--tekst'}
                    children={modalSpinnerBeskrivelse.beskrivelse}
                />
            </div>
        </div>
    );
};

export default BackendRequestModalSpinner;
