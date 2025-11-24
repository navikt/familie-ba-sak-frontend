import * as React from 'react';

import { useMutationState } from '@tanstack/react-query';
import { FormProvider, type SubmitHandler, type UseFormReturn } from 'react-hook-form';

import { Alert, VStack } from '@navikt/ds-react';

import { useEndretUtbetalingAndelContext } from './EndretUtbetalingAndelContext';
import AvtaletidspunktDeltBostedDatovelger from './komponenter/AvtaletidspunktDeltBostedDatovelger';
import Begrunnelse from './komponenter/Begrunnelse';
import Månedperiodevelger from './komponenter/Månedperiodevelger';
import Personvelger from './komponenter/Personvelger';
import SkjemaKnapper from './komponenter/SkjemaKnapper';
import SøknadstidspunktDatovelger from './komponenter/SøknadstidspunktDatovelger';
import Utbetalingvelger from './komponenter/Utbetalingvelger';
import Årsakvelger from './komponenter/Årsakvelger';
import { EndretUtbetalingAndelFeltnavn, type EndretUtbetalingAndelFormValues } from './useEndretUtbetalingAndelRHF';
import { OppdaterEndretUtbetalingAndelMutationKeyFactory } from '../../../../../../hooks/useOppdaterEndretUtbetalingAndel';
import { SlettEndretUtbetalingAndelMutationKeyFactory } from '../../../../../../hooks/useSlettEndretUtbetalingAndel';
import { useBehandlingContext } from '../../../context/BehandlingContext';

interface EndretUtbetalingAndelSkjemaProps {
    form: UseFormReturn<EndretUtbetalingAndelFormValues>;
    onSubmit: SubmitHandler<EndretUtbetalingAndelFormValues>;
    lukkSkjema: () => void;
}

const EndretUtbetalingAndelSkjemaRHF = ({ form, onSubmit, lukkSkjema }: EndretUtbetalingAndelSkjemaProps) => {
    const { vurderErLesevisning } = useBehandlingContext();
    const { endretUtbetalingAndel } = useEndretUtbetalingAndelContext();

    const sletterEndretUtbetalingAndel =
        useMutationState({
            filters: {
                mutationKey: SlettEndretUtbetalingAndelMutationKeyFactory.endretUtbetalingAndel(endretUtbetalingAndel),
                status: 'pending',
            },
        }).length > 0;

    const oppdatererEndretUtbetalingAndel =
        useMutationState({
            filters: {
                mutationKey:
                    OppdaterEndretUtbetalingAndelMutationKeyFactory.endretUtbetalingAndel(endretUtbetalingAndel),
                status: 'pending',
            },
        }).length > 0;

    const erLesevisning = vurderErLesevisning();
    const låsFelter = erLesevisning || sletterEndretUtbetalingAndel || oppdatererEndretUtbetalingAndel;

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
                <VStack gap="4" maxWidth="30rem">
                    <Personvelger erLesevisning={låsFelter} />

                    <Årsakvelger erLesevisning={låsFelter} />

                    <Månedperiodevelger erLesevisning={låsFelter} />

                    <Utbetalingvelger erLesevisning={låsFelter} />

                    <SøknadstidspunktDatovelger erLesevisning={låsFelter} />

                    {årsak === 'DELT_BOSTED' && <AvtaletidspunktDeltBostedDatovelger erLesevisning={låsFelter} />}

                    <Begrunnelse erLesevisning={låsFelter} />

                    {!erLesevisning && <SkjemaKnapper lukkSkjema={lukkSkjema} />}

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
