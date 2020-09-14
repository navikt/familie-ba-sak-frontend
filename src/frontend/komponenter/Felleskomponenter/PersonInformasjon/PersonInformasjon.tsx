import * as React from 'react';
import { IPerson, personTypeMap } from '../../../typer/person';
import { FamilieIkonVelger } from '@navikt/familie-ikoner';
import Clipboard from '@navikt/familie-clipboard';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { hentAlder, formaterPersonIdent } from '../../../utils/formatter';

interface IProps {
    person: IPerson;
    tag?: string;
    tekstType?: 'UNDERTITTEL' | 'NORMALTEKST';
    width?: string;
}

const PersonInformasjon: React.FunctionComponent<IProps> = ({
    person,
    tag,
    tekstType = 'NORMALTEKST',
    width = '30rem',
}) => {
    const alder = hentAlder(person.fødselsdato);

    return (
        <div className="personinformasjon" style={{ width }}>
            <div className={'familie-ikon'}>
                <FamilieIkonVelger alder={alder} kjønn={person.kjønn} />
            </div>

            <div className={'informasjonstekster'}>
                {tekstType === 'UNDERTITTEL' && (
                    <>
                        <Undertittel
                            className={'navn'}
                            tag={tag}
                        >{`${person.navn} (${alder} år)`}</Undertittel>
                        <Undertittel>/</Undertittel>
                        <Clipboard>
                            <Undertittel>{formaterPersonIdent(person.personIdent)}</Undertittel>
                        </Clipboard>
                        <Undertittel>/</Undertittel>
                        <Undertittel>{`${personTypeMap[person.type]} `}</Undertittel>
                    </>
                )}

                {tekstType === 'NORMALTEKST' && (
                    <>
                        <Normaltekst
                            className={'navn'}
                            tag={tag}
                        >{`${person.navn} (${alder} år)`}</Normaltekst>
                        <Normaltekst>/</Normaltekst>
                        <Clipboard>
                            <Normaltekst>{formaterPersonIdent(person.personIdent)}</Normaltekst>
                        </Clipboard>
                        <Normaltekst>/</Normaltekst>
                        <Normaltekst>{`${personTypeMap[person.type]} `}</Normaltekst>
                    </>
                )}
            </div>
        </div>
    );
};

export default PersonInformasjon;
