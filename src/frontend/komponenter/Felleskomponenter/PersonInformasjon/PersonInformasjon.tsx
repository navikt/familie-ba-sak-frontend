import * as React from 'react';
import { IPerson } from '../../../typer/person';
import { FamilieIkonVelger } from '@navikt/familie-ikoner';
import { Normaltekst } from 'nav-frontend-typografi';
import { hentAlder, formaterPersonIdent } from '../../../utils/formatter';

interface IProps {
    person: IPerson;
    tag?: string;
}

const PersonInformasjon: React.FunctionComponent<IProps> = ({ person, tag }) => {
    const alder = hentAlder(person.fødselsdato);
    return (
        <div className="personinformasjon">
            <FamilieIkonVelger className="familie-ikon" alder={alder} kjønn={person.kjønn} />
            <Normaltekst tag={tag}>{`${person.navn} (${alder} år) | ${formaterPersonIdent(
                person.personIdent
            )} | ${person.type} `}</Normaltekst>
        </div>
    );
};

export default PersonInformasjon;
