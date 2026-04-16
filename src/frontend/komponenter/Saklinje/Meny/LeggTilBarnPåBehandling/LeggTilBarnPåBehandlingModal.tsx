import React from 'react';

import { FormProvider } from 'react-hook-form';
import styled from 'styled-components';

import { Alert, Button, Fieldset, Heading, HelpText, Modal } from '@navikt/ds-react';

import { LeggTilBarnFelt } from './LeggTilBarnFelt';
import { useLeggTilBarnPåBehandlingSkjema } from './useLeggTilBarnPåBehandlingSkjema';
import { useBehandlingContext } from '../../../../sider/Fagsak/Behandling/context/BehandlingContext';

const LeggTilBarnLegend = styled.div`
    margin-top: 1rem;
    display: flex;
`;

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
                            <LeggTilBarnLegend>
                                Legg til barn
                                <HelpText style={{ marginLeft: '0.5rem' }}>
                                    Her kan du, ved klage eller ettersendt dokumentasjon, legge til barn som ikke lenger
                                    ligger på behandlingen fordi vi tidligere har avslått eller opphørt.
                                </HelpText>
                            </LeggTilBarnLegend>
                        </Heading>
                    </Modal.Header>
                    <Modal.Body>
                        <Fieldset
                            error={errors.root?.message}
                            errorPropagation={false}
                            legend="Legg til barn på behandling"
                            hideLegend
                        >
                            <LeggTilBarnFelt erLesevisning={erLesevisning} />
                            <Alert variant="info" inline={true}>
                                Du er i ferd med å legge til et barn på behandlingen. Handlingen kan ikke reverseres
                                uten å henlegge.
                            </Alert>
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
