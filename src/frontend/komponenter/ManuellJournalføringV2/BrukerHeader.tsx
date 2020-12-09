import React from 'react';

import styled from 'styled-components';

import Lenke from 'nav-frontend-lenker';

import { kjønnType, RessursStatus } from '@navikt/familie-typer';
import Visittkort from '@navikt/familie-visittkort';

import { useManuellJournalføringV2 } from '../../context/ManuellJournalføringContextV2';
import { formaterPersonIdent, hentAlder } from '../../utils/formatter';

const StyledLenke = styled(Lenke)`
    margin-left: auto;
    margin-right: 0;
`;

export const BrukerHeader: React.FC = () => {
    const { dataForManuellJournalføring } = useManuellJournalføringV2();
    const person =
        dataForManuellJournalføring.status === RessursStatus.SUKSESS
            ? dataForManuellJournalføring.data.person
            : undefined;
    return (
        <Visittkort
            navn={person?.navn || 'Ukjent bruker'}
            ident={formaterPersonIdent(person?.personIdent || '')}
            alder={hentAlder(person?.fødselsdato || '')}
            kjønn={person?.kjønn || kjønnType.UKJENT}
        >
            {dataForManuellJournalføring.status === RessursStatus.SUKSESS && (
                <StyledLenke
                    href={`/oppgaver/journalfør/gamle/${dataForManuellJournalføring.data.oppgave.id}`}
                >
                    Bytt til gammel versjon
                </StyledLenke>
            )}
        </Visittkort>
    );
};
