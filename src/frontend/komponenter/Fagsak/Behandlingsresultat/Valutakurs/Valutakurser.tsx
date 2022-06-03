import * as React from 'react';

import styled from 'styled-components';

import { Alert, Heading } from '@navikt/ds-react';

import { useEøs } from '../../../../context/Eøs/EøsContext';
import type { IBehandling } from '../../../../typer/behandling';
import type { IRestValutakurs } from '../../../../typer/eøsPerioder';
import ValutakursTabellRad from './ValutakursTabellRad';

const ValutakurserContainer = styled.div`
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
        width: 7.5rem;
    }
    &:nth-of-type(4) {
        width: 4rem;
    }
    &:nth-of-type(5) {
        width: 13.5rem;
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
                        'For perioder som skal differanseberegnes, må valutakursdato og valutakurs registeres'
                    }
                />
            )}
            <Tabell className={`tabell`}>
                <thead>
                    <tr>
                        <TabellHeader>Barn</TabellHeader>
                        <TabellHeader>Periode</TabellHeader>
                        <TabellHeader>Valutakursdato</TabellHeader>
                        <TabellHeader>Valuta</TabellHeader>
                        <TabellHeader></TabellHeader>
                    </tr>
                </thead>
                <tbody>
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
                </tbody>
            </Tabell>
        </ValutakurserContainer>
    );
};

export default Valutakurser;
