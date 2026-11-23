import { useErLesevisning } from '@hooks/useErLesevisning';
import { Button, Dialog, Fieldset } from '@navikt/ds-react';
import { FormProvider } from 'react-hook-form';

import { BehandlingstemaSelect } from './BehandlingstemaSelect';
import { useEndreBehandlingstemaSkjema } from './useEndreBehandlingstemaSkjema';

interface Props {
    lukkModal: () => void;
}

export const EndreBehandlingstemaModal = ({ lukkModal }: Props) => {
    const erLesevisning = useErLesevisning();

    const { form, onSubmit } = useEndreBehandlingstemaSkjema({ lukkModal });

    const {
        handleSubmit,
        formState: { isSubmitting, errors },
    } = form;

    return (
        <Dialog open onOpenChange={lukkModal}>
            <Dialog.Popup width={'35rem'} closeOnOutsideClick={false}>
                <Dialog.Header>
                    <Dialog.Title>Endre behandlingstema</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <FormProvider {...form}>
                        <form onSubmit={handleSubmit(onSubmit)} id={'endre-behandlingstema-form'}>
                            <Fieldset error={errors.root?.message} legend="Endre behandlingstema" hideLegend>
                                <BehandlingstemaSelect erLesevisning={erLesevisning} />
                            </Fieldset>
                        </form>
                    </FormProvider>
                </Dialog.Body>
                <Dialog.Footer>
                    <Button variant="secondary" size="small" onClick={lukkModal}>
                        Avbryt
                    </Button>
                    <Button
                        type={'submit'}
                        variant="primary"
                        size="small"
                        loading={isSubmitting}
                        disabled={erLesevisning}
                        form={'endre-behandlingstema-form'}
                    >
                        Bekreft
                    </Button>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
};
