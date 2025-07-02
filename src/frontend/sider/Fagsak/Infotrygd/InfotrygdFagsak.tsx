import React from 'react';

import { Alert, BodyShort, Box, Heading, HStack, Loader } from '@navikt/ds-react';

import { useHentInfotrygdSaker } from './useHentInfotrygdSaker';
import type { IMinimalFagsak } from '../../../typer/fagsak';
import { Infotrygdtabeller } from '../../Infotrygd/Infotrygdtabeller';

interface InfotrygdFagsakProps {
    minimalFagsak: IMinimalFagsak;
}

const InnholdContainer = ({ children }: { children: React.ReactNode }) => (
    <Box maxWidth="70rem" marginBlock="10" marginInline="16">
        {children}
    </Box>
);

export const InfotrygdFagsak = ({ minimalFagsak }: InfotrygdFagsakProps) => {
    const { data, isPending, error } = useHentInfotrygdSaker(minimalFagsak.søkerFødselsnummer);

    if (isPending) {
        return (
            <InnholdContainer>
                <HStack align="center" gap="2">
                    <BodyShort>Henter saker</BodyShort>
                    <Loader size="small" />
                </HStack>
            </InnholdContainer>
        );
    }

    if (error) {
        return (
            <InnholdContainer>
                <Alert variant="error">En feil har oppstått ved henting av saker</Alert>
            </InnholdContainer>
        );
    }

    return (
        <InnholdContainer>
            <Heading size="large" level="1" children="Infotrygd" />
            <Infotrygdtabeller
                ident={minimalFagsak.søkerFødselsnummer}
                saker={data.saker}
                minimalFagsak={minimalFagsak}
            />
        </InnholdContainer>
    );
};
