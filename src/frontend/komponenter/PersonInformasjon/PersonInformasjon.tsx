import * as React from 'react';

import styled from 'styled-components';

import { MenuElipsisHorizontalCircleIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, CopyButton, Dropdown, Heading, HStack } from '@navikt/ds-react';
import { FamilieIkonVelger } from '@navikt/familie-ikoner';

import RegistrerDødsfallDato from './RegistrerDødsfallDato';
import { useHentPerson } from '../../hooks/useHentPerson';
import { useFagsakContext } from '../../sider/Fagsak/FagsakContext';
import { type IGrunnlagPerson, personTypeMap } from '../../typer/person';
import { formaterIdent, hentAlder } from '../../utils/formatter';
import DødsfallTag from '../DødsfallTag';
import { PersonIkon } from '../PersonIkon';

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

const Skillelinje: React.FC<{ erHeading?: boolean }> = ({ erHeading = false }) => {
    if (erHeading) {
        return (
            <Heading level="2" size="medium" as="span">
                |
            </Heading>
        );
    }
    return <BodyShort>|</BodyShort>;
};

const PersonInformasjon: React.FunctionComponent<IProps> = ({
    person,
    somOverskrift = false,
    erLesevisning,
}) => {
    const alder = hentAlder(person.fødselsdato);
    const navnOgAlder = `${person.navn} (${alder} år)`;
    const formattertIdent = formaterIdent(person.personIdent);
    const { minimalFagsak } = useFagsakContext();
    const { data: søkerData } = useHentPerson(minimalFagsak?.søkerFødselsnummer);

    if (somOverskrift) {
        return (
            <HStack gap="6" wrap={false} align="center">
                <PersonIkon
                    fagsakType={minimalFagsak?.fagsakType}
                    kjønn={person.kjønn}
                    erBarn={alder < 18}
                    størrelse={'m'}
                    adresseBeskyttelse={søkerData?.adressebeskyttelseGradering}
                />
                <HStack gap="4" align="center" wrap={false}>
                    <HeadingUtenOverflow level="2" size="medium" title={navnOgAlder}>
                        {navnOgAlder}
                    </HeadingUtenOverflow>
                    <Skillelinje erHeading />
                    <HStack gap="1" wrap={false} align="center">
                        <Heading level="2" size="medium" as="span">
                            {formattertIdent}
                        </Heading>
                        <CopyButton size="small" copyText={person.personIdent} />
                    </HStack>
                    <Skillelinje erHeading />
                    <Heading level="2" size="medium" as="span">{`${
                        personTypeMap[person.type]
                    } `}</Heading>
                    {person.dødsfallDato?.length && (
                        <DødsfallTag dødsfallDato={person.dødsfallDato} />
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
            <Skillelinje />
            <HStack gap="1" wrap={false} align="center">
                <BodyShort>{formattertIdent}</BodyShort>
                <CopyButton size="small" copyText={person.personIdent} />
            </HStack>
            <Skillelinje />
            <BodyShort>{`${personTypeMap[person.type]} `}</BodyShort>
        </HStack>
    );
};

export default PersonInformasjon;
