import * as React from 'react';
import { Normaltekst, Element } from 'nav-frontend-typografi';

export interface IInformasjon {
    label: string;
    tekst: string;
}

interface IProps {
    informasjon: IInformasjon[];
}

const Informasjonsbolk: React.FunctionComponent<IProps> = ({ informasjon }) => {
    return (
        <div className={'informasjonsbolk'}>
            {informasjon.map((info: IInformasjon) => {
                return <Element key={info.label + info.tekst} children={info.label} />;
            })}
            {informasjon.map((info: IInformasjon) => {
                return <Normaltekst key={info.tekst + info.label} children={info.tekst} />;
            })}
        </div>
    );
};

export default Informasjonsbolk;
