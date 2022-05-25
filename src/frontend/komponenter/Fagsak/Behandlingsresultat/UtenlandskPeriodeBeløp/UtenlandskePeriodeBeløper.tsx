import * as React from 'react';

import styled from 'styled-components';

import { Alert, Heading } from '@navikt/ds-react';

import { useEøs } from '../../../../context/Eøs/EøsContext';
import type { IBehandling } from '../../../../typer/behandling';
import type { IRestUtenlandskPeriodeBeløp } from '../../../../typer/kompetanse';
import UtenlandskPeriodeBeløpRad from './UtenlandskPeriodeBeløpTabellRad';

const UtenlandskPeriodeBeløperContainer = styled.div`
    margin-top: 5rem;
`;

const Tabell = styled.table`
    margin-top: 2rem;
    table-layout: fixed;

    & fieldset.skjemagruppe {
        margin-bottom: 1.5rem;
    }
`;

const TabellHeader = styled.th`
    &:nth-of-type(2) {
        width: 11rem;
    }
    &:nth-of-type(3) {
        width: 10rem;
    }
    &:nth-of-type(4) {
        width: 9rem;
    }
    &:nth-of-type(5) {
        width: 14rem;
    }
`;

interface IProps {
    utenlandskePeriodeBeløper: IRestUtenlandskPeriodeBeløp[];
    åpenBehandling: IBehandling;
    visFeilmeldinger: boolean;
}

const UtenlandskePeriodeBeløper: React.FC<IProps> = ({
    utenlandskePeriodeBeløper,
    åpenBehandling,
    visFeilmeldinger,
}) => {
    const { erUtenlandskePeriodeBeløperGyldige } = useEøs();

    return (
        <UtenlandskPeriodeBeløperContainer>
            <Heading spacing size="medium" level="3">
                Utbetalt i det andre landet
            </Heading>
            {!erUtenlandskePeriodeBeløperGyldige() && (
                <Alert
                    variant={'warning'}
                    fullWidth
                    children={
                        'I periodene Norge er sekundærland må beløpene fra det andre medlemslandet registreres'
                    }
                />
            )}
            <Tabell className={`tabell`}>
                <thead>
                    <tr>
                        <TabellHeader>Barn</TabellHeader>
                        <TabellHeader>Periode</TabellHeader>
                        <TabellHeader>Beløp per måned</TabellHeader>
                        <TabellHeader>Valuta</TabellHeader>
                        <TabellHeader></TabellHeader>
                    </tr>
                </thead>
                <tbody>
                    {utenlandskePeriodeBeløper.map(utenlandskPeriodeBeløp => (
                        <UtenlandskPeriodeBeløpRad
                            key={`${utenlandskPeriodeBeløp.barnIdenter.map(barn => `${barn}-`)}-${
                                utenlandskPeriodeBeløp.fom
                            }-${utenlandskPeriodeBeløp.tom}`}
                            utenlandskPeriodeBeløp={utenlandskPeriodeBeløp}
                            åpenBehandling={åpenBehandling}
                            visFeilmeldinger={visFeilmeldinger}
                        />
                    ))}
                </tbody>
            </Tabell>
        </UtenlandskPeriodeBeløperContainer>
    );
};

export default UtenlandskePeriodeBeløper;
