import { BodyLong, Button, Dialog, Fieldset, Heading, HelpText, HStack, VStack } from '@navikt/ds-react';
import type { UIEvent } from 'react';
import { FormProvider } from 'react-hook-form';
import { ExternalLink } from '../../ExternalLink';
import { ErFolkeregistrertField } from './ErFolkeregistrertField';
import { FødselsdatoField } from './FødselsdatoField';
import { FødselsnummerField } from './FødselsnummerField';
import { useLeggTilBarnModalContext } from './LeggTilBarnModalContext';
import { NavnField } from './NavnField';
import { Fields, useLeggTilBarnForm } from './useLeggTilBarnForm';

export function LeggTilBarnModal() {
    const { lukkModal, erModalÅpen } = useLeggTilBarnModalContext();

    const { form, onSubmit } = useLeggTilBarnForm();

    function onClose() {
        lukkModal();
        form.reset();
    }

    function åpneDrek(event: UIEvent) {
        event.preventDefault();
        window.open('/redirect/drek', '_new');
    }

    const erFolkeregistrert = form.watch(Fields.ER_FOLKEREGISTERT);

    return (
        <Dialog open={erModalÅpen} onOpenChange={onClose}>
            <Dialog.Popup width={'40rem'} closeOnOutsideClick={false}>
                <Dialog.Header>
                    <HStack gap={'space-8'} align={'center'}>
                        <Dialog.Title>Legg til barn</Dialog.Title>
                        <HelpText placement={'top'}>
                            <Heading level={'3'} size={'xsmall'}>
                                Nasjonale saker:
                            </Heading>
                            <BodyLong size={'small'} spacing>
                                Hvis barnet ikke er registrert i Folkeregisteret må du tilskrive bruker først.
                            </BodyLong>
                            <BodyLong size={'small'} spacing>
                                Hvis barnet ikke er folkeregistrert innen angitt frist, kan du registrere barnet med
                                fødselsdato og navn. Det vil føre til et avslag, uten at vilkårene skal vurderes. Har du
                                ikke navnet på barnet kan du skrive “ukjent”.
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
                </Dialog.Header>
                <Dialog.Body>
                    <FormProvider {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} id={'legg-til-barn-form'}>
                            <Fieldset
                                legend={'Legg til barn'}
                                hideLegend={true}
                                error={form.formState.errors.root?.message}
                            >
                                <VStack gap={'space-16'}>
                                    <ErFolkeregistrertField />
                                    {erFolkeregistrert && <FødselsnummerField />}
                                    {!erFolkeregistrert && (
                                        <VStack gap={'space-16'}>
                                            <FødselsdatoField />
                                            <NavnField />
                                            <ExternalLink label={'Rekvirer D-nummer i DREK'} onClick={åpneDrek} />
                                        </VStack>
                                    )}
                                </VStack>
                            </Fieldset>
                        </form>
                    </FormProvider>
                </Dialog.Body>
                <Dialog.Footer>
                    <Button
                        variant={'primary'}
                        type={'submit'}
                        size={'medium'}
                        loading={form.formState.isSubmitting}
                        form={'legg-til-barn-form'}
                    >
                        Legg til
                    </Button>
                    <Button
                        variant={'tertiary'}
                        size={'medium'}
                        onClick={() => onClose()}
                        loading={form.formState.isSubmitting}
                    >
                        Avbryt
                    </Button>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
}
