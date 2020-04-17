import * as React from 'react';
import { IPerson } from '../../../typer/person';
import { FamilieIkonVelger } from '@navikt/familie-ikoner';
import { Normaltekst } from 'nav-frontend-typografi';
import { hentAlder } from '../../../utils/formatter';

interface IProps {
    person: IPerson;
}

const PersonInformasjon: React.FunctionComponent<IProps> = ({ person }) => {
    const alder = hentAlder(person.fødselsdato);
    return (
        <div className="personinformasjon">
            <FamilieIkonVelger className="familie-ikon" alder={alder} kjønn={person.kjønn} />
            <Normaltekst>{`${person.navn} (${alder} år) | ${person.personIdent} | ${person.type} `}</Normaltekst>
        </div>
    );
};

export default PersonInformasjon;
