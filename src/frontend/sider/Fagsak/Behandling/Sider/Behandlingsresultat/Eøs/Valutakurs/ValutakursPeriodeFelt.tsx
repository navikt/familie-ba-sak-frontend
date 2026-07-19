import MånedÅrVelger from '@komponenter/MånedÅrInput/MånedÅrVelger';
import { dagensDato, isoStringTilDate } from '@utils/dato';
import { isEmpty } from '@utils/eøsValidators';
import { addMonths, endOfMonth, isAfter } from 'date-fns';
import { useController, useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import { Fieldset } from '@navikt/ds-react';

import { ValutakursFelt, type ValutakursFormValues } from './useValutakursSkjema';

const FlexDiv = styled.div`
    width: 32rem;
    display: flex;
    justify-content: space-between;
    font-size: 1rem;

    div {
        z-index: 0;
    }

    div div.skjemaelement {
        margin-bottom: 0;
    }
`;

const valgtDatoErNesteMånedEllerSenere = (valgtDato: string) =>
    isAfter(isoStringTilDate(valgtDato), endOfMonth(dagensDato));

const valgtDatoErSenereEnnNesteMåned = (valgtDato: string) =>
    isAfter(isoStringTilDate(valgtDato), endOfMonth(addMonths(dagensDato, 1)));

interface Props {
    initielFom: string;
    periodeFeilmeldingId: string;
    lesevisning: boolean;
}

export function ValutakursPeriodeFelt({ initielFom, periodeFeilmeldingId, lesevisning }: Props) {
    const { control } = useFormContext<ValutakursFormValues>();

    const {
        field: { value, onChange },
        fieldState: { error },
    } = useController({
        name: ValutakursFelt.PERIODE,
        control,
        rules: {
            validate: periode => {
                const fom = periode.fom;
                const tom = periode.tom;

                if (!fom || isEmpty(fom)) {
                    return 'Fra og med måned må være utfylt';
                }
                if (fom && valgtDatoErSenereEnnNesteMåned(fom)) {
                    return 'Du kan ikke sette fra og med (f.o.m.) til måneden etter neste måned eller senere';
                }
                if (initielFom && !isAfter(isoStringTilDate(fom), isoStringTilDate(initielFom))) {
                    return `Du kan ikke legge inn fra og med måned som er før: ${initielFom}`;
                }
                if (tom && valgtDatoErNesteMånedEllerSenere(tom)) {
                    return 'Du kan ikke sette til og med (t.o.m.) til neste måned eller senere';
                }
                return undefined;
            },
        },
    });

    const finnÅrTilbakeTil = (): number => new Date().getFullYear() - new Date(initielFom).getFullYear();

    return (
        <Fieldset
            className={lesevisning ? 'lesevisning' : ''}
            errorId={periodeFeilmeldingId}
            error={error?.message}
            legend="Periode"
            size="medium"
        >
            <FlexDiv>
                <MånedÅrVelger
                    lesevisning={lesevisning}
                    id={'periode_fom'}
                    label={'F.o.m'}
                    antallÅrTilbake={finnÅrTilbakeTil()}
                    antallÅrFrem={0}
                    value={value.fom ?? undefined}
                    onEndret={årMåned => {
                        if (årMåned === value.fom) {
                            return;
                        }
                        onChange({ ...value, fom: årMåned });
                    }}
                />
                <MånedÅrVelger
                    lesevisning={lesevisning}
                    id={'periode_tom'}
                    label={'T.o.m (valgfri)'}
                    antallÅrTilbake={finnÅrTilbakeTil()}
                    antallÅrFrem={0}
                    value={value.tom ?? undefined}
                    onEndret={årMåned => {
                        if (årMåned === value.tom) {
                            return;
                        }
                        onChange({ ...value, tom: årMåned });
                    }}
                />
            </FlexDiv>
        </Fieldset>
    );
}
