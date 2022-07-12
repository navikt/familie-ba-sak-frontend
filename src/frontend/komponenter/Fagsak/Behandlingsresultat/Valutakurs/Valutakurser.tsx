import * as React from 'react';

import styled from 'styled-components';

import { Alert, Heading, Table } from '@navikt/ds-react';

import { useEøs } from '../../../../context/Eøs/EøsContext';
import type { IBehandling } from '../../../../typer/behandling';
import type { IRestValutakurs } from '../../../../typer/eøsPerioder';
import ValutakursTabellRad from './ValutakursTabellRad';

const ValutakurserContainer = styled.div`
    margin-top: 5rem;
`;

const StyledTable = styled(Table)`
    margin-top: 2rem;

    & fieldset.skjemagruppe {
        margin-bottom: 1.5rem;
    }
`;

const StyledHeaderCell = styled(Table.HeaderCell)`
    &:nth-of-type(2) {
        width: 11rem;
    }
    &:nth-of-type(3) {
        width: 7.5rem;
    }
    &:nth-of-type(4) {
        width: 4rem;
    }
    &:nth-of-type(5) {
        width: 15rem;
    }
`;

interface IProps {
    valutakurser: IRestValutakurs[];
    åpenBehandling: IBehandling;
    visFeilmeldinger: boolean;
}

const Valutakurser: React.FC<IProps> = ({ valutakurser, åpenBehandling, visFeilmeldinger }) => {
    const { erValutakurserGyldige } = useEøs();
    return (
        <ValutakurserContainer>
            <Heading spacing size="medium" level="3">
                Valuta
            </Heading>
            {!erValutakurserGyldige() && (
                <Alert
                    variant={'warning'}
                    fullWidth
                    children={
                        'For perioder som skal differanseberegnes, må valutakursdato registeres'
                    }
                />
            )}
            <StyledTable className={`tabell`}>
                <Table.Header>
                    <Table.Row>
                        <StyledHeaderCell scope="col">Barn</StyledHeaderCell>
                        <StyledHeaderCell scope="col">Periode</StyledHeaderCell>
                        <StyledHeaderCell scope="col">Valutakursdato</StyledHeaderCell>
                        <StyledHeaderCell scope="col">Valuta</StyledHeaderCell>
                        <StyledHeaderCell></StyledHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {valutakurser.map(valutakurs => (
                        <ValutakursTabellRad
                            key={`${valutakurs.barnIdenter.map(barn => `${barn}-`)}-${
                                valutakurs.fom
                            }-${valutakurs.tom}`}
                            valutakurs={valutakurs}
                            åpenBehandling={åpenBehandling}
                            visFeilmeldinger={visFeilmeldinger}
                        />
                    ))}
                </Table.Body>
            </StyledTable>
        </ValutakurserContainer>
    );
};

export default Valutakurser;
