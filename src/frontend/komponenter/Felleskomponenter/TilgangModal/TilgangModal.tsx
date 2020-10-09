import React from 'react';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import UIModalWrapper from '../Modal/UIModalWrapper';
import { Normaltekst } from 'nav-frontend-typografi';
import IkkeOppfylt from '../../../ikoner/IkkeOppfylt';
import { Adressebeskyttelsegradering, adressebeskyttelsestyper } from '../../../typer/common';

interface ITilgangModalProps {
    åpen: boolean;
    onRequestClose: () => void;
    adressebeskyttelsegradering: Adressebeskyttelsegradering;
}

const TilgangModal: React.FC<ITilgangModalProps> = ({
    åpen,
    onRequestClose,
    adressebeskyttelsegradering,
}) => {
    return (
        <UIModalWrapper
            modal={{
                tittel: 'Diskresjonskode',
                lukkKnapp: true,
                visModal: åpen,
                onClose: onRequestClose,
            }}
        >
            <Normaltekst>
                <IkkeOppfylt heigth={20} className={'tilgangmodal-ikke-oppfylt-ikon'} width={20} />
                Bruker har diskresjonskode
                {` ${adressebeskyttelsestyper[adressebeskyttelsegradering].navn}`}
            </Normaltekst>
        </UIModalWrapper>
    );
};

export default TilgangModal;
