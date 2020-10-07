import React from 'react';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import UIModalWrapper from '../Felleskomponenter/Modal/UIModalWrapper';
import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import IkkeOppfylt from '../../ikoner/IkkeOppfylt';
import { adressebeskyttelsestyper } from '../../typer/oppgave';

interface ITilgangModalProps {
    åpen: boolean;
    onRequestClose: () => void;
    adressebeskyttelsegradering: string;
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
                lukkKnapp: false,
                visModal: åpen,
                actions: [
                    <Knapp
                        key={'Avbryt'}
                        mini={true}
                        onClick={onRequestClose}
                        children={'Avbryt'}
                    />,
                ],
            }}
        >
            <Normaltekst>
                <IkkeOppfylt heigth={20} className={'ikke-oppfylt-ikon'} width={20} />
                Bruker har diskresjonskode
                {' ' +
                    (adressebeskyttelsegradering !== ''
                        ? adressebeskyttelsestyper[adressebeskyttelsegradering].navn
                        : '')}
            </Normaltekst>
        </UIModalWrapper>
    );
};

export default TilgangModal;
