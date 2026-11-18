import { useBehandling } from '@hooks/useBehandling';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { useSaksbehandler } from '@hooks/useSaksbehandler';
import { Button, Dialog, Fieldset, VStack } from '@navikt/ds-react';
import { BehandlingSteg, hentStegnummer } from '@typer/behandling';
import { FormProvider } from 'react-hook-form';

import { BegrunnelseField } from './BegrunnelseField';
import { useEndreBehandlendeEnhetForm } from './useEndreBehandlendeEnhetForm';
import { VelgNyEnhetField } from './VelgNyEnhetField';

interface Props {
    lukkModal: () => void;
}

export function EndreBehandlendeEnhetModal({ lukkModal }: Props) {
    const saksbehandler = useSaksbehandler();
    const behandling = useBehandling();
    const erLesevisning = useErLesevisning({ sjekkTilgangTilEnhet: false, skalIgnorereOmEnhetErMidlertidig: true });

    const { form, onSubmit } = useEndreBehandlendeEnhetForm({ lukkModal });

    const {
        handleSubmit,
        formState: { isSubmitting, errors },
    } = form;

    const erStegBeslutteVedtak = hentStegnummer(behandling.steg) === hentStegnummer(BehandlingSteg.BESLUTTE_VEDTAK);
    const erIkkeTotrinnskontrollSaksbehandler = saksbehandler.navIdent !== behandling.totrinnskontroll?.saksbehandlerId;
    const skalOverstyreLesevisning = erStegBeslutteVedtak && erIkkeTotrinnskontrollSaksbehandler;
    const erRedigeringDeaktivert = erLesevisning && !skalOverstyreLesevisning;

    return (
        <Dialog open={true} onOpenChange={lukkModal}>
            <Dialog.Popup width={'35rem'} closeOnOutsideClick={false}>
                <Dialog.Header>
                    <Dialog.Title>Endre enhet for denne behandlingen</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <FormProvider {...form}>
                        <form onSubmit={handleSubmit(onSubmit)} id={'endre-behandlende-enhet-form'}>
                            <Fieldset error={errors.root?.message} legend={'Endre enhet'} hideLegend={true}>
                                <VStack gap={'space-20'}>
                                    <VelgNyEnhetField readOnly={erRedigeringDeaktivert} />
                                    <BegrunnelseField readOnly={erRedigeringDeaktivert} />
                                </VStack>
                            </Fieldset>
                        </form>
                    </FormProvider>
                </Dialog.Body>
                <Dialog.Footer>
                    {!erRedigeringDeaktivert && (
                        <Button
                            type={'submit'}
                            variant={'primary'}
                            size={'small'}
                            loading={isSubmitting}
                            form={'endre-behandlende-enhet-form'}
                        >
                            Bekreft
                        </Button>
                    )}
                    <Button
                        type={'button'}
                        variant={'secondary'}
                        size={'small'}
                        onClick={lukkModal}
                        disabled={isSubmitting}
                    >
                        Avbryt
                    </Button>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
}
