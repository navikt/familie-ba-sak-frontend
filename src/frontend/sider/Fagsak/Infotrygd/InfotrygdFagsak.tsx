import React from 'react';

import { BodyShort, Box, GlobalAlert, Heading, HStack, Loader } from '@navikt/ds-react';

import { useHentInfotrygdSaker } from './useHentInfotrygdSaker';
import type { IMinimalFagsak } from '../../../typer/fagsak';
import { Infotrygdtabeller } from '../../Infotrygd/Infotrygdtabeller';

interface InfotrygdFagsakProps {
    minimalFagsak: IMinimalFagsak;
}

const InnholdContainer = ({ children }: { children: React.ReactNode }) => (
    <Box maxWidth="70rem" marginBlock="space-40" marginInline="space-64">
        {children}
    </Box>
);

export const InfotrygdFagsak = ({ minimalFagsak }: InfotrygdFagsakProps) => {
    const { data, isPending, error } = useHentInfotrygdSaker(minimalFagsak.søkerFødselsnummer);

    if (isPending) {
        return (
            <InnholdContainer>
                <HStack align="center" gap="space-8">
                    <BodyShort>Henter saker</BodyShort>
                    <Loader size="small" />
                </HStack>
            </InnholdContainer>
        );
    }

    if (error) {
        return (
            <InnholdContainer>
                <GlobalAlert status="error">
                    <GlobalAlert.Header>
                        <GlobalAlert.Title>En feil har oppstått ved henting av saker</GlobalAlert.Title>
                    </GlobalAlert.Header>
                </GlobalAlert>
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
