import React from 'react';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import { useApp } from '../../../context/AppContext';
import IkkeTilgang from '../../../ikoner/IkkeTilgang';
import UIModalWrapper from '../Modal/UIModalWrapper';
import { Normaltekst } from 'nav-frontend-typografi';
import { adressebeskyttelsestyper } from '../../../typer/common';

const TilgangModal: React.FC = () => {
    const { visTilgangModal, settVisTilgangModal, adressebeskyttelsegradering } = useApp();

    return (
        <UIModalWrapper
            modal={{
                tittel: 'Diskresjonskode',
                lukkKnapp: true,
                visModal: visTilgangModal,
                onClose: () => settVisTilgangModal(false),
            }}
        >
            <Normaltekst>
                <IkkeTilgang heigth={20} className={'tilgangmodal-ikke-oppfylt-ikon'} width={20} />
                Bruker har diskresjonskode
                {` ${adressebeskyttelsestyper[adressebeskyttelsegradering]}`}
            </Normaltekst>
        </UIModalWrapper>
    );
};

export default TilgangModal;
