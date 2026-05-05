import type { ReactNode } from 'react';

import { BodyShort, Box, Heading, HStack, Loader, LocalAlert } from '@navikt/ds-react';

import { useHentInfotrygdSaker } from './useHentInfotrygdSaker';
import type { IMinimalFagsak } from '../../../typer/fagsak';
import { Infotrygdtabeller } from '../../Infotrygd/Infotrygdtabeller';

interface InfotrygdFagsakProps {
    minimalFagsak: IMinimalFagsak;
}

const InnholdContainer = ({ children }: { children: ReactNode }) => (
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
                <LocalAlert status="error">
                    <LocalAlert.Header>
                        <LocalAlert.Title>En feil har oppstått ved henting av saker</LocalAlert.Title>
                    </LocalAlert.Header>
                </LocalAlert>
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
