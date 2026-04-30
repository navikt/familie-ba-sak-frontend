import { useId } from 'react';

import { FormProvider } from 'react-hook-form';

import { ExclamationmarkTriangleFillIcon } from '@navikt/aksel-icons';
import {
    BodyShort,
    Button,
    ErrorMessage,
    Fieldset,
    HStack,
    InlineMessage,
    Label,
    Loader,
    Modal,
    VStack,
} from '@navikt/ds-react';

import { EndringstidspunktFelt } from './EndringstidspunktFelt';
import { useEndringstidspunktForm } from './useEndringstidspunktForm';
import { useHentEndringstidspunkt } from '../../../../../../hooks/useHentEndringstidspunkt';
import { Datoformat, isoStringTilFormatertString } from '../../../../../../utils/dato';
import { useBehandlingContext } from '../../../context/BehandlingContext';

const FALLBACK_ERROR_MESSAGE =
    'Systemet kan ikke hente endringstidspunktet. Prøv igjen senere eller kontakt brukerstøtte.';

function formaterDato(endringstidspunkt: string) {
    return isoStringTilFormatertString({ isoString: endringstidspunkt, tilFormat: Datoformat.DATO });
}

interface Props {
    lukkModal: () => void;
}

export function OppdaterEndringstidspunktModal({ lukkModal }: Props) {
    const { behandling, vurderErLesevisning } = useBehandlingContext();
    const hentetEndringstidspunktId = useId();

    const {
        data: endringstidspunkt,
        isPending: hentEndringstidspunktIsPending,
        error: hentEndringstidspunktError,
    } = useHentEndringstidspunkt(behandling.behandlingId);

    const { form, onSubmit } = useEndringstidspunktForm({ lukkModal });

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
    } = form;

    const erLesevisning = vurderErLesevisning();

    return (
        <Modal
            open={true}
            onClose={lukkModal}
            width={'35rem'}
            header={{ heading: 'Oppdater endringstidspunkt', size: 'medium' }}
            portal={true}
        >
            <FormProvider {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Body>
                        <VStack gap={'space-24'}>
                            <InlineMessage status={'info'}>
                                Dersom du ønsker å vise perioder som er filtrert bort i vedtaksbildet, kan du oppdatere
                                endringstidspunktet tilbake i tid.
                            </InlineMessage>
                            <VStack gap={'space-4'}>
                                <Label htmlFor={hentetEndringstidspunktId}>Endringstidspunkt</Label>
                                {hentEndringstidspunktIsPending && (
                                    <HStack gap={'space-8'}>
                                        <Loader size={'small'} />
                                        <BodyShort id={hentetEndringstidspunktId}>
                                            Henter endringstidspunkt...
                                        </BodyShort>
                                    </HStack>
                                )}
                                {endringstidspunkt && <BodyShort>{formaterDato(endringstidspunkt)}</BodyShort>}
                                {hentEndringstidspunktError && (
                                    <ErrorMessage>
                                        <HStack gap={'space-4'} align={'center'}>
                                            <ExclamationmarkTriangleFillIcon fontSize={'0.9rem'} />
                                            {hentEndringstidspunktError.message ?? FALLBACK_ERROR_MESSAGE}
                                        </HStack>
                                    </ErrorMessage>
                                )}
                            </VStack>
                            <Fieldset
                                error={errors.root?.message}
                                legend={'Oppdater endringstidspunkt'}
                                hideLegend={true}
                            >
                                <EndringstidspunktFelt
                                    readOnly={
                                        isSubmitting ||
                                        erLesevisning ||
                                        hentEndringstidspunktIsPending ||
                                        !!hentEndringstidspunktError
                                    }
                                />
                            </Fieldset>
                        </VStack>
                    </Modal.Body>
                    <Modal.Footer>
                        {!erLesevisning && (
                            <>
                                <Button
                                    type={'submit'}
                                    variant={'primary'}
                                    loading={isSubmitting}
                                    disabled={hentEndringstidspunktIsPending || !!hentEndringstidspunktError}
                                >
                                    Oppdater
                                </Button>
                                <Button variant={'tertiary'} onClick={lukkModal} disabled={isSubmitting}>
                                    Avbryt
                                </Button>
                            </>
                        )}
                        {erLesevisning && (
                            <Button variant={'primary'} onClick={lukkModal}>
                                Lukk
                            </Button>
                        )}
                    </Modal.Footer>
                </form>
            </FormProvider>
        </Modal>
    );
}
