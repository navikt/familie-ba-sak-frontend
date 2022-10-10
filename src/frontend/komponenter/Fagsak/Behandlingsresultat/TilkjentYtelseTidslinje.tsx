import React from 'react';

import styled from 'styled-components';

import { BodyShort, Heading } from '@navikt/ds-react';
import { Tidslinje, type Etikett } from '@navikt/familie-tidslinje';

import { useTidslinje } from '../../../context/TidslinjeContext';
import type { IPersonMedAndelerTilkjentYtelse } from '../../../typer/beregning';
import type { IGrunnlagPerson } from '../../../typer/person';
import { formaterIdent } from '../../../utils/formatter';
import { kalenderDatoFraDate, kalenderDatoTilDate, sisteDagIMåned } from '../../../utils/kalender';
import TidslinjeEtikett from './TidslinjeEtikett';
import TidslinjeNavigering from './TidslinjeNavigering';
import Vinduvelger from './VinduVelger';

const TidslinjeHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 1rem;
`;

const TidslinjeControls = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    > div:first-child {
        margin-bottom: 1rem;
    }
`;

const TidslinjeContainer = styled.div`
    display: flex;
    & .tidslinje {
        margin: 0;
        overflow-x: hidden;
    }

    & .navds-body-short {
        &:first-child {
            margin-top: 4.8rem;
        }
    }

    & .navds-body-short {
        &:not(:first-child) {
            margin-top: 2.125rem;
        }
    }
`;

const TidslinjeLabels = styled.div`
    min-width: 7rem;
`;

interface IProps {
    grunnlagPersoner: IGrunnlagPerson[];
    tidslinjePersoner: IPersonMedAndelerTilkjentYtelse[];
}

const TilkjentYtelseTidslinje: React.FC<IProps> = ({ grunnlagPersoner, tidslinjePersoner }) => {
    const { genererFormatertÅrstall, genererRader, aktivEtikett, aktivtTidslinjeVindu, naviger } =
        useTidslinje();
    const tidslinjeRader = genererRader(tidslinjePersoner);

    return (
        <>
            <TidslinjeHeader>
                <Heading size={'small'} level={'2'}>
                    {genererFormatertÅrstall()}
                </Heading>
                <TidslinjeControls>
                    <Vinduvelger />
                    <TidslinjeNavigering naviger={naviger} />
                </TidslinjeControls>
            </TidslinjeHeader>
            <TidslinjeContainer>
                <TidslinjeLabels>
                    {grunnlagPersoner.map((person, index) => {
                        return (
                            <BodyShort key={index} title={person.navn}>
                                {formaterIdent(person.personIdent)}
                            </BodyShort>
                        );
                    })}
                </TidslinjeLabels>
                <Tidslinje
                    rader={tidslinjeRader}
                    etikettRender={(etikett: Etikett) => <TidslinjeEtikett etikett={etikett} />}
                    startDato={kalenderDatoTilDate(aktivtTidslinjeVindu.startDato, 23, 0)}
                    sluttDato={kalenderDatoTilDate(aktivtTidslinjeVindu.sluttDato)}
                    aktivtUtsnitt={
                        aktivEtikett && {
                            fom: aktivEtikett.date,
                            tom: kalenderDatoTilDate(
                                sisteDagIMåned(kalenderDatoFraDate(aktivEtikett.date))
                            ),
                        }
                    }
                />
            </TidslinjeContainer>
        </>
    );
};

export default TilkjentYtelseTidslinje;
