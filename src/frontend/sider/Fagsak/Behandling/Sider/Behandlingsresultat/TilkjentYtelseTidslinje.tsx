import { BodyShort, Box, Heading, HStack, VStack } from '@navikt/ds-react';
import type { Etikett } from '@navikt/familie-tidslinje';
import { Tidslinje } from '@navikt/familie-tidslinje';
import { formaterIdent } from '@utils/formatter';
import { endOfMonth } from 'date-fns';
import { useTidslinjeContext } from '../../../../../komponenter/Tidslinje/TidslinjeContext';
import TidslinjeEtikett from '../../../../../komponenter/Tidslinje/TidslinjeEtikett';
import TidslinjeNavigering from '../../../../../komponenter/Tidslinje/TidslinjeNavigering';
import Vinduvelger from '../../../../../komponenter/Tidslinje/VinduVelger';
import type { IPersonMedAndelerTilkjentYtelse } from '../../../../../typer/beregning';
import type { FagsakType } from '../../../../../typer/fagsak';
import type { IGrunnlagPerson } from '../../../../../typer/person';
import Styles from './TilkjentYtelseTidslinje.module.css';

interface IProps {
    grunnlagPersoner: IGrunnlagPerson[];
    tidslinjePersoner: IPersonMedAndelerTilkjentYtelse[];
    fagsakType?: FagsakType;
}

const TilkjentYtelseTidslinje = ({ grunnlagPersoner, tidslinjePersoner, fagsakType }: IProps) => {
    const { genererFormatertÅrstall, genererRader, aktivEtikett, aktivtTidslinjeVindu, naviger } =
        useTidslinjeContext();
    const tidslinjeRader = genererRader(fagsakType, tidslinjePersoner);

    return (
        <>
            <HStack justify={'space-between'} align={'end'} marginBlock={'space-0 space-16'}>
                <Heading size={'small'} level={'2'}>
                    {genererFormatertÅrstall()}
                </Heading>
                <VStack gap={'space-16'} align={'end'}>
                    <Vinduvelger />
                    <TidslinjeNavigering naviger={naviger} />
                </VStack>
            </HStack>
            <HStack className={Styles.container}>
                <Box minWidth={'7rem'}>
                    {grunnlagPersoner.map((person, index) => {
                        return (
                            <Box key={index} paddingInline={'space-0 space-8'} asChild>
                                <BodyShort title={person.navn}>{formaterIdent(person.personIdent)}</BodyShort>
                            </Box>
                        );
                    })}
                </Box>
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
            </HStack>
        </>
    );
};

export default TilkjentYtelseTidslinje;
