import { useBehandling } from '@hooks/useBehandling';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { useSaksbehandler } from '@hooks/useSaksbehandler';
import { BehandlingSteg, hentStegNummer } from '@typer/behandling';
import { FormProvider } from 'react-hook-form';

import { Button, Fieldset, Modal, VStack } from '@navikt/ds-react';

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

    const erStegBeslutteVedtak = hentStegNummer(behandling.steg) === hentStegNummer(BehandlingSteg.BESLUTTE_VEDTAK);
    const erIkkeTotrinnskontrollSaksbehandler = saksbehandler.navIdent !== behandling.totrinnskontroll?.saksbehandlerId;
    const skalOverstyreLesevisning = erStegBeslutteVedtak && erIkkeTotrinnskontrollSaksbehandler;
    const erRedigeringDeaktivert = erLesevisning && !skalOverstyreLesevisning;

    return (
        <Modal
            open={true}
            portal={true}
            width={'35rem'}
            header={{ heading: 'Endre enhet for denne behandlingen' }}
            onClose={lukkModal}
        >
            <FormProvider {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Body>
                        <Fieldset error={errors.root?.message} legend={'Endre enhet'} hideLegend={true}>
                            <VStack gap={'space-20'}>
                                <VelgNyEnhetField readOnly={erRedigeringDeaktivert} />
                                <BegrunnelseField readOnly={erRedigeringDeaktivert} />
                            </VStack>
                        </Fieldset>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            type={'submit'}
                            variant={'primary'}
                            size={'small'}
                            loading={isSubmitting}
                            disabled={erRedigeringDeaktivert}
                        >
                            Bekreft
                        </Button>
                        <Button variant={'secondary'} size={'small'} onClick={lukkModal} disabled={isSubmitting}>
                            Avbryt
                        </Button>
                    </Modal.Footer>
                </form>
            </FormProvider>
        </Modal>
    );
}
