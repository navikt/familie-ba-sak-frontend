import React from 'react';

import { endOfMonth } from 'date-fns';
import styled from 'styled-components';

import { BodyShort, Heading } from '@navikt/ds-react';
import type { Etikett } from '@navikt/familie-tidslinje';
import { Tidslinje } from '@navikt/familie-tidslinje';

import { useTidslinjeContext } from '../../../../../komponenter/Tidslinje/TidslinjeContext';
import TidslinjeEtikett from '../../../../../komponenter/Tidslinje/TidslinjeEtikett';
import TidslinjeNavigering from '../../../../../komponenter/Tidslinje/TidslinjeNavigering';
import Vinduvelger from '../../../../../komponenter/Tidslinje/VinduVelger';
import type { IPersonMedAndelerTilkjentYtelse } from '../../../../../typer/beregning';
import type { FagsakType } from '../../../../../typer/fagsak';
import type { IGrunnlagPerson } from '../../../../../typer/person';
import { formaterIdent } from '../../../../../utils/formatter';

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
    fagsakType?: FagsakType;
}

const TilkjentYtelseTidslinje: React.FC<IProps> = ({
    grunnlagPersoner,
    tidslinjePersoner,
    fagsakType,
}) => {
    const { genererFormatertÅrstall, genererRader, aktivEtikett, aktivtTidslinjeVindu, naviger } =
        useTidslinjeContext();
    const tidslinjeRader = genererRader(fagsakType, tidslinjePersoner);

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
                    startDato={aktivtTidslinjeVindu.startDato}
                    sluttDato={aktivtTidslinjeVindu.sluttDato}
                    aktivtUtsnitt={
                        aktivEtikett && {
                            fom: aktivEtikett.date,
                            tom: endOfMonth(aktivEtikett.date),
                        }
                    }
                />
            </TidslinjeContainer>
        </>
    );
};

export default TilkjentYtelseTidslinje;
