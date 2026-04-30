import { FormProvider } from 'react-hook-form';

import { XMarkOctagonFillIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Button, ErrorMessage, Fieldset, Stack } from '@navikt/ds-react';

import { BeløpField } from './BeløpField';
import { FomDatoField } from './FomDatoField';
import { LandkodeField } from './LandkodeField';
import { RefusjonAvklartField } from './RefusjonAvklartField';
import Styles from './RefusjonEøsForm.module.css';
import { TomDatoField } from './TomDatoField';
import type { Type } from './useRefusjonEøsForm';
import { useRefusjonEøsForm } from './useRefusjonEøsForm';
import type { IRestRefusjonEøs } from '../../../../../../../typer/refusjon-eøs';
import { useBehandlingContext } from '../../../../context/BehandlingContext';
import { useRefusjonEøsTabellContext } from '../RefusjonEøsTabellContext';

interface Props {
    type: Type;
    refusjonEøs?: IRestRefusjonEøs;
    skjulForm: () => void;
    readOnly: boolean;
}

export function RefusjonEøsForm({ type, refusjonEøs, skjulForm, readOnly }: Props) {
    const { behandling } = useBehandlingContext();
    const { skjulRefusjonEøsTabell } = useRefusjonEøsTabellContext();

    const { form, onSubmit } = useRefusjonEøsForm({ type, refusjonEøs, skjulForm });

    const {
        handleSubmit,
        reset,
        formState: { isSubmitting, errors },
    } = form;

    function onAvbyrt() {
        if (behandling.refusjonEøs.length === 0) {
            skjulRefusjonEøsTabell();
        }
        skjulForm();
        reset();
    }

    return (
        <Box marginBlock={'space-8 space-24'}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormProvider {...form}>
                    <Fieldset legend={'Refusjon EØS skjema'} hideLegend={true}>
                        <Stack direction={'column'} gap={'space-24'}>
                            <LandkodeField readOnly={readOnly} />
                            <RefusjonAvklartField readOnly={readOnly} />
                            <Stack direction={'column'} gap={'space-8'}>
                                <BodyShort size={'small'} weight={'semibold'}>
                                    Angi periode som skal refunderes til EØS-land.
                                </BodyShort>
                                <Stack justify={'start'} direction={'row'} gap={'space-28'}>
                                    <FomDatoField readOnly={readOnly} />
                                    <TomDatoField readOnly={readOnly} />
                                </Stack>
                            </Stack>
                            <BeløpField readOnly={readOnly} />
                            <Stack direction={'row'} gap={'space-16'}>
                                <Button
                                    type={'submit'}
                                    variant={'primary'}
                                    size={'small'}
                                    loading={isSubmitting}
                                    disabled={readOnly || isSubmitting}
                                >
                                    Lagre periode
                                </Button>
                                <Button
                                    type={'button'}
                                    variant={'tertiary'}
                                    size={'small'}
                                    onClick={onAvbyrt}
                                    disabled={readOnly || isSubmitting}
                                >
                                    Avbryt
                                </Button>
                            </Stack>
                            {errors.root?.message && (
                                <Stack direction={'row'} gap={'space-4'} justify={'start'} align={'center'}>
                                    <XMarkOctagonFillIcon fontSize={'1.25rem'} className={Styles.feilikon} />
                                    <ErrorMessage>{errors.root.message}</ErrorMessage>
                                </Stack>
                            )}
                        </Stack>
                    </Fieldset>
                </FormProvider>
            </form>
        </Box>
    );
}
