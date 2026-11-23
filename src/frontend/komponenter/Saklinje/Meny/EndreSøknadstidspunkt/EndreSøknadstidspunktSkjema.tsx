import type { RegistrertSøknadstidspunkt } from '@api/hentRegistrerteSøknadstidspunkter';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { BodyShort, Button, Dialog, Fieldset, VStack } from '@navikt/ds-react';
import { FormProvider } from 'react-hook-form';

import { PersonSøknadstidspunktFelt } from './PersonSøknadstidspunktFelt';
import { useEndreSøknadstidspunktForm } from './useEndreSøknadstidspunktForm';

interface Props {
    lukkModal: () => void;
    søknadstidspunkter: RegistrertSøknadstidspunkt[];
}

export const EndreSøknadstidspunktSkjema = ({ lukkModal, søknadstidspunkter }: Props) => {
    const erLesevisning = useErLesevisning();
    const { form, fieldArray, onSubmit } = useEndreSøknadstidspunktForm({ lukkModal, søknadstidspunkter });

    const {
        handleSubmit,
        formState: { isSubmitting, errors },
    } = form;

    return (
        <>
            <Dialog.Body>
                <FormProvider {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} id={'endre-soknadstidspunkt-form'}>
                        <BodyShort size="small" textColor="subtle" spacing>
                            Sett søknadstidspunkt per barn for å beregne etterbetalingsperiode.
                        </BodyShort>
                        <Fieldset
                            error={errors.root?.message}
                            errorPropagation={false}
                            legend="Endre søknadstidspunkt"
                            hideLegend
                        >
                            <VStack gap="space-4">
                                {fieldArray.fields.map((person, index) => (
                                    <PersonSøknadstidspunktFelt
                                        key={person.id}
                                        index={index}
                                        navn={person.navn}
                                        fødselsdato={person.fødselsdato}
                                        personIdent={person.personIdent}
                                        erLesevisning={erLesevisning}
                                    />
                                ))}
                            </VStack>
                        </Fieldset>
                    </form>
                </FormProvider>
            </Dialog.Body>
            <Dialog.Footer>
                <Button type="button" variant="secondary" size="small" disabled={isSubmitting} onClick={lukkModal}>
                    Avbryt
                </Button>
                <Button
                    type="submit"
                    variant="primary"
                    size="small"
                    loading={isSubmitting}
                    disabled={erLesevisning || isSubmitting}
                    form={'endre-soknadstidspunkt-form'}
                >
                    Bekreft
                </Button>
            </Dialog.Footer>
        </>
    );
};
