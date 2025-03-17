import React from 'react';

import styled from 'styled-components';

import { BodyShort, HStack } from '@navikt/ds-react';
import { ASpacing2, ASpacing4, ASpacing8 } from '@navikt/ds-tokens/dist/tokens';

import PersonInformasjon from '../../../Felleskomponenter/PersonInformasjon/PersonInformasjon';
import { YtelseType, ytelsetype } from '../../../typer/beregning';
import type { IUtbetalingsperiodeDetalj } from '../../../typer/vedtaksperiode';
import { formaterBeløp, hentAlder } from '../../../utils/formatter';

const Ytelser = styled.section`
    margin: ${ASpacing2} 0 ${ASpacing4} ${ASpacing8};
    border-bottom: 1px dashed;
`;

const Ytelselinje = styled(HStack)`
    margin-bottom: ${ASpacing4};
`;

interface IPersonUtbetalingProps {
    utbetalingsperiodeDetaljer: IUtbetalingsperiodeDetalj[];
}

const PersonUtbetaling: React.FC<IPersonUtbetalingProps> = ({ utbetalingsperiodeDetaljer }) => {
    const genererTekstForOrdinær = (fødselsdato: string) =>
        hentAlder(fødselsdato) < 6 ? 'Ordinær (under 6 år)' : 'Ordinær (fra 6 år)';

    return (
        <section>
            <PersonInformasjon
                person={utbetalingsperiodeDetaljer[0].person}
                erLesevisning={false}
            />
            <Ytelser>
                {utbetalingsperiodeDetaljer.map(utbetalingsperiodeDetalj => {
                    return (
                        <Ytelselinje
                            justify="space-between"
                            key={utbetalingsperiodeDetalj.person.personIdent}
                        >
                            <BodyShort>
                                {utbetalingsperiodeDetalj.ytelseType ===
                                YtelseType.ORDINÆR_BARNETRYGD
                                    ? genererTekstForOrdinær(
                                          utbetalingsperiodeDetalj.person.fødselsdato
                                      )
                                    : ytelsetype[utbetalingsperiodeDetalj.ytelseType].navn}
                            </BodyShort>
                            <BodyShort>
                                {formaterBeløp(utbetalingsperiodeDetalj.utbetaltPerMnd)}
                            </BodyShort>
                        </Ytelselinje>
                    );
                })}
            </Ytelser>
        </section>
    );
};

export default PersonUtbetaling;
