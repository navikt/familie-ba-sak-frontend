import React, { useRef } from 'react';

import { FormProvider } from 'react-hook-form';

import { BodyLong, Button, Fieldset, Heading, HelpText, HStack, Modal, VStack } from '@navikt/ds-react';

import { ErFolkeregistrertField } from './ErFolkeregistrertField';
import { FødselsdatoField } from './FødselsdatoField';
import { FødselsnummerField } from './FødselsnummerField';
import { useLeggTilBarnModalContext } from './LeggTilBarnModalContext';
import { NavnField } from './NavnField';
import { Fields, useLeggTilBarnForm } from './useLeggTilBarnForm';
import type { IBarnMedOpplysninger } from '../../../typer/søknad';
import { ExternalLink } from '../../ExternalLink';

interface Props {
    barn: IBarnMedOpplysninger[];
    onLeggTilBarn: (barn: IBarnMedOpplysninger) => void;
    harBrevmottaker: boolean;
}

export function LeggTilBarnModal({ barn, onLeggTilBarn, harBrevmottaker }: Props) {
    const fødselsnummerRef = useRef<HTMLInputElement | null>(null);

    const { lukkModal, erModalÅpen } = useLeggTilBarnModalContext();

    const { form, onSubmit } = useLeggTilBarnForm({ onLeggTilBarn, harBrevmottaker });

    function onClose() {
        lukkModal();
        form.reset();
    }

    function åpneDrek(event: React.UIEvent) {
        event.preventDefault();
        fødselsnummerRef.current?.focus();
        window.open('/redirect/drek', '_new');
    }

    const erFolkeregistrert = form.watch(Fields.ER_FOLKEREGISTERT);

    return (
        <Modal open={erModalÅpen} onClose={onClose} width={'40rem'} aria-label={'Legg til barn'}>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Modal.Header>
                        <HStack gap={'space-8'} align={'center'}>
                            <Heading level={'2'} size={'medium'}>
                                Legg til barn
                            </Heading>
                            <HelpText placement={'top'}>
                                <Heading level={'3'} size={'xsmall'}>
                                    Nasjonale saker:
                                </Heading>
                                <BodyLong size={'small'} spacing>
                                    Hvis barnet ikke er registrert i Folkeregisteret må du tilskrive bruker først.
                                </BodyLong>
                                <BodyLong size={'small'} spacing>
                                    Hvis barnet ikke er folkeregistrert innen angitt frist, kan du registrere barnet med
                                    fødselsdato og/eller navn. Det vil føre til et avslag, uten at vilkårene skal
                                    vurderes. Har du ikke navnet på barnet kan du skrive “ukjent”.
                                </BodyLong>
                                <Heading level={'3'} size={'xsmall'}>
                                    EØS-saker:
                                </Heading>
                                <BodyLong size={'small'}>
                                    Dersom Folkeregisteret ikke har registrerte barn tilknyttet denne søkeren kan du
                                    registrere D-nummer i DREK.
                                </BodyLong>
                            </HelpText>
                        </HStack>
                    </Modal.Header>
                    <Modal.Body>
                        <Fieldset
                            legend={'Legg til barn'}
                            hideLegend={true}
                            error={form.formState.errors.root?.message}
                        >
                            <VStack gap={'space-16'}>
                                <ErFolkeregistrertField />
                                {erFolkeregistrert && <FødselsnummerField ref={fødselsnummerRef} barn={barn} />}
                                {!erFolkeregistrert && (
                                    <VStack gap={'space-16'}>
                                        <FødselsdatoField />
                                        <NavnField />
                                        <ExternalLink label={'Rekvirer D-nummer i DREK'} onClick={åpneDrek} />
                                    </VStack>
                                )}
                            </VStack>
                        </Fieldset>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant={'primary'}
                            type={'submit'}
                            size={'medium'}
                            loading={form.formState.isSubmitting}
                            disabled={form.formState.isSubmitting}
                        >
                            Legg til
                        </Button>
                        <Button
                            variant={'tertiary'}
                            size={'medium'}
                            onClick={() => onClose()}
                            loading={form.formState.isSubmitting}
                            disabled={form.formState.isSubmitting}
                        >
                            Avbryt
                        </Button>
                    </Modal.Footer>
                </form>
            </FormProvider>
        </Modal>
    );
}
