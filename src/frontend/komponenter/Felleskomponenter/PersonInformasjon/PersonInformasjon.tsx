import * as React from 'react';

import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

import Clipboard from '@navikt/familie-clipboard';
import { FamilieIkonVelger } from '@navikt/familie-ikoner';

import { IGrunnlagPerson, personTypeMap } from '../../../typer/person';
import { hentAlder, formaterPersonIdent } from '../../../utils/formatter';

interface IProps {
    person: IGrunnlagPerson;
    tag?: string;
    tekstType?: 'UNDERTITTEL' | 'NORMALTEKST';
    width?: string;
}

const PersonInformasjon: React.FunctionComponent<IProps> = ({
    person,
    tag,
    tekstType = 'NORMALTEKST',
}) => {
    const alder = hentAlder(person.fødselsdato);

    return (
        <div className={'personinformasjon'}>
            {tekstType === 'UNDERTITTEL' && (
                <>
                    <FamilieIkonVelger
                        className={'familie-ikon'}
                        alder={alder}
                        kjønn={person.kjønn}
                    />
                    <Undertittel
                        className={'navn'}
                        tag={tag}
                    >{`${person.navn} (${alder} år)`}</Undertittel>
                    <Undertittel>&ensp;|&ensp;</Undertittel>
                    <Clipboard>
                        <Undertittel>{formaterPersonIdent(person.personIdent)}</Undertittel>
                    </Clipboard>
                    <Undertittel>&ensp;|&ensp;</Undertittel>
                    <Undertittel>{`${personTypeMap[person.type]} `}</Undertittel>
                </>
            )}

            {tekstType === 'NORMALTEKST' && (
                <>
                    <FamilieIkonVelger
                        className={'familie-ikon--for-normaltekst'}
                        width={24}
                        height={24}
                        alder={alder}
                        kjønn={person.kjønn}
                    />
                    <Normaltekst
                        className={'navn'}
                        tag={tag}
                    >{`${person.navn} (${alder} år)`}</Normaltekst>
                    <Normaltekst>&ensp;|&ensp;</Normaltekst>
                    <Clipboard>
                        <Normaltekst>{formaterPersonIdent(person.personIdent)}</Normaltekst>
                    </Clipboard>
                    <Normaltekst>&ensp;|&ensp;</Normaltekst>
                    <Normaltekst>{`${personTypeMap[person.type]} `}</Normaltekst>
                </>
            )}
        </div>
    );
};

export default PersonInformasjon;
