import * as React from 'react';

import { BodyShort, CopyButton, Heading, HStack } from '@navikt/ds-react';

import RegistrerDødsfallDatoMeny from './RegistrerDødsfallDatoMeny';
import { useBrukerContext } from '../../sider/Fagsak/BrukerContext';
import { useFagsakContext } from '../../sider/Fagsak/FagsakContext';
import { type IGrunnlagPerson, type IPersonInfo, personTypeMap } from '../../typer/person';
import { formaterIdent, hentAlder } from '../../utils/formatter';
import { erAdresseBeskyttet } from '../../utils/validators';
import DødsfallTag from '../DødsfallTag';
import { PersonIkon } from '../PersonIkon';
import styles from './PersonInformasjon.module.css';
import { FalskIdentitet } from '../FalskIdentitet/FalskIdentitet';

interface IProps {
    person: IGrunnlagPerson;
    somOverskrift?: boolean;
    width?: string;
    erLesevisning: boolean;
}

const hentAdresseBeskyttelseGradering = (bruker: IPersonInfo, personIdent: string): boolean | undefined => {
    const forelderBarnRelasjon = bruker.forelderBarnRelasjon.find(rel => rel.personIdent === personIdent);
    if (bruker.personIdent === personIdent) {
        return erAdresseBeskyttet(bruker.adressebeskyttelseGradering);
    } else if (forelderBarnRelasjon?.personIdent === personIdent) {
        return erAdresseBeskyttet(forelderBarnRelasjon.adressebeskyttelseGradering);
    }
};

export const Skillelinje: React.FC<{ erHeading?: boolean }> = ({ erHeading = false }) => {
    if (erHeading) {
        return (
            <Heading level="2" size="medium" as="span">
                |
            </Heading>
        );
    }
    return <BodyShort>|</BodyShort>;
};

const PersonInformasjon: React.FunctionComponent<IProps> = ({ person, somOverskrift = false, erLesevisning }) => {
    const alder = hentAlder(person.fødselsdato);
    const navnOgAlder = `${person.navn} (${alder} år)`;
    const formattertIdent = formaterIdent(person.personIdent);
    const { fagsak } = useFagsakContext();
    const { bruker } = useBrukerContext();

    const erAdresseBeskyttet = hentAdresseBeskyttelseGradering(bruker, person.personIdent);
    const erEgenAnsatt = bruker.erEgenAnsatt;

    if (somOverskrift) {
        return (
            <HStack gap="6" wrap={false} align="center">
                <PersonIkon
                    fagsakType={fagsak.fagsakType}
                    kjønn={person.kjønn}
                    erBarn={alder < 18}
                    størrelse={'m'}
                    erAdresseBeskyttet={erAdresseBeskyttet}
                    erEgenAnsatt={erEgenAnsatt}
                />
                <HStack gap="4" align="center" wrap={false}>
                    <Heading className={styles.headingUtenOverflow} level="2" size="medium" title={navnOgAlder}>
                        {navnOgAlder}
                    </Heading>
                    <Skillelinje erHeading />
                    <FalskIdentitet harFalskIdentitet={person.harFalskIdentitet} erHeading />
                    <HStack gap="1" wrap={false} align="center">
                        <Heading level="2" size="medium" as="span">
                            {formattertIdent}
                        </Heading>
                        <CopyButton size="small" copyText={person.personIdent} />
                    </HStack>
                    <Skillelinje erHeading />
                    <Heading level="2" size="medium" as="span">{`${personTypeMap[person.type]} `}</Heading>
                    {person.dødsfallDato?.length && <DødsfallTag dødsfallDato={person.dødsfallDato} />}
                    {!person.dødsfallDato?.length && !erLesevisning && <RegistrerDødsfallDatoMeny person={person} />}
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
