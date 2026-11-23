import { useErLesevisning } from '@hooks/useErLesevisning';
import { InformationSquareIcon } from '@navikt/aksel-icons';
import { Button, Dialog, Fieldset, HelpText, HStack, InfoCard } from '@navikt/ds-react';
import { FormProvider } from 'react-hook-form';

import { LeggTilBarnFelt } from './LeggTilBarnFelt';
import { useLeggTilBarnPåBehandlingSkjema } from './useLeggTilBarnPåBehandlingSkjema';

interface Props {
    lukkModal: () => void;
}

export const LeggTilBarnPåBehandlingModal = ({ lukkModal }: Props) => {
    const erLesevisning = useErLesevisning();

    const { form, onSubmit } = useLeggTilBarnPåBehandlingSkjema({ lukkModal });

    const {
        handleSubmit,
        formState: { isSubmitting, errors },
    } = form;

    return (
        <Dialog open onOpenChange={lukkModal}>
            <Dialog.Popup width={'35rem'} closeOnOutsideClick={false}>
                <Dialog.Header>
                    <HStack margin={'space-8'} marginInline={'space-4'}>
                        <Dialog.Title>Legg til barn</Dialog.Title>
                        <HelpText style={{ marginLeft: '0.5rem' }}>
                            Her kan du, ved klage eller ettersendt dokumentasjon, legge til barn som ikke lenger ligger
                            på behandlingen fordi vi tidligere har avslått eller opphørt.
                        </HelpText>
                    </HStack>
                </Dialog.Header>
                <Dialog.Body>
                    <FormProvider {...form}>
                        <form onSubmit={handleSubmit(onSubmit)} id={'legg-til-barn-paa-behandling-form'}>
                            <Fieldset
                                error={errors.root?.message}
                                errorPropagation={false}
                                legend="Legg til barn på behandling"
                                hideLegend
                            >
                                <InfoCard data-color="info">
                                    <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                                        Du er i ferd med å legge til et barn på behandlingen. Handlingen kan ikke
                                        reverseres uten å henlegge.
                                    </InfoCard.Message>
                                </InfoCard>
                                <LeggTilBarnFelt erLesevisning={erLesevisning} />
                            </Fieldset>
                        </form>
                    </FormProvider>
                </Dialog.Body>
                <Dialog.Footer>
                    <Button variant="tertiary" size="small" onClick={lukkModal}>
                        Avbryt
                    </Button>
                    <Button
                        type={'submit'}
                        variant="primary"
                        size="small"
                        loading={isSubmitting}
                        disabled={erLesevisning}
                        form={'legg-til-barn-paa-behandling-form'}
                    >
                        Legg til
                    </Button>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
};
