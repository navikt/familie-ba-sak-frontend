import * as React from 'react';
import { Normaltekst, Element } from 'nav-frontend-typografi';

export interface IInformasjon {
    label: string;
    tekst: string;
}

interface IProps {
    informasjon: IInformasjon[];
}

const Informasjonsbolk: React.StatelessComponent<IProps> = ({ informasjon }) => {
    return (
        <div className={'informasjonsbolk'}>
            {informasjon.map((info: IInformasjon) => {
                return <Element key={info.label} children={info.label} />;
            })}
            {informasjon.map((info: IInformasjon) => {
                return <Normaltekst key={info.tekst} children={info.tekst} />;
            })}
        </div>
    );
};

export default Informasjonsbolk;
