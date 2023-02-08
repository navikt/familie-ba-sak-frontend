import React from 'react';
import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { AddCircle, Delete } from '@navikt/ds-icons';
import { Table, BodyShort, Heading, Button } from '@navikt/ds-react';
import { AFontWeightBold } from '@navikt/ds-tokens/dist/tokens';
import CountryData from '@navikt/land-verktoy';

import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import useLeggTilFjernBrevmottaker, { mottakerVisningsnavn } from './useLeggTilFjernBrevmottaker';
import type { IRestBrevmottaker } from './useLeggTilFjernBrevmottaker';

const FlexDiv = styled.div`
    display: flex;
    justify-content: space-between;
`;

const LeggTilKnapp = styled(Button)`
    margin-top: 1rem;
`;

const StyledBodyShort = styled(BodyShort)`
    font-weight: ${AFontWeightBold};
    word-break: break-word;
`;

const StyledDiv = styled.div`
    margin-top: 2.5rem;
`;

interface IProps {
    mottaker: IRestBrevmottaker;
    visLeggTilKnapp: boolean;
    leggTilOnClick: () => void;
}

const BrevmottakerTabell: React.FC<IProps> = ({ mottaker, visLeggTilKnapp, leggTilOnClick }) => {
    const { fjernMottaker } = useLeggTilFjernBrevmottaker();
    const { vurderErLesevisning, åpenBehandling } = useBehandling();
    const erLesevisning = vurderErLesevisning();
    const land = CountryData.getCountryInstance('nb').findByValue(mottaker.landkode);

    const [heightNavn, settHeightNavn] = useState('initial');
    const [heightAdresselinje1, settHeightAdresselinje1] = useState('initial');
    const [heightAdresselinje2, settHeightAdresselinje2] = useState('initial');
    const [heightPostnummer, settHeightPostnummer] = useState('initial');
    const [heightPoststed, settHeightPoststed] = useState('initial');
    const [heightLand, settHeightLand] = useState('initial');

    useEffect(() => {
        settHeightNavn(`${document.getElementById(`navn-${mottaker.id}`)?.offsetHeight}px`);
        settHeightAdresselinje1(
            `${document.getElementById(`adresselinje1-${mottaker.id}`)?.offsetHeight}px`
        );
        settHeightAdresselinje2(
            `${document.getElementById(`adresselinje2-${mottaker.id}`)?.offsetHeight}px`
        );
        settHeightPostnummer(
            `${document.getElementById(`postnummer-${mottaker.id}`)?.offsetHeight}px`
        );
        settHeightPoststed(`${document.getElementById(`poststed-${mottaker.id}`)?.offsetHeight}px`);
        settHeightLand(`${document.getElementById(`land-${mottaker.id}`)?.offsetHeight}px`);
    }, [åpenBehandling]);

    return (
        <StyledDiv>
            <FlexDiv>
                <Heading size="medium" children={mottakerVisningsnavn[mottaker.type]} />
                {!erLesevisning && (
                    <Button
                        variant={'tertiary'}
                        onClick={() => fjernMottaker(mottaker.id)}
                        loading={false}
                        disabled={false}
                        size={'small'}
                        icon={<Delete />}
                    >
                        {'Fjern'}
                    </Button>
                )}
            </FlexDiv>
            <FlexDiv role="grid" aria-colcount={2} aria-rowcount={6}>
                <Table>
                    <Table.Header>
                        <Table.Row role="row" aria-rowindex={1}>
                            <Table.HeaderCell
                                role="columnheader"
                                aria-colindex={1}
                                style={{ height: heightNavn }}
                            >
                                <BodyShort>Navn</BodyShort>
                            </Table.HeaderCell>
                        </Table.Row>
                        <Table.Row role="row" aria-rowindex={2}>
                            <Table.HeaderCell
                                role="columnheader"
                                aria-colindex={1}
                                style={{ height: heightAdresselinje1 }}
                            >
                                <BodyShort>Adresselinje 1</BodyShort>
                            </Table.HeaderCell>
                        </Table.Row>
                        <Table.Row role="row" aria-rowindex={3}>
                            <Table.HeaderCell
                                role="columnheader"
                                aria-colindex={1}
                                style={{ height: heightAdresselinje2 }}
                            >
                                <BodyShort>Adresselinje 2</BodyShort>
                            </Table.HeaderCell>
                        </Table.Row>
                        <Table.Row role="row" aria-rowindex={4}>
                            <Table.HeaderCell
                                role="columnheader"
                                aria-colindex={1}
                                style={{ height: heightPostnummer }}
                            >
                                <BodyShort>Postnummer</BodyShort>
                            </Table.HeaderCell>
                        </Table.Row>
                        <Table.Row role="row" aria-rowindex={5}>
                            <Table.HeaderCell
                                role="columnheader"
                                aria-colindex={1}
                                style={{ height: heightPoststed }}
                            >
                                <BodyShort>Poststed</BodyShort>
                            </Table.HeaderCell>
                        </Table.Row>
                        <Table.Row role="row" aria-rowindex={6}>
                            <Table.HeaderCell
                                role="columnheader"
                                aria-colindex={1}
                                style={{ height: heightLand }}
                            >
                                <BodyShort>Land</BodyShort>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                </Table>
                <Table>
                    <Table.Body>
                        <Table.Row role="row" aria-rowindex={1}>
                            <Table.DataCell
                                id={`navn-${mottaker.id}`}
                                role="gridcell"
                                aria-colindex={2}
                            >
                                <StyledBodyShort>{mottaker.navn}</StyledBodyShort>
                            </Table.DataCell>
                        </Table.Row>
                        <Table.Row role="row" aria-rowindex={2}>
                            <Table.DataCell
                                id={`adresselinje1-${mottaker.id}`}
                                role="gridcell"
                                aria-colindex={2}
                            >
                                <StyledBodyShort>{mottaker.adresselinje1}</StyledBodyShort>
                            </Table.DataCell>
                        </Table.Row>
                        <Table.Row role="row" aria-rowindex={3}>
                            <Table.DataCell
                                id={`adresselinje2-${mottaker.id}`}
                                role="gridcell"
                                aria-colindex={2}
                            >
                                <StyledBodyShort>{mottaker.adresselinje2 || '-'}</StyledBodyShort>
                            </Table.DataCell>
                        </Table.Row>
                        <Table.Row role="row" aria-rowindex={4}>
                            <Table.DataCell
                                id={`postnummer-${mottaker.id}`}
                                role="gridcell"
                                aria-colindex={2}
                            >
                                <StyledBodyShort>{mottaker.postnummer}</StyledBodyShort>
                            </Table.DataCell>
                        </Table.Row>
                        <Table.Row role="row" aria-rowindex={5}>
                            <Table.DataCell
                                id={`poststed-${mottaker.id}`}
                                role="gridcell"
                                aria-colindex={2}
                            >
                                <StyledBodyShort>{mottaker.poststed}</StyledBodyShort>
                            </Table.DataCell>
                        </Table.Row>
                        <Table.Row role="row" aria-rowindex={6}>
                            <Table.DataCell
                                id={`land-${mottaker.id}`}
                                role="gridcell"
                                aria-colindex={2}
                            >
                                <StyledBodyShort>{land.label}</StyledBodyShort>
                            </Table.DataCell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </FlexDiv>
            {!erLesevisning && visLeggTilKnapp && (
                <LeggTilKnapp
                    variant="tertiary"
                    size="small"
                    icon={<AddCircle />}
                    onClick={leggTilOnClick}
                >
                    Legg til ny mottaker
                </LeggTilKnapp>
            )}
        </StyledDiv>
    );
};

export default BrevmottakerTabell;
