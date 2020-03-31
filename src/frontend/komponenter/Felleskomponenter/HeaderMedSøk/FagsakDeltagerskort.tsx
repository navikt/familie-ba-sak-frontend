import './fagsakdeltagerskort.less';

import React from 'react';

import { Infokort } from '@navikt/familie-header';
import {
    GuttIkon, JenteIkon, KvinneIkon, MannIkon, NøytralPersonIkon
} from '@navikt/familie-ikoner';
import { kjønnType } from '@navikt/familie-typer';

import { FagsakDeltagerRolle } from '../../../typer/fagsakdeltager';

export interface IFagsakDeltagerskortProps {
    navn: string;
    ident: string;
    rolle: FagsakDeltagerRolle;
    index: number;
    kjønn?: kjønnType;
    fagsakId?: string;
    onClick?: (index: number) => void;
    children?: React.ReactNode | React.ReactNode[];
}

const FagsakDeltagerskort: React.FunctionComponent<IFagsakDeltagerskortProps> = ({
    navn, ident, rolle, index, kjønn, fagsakId, onClick, children
}) => {
    type IkonerMap = Record<string, React.ReactNode>;

    const ikoner: IkonerMap = {
        "FORELDER_MANN": <MannIkon className='ikon'></MannIkon>,
        "FORELDER_KVINNE": <KvinneIkon className='ikon'></KvinneIkon>,
        "FORELDER_UKJENT": <NøytralPersonIkon className='ikon'></NøytralPersonIkon>,
        "BARN_KVINNE": <JenteIkon className='ikon'></JenteIkon>,
        "BARN_MANN": <GuttIkon className='ikon'></GuttIkon>,
        "BARN_UKJENT": <NøytralPersonIkon className='ikon'></NøytralPersonIkon>
    };

    const rolleNavn: RolleNavnMap = {
        "FORELDER_MANN": "FAR",
        "FORELDER_KVINNE": "MOR",
        "FORELDER_UKJENT": "FORELDER",
        "BARN_KVINNE": "BARN",
        "BARN_MANN": "BARN",
        "BARN_UKJENT": "BARN"
    }

    type RolleNavnMap = Record<string, string>;

    console.log(fagsakId);
    return (
        <div className= {`${fagsakId? "": "gray-out"}`}>
            <Infokort
                ikon={ikoner[`${rolle}_${kjønn}`]}
                header={`${navn}(${ident}) : ${rolleNavn[`${rolle}_${kjønn}`]}`}
                index={index}
                onClick={onClick}
            >
                {children}
            </Infokort>
        </div>
    )
}

export default FagsakDeltagerskort;