import * as React from 'react';

import { BodyShort, CopyButton, HStack } from '@navikt/ds-react';

import { useBruker } from '../../../hooks/useBruker';
import { useFagsak } from '../../../hooks/useFagsak';
import { PersonIkon } from '../../../komponenter/PersonIkon';
import { type IGrunnlagPerson, type IPersonInfo, personTypeMap } from '../../../typer/person';
import { formaterIdent, hentAlder } from '../../../utils/formatter';
import { erAdresseBeskyttet } from '../../../utils/validators';

function hentAdresseBeskyttelseGradering(bruker: IPersonInfo, personIdent: string): boolean | undefined {
    const forelderBarnRelasjon = bruker.forelderBarnRelasjon.find(rel => rel.personIdent === personIdent);
    if (bruker.personIdent === personIdent) {
        return erAdresseBeskyttet(bruker.adressebeskyttelseGradering);
    } else if (forelderBarnRelasjon?.personIdent === personIdent) {
        return erAdresseBeskyttet(forelderBarnRelasjon.adressebeskyttelseGradering);
    }
}

interface Props {
    person: IGrunnlagPerson;
}

export function PersonInformasjonUtbetaling({ person }: Props) {
    const fagsak = useFagsak();
    const bruker = useBruker();

    const alder = hentAlder(person.fødselsdato);
    const navnOgAlder = `${person.navn} (${alder} år)`;
    const formattertIdent = formaterIdent(person.personIdent);

    const erAdresseBeskyttet = hentAdresseBeskyttelseGradering(bruker, person.personIdent);

    return (
        <HStack gap={'space-8'} align={'center'} wrap={false}>
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
            <BodyShort>|</BodyShort>
            <HStack gap={'space-4'} wrap={false} align={'center'}>
                <BodyShort>{formattertIdent}</BodyShort>
                <CopyButton size={'small'} copyText={person.personIdent} />
            </HStack>
            <BodyShort>|</BodyShort>
            <BodyShort>{`${personTypeMap[person.type]}`}</BodyShort>
        </HStack>
    );
}
