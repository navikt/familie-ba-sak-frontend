import React from 'react';

import { FormProvider } from 'react-hook-form';
import styled from 'styled-components';

import { Alert, Button, Fieldset, Heading, HelpText, Modal, TextField } from '@navikt/ds-react';

import { useLeggTilBarnPåBehandlingSkjema } from './useLeggTilBarnPåBehandlingSkjema';

const LeggTilBarnLegend = styled.div`
    margin-top: 1rem;
    display: flex;
`;

interface Props {
    lukkModal: () => void;
}

export const LeggTilBarnPåBehandlingModal = ({ lukkModal }: Props) => {
    const { form, onSubmit } = useLeggTilBarnPåBehandlingSkjema({ lukkModal });

    const {
        handleSubmit,
        formState: { isSubmitting, errors },
        reset,
    } = form;

    const onClose = () => {
        lukkModal();
        reset();
    };

    return (
        <Modal open onClose={onClose} aria-label={'Legg til barn'} width={'35rem'} portal>
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
                            <TextField label={'Fødselsnummer'} placeholder={'11 siffer'} />
                            <Alert variant="info" inline={true}>
                                Du er i ferd med å legge til et barn på behandlingen. Handlingen kan ikke reverseres
                                uten å henlegge.
                            </Alert>
                        </Fieldset>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            key={'Legg til'}
                            type={'submit'}
                            variant="primary"
                            size="small"
                            children={'Legg til'}
                            loading={isSubmitting}
                            disabled={isSubmitting}
                        />
                        <Button key={'Avbryt'} variant="tertiary" size="small" onClick={onClose} children={'Avbryt'} />
                    </Modal.Footer>
                </form>
            </FormProvider>
        </Modal>
    );
};
