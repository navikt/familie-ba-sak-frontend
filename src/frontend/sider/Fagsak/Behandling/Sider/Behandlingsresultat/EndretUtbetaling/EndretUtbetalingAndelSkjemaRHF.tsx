import { useErLesevisning } from '@hooks/useErLesevisning';
import { useFeatureToggles } from '@hooks/useFeatureToggles';
import { useOppdatererEndretUtbetalingAndelIsPending } from '@hooks/useOppdatererEndretUtbetalingAndelIsPending';
import { useSletterEndretUtbetalingAndelIsPending } from '@hooks/useSletterEndretUtbetalingAndelIsPending';
import { FeatureToggle } from '@typer/featureToggles';
import { IEndretUtbetalingAndelÅrsak } from '@typer/utbetalingAndel';
import { FormProvider, type SubmitHandler, type UseFormReturn } from 'react-hook-form';

import { LocalAlert, VStack } from '@navikt/ds-react';

import { useEndretUtbetalingAndelContext } from './EndretUtbetalingAndelContext';
import { AvtaletidspunktDeltBostedDatovelger } from './komponenter/AvtaletidspunktDeltBostedDatovelger';
import { Begrunnelse } from './komponenter/Begrunnelse';
import { Månedperiodevelger } from './komponenter/Månedperiodevelger';
import { Personvelger } from './komponenter/Personvelger';
import { SkjemaKnapper } from './komponenter/SkjemaKnapper';
import { SøknadstidspunktDatovelger } from './komponenter/SøknadstidspunktDatovelger';
import { Utbetalingvelger } from './komponenter/Utbetalingvelger';
import { Årsakvelger } from './komponenter/Årsakvelger';
import { EndretUtbetalingAndelFeltnavn, type EndretUtbetalingAndelFormValues } from './useEndretUtbetalingAndelRHF';

interface EndretUtbetalingAndelSkjemaProps {
    form: UseFormReturn<EndretUtbetalingAndelFormValues>;
    onSubmit: SubmitHandler<EndretUtbetalingAndelFormValues>;
    lukkSkjema: () => void;
}

export const EndretUtbetalingAndelSkjemaRHF = ({ form, onSubmit, lukkSkjema }: EndretUtbetalingAndelSkjemaProps) => {
    const { endretUtbetalingAndel } = useEndretUtbetalingAndelContext();

    const erLesevisning = useErLesevisning();
    const toggles = useFeatureToggles();

    const sletterEndretUtbetalingAndel = useSletterEndretUtbetalingAndelIsPending({ endretUtbetalingAndel });
    const oppdatererEndretUtbetalingAndel = useOppdatererEndretUtbetalingAndelIsPending({ endretUtbetalingAndel });

    const erAutomatiskGenerert =
        toggles[FeatureToggle.kanRegistrereSøknadstidspunkt] && !!endretUtbetalingAndel.erAutomatiskGenerert;

    const låsFelter =
        erLesevisning ||
        erAutomatiskGenerert ||
        endretUtbetalingAndel.inneholderBarnSomSkalSkjermes ||
        sletterEndretUtbetalingAndel ||
        oppdatererEndretUtbetalingAndel;

    const {
        watch,
        handleSubmit,
        clearErrors,
        formState: { errors },
    } = form;

    const årsak = watch(EndretUtbetalingAndelFeltnavn.ÅRSAK);

    return (
        <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack gap="space-16" maxWidth="30rem">
                    <Personvelger erLesevisning={låsFelter} />

                    <Årsakvelger erLesevisning={låsFelter} />

                    <Månedperiodevelger erLesevisning={låsFelter} />

                    <Utbetalingvelger erLesevisning={låsFelter} />

                    <SøknadstidspunktDatovelger erLesevisning={låsFelter} />

                    {årsak === IEndretUtbetalingAndelÅrsak.DELT_BOSTED && (
                        <AvtaletidspunktDeltBostedDatovelger erLesevisning={låsFelter} />
                    )}

                    <Begrunnelse erLesevisning={låsFelter} />

                    {!erLesevisning && <SkjemaKnapper lukkSkjema={lukkSkjema} kunVisSlett={erAutomatiskGenerert} />}

                    {errors.root?.message && (
                        <LocalAlert status="error">
                            <LocalAlert.Header>
                                <LocalAlert.Title>{errors.root?.message}</LocalAlert.Title>
                                <LocalAlert.CloseButton onClick={() => clearErrors('root')} />
                            </LocalAlert.Header>
                        </LocalAlert>
                    )}
                </VStack>
            </form>
        </FormProvider>
    );
};
