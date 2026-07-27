import { useErLesevisning } from '@hooks/useErLesevisning';
import type { OptionType } from '@typer/common';
import { EøsPeriodeStatus, type IRestUtenlandskPeriodeBeløp } from '@typer/eøsPerioder';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import { TrashIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Fieldset, HGrid, InlineMessage } from '@navikt/ds-react';

import { type UtenlandskPeriodeBeløpFormValues } from './useUtenlandskPeriodeBeløpSkjema';
import { UtenlandskPeriodeBeløpBarnFelt } from './UtenlandskPeriodeBeløpBarnFelt';
import { UtenlandskPeriodeBeløpBeløpFelt } from './UtenlandskPeriodeBeløpBeløpFelt';
import { UtenlandskPeriodeBeløpIntervallFelt } from './UtenlandskPeriodeBeløpIntervallFelt';
import { UtenlandskPeriodeBeløpPeriodeFelt } from './UtenlandskPeriodeBeløpPeriodeFelt';
import { UtenlandskPeriodeBeløpUtbetalingslandFelt } from './UtenlandskPeriodeBeløpUtbetalingslandFelt';
import { UtenlandskPeriodeBeløpValutaFelt } from './UtenlandskPeriodeBeløpValutaFelt';
import { EøsPeriodeSkjemaContainer, Knapperad } from '../EøsKomponenter/EøsSkjemaKomponenter';

const UtbetaltBeløpText = styled(BodyShort)`
    font-weight: bold;
`;

interface Props {
    utenlandskPeriodeBeløp: IRestUtenlandskPeriodeBeløp;
    tilgjengeligeBarn: OptionType[];
    initiellFom: string;
    inneholderBarnSomSkalSkjermes?: boolean;
    onAvbryt: () => void;
    slettUtenlandskPeriodeBeløp: () => void;
    sletterUtenlandskPeriodeBeløp: boolean;
}

const UtenlandskPeriodeBeløpTabellRadEndre = ({
    utenlandskPeriodeBeløp,
    tilgjengeligeBarn,
    initiellFom,
    inneholderBarnSomSkalSkjermes,
    onAvbryt,
    slettUtenlandskPeriodeBeløp,
    sletterUtenlandskPeriodeBeløp,
}: Props) => {
    const erLesevisning = useErLesevisning();
    const erRedigeringDeaktivert = erLesevisning || !!inneholderBarnSomSkalSkjermes;

    const {
        formState: { isSubmitting, errors },
    } = useFormContext<UtenlandskPeriodeBeløpFormValues>();

    const periodeFeilmeldingId = `utd_beløp-periode_${utenlandskPeriodeBeløp.barnIdenter.map(
        barn => `${barn}`
    )}_${utenlandskPeriodeBeløp.fom}`;

    return (
        <Fieldset error={errors.root?.message} legend={'Utenlandsk periodebeløp'} hideLegend>
            <EøsPeriodeSkjemaContainer
                $lesevisning={erRedigeringDeaktivert}
                $status={utenlandskPeriodeBeløp.status}
                gap="space-24"
            >
                <InlineMessage status="info">
                    <UtbetaltBeløpText size="small">
                        Dersom det er ulike beløp per barn utbetalt i det andre landet, må barna registreres separat
                    </UtbetaltBeløpText>
                </InlineMessage>
                <UtenlandskPeriodeBeløpBarnFelt
                    tilgjengeligeBarn={tilgjengeligeBarn}
                    lesevisning={erRedigeringDeaktivert}
                />
                <UtenlandskPeriodeBeløpPeriodeFelt
                    initiellFom={initiellFom}
                    periodeFeilmeldingId={periodeFeilmeldingId}
                    lesevisning={erRedigeringDeaktivert}
                />
                <Fieldset
                    className={erRedigeringDeaktivert ? 'lesevisning' : ''}
                    legend={'Utbetalt i det andre landet'}
                    size={'medium'}
                >
                    <HGrid columns={'1fr 2fr 1fr'} gap={'space-12'}>
                        <UtenlandskPeriodeBeløpBeløpFelt readOnly={erRedigeringDeaktivert} />
                        <UtenlandskPeriodeBeløpValutaFelt readOnly={erRedigeringDeaktivert} />
                        <UtenlandskPeriodeBeløpIntervallFelt readOnly={erRedigeringDeaktivert} />
                    </HGrid>
                    <UtenlandskPeriodeBeløpUtbetalingslandFelt readOnly={erRedigeringDeaktivert} />
                </Fieldset>

                {!erRedigeringDeaktivert && (
                    <Knapperad>
                        <div>
                            <Button type={'submit'} size="small" variant={'primary'} loading={isSubmitting}>
                                Ferdig
                            </Button>
                            <Button
                                type={'button'}
                                style={{ marginLeft: '1rem' }}
                                onClick={onAvbryt}
                                size="small"
                                variant="tertiary"
                            >
                                Avbryt
                            </Button>
                        </div>

                        {utenlandskPeriodeBeløp.status !== EøsPeriodeStatus.IKKE_UTFYLT && (
                            <Button
                                type={'button'}
                                variant={'tertiary'}
                                onClick={slettUtenlandskPeriodeBeløp}
                                id={`slett_utd_beløp_${utenlandskPeriodeBeløp.barnIdenter.map(
                                    barn => `${barn}-`
                                )}_${initiellFom}`}
                                loading={sletterUtenlandskPeriodeBeløp}
                                size={'small'}
                                icon={<TrashIcon />}
                            >
                                Fjern
                            </Button>
                        )}
                    </Knapperad>
                )}
            </EøsPeriodeSkjemaContainer>
        </Fieldset>
    );
};

export default UtenlandskPeriodeBeløpTabellRadEndre;
