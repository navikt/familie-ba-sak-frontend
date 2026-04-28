import React from 'react';

import { FormProvider } from 'react-hook-form';

import { InformationSquareIcon } from '@navikt/aksel-icons';
import { Button, Fieldset, Heading, HelpText, HStack, InfoCard, Modal } from '@navikt/ds-react';

import { LeggTilBarnFelt } from './LeggTilBarnFelt';
import { useLeggTilBarnPåBehandlingSkjema } from './useLeggTilBarnPåBehandlingSkjema';
import { useBehandlingContext } from '../../../../sider/Fagsak/Behandling/context/BehandlingContext';

interface Props {
    lukkModal: () => void;
}

export const LeggTilBarnPåBehandlingModal = ({ lukkModal }: Props) => {
    const { vurderErLesevisning } = useBehandlingContext();
    const erLesevisning = vurderErLesevisning();

    const { form, onSubmit } = useLeggTilBarnPåBehandlingSkjema({ lukkModal });

    const {
        handleSubmit,
        formState: { isSubmitting, errors },
    } = form;

    return (
        <Modal open onClose={lukkModal} aria-label={'Legg til barn'} width={'35rem'} portal>
            <FormProvider {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header>
                        <Heading level="2" size="small">
                            <HStack margin={'space-8'} marginInline={'space-4'}>
                                Legg til barn
                                <HelpText style={{ marginLeft: '0.5rem' }}>
                                    Her kan du, ved klage eller ettersendt dokumentasjon, legge til barn som ikke lenger
                                    ligger på behandlingen fordi vi tidligere har avslått eller opphørt.
                                </HelpText>
                            </HStack>
                        </Heading>
                    </Modal.Header>
                    <Modal.Body>
                        <Fieldset
                            error={errors.root?.message}
                            errorPropagation={false}
                            legend="Legg til barn på behandling"
                            hideLegend
                        >
                            <InfoCard data-color="info">
                                <InfoCard.Header icon={<InformationSquareIcon aria-hidden />}>
                                    <InfoCard.Title>
                                        Du er i ferd med å legge til et barn på behandlingen. Handlingen kan ikke
                                        reverseres uten å henlegge.
                                    </InfoCard.Title>
                                </InfoCard.Header>
                            </InfoCard>
                            <LeggTilBarnFelt erLesevisning={erLesevisning} />
                        </Fieldset>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            type={'submit'}
                            variant="primary"
                            size="small"
                            loading={isSubmitting}
                            disabled={erLesevisning}
                        >
                            Legg til
                        </Button>
                        <Button variant="tertiary" size="small" onClick={lukkModal}>
                            Avbryt
                        </Button>
                    </Modal.Footer>
                </form>
            </FormProvider>
        </Modal>
    );
};
