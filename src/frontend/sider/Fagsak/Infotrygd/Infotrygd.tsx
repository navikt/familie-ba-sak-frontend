import type { ReactNode } from 'react';

import { useFagsak } from '@hooks/useFagsak';
import { Fagsaklinje } from '@komponenter/Saklinje/Fagsaklinje';

import { BodyShort, Box, Heading, HStack, Loader, LocalAlert } from '@navikt/ds-react';

import { useHentInfotrygdSaker } from './useHentInfotrygdSaker';
import { Infotrygdtabeller } from '../../Infotrygd/Infotrygdtabeller';

const InnholdContainer = ({ children }: { children: ReactNode }) => (
    <Box maxWidth="70rem" marginBlock="space-40" marginInline="space-64">
        {children}
    </Box>
);

export const Infotrygd = () => {
    const fagsak = useFagsak();

    const { data, isPending, error } = useHentInfotrygdSaker(fagsak.søkerFødselsnummer);

    if (isPending) {
        return (
            <>
                <Fagsaklinje />
                <InnholdContainer>
                    <HStack align="center" gap="space-8">
                        <BodyShort>Henter saker</BodyShort>
                        <Loader size="small" />
                    </HStack>
                </InnholdContainer>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Fagsaklinje />
                <InnholdContainer>
                    <LocalAlert status="error">
                        <LocalAlert.Header>
                            <LocalAlert.Title>En feil har oppstått ved henting av saker</LocalAlert.Title>
                        </LocalAlert.Header>
                    </LocalAlert>
                </InnholdContainer>
            </>
        );
    }

    return (
        <>
            <Fagsaklinje />
            <InnholdContainer>
                <Heading size="large" level="1" children="Infotrygd" />
                <Infotrygdtabeller ident={fagsak.søkerFødselsnummer} saker={data.saker} minimalFagsak={fagsak} />
            </InnholdContainer>
        </>
    );
};
