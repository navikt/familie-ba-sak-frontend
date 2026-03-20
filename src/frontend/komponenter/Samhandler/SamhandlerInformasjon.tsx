import * as React from 'react';

import { BodyShort, Box, CopyButton, Heading, HStack, VStack } from '@navikt/ds-react';

import KontorIkonGrønn from '../../ikoner/KontorIkonGrønn';
import type { ISamhandlerInfo } from '../../typer/samhandler';
import { formaterIdent } from '../../utils/formatter';
import { Skillelinje } from '../PersonInformasjon/PersonInformasjon';

interface IProps {
    samhandler: ISamhandlerInfo;
    somOverskrift?: boolean;
    width?: string;
}

const SamhandlerInformasjon: React.FunctionComponent<IProps> = ({ samhandler, somOverskrift = false }) => {
    const navn = samhandler.navn;
    const formattertOrgNummer = formaterIdent(samhandler.orgNummer);
    return (
        <VStack>
            {somOverskrift && (
                <HStack gap={'space-16'} align={'center'}>
                    <Box marginInline={'space-0 space-8'}>
                        <KontorIkonGrønn height={'32'} width={'32'} />
                    </Box>
                    <Heading level="2" size="medium" className={'navn'} title={navn}>
                        {navn}
                    </Heading>
                    <Skillelinje erHeading />
                    <HStack gap={'space-4'} align={'center'}>
                        <Heading level="2" size="medium" as="span">
                            {formattertOrgNummer}
                        </Heading>
                        <CopyButton size={'small'} copyText={samhandler.orgNummer} />
                    </HStack>
                    <Skillelinje erHeading />
                    <Heading level="2" size="medium" as="span">
                        Institusjon
                    </Heading>
                </HStack>
            )}

            {!somOverskrift && (
                <HStack gap={'space-8'} align={'center'}>
                    <KontorIkonGrønn height={'24'} width={'24'} />
                    <BodyShort className={'navn'} title={navn}>
                        {navn}
                    </BodyShort>
                    <Skillelinje />
                    <HStack gap={'space-4'} align={'center'}>
                        <BodyShort>{formattertOrgNummer}</BodyShort>
                        <CopyButton size={'small'} copyText={samhandler.orgNummer} />
                    </HStack>
                    <Skillelinje />
                    <BodyShort>Institusjon</BodyShort>
                </HStack>
            )}
        </VStack>
    );
};

export default SamhandlerInformasjon;
