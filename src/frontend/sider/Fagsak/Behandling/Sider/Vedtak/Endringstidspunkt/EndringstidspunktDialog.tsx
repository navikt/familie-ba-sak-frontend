import { useBehandlingId } from '@hooks/useBehandlingId';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { useHentEndringstidspunkt } from '@hooks/useHentEndringstidspunkt';
import { ExclamationmarkTriangleFillIcon } from '@navikt/aksel-icons';
import {
    BodyShort,
    Button,
    Dialog,
    ErrorMessage,
    Fieldset,
    HStack,
    InlineMessage,
    Label,
    Loader,
    VStack,
} from '@navikt/ds-react';
import { Datoformat, isoStringTilFormatertString } from '@utils/dato';
import { FormProvider } from 'react-hook-form';

import { useEndringstidspunktDialogContext } from './EndringstidspunktDialogContext';
import { EndringstidspunktField } from './EndringstidspunktField';
import { useEndringstidspunktForm } from './useEndringstidspunktForm';

const FALLBACK_ERROR_MESSAGE =
    'Systemet kan ikke hente endringstidspunktet. Prøv igjen senere eller kontakt brukerstøtte.';

function formaterDato(endringstidspunkt: string) {
    return isoStringTilFormatertString({ isoString: endringstidspunkt, tilFormat: Datoformat.DATO });
}

export function EndringstidspunktDialog() {
    const behandlingId = useBehandlingId();
    const erLesevisning = useErLesevisning();

    const { erDialogÅpen, lukkDialog } = useEndringstidspunktDialogContext();

    const {
        data: endringstidspunkt,
        isFetching: endringstidspunktIsFetching,
        error: endringstidspunktError,
    } = useHentEndringstidspunkt(behandlingId);

    const { form, onSubmit } = useEndringstidspunktForm();

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = form;

    function onLukkDialog() {
        if (isSubmitting) {
            return;
        }
        lukkDialog();
        reset();
    }

    return (
        <Dialog open={erDialogÅpen} onOpenChange={onLukkDialog}>
            <Dialog.Popup width={'35rem'}>
                <Dialog.Header>
                    <Dialog.Title>Oppdater endringstidspunkt</Dialog.Title>
                </Dialog.Header>
                <FormProvider {...form}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Dialog.Body>
                            <VStack gap={'space-24'}>
                                <InlineMessage status={'info'}>
                                    Dersom du ønsker å vise perioder som er filtrert bort i vedtaksbildet, kan du
                                    oppdatere endringstidspunktet tilbake i tid.
                                </InlineMessage>
                                <VStack gap={'space-4'}>
                                    <Label>Endringstidspunkt</Label>
                                    {endringstidspunktIsFetching && (
                                        <HStack gap={'space-8'}>
                                            <Loader size={'small'} />
                                            <BodyShort>Henter endringstidspunkt...</BodyShort>
                                        </HStack>
                                    )}
                                    {!endringstidspunktIsFetching && endringstidspunktError && (
                                        <ErrorMessage>
                                            <HStack gap={'space-4'} align={'center'}>
                                                <ExclamationmarkTriangleFillIcon fontSize={'0.9rem'} />
                                                {endringstidspunktError.message ?? FALLBACK_ERROR_MESSAGE}
                                            </HStack>
                                        </ErrorMessage>
                                    )}
                                    {!endringstidspunktIsFetching && !endringstidspunktError && (
                                        <>
                                            {endringstidspunkt && (
                                                <BodyShort>{formaterDato(endringstidspunkt)}</BodyShort>
                                            )}
                                            {!endringstidspunkt && <BodyShort>Ingen endringstidspunkt</BodyShort>}
                                        </>
                                    )}
                                </VStack>
                                <Fieldset
                                    error={errors.root?.message}
                                    legend={'Oppdater endringstidspunkt'}
                                    hideLegend={true}
                                    errorPropagation={false}
                                >
                                    <EndringstidspunktField />
                                </Fieldset>
                            </VStack>
                        </Dialog.Body>
                        <Dialog.Footer>
                            {!erLesevisning && (
                                <Button
                                    type={'submit'}
                                    variant={'primary'}
                                    loading={isSubmitting}
                                    disabled={endringstidspunktIsFetching || !!endringstidspunktError}
                                >
                                    Oppdater
                                </Button>
                            )}
                            <Button type={'button'} variant={'tertiary'} onClick={onLukkDialog} disabled={isSubmitting}>
                                {erLesevisning ? 'Lukk' : 'Avbryt'}
                            </Button>
                        </Dialog.Footer>
                    </form>
                </FormProvider>
            </Dialog.Popup>
        </Dialog>
    );
}
