import { FormProvider } from 'react-hook-form';

import { XMarkOctagonFillIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Button, ErrorMessage, Fieldset, Stack } from '@navikt/ds-react';

import { BeløpField } from './BeløpField';
import Styles from './FeilutbetaltValutaForm.module.css';
import { FomDatoField } from './FomDatoField';
import { TomDatoField } from './TomDatoField';
import type { Type } from './useFeilutbetaltValutaForm';
import { useFeilutbetaltValutaForm } from './useFeilutbetaltValutaForm';
import type { IRestFeilutbetaltValuta } from '../../../../../../../typer/eøs-feilutbetalt-valuta';
import { useBehandlingContext } from '../../../../context/BehandlingContext';
import { useFeilutbetaltValutaTabellContext } from '../FeilutbetaltValutaTabellContext';

interface Props {
    type: Type;
    feilutbetaltValuta?: IRestFeilutbetaltValuta;
    skjulForm: () => void;
    readOnly: boolean;
}

export function FeilutbetaltValutaForm({ type, feilutbetaltValuta, skjulForm, readOnly }: Props) {
    const { behandling } = useBehandlingContext();
    const { skjulFeilutbetaltValutaTabell } = useFeilutbetaltValutaTabellContext();

    const { form, onSubmit } = useFeilutbetaltValutaForm({ type, feilutbetaltValuta, skjulForm });

    const {
        handleSubmit,
        reset,
        formState: { isSubmitting, errors },
    } = form;

    function onAvbryt() {
        if (behandling.feilutbetaltValuta.length === 0) {
            skjulFeilutbetaltValutaTabell();
        }
        skjulForm();
        reset();
    }

    return (
        <Box marginBlock={'space-8 space-24'}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormProvider {...form}>
                    <Fieldset legend={'Feilutbetalt valuta skjema'} hideLegend={true}>
                        <Stack direction={'column'} gap={'space-24'}>
                            <Stack direction={'column'} gap={'space-8'}>
                                <BodyShort size={'small'} weight={'semibold'}>
                                    Angi periode med feilutbetalt valuta
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
                                    disabled={readOnly}
                                >
                                    Lagre periode
                                </Button>
                                <Button
                                    type={'button'}
                                    variant={'tertiary'}
                                    size={'small'}
                                    onClick={onAvbryt}
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
