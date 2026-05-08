import { useBruker } from '@hooks/useBruker';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { useFagsak } from '@hooks/useFagsak';
import { type IGrunnlagPerson, type IPersonInfo, personTypeMap } from '@typer/person';
import { formaterIdent, hentAlder } from '@utils/formatter';
import { erAdresseBeskyttet } from '@utils/validators';

import { BodyShort, CopyButton, Heading, HStack } from '@navikt/ds-react';

import RegistrerDødsfallDatoMeny from './RegistrerDødsfallDatoMeny';
import DødsfallTag from '../DødsfallTag';
import { FalskIdentitet } from '../FalskIdentitet/FalskIdentitet';
import { PersonIkon } from '../PersonIkon';
import Styles from './PersonInformasjon.module.css';

function hentAdresseBeskyttelseGradering(bruker: IPersonInfo, personIdent: string): boolean | undefined {
    const forelderBarnRelasjon = bruker.forelderBarnRelasjon.find(rel => rel.personIdent === personIdent);
    if (bruker.personIdent === personIdent) {
        return erAdresseBeskyttet(bruker.adressebeskyttelseGradering);
    } else if (forelderBarnRelasjon?.personIdent === personIdent) {
        return erAdresseBeskyttet(forelderBarnRelasjon.adressebeskyttelseGradering);
    }
}

export function Skillelinje({ erHeading = false }: { erHeading?: boolean }) {
    if (erHeading) {
        return (
            <Heading level="2" size="medium" as="span">
                |
            </Heading>
        );
    }
    return <BodyShort>|</BodyShort>;
}

interface Props {
    person: IGrunnlagPerson;
}

export function PersonInformasjon({ person }: Props) {
    const fagsak = useFagsak();
    const bruker = useBruker();
    const erLesevisning = useErLesevisning();

    const alder = hentAlder(person.fødselsdato);
    const navnOgAlder = `${person.navn} (${alder} år)`;
    const formattertIdent = formaterIdent(person.personIdent);
    const erAdresseBeskyttet = hentAdresseBeskyttelseGradering(bruker, person.personIdent);

    return (
        <HStack gap={'space-24'} wrap={false} align={'center'}>
            <PersonIkon
                fagsakType={fagsak.fagsakType}
                kjønn={person.kjønn}
                erBarn={alder < 18}
                størrelse={'m'}
                erAdresseBeskyttet={erAdresseBeskyttet}
                erEgenAnsatt={bruker.erEgenAnsatt}
            />
            <HStack gap={'space-16'} align={'center'} wrap={true}>
                <HStack gap={'space-16'} align={'center'} wrap={false}>
                    <Heading level={'2'} size={'medium'} title={navnOgAlder} className={Styles.headingUtenOverflow}>
                        {navnOgAlder}
                    </Heading>
                    <Skillelinje erHeading={true} />
                </HStack>
                {person.harFalskIdentitet && (
                    <HStack gap={'space-16'} align={'center'}>
                        <FalskIdentitet erHeading={true} />
                        <Skillelinje erHeading={true} />
                    </HStack>
                )}
                <HStack gap={'space-16'} align={'center'} wrap={false}>
                    <HStack gap={'space-4'} align={'center'} wrap={false}>
                        <Heading level={'2'} size={'medium'} as={'span'}>
                            {formattertIdent}
                        </Heading>
                        <CopyButton size={'small'} copyText={person.personIdent} />
                    </HStack>
                    <Skillelinje erHeading={true} />
                </HStack>
                <HStack gap={'space-8'} align={'center'} wrap={false}>
                    <Heading level={'2'} size={'medium'} as={'span'}>{`${personTypeMap[person.type]} `}</Heading>
                    {person.dødsfallDato?.length && <DødsfallTag dødsfallDato={person.dødsfallDato} />}
                    {!person.dødsfallDato?.length && !erLesevisning && <RegistrerDødsfallDatoMeny person={person} />}
                </HStack>
            </HStack>
        </HStack>
    );
}
