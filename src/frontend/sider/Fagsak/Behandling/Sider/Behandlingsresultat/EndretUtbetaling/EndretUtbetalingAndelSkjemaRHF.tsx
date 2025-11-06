import * as React from 'react';

import { FormProvider, type SubmitHandler, type UseFormReturn } from 'react-hook-form';

import { Alert, VStack } from '@navikt/ds-react';

import AvtaletidspunktDeltBostedDatovelger from './komponenter/AvtaletidspunktDeltBostedDatovelger';
import Begrunnelse from './komponenter/Begrunnelse';
import Månedperiodevelger from './komponenter/Månedperiodevelger';
import Personvelger from './komponenter/Personvelger';
import SkjemaKnapper from './komponenter/SkjemaKnapper';
import SøknadstidspunktDatovelger from './komponenter/SøknadstidspunktDatovelger';
import Utbetalingvelger from './komponenter/Utbetalingvelger';
import Årsakvelger from './komponenter/Årsakvelger';
import { EndretUtbetalingAndelFeltnavn, type EndretUtbetalingAndelFormValues } from './useEndretUtbetalingAndelRHF';
import { useBehandlingContext } from '../../../context/BehandlingContext';

interface EndretUtbetalingAndelSkjemaProps {
    form: UseFormReturn<EndretUtbetalingAndelFormValues>;
    onSubmit: SubmitHandler<EndretUtbetalingAndelFormValues>;
    slettEndretUtbetalingAndel: () => void;
    lukkSkjema: () => void;
}

const EndretUtbetalingAndelSkjemaRHF = ({
    form,
    onSubmit,
    slettEndretUtbetalingAndel,
    lukkSkjema,
}: EndretUtbetalingAndelSkjemaProps) => {
    const { vurderErLesevisning } = useBehandlingContext();
    const erLesevisning = vurderErLesevisning();

    const {
        watch,
        reset,
        handleSubmit,
        clearErrors,
        formState: { errors },
    } = form;

    const årsak = watch(EndretUtbetalingAndelFeltnavn.ÅRSAK);

    const avbryt = () => {
        lukkSkjema();
        reset();
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack gap="4" maxWidth="30rem">
                    <Personvelger erLesevisning={erLesevisning} />

                    <Årsakvelger erLesevisning={erLesevisning} />

                    <Månedperiodevelger erLesevisning={erLesevisning} />

                    <Utbetalingvelger erLesevisning={erLesevisning} />

                    <SøknadstidspunktDatovelger erLesevisning={erLesevisning} />

                    {årsak === 'DELT_BOSTED' && <AvtaletidspunktDeltBostedDatovelger erLesevisning={erLesevisning} />}

                    <Begrunnelse erLesevisning={erLesevisning} />

                    {!erLesevisning && (
                        <SkjemaKnapper avbryt={avbryt} slettEndretUtbetalingAndel={slettEndretUtbetalingAndel} />
                    )}
                    {errors.root?.message && (
                        <Alert variant={'error'} closeButton={true} onClose={() => clearErrors('root')}>
                            {errors.root?.message}
                        </Alert>
                    )}
                </VStack>
            </form>
        </FormProvider>
    );
};

export default EndretUtbetalingAndelSkjemaRHF;
