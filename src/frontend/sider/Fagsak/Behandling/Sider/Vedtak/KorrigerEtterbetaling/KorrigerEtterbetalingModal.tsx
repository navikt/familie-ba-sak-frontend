import React from 'react';

import { ArrowUndoIcon } from '@navikt/aksel-icons';
import {
    Alert,
    Button,
    Fieldset,
    HStack,
    Modal,
    Select,
    Spacer,
    Textarea,
    TextField,
    VStack,
} from '@navikt/ds-react';

import { useKorrigerEtterbetalingForm, årsaker } from './useKorrigerEtterbetalingForm';
import { erEtterbetalingsbeløpGyldig, erÅrsakForKorrigeringGyldig } from './validering';
import { ModalType } from '../../../../../../context/ModalContext';
import { useModal } from '../../../../../../hooks/useModal';
import { useBehandlingContext } from '../../../context/BehandlingContext';

export function KorrigerEtterbetalingModal() {
    const { behandling, vurderErLesevisning } = useBehandlingContext();
    const { form, korrigerEtterbetaling, angreKorrigertEtterbetaling, isPending } =
        useKorrigerEtterbetalingForm();

    const { lukkModal, erModalÅpen } = useModal(ModalType.KORRIGER_ETTERBETALING);

    const korrigertEtterbetaling = behandling.korrigertEtterbetaling;
    const erLesevisning = vurderErLesevisning();

    return (
        <Modal
            open={erModalÅpen}
            onClose={lukkModal}
            header={{ heading: 'Korriger etterbetaling' }}
            width={'35rem'}
            portal
        >
            <form onSubmit={form.handleSubmit(korrigerEtterbetaling)}>
                <Modal.Body>
                    <Fieldset error={false} legend="Korriger etterbetaling" hideLegend>
                        <VStack gap={'space-16'}>
                            <Select
                                {...form.register('årsak', {
                                    required: 'Velg en årsak',
                                    validate: value => erÅrsakForKorrigeringGyldig(value),
                                })}
                                label={'Årsak'}
                                readOnly={erLesevisning}
                                error={form.formState.errors.årsak?.message}
                            >
                                {årsaker.map(årsak => (
                                    <option value={årsak.value} key={årsak.value}>
                                        {årsak.label}
                                    </option>
                                ))}
                            </Select>
                            <TextField
                                {...form.register('beløp', {
                                    required: 'Beløp er påkrevd',
                                    validate: value => erEtterbetalingsbeløpGyldig(value),
                                })}
                                label={'Nytt beløp'}
                                error={form.formState.errors.beløp?.message}
                                readOnly={erLesevisning}
                                className={erLesevisning ? 'lesevisning' : ''}
                            />
                            <Textarea
                                {...form.register('begrunnelse')}
                                label={'Begrunnelse (valgfri)'}
                                maxLength={erLesevisning ? 0 : 1000}
                                readOnly={erLesevisning}
                            />
                            {!erLesevisning && (
                                <>
                                    <Alert variant="info" inline>
                                        Husk å sende korrigeringsmelding til NØS
                                    </Alert>
                                    {form.formState.errors.root?.message && (
                                        <Alert variant="error" inline>
                                            {form.formState.errors.root.message}
                                        </Alert>
                                    )}
                                </>
                            )}
                        </VStack>
                    </Fieldset>
                </Modal.Body>
                <Modal.Footer>
                    {!erLesevisning && (
                        <HStack gap={'0 space-64'}>
                            <HStack>
                                {korrigertEtterbetaling && (
                                    <Button
                                        id={'angre-korrigering'}
                                        size={'small'}
                                        onClick={form.handleSubmit(angreKorrigertEtterbetaling)}
                                        variant={'tertiary'}
                                        loading={isPending}
                                        disabled={isPending}
                                        icon={<ArrowUndoIcon />}
                                    >
                                        Angre korrigering
                                    </Button>
                                )}
                            </HStack>
                            <Spacer />
                            <HStack gap={'space-8'}>
                                <Button onClick={lukkModal} variant={'tertiary'}>
                                    Avbryt
                                </Button>
                                <Button
                                    type={'submit'}
                                    variant={form.formState.errors ? 'primary' : 'secondary'}
                                    loading={isPending}
                                    disabled={isPending}
                                >
                                    {korrigertEtterbetaling ? 'Oppdater' : 'Korriger beløp'}
                                </Button>
                            </HStack>
                        </HStack>
                    )}
                    {erLesevisning && <Button onClick={lukkModal}>Lukk</Button>}
                </Modal.Footer>
            </form>
        </Modal>
    );
}
