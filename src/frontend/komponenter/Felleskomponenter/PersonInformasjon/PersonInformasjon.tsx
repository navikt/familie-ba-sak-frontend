import * as React from 'react';

import styled from 'styled-components';

import { MenuElipsisHorizontalCircleIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Dropdown, Heading } from '@navikt/ds-react';
import Clipboard from '@navikt/familie-clipboard';
import { FamilieIkonVelger } from '@navikt/familie-ikoner';

import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import type { IGrunnlagPerson } from '../../../typer/person';
import { personTypeMap } from '../../../typer/person';
import { hentAlder, formaterIdent } from '../../../utils/formatter';
import DødsfallTag from '../DødsfallTag';
import RegistrerDødsfallDato from '../RegistrerDødsfallDato/RegistrerDødsfallDato';

interface IProps {
    person: IGrunnlagPerson;
    somOverskrift?: boolean;
    width?: string;
}

const StyledDropdownMeny = styled(Dropdown.Menu)`
    width: 20ch;
`;

const PersonInformasjon: React.FunctionComponent<IProps> = ({ person, somOverskrift = false }) => {
    const alder = hentAlder(person.fødselsdato);
    const navnOgAlder = `${person.navn} (${alder} år)`;
    const { vurderErLesevisning } = useBehandling();

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
                    {!person.dødsfallDato?.length && (
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
                                        erLesevisning={vurderErLesevisning()}
                                        person={person}
                                    />
                                </Dropdown.Menu.List>
                            </StyledDropdownMeny>
                        </Dropdown>
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
