import * as React from 'react';

import styled from 'styled-components';

import { BodyShort, CopyButton, Heading } from '@navikt/ds-react';

import KontorIkonGrønn from '../../../ikoner/KontorIkonGrønn';
import type { ISamhandlerInfo } from '../../../typer/samhandler';
import { formaterIdent } from '../../../utils/formatter';

interface IProps {
    samhandler: ISamhandlerInfo;
    somOverskrift?: boolean;
    width?: string;
}

const FlexDiv = styled.div`
    display: flex;
    align-items: center;

    & .kontor-ikon {
        margin-right: 1.5rem;

        &--for-normaltekst {
            margin-right: 0.5rem;
        }
    }

    & .navn {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

const FlexBox = styled.div`
    display: flex;
    align-items: center;
    gap: 0.25rem;
`;

const SamhandlerInformasjon: React.FunctionComponent<IProps> = ({
    samhandler,
    somOverskrift = false,
}) => {
    const navn = samhandler.navn;
    const formattertOrgNummer = formaterIdent(samhandler.orgNummer);
    return (
        <FlexDiv>
            {somOverskrift && (
                <>
                    <KontorIkonGrønn className={'kontor-ikon'} height={'32'} width={'32'} />
                    <Heading level="2" size="medium" className={'navn'} title={navn}>
                        {navn}
                    </Heading>
                    <Heading level="2" size="medium" as="span">
                        &ensp;|&ensp;
                    </Heading>
                    <FlexBox>
                        <Heading level="2" size="medium" as="span">
                            {formattertOrgNummer}
                        </Heading>
                        <CopyButton size={'small'} copyText={samhandler.orgNummer} />
                    </FlexBox>
                    <Heading level="2" size="medium" as="span">
                        &ensp;|&ensp;
                    </Heading>
                    <Heading level="2" size="medium" as="span">
                        Institusjon
                    </Heading>
                </>
            )}

            {!somOverskrift && (
                <>
                    <KontorIkonGrønn
                        className={'kontor-ikon--for-normaltekst'}
                        height={'24'}
                        width={'24'}
                    />
                    <BodyShort className={'navn'} title={navn}>
                        {navn}
                    </BodyShort>
                    <BodyShort>&ensp;|&ensp;</BodyShort>
                    <FlexBox>
                        <BodyShort>{formattertOrgNummer}</BodyShort>
                        <CopyButton size={'small'} copyText={samhandler.orgNummer} />
                    </FlexBox>
                    <BodyShort>&ensp;|&ensp;</BodyShort>
                    <BodyShort>Institusjon</BodyShort>
                </>
            )}
        </FlexDiv>
    );
};

export default SamhandlerInformasjon;
