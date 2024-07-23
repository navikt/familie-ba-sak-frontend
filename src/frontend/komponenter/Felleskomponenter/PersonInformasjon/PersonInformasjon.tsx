import * as React from 'react';

import styled from 'styled-components';

import { MenuElipsisHorizontalCircleIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, CopyButton, Dropdown, Heading, HStack } from '@navikt/ds-react';
import { FamilieIkonVelger } from '@navikt/familie-ikoner';

import type { IGrunnlagPerson } from '../../../typer/person';
import { personTypeMap } from '../../../typer/person';
import { formaterIdent, hentAlder } from '../../../utils/formatter';
import DødsfallTag from '../DødsfallTag';
import RegistrerDødsfallDato from '../RegistrerDødsfallDato/RegistrerDødsfallDato';

interface IProps {
    person: IGrunnlagPerson;
    somOverskrift?: boolean;
    width?: string;
    erLesevisning: boolean;
}

const StyledDropdownMeny = styled(Dropdown.Menu)`
    width: 20ch;
`;

const HeadingUtenOverflow = styled(Heading)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const PersonInformasjon: React.FunctionComponent<IProps> = ({
    person,
    somOverskrift = false,
    erLesevisning,
}) => {
    const alder = hentAlder(person.fødselsdato);
    const navnOgAlder = `${person.navn} (${alder} år)`;
    const formattertIdent = formaterIdent(person.personIdent);

    if (somOverskrift) {
        return (
            <HStack gap="6" wrap={false} align="center">
                <FamilieIkonVelger alder={alder} kjønn={person.kjønn} />
                <HStack gap="2" align="center" wrap={false}>
                    <HeadingUtenOverflow level="2" size="medium" title={navnOgAlder}>
                        {navnOgAlder}
                    </HeadingUtenOverflow>
                    <Heading level="2" size="medium" as="span">
                        &ensp;|&ensp;
                    </Heading>
                    <HStack gap="1" wrap={false} align="center">
                        <Heading level="2" size="medium" as="span">
                            {formattertIdent}
                        </Heading>
                        <CopyButton size="small" copyText={person.personIdent} />
                    </HStack>
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
                    {!person.dødsfallDato?.length && !erLesevisning && (
                        <Dropdown>
                            <Button
                                aria-label="Åpne valgmeny"
                                as={Dropdown.Toggle}
                                icon={<MenuElipsisHorizontalCircleIcon aria-hidden />}
                                variant="tertiary"
                            />
                            <StyledDropdownMeny placement={'right'}>
                                <Dropdown.Menu.List>
                                    <RegistrerDødsfallDato
                                        erLesevisning={erLesevisning}
                                        person={person}
                                    />
                                </Dropdown.Menu.List>
                            </StyledDropdownMeny>
                        </Dropdown>
                    )}
                </HStack>
            </HStack>
        );
    }

    return (
        <HStack gap="2" align="center" wrap={false}>
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
            <HStack gap="1" wrap={false} align="center">
                <BodyShort>{formattertIdent}</BodyShort>
                <CopyButton size="small" copyText={person.personIdent} />
            </HStack>
            <BodyShort>&ensp;|&ensp;</BodyShort>
            <BodyShort>{`${personTypeMap[person.type]} `}</BodyShort>
        </HStack>
    );
};

export default PersonInformasjon;
