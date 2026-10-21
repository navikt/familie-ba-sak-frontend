import { useErLesevisning } from '@hooks/useErLesevisning';
import { TrashIcon } from '@navikt/aksel-icons';
import { Bleed, BodyShort, Button, Fieldset, HGrid, HStack, InlineMessage, VStack } from '@navikt/ds-react';
import type { OptionType } from '@typer/common';
import { EøsPeriodeStatus, type IRestUtenlandskPeriodeBeløp } from '@typer/eøsPerioder';
import { useFormContext } from 'react-hook-form';
import { UtenlandskPeriodeBeløpBarnFelt } from './UtenlandskPeriodeBeløpBarnFelt';
import { UtenlandskPeriodeBeløpBeløpFelt } from './UtenlandskPeriodeBeløpBeløpFelt';
import { UtenlandskPeriodeBeløpIntervallFelt } from './UtenlandskPeriodeBeløpIntervallFelt';
import { UtenlandskPeriodeBeløpPeriodeFelt } from './UtenlandskPeriodeBeløpPeriodeFelt';
import { UtenlandskPeriodeBeløpUtbetalingslandFelt } from './UtenlandskPeriodeBeløpUtbetalingslandFelt';
import { UtenlandskPeriodeBeløpValutaFelt } from './UtenlandskPeriodeBeløpValutaFelt';
import type { UtenlandskPeriodeBeløpFormValues } from './useUtenlandskPeriodeBeløpSkjema';

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
            <Bleed asChild marginInline={'space-48 space-0'}>
                <VStack maxWidth={'40rem'} paddingInline={'space-32 space-0'} gap="space-24">
                    <InlineMessage status="info">
                        <BodyShort weight={'semibold'} size="small">
                            Dersom det er ulike beløp per barn utbetalt i det andre landet, må barna registreres separat
                        </BodyShort>
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
                        <HStack justify={'space-between'} marginBlock={'space-16'}>
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
                        </HStack>
                    )}
                </VStack>
            </Bleed>
        </Fieldset>
    );
};

export default UtenlandskPeriodeBeløpTabellRadEndre;
