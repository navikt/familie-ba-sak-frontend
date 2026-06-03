import type { IRegistrertSøknadstidspunktPåPersonDto } from '@api/hentRegistrertSøknadstidspunktPåPerson';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { FormProvider } from 'react-hook-form';

import { BodyShort, Button, Fieldset, Modal, VStack } from '@navikt/ds-react';

import { PersonSøknadstidspunktFelt } from './PersonSøknadstidspunktFelt';
import { useEndreSøknadstidspunktForm } from './useEndreSøknadstidspunktForm';

interface Props {
    lukkModal: () => void;
    søknadstidspunkter: IRegistrertSøknadstidspunktPåPersonDto[];
}

export const EndreSøknadstidspunktSkjema = ({ lukkModal, søknadstidspunkter }: Props) => {
    const erLesevisning = useErLesevisning();
    const { form, fieldArray, onSubmit } = useEndreSøknadstidspunktForm({ lukkModal, søknadstidspunkter });

    const {
        handleSubmit,
        formState: { isSubmitting, errors },
    } = form;

    return (
        <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Body>
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
                                    isSubmitting={isSubmitting}
                                />
                            ))}
                        </VStack>
                    </Fieldset>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type="submit"
                        variant="primary"
                        size="small"
                        loading={isSubmitting}
                        disabled={erLesevisning || isSubmitting}
                    >
                        Bekreft
                    </Button>
                    <Button type="button" variant="secondary" size="small" disabled={isSubmitting} onClick={lukkModal}>
                        Avbryt
                    </Button>
                </Modal.Footer>
            </form>
        </FormProvider>
    );
};
