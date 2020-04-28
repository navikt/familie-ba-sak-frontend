import React, { Component } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';

interface IProps {
    minimumOpplysning: boolean[];
}

class IngenOpplysningerValgt extends Component<IProps> {
    render() {
        const { minimumOpplysning } = this.props;
        const harOpplysningerÅVise = minimumOpplysning.filter(Boolean);
        return (
            harOpplysningerÅVise.length === 0 && (
                <Normaltekst className={'skjemaelement'} children={'Ingen opplysninger valgt.'} />
            )
        );
    }
}

export default IngenOpplysningerValgt;
