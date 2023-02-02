import React from 'react';

import styled from 'styled-components';

import { Delete } from '@navikt/ds-icons';
import { Table, BodyShort, Heading, Button } from '@navikt/ds-react';
import CountryData from '@navikt/land-verktoy';

import useLeggTilFjernBrevmottaker, { mottakerVisningsnavn } from './useLeggTilFjernBrevmottaker';
import type { IRestBrevmottaker } from './useLeggTilFjernBrevmottaker';

const FlexDiv = styled.div`
    display: flex;
    justify-content: space-between;
`;

const StyledButton = styled(Button)`
    float: right;
`;

const StyledBodyShort = styled(BodyShort)`
    font-weight: 600;
`;

const StyledDiv = styled.div`
    margin-top: 2.5rem;
`;

interface IProps {
    mottaker: IRestBrevmottaker;
}
const BrevmottakerTabell: React.FC<IProps> = ({ mottaker }) => {
    const { fjernMottaker } = useLeggTilFjernBrevmottaker();
    const land = CountryData.getCountryInstance('nb').findByValue(mottaker.landkode);
    return (
        <StyledDiv>
            <FlexDiv>
                <Heading size="medium" children={mottakerVisningsnavn[mottaker.type]} />
                <StyledButton
                    variant={'tertiary'}
                    onClick={() => fjernMottaker(mottaker.id)}
                    loading={false}
                    disabled={false}
                    size={'small'}
                    icon={<Delete />}
                >
                    {'Fjern'}
                </StyledButton>
            </FlexDiv>
            <FlexDiv role="grid" aria-colcount={2} aria-rowcount={6}>
                <Table>
                    <Table.Header>
                        <Table.Row role="row" aria-rowindex={1}>
                            <Table.HeaderCell role="columnheader" aria-colindex={1}>
                                <BodyShort>Navn</BodyShort>
                            </Table.HeaderCell>
                        </Table.Row>
                        <Table.Row role="row" aria-rowindex={2}>
                            <Table.HeaderCell role="columnheader" aria-colindex={1}>
                                <BodyShort>Adresselinje 1</BodyShort>
                            </Table.HeaderCell>
                        </Table.Row>
                        <Table.Row role="row" aria-rowindex={3}>
                            <Table.HeaderCell role="columnheader" aria-colindex={1}>
                                <BodyShort>Adresselinje 2</BodyShort>
                            </Table.HeaderCell>
                        </Table.Row>
                        <Table.Row role="row" aria-rowindex={4}>
                            <Table.HeaderCell role="columnheader" aria-colindex={1}>
                                <BodyShort>Postnummer</BodyShort>
                            </Table.HeaderCell>
                        </Table.Row>
                        <Table.Row role="row" aria-rowindex={5}>
                            <Table.HeaderCell role="columnheader" aria-colindex={1}>
                                <BodyShort>Poststed</BodyShort>
                            </Table.HeaderCell>
                        </Table.Row>
                        <Table.Row role="row" aria-rowindex={6}>
                            <Table.HeaderCell role="columnheader" aria-colindex={1}>
                                <BodyShort>Land</BodyShort>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                </Table>
                <Table>
                    <Table.Body>
                        <Table.Row role="row" aria-rowindex={1}>
                            <Table.DataCell role="gridcell" aria-colindex={2}>
                                <StyledBodyShort>{mottaker.navn}</StyledBodyShort>
                            </Table.DataCell>
                        </Table.Row>
                        <Table.Row role="row" aria-rowindex={2}>
                            <Table.DataCell role="gridcell" aria-colindex={2}>
                                <StyledBodyShort>{mottaker.adresselinje1}</StyledBodyShort>
                            </Table.DataCell>
                        </Table.Row>
                        <Table.Row role="row" aria-rowindex={3}>
                            <Table.DataCell role="gridcell" aria-colindex={2}>
                                <StyledBodyShort>{mottaker.adresselinje2 || '-'}</StyledBodyShort>
                            </Table.DataCell>
                        </Table.Row>
                        <Table.Row role="row" aria-rowindex={4}>
                            <Table.DataCell role="gridcell" aria-colindex={2}>
                                <StyledBodyShort>{mottaker.postnummer}</StyledBodyShort>
                            </Table.DataCell>
                        </Table.Row>
                        <Table.Row role="row" aria-rowindex={5}>
                            <Table.DataCell role="gridcell" aria-colindex={2}>
                                <StyledBodyShort>{mottaker.poststed}</StyledBodyShort>
                            </Table.DataCell>
                        </Table.Row>
                        <Table.Row role="row" aria-rowindex={6}>
                            <Table.DataCell role="gridcell" aria-colindex={2}>
                                <StyledBodyShort>{land.label}</StyledBodyShort>
                            </Table.DataCell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </FlexDiv>
        </StyledDiv>
    );
};

export default BrevmottakerTabell;
