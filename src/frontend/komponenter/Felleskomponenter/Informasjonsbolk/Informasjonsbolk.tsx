import * as React from 'react';

import navFarger from 'nav-frontend-core';
import { Element, Normaltekst } from 'nav-frontend-typografi';

export interface IInformasjon {
    label: string;
    tekst: string;
    tekstTitle?: string;
}

interface IProps {
    informasjon: IInformasjon[];
    infoTeksFarve?: string;
}

const Informasjonsbolk: React.FC<IProps> = ({ informasjon, infoTeksFarve }) => {
    return (
        <div className={'informasjonsbolk'}>
            {informasjon.map((info: IInformasjon) => {
                return <Normaltekst key={info.label + info.tekst} children={info.label} />;
            })}
            {informasjon.map((info: IInformasjon) => {
                return (
                    <Element
                        style={{ color: infoTeksFarve ?? navFarger.navMorkGra }}
                        title={info.tekstTitle}
                        key={info.tekst + info.label}
                        children={info.tekst}
                    />
                );
            })}
        </div>
    );
};

export default Informasjonsbolk;
