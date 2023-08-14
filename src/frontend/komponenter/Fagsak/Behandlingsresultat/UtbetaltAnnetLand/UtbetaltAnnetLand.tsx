import * as React from 'react';

import styled from 'styled-components';

import { Alert, Heading, Table } from '@navikt/ds-react';

import UtenlandskPeriodeBeløpRad from './UtenlandskPeriodeBeløpTabellRad';
import { useEøs } from '../../../../context/Eøs/EøsContext';
import type { IBehandling } from '../../../../typer/behandling';
import type { IRestUtenlandskPeriodeBeløp } from '../../../../typer/eøsPerioder';

const UtenlandskPeriodeBeløperContainer = styled.div`
    margin-top: 5rem;
`;

const StyledTable = styled(Table)`
    margin-top: 2rem;

    & fieldset.skjemagruppe {
        margin-bottom: 1.5rem;
    }
`;

const TabellHeader = styled(Table.HeaderCell)`
    &:nth-of-type(2) {
        width: 11rem;
    }
    &:nth-of-type(3) {
        width: 9.5rem;
    }
    &:nth-of-type(4) {
        width: 11rem;
    }
    &:nth-of-type(5) {
        width: 2.25rem;
    }
`;

interface IProps {
    utbetaltAnnetLandBeløp: IRestUtenlandskPeriodeBeløp[];
    åpenBehandling: IBehandling;
    visFeilmeldinger: boolean;
}

const UtbetaltAnnetLand: React.FC<IProps> = ({
    utbetaltAnnetLandBeløp,
    åpenBehandling,
    visFeilmeldinger,
}) => {
    const { erUtbetaltAnnetLandBeløpGyldige } = useEøs();

    return (
        <UtenlandskPeriodeBeløperContainer>
            <Heading spacing size="medium" level="3">
                Utbetalt i det andre landet
            </Heading>
            {!erUtbetaltAnnetLandBeløpGyldige() && (
                <Alert
                    variant={'warning'}
                    fullWidth
                    children={
                        'I periodene Norge er sekundærland må beløpene fra det andre medlemslandet registreres'
                    }
                />
            )}
            <StyledTable>
                <Table.Header>
                    <Table.Row>
                        <TabellHeader scope="col">Barn</TabellHeader>
                        <TabellHeader scope="col">Periode</TabellHeader>
                        <TabellHeader scope="col">Beløp per måned</TabellHeader>
                        <TabellHeader scope="col">Valuta</TabellHeader>
                        <TabellHeader></TabellHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {utbetaltAnnetLandBeløp.map(utenlandskPeriodeBeløp => (
                        <UtenlandskPeriodeBeløpRad
                            key={`${utenlandskPeriodeBeløp.barnIdenter.map(barn => `${barn}-`)}-${
                                utenlandskPeriodeBeløp.fom
                            }-${utenlandskPeriodeBeløp.tom}`}
                            utenlandskPeriodeBeløp={utenlandskPeriodeBeløp}
                            åpenBehandling={åpenBehandling}
                            visFeilmeldinger={visFeilmeldinger}
                        />
                    ))}
                </Table.Body>
            </StyledTable>
        </UtenlandskPeriodeBeløperContainer>
    );
};

export default UtbetaltAnnetLand;
