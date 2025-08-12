import * as React from 'react';

import styled from 'styled-components';

import { MenuElipsisHorizontalCircleIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, CopyButton, Dropdown, Heading, HStack } from '@navikt/ds-react';
import { type Ressurs, RessursStatus } from '@navikt/familie-typer';

import RegistrerDødsfallDato from './RegistrerDødsfallDato';
import { useFagsakContext } from '../../sider/Fagsak/FagsakContext';
import { type IGrunnlagPerson, type IPersonInfo, personTypeMap } from '../../typer/person';
import { formaterIdent, hentAlder } from '../../utils/formatter';
import { erAdresseBeskyttet } from '../../utils/validators';
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

const hentAdresseBeskyttelseGradering = (
    brukerRessurs: Ressurs<IPersonInfo>,
    personIdent: string
): boolean | undefined => {
    if (brukerRessurs.status === RessursStatus.SUKSESS) {
        const bruker = brukerRessurs.data;
        const forelderBarnRelasjoner = brukerRessurs.data.forelderBarnRelasjon;

        const forelderBarnRelasjon = forelderBarnRelasjoner.find(
            rel => rel.personIdent === personIdent
        );
        if (bruker.personIdent === personIdent) {
            return erAdresseBeskyttet(bruker.adressebeskyttelseGradering);
        } else if (forelderBarnRelasjon?.personIdent === personIdent) {
            return erAdresseBeskyttet(forelderBarnRelasjon.adressebeskyttelseGradering);
        }
    }
};

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
    const { fagsak, bruker: brukerRessurs } = useFagsakContext();

    const erAdresseBeskyttet = hentAdresseBeskyttelseGradering(brukerRessurs, person.personIdent);

    if (somOverskrift) {
        return (
            <HStack gap="6" wrap={false} align="center">
                <PersonIkon
                    fagsakType={fagsak.fagsakType}
                    kjønn={person.kjønn}
                    erBarn={alder < 18}
                    størrelse={'m'}
                    erAdresseBeskyttet={erAdresseBeskyttet}
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
            <PersonIkon
                fagsakType={fagsak.fagsakType}
                kjønn={person.kjønn}
                erBarn={alder < 18}
                størrelse={'m'}
                erAdresseBeskyttet={erAdresseBeskyttet}
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
