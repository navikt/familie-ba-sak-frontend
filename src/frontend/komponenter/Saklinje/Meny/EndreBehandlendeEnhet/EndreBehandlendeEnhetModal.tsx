import React from 'react';

import { FormProvider } from 'react-hook-form';

import { Button, Fieldset, Modal, VStack } from '@navikt/ds-react';

import { BegrunnelseField } from './BegrunnelseField';
import { useEndreBehandlendeEnhetForm } from './useEndreBehandlendeEnhetForm';
import { VelgNyEnhetField } from './VelgNyEnhetField';
import { useAppContext } from '../../../../context/AppContext';
import { useBehandlingContext } from '../../../../sider/Fagsak/Behandling/context/BehandlingContext';
import { BehandlingSteg, hentStegNummer } from '../../../../typer/behandling';

interface Props {
    lukkModal: () => void;
}

export function EndreBehandlendeEnhetModal({ lukkModal }: Props) {
    const { behandling, vurderErLesevisning } = useBehandlingContext();
    const { innloggetSaksbehandler } = useAppContext();

    const { form, onSubmit } = useEndreBehandlendeEnhetForm({ lukkModal });

    const {
        handleSubmit,
        formState: { isSubmitting, errors },
    } = form;

    function erLesevisningPåBehandling() {
        const steg = behandling.steg;
        if (
            steg &&
            hentStegNummer(steg) === hentStegNummer(BehandlingSteg.BESLUTTE_VEDTAK) &&
            innloggetSaksbehandler?.navIdent !== behandling.totrinnskontroll?.saksbehandlerId
        ) {
            return false;
        } else {
            return vurderErLesevisning(false, true);
        }
    }

    const erLesevisning = erLesevisningPåBehandling();

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
                                <VelgNyEnhetField readOnly={erLesevisning} />
                                <BegrunnelseField readOnly={erLesevisning} />
                            </VStack>
                        </Fieldset>
                    </Modal.Body>
                    <Modal.Footer>
                        {!erLesevisning && (
                            <>
                                <Button type={'submit'} variant={'primary'} size={'small'} loading={isSubmitting}>
                                    Bekreft
                                </Button>
                                <Button
                                    variant={'secondary'}
                                    size={'small'}
                                    onClick={lukkModal}
                                    disabled={isSubmitting}
                                >
                                    Avbryt
                                </Button>
                            </>
                        )}
                        {erLesevisning && (
                            <Button size={'small'} variant={'secondary'} onClick={lukkModal}>
                                Avbryt
                            </Button>
                        )}
                    </Modal.Footer>
                </form>
            </FormProvider>
        </Modal>
    );
}
