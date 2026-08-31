import { BodyShort, Box, HStack } from '@navikt/ds-react';
import { YtelseType, ytelsetype } from '@typer/beregning';
import type { IUtbetalingsperiodeDetalj } from '@typer/vedtaksperiode';
import { formaterBeløp, hentAlder } from '@utils/formatter';

import { PersonInformasjonUtbetaling } from './PersonInformasjonUtbetaling';
import styles from './PersonUtbetaling.module.css';

interface IPersonUtbetalingProps {
    utbetalingsperiodeDetaljer: IUtbetalingsperiodeDetalj[];
}

const PersonUtbetaling = ({ utbetalingsperiodeDetaljer }: IPersonUtbetalingProps) => {
    const genererTekstForOrdinær = (utbetalingsperiodeDetalj: IUtbetalingsperiodeDetalj) => {
        if (utbetalingsperiodeDetalj.person.skjermesForBruker) {
            return ytelsetype[utbetalingsperiodeDetalj.ytelseType].navn;
        }
        return hentAlder(utbetalingsperiodeDetalj.person.fødselsdato) < 6
            ? 'Ordinær (under 6 år)'
            : 'Ordinær (fra 6 år)';
    };

    return (
        <section>
            <PersonInformasjonUtbetaling person={utbetalingsperiodeDetaljer[0].person} />
            <Box
                asChild
                borderColor={'neutral'}
                borderWidth={'0 0 1 0'}
                marginBlock={'space-8 space-16'}
                marginInline={'space-32 space-0'}
                className={styles.ytelse}
            >
                <section>
                    {utbetalingsperiodeDetaljer.map(utbetalingsperiodeDetalj => {
                        return (
                            <HStack
                                justify="space-between"
                                key={utbetalingsperiodeDetalj.person.personIdent}
                                marginBlock={'space-0 space-16'}
                            >
                                <BodyShort>
                                    {utbetalingsperiodeDetalj.ytelseType === YtelseType.ORDINÆR_BARNETRYGD
                                        ? genererTekstForOrdinær(utbetalingsperiodeDetalj)
                                        : ytelsetype[utbetalingsperiodeDetalj.ytelseType].navn}
                                </BodyShort>
                                <BodyShort>{formaterBeløp(utbetalingsperiodeDetalj.utbetaltPerMnd)}</BodyShort>
                            </HStack>
                        );
                    })}
                </section>
            </Box>
        </section>
    );
};

export default PersonUtbetaling;
