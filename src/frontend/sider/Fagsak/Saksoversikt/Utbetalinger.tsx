import { BodyShort, HStack, VStack } from '@navikt/ds-react';
import type { IUtbetalingsperiodeDetalj, Vedtaksperiode } from '@typer/vedtaksperiode';
import { Vedtaksperiodetype } from '@typer/vedtaksperiode';
import { formaterBeløp, sorterUtbetaling } from '@utils/formatter';

import { SaksoversiktPanelBredde } from './FagsakLenkepanel';
import PersonUtbetaling from './PersonUtbetaling';
import styles from './Utbetalinger.module.css';

interface IUtbetalingerProps {
    vedtaksperiode?: Vedtaksperiode;
}

const Utbetalinger = ({ vedtaksperiode }: IUtbetalingerProps) => {
    if (vedtaksperiode?.vedtaksperiodetype !== Vedtaksperiodetype.UTBETALING) return null;

    const utbetalingsperiodeDetaljerGruppertPåPerson =
        vedtaksperiode?.utbetalingsperiodeDetaljer
            .sort(sorterUtbetaling)
            .reduce((acc: { [key: string]: IUtbetalingsperiodeDetalj[] }, utbetalingsperiodeDetalj) => {
                const utbetalingsperiodeDetaljerForPerson = acc[utbetalingsperiodeDetalj.person.personIdent] ?? [];

                return {
                    ...acc,
                    [utbetalingsperiodeDetalj.person.personIdent]: [
                        ...utbetalingsperiodeDetaljerForPerson,
                        utbetalingsperiodeDetalj,
                    ],
                };
            }, {}) ?? {};

    return (
        <VStack maxWidth={SaksoversiktPanelBredde} gap="space-16" marginBlock={'space-24 space-0'}>
            {Object.values(utbetalingsperiodeDetaljerGruppertPåPerson).map(
                (utbetalingsperiodeDetaljerForPerson, index) => {
                    return (
                        <PersonUtbetaling
                            key={index}
                            utbetalingsperiodeDetaljer={utbetalingsperiodeDetaljerForPerson}
                        />
                    );
                }
            )}
            <HStack
                className={styles.total}
                marginInline={'space-32 space-0'}
                paddingBlock={'space-0 space-8'}
                justify="space-between"
            >
                <BodyShort>Totalt utbetalt/mnd</BodyShort>
                <BodyShort weight="semibold">
                    {vedtaksperiode ? formaterBeløp(vedtaksperiode.utbetaltPerMnd) : '-'}
                </BodyShort>
            </HStack>
        </VStack>
    );
};

export default Utbetalinger;
