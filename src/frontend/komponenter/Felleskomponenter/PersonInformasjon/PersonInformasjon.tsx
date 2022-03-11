import * as React from 'react';

import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

import Clipboard from '@navikt/familie-clipboard';
import { FamilieIkonVelger } from '@navikt/familie-ikoner';

import type { IGrunnlagPerson } from '../../../typer/person';
import { personTypeMap } from '../../../typer/person';
import { hentAlder, formaterIdent } from '../../../utils/formatter';
import DødsfallTag from '../DødsfallTag';

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
    const navnOgAlder = `${person.navn} (${alder} år)`;

    return (
        <div className={'personinformasjon'}>
            {tekstType === 'UNDERTITTEL' && (
                <>
                    <FamilieIkonVelger
                        className={'familie-ikon'}
                        alder={alder}
                        kjønn={person.kjønn}
                    />
                    <Undertittel className={'navn'} tag={tag} title={navnOgAlder}>
                        {navnOgAlder}
                    </Undertittel>
                    <Undertittel tag={tag}>&ensp;|&ensp;</Undertittel>
                    <Clipboard>
                        <Undertittel tag={tag}>{formaterIdent(person.personIdent)}</Undertittel>
                    </Clipboard>
                    <Undertittel tag={tag}>&ensp;|&ensp;</Undertittel>
                    <Undertittel tag={tag}>{`${personTypeMap[person.type]} `}</Undertittel>
                    {person.dødsfallDato?.length && (
                        <>
                            <Undertittel tag={tag}>&ensp;&ensp;</Undertittel>
                            <DødsfallTag dødsfallDato={person.dødsfallDato} />
                        </>
                    )}
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
                    <Normaltekst className={'navn'} tag={tag} title={navnOgAlder}>
                        {navnOgAlder}
                    </Normaltekst>
                    <Normaltekst>&ensp;|&ensp;</Normaltekst>
                    <Clipboard>
                        <Normaltekst>{formaterIdent(person.personIdent)}</Normaltekst>
                    </Clipboard>
                    <Normaltekst>&ensp;|&ensp;</Normaltekst>
                    <Normaltekst>{`${personTypeMap[person.type]} `}</Normaltekst>
                </>
            )}
        </div>
    );
};

export default PersonInformasjon;
