import * as React from 'react';

import navFarger from 'nav-frontend-core';
import { Element } from 'nav-frontend-typografi';

import { BodyShort } from '@navikt/ds-react';

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
                return <BodyShort key={info.label + info.tekst} children={info.label} />;
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
