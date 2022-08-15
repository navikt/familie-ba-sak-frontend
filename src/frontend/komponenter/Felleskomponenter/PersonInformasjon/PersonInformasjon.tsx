import * as React from 'react';

import { BodyShort, Heading } from '@navikt/ds-react';
import Clipboard from '@navikt/familie-clipboard';
import { FamilieIkonVelger } from '@navikt/familie-ikoner';

import type { IGrunnlagPerson } from '../../../typer/person';
import { personTypeMap } from '../../../typer/person';
import { hentAlder, formaterIdent } from '../../../utils/formatter';
import DødsfallTag from '../DødsfallTag';

interface IProps {
    person: IGrunnlagPerson;
    somOverskrift?: boolean;
    width?: string;
}

const PersonInformasjon: React.FunctionComponent<IProps> = ({ person, somOverskrift = false }) => {
    const alder = hentAlder(person.fødselsdato);
    const navnOgAlder = `${person.navn} (${alder} år)`;

    return (
        <div className={'personinformasjon'}>
            {somOverskrift && (
                <>
                    <FamilieIkonVelger
                        className={'familie-ikon'}
                        alder={alder}
                        kjønn={person.kjønn}
                    />
                    <Heading level="2" size="medium" className={'navn'} title={navnOgAlder}>
                        {navnOgAlder}
                    </Heading>
                    <Heading level="2" size="medium" as="span">
                        &ensp;|&ensp;
                    </Heading>
                    <Clipboard>
                        <Heading level="2" size="medium" as="span">
                            {formaterIdent(person.personIdent)}
                        </Heading>
                    </Clipboard>
                    <Heading level="2" size="medium" as="span">
                        &ensp;|&ensp;
                    </Heading>
                    <Heading level="2" size="medium" as="span">{`${
                        personTypeMap[person.type]
                    } `}</Heading>
                    {person.dødsfallDato?.length && (
                        <>
                            <Heading level="2" size="medium" as="span">
                                &ensp;&ensp;
                            </Heading>
                            <DødsfallTag dødsfallDato={person.dødsfallDato} />
                        </>
                    )}
                </>
            )}

            {!somOverskrift && (
                <>
                    <FamilieIkonVelger
                        className={'familie-ikon--for-normaltekst'}
                        width={24}
                        height={24}
                        alder={alder}
                        kjønn={person.kjønn}
                    />
                    <BodyShort className={'navn'} title={navnOgAlder}>
                        {navnOgAlder}
                    </BodyShort>
                    <BodyShort>&ensp;|&ensp;</BodyShort>
                    <Clipboard>
                        <BodyShort>{formaterIdent(person.personIdent)}</BodyShort>
                    </Clipboard>
                    <BodyShort>&ensp;|&ensp;</BodyShort>
                    <BodyShort>{`${personTypeMap[person.type]} `}</BodyShort>
                </>
            )}
        </div>
    );
};

export default PersonInformasjon;
