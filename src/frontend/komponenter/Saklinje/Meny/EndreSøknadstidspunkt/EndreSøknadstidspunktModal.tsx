import { useRef } from 'react';

import type { IRegistrertSøknadstidspunktDto } from '@api/hentRegistrertSøknadstidspunkt';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { useHentRegistrertSøknadstidspunkt } from '@hooks/useHentRegistrertSøknadstidspunkt';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { dagensDato } from '@utils/dato';
import { formaterIdent, formaterTekstStorForbokstav, hentAlderSomString } from '@utils/formatter';
import { FormProvider, useController, useFormContext } from 'react-hook-form';

import {
    Alert,
    BodyShort,
    Box,
    Button,
    DatePicker,
    type DateValidationT,
    Detail,
    Fieldset,
    Heading,
    HStack,
    Loader,
    Modal,
    VStack,
    useDatepicker,
} from '@navikt/ds-react';

import type { EndreSøknadstidspunktFormValues } from './useEndreSøknadstidspunktForm';
import { useEndreSøknadstidspunktForm } from './useEndreSøknadstidspunktForm';

interface Props {
    lukkModal: () => void;
}

export const EndreSøknadstidspunktModal = ({ lukkModal }: Props) => {
    const { behandling } = useBehandlingContext();
    const { data: søknadstidspunkter, isPending, isError } = useHentRegistrertSøknadstidspunkt(behandling.behandlingId);

    return (
        <Modal open onClose={lukkModal} aria-label="Endre søknadstidspunkt" width={'35rem'} portal>
            <Modal.Header>
                <Heading size="small">Endre søknadstidspunkt</Heading>
                <BodyShort size="small" textColor="subtle">
                    Sett søknadstidspunkt per barn for å beregne etterbetalingsperiode.
                </BodyShort>
            </Modal.Header>
            {isPending ? (
                <Modal.Body>
                    <HStack justify="center">
                        <Loader size="large" title="Henter søknadstidspunkt" />
                    </HStack>
                </Modal.Body>
            ) : isError ? (
                <>
                    <Modal.Body>
                        <Alert variant="error">Kunne ikke hente søknadstidspunkt.</Alert>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="button" variant="secondary" size="small" onClick={lukkModal}>
                            Lukk
                        </Button>
                    </Modal.Footer>
                </>
            ) : (
                <EndreSøknadstidspunktSkjema lukkModal={lukkModal} søknadstidspunkter={søknadstidspunkter} />
            )}
        </Modal>
    );
};

interface SkjemaProps {
    lukkModal: () => void;
    søknadstidspunkter: IRegistrertSøknadstidspunktDto[];
}

const EndreSøknadstidspunktSkjema = ({ lukkModal, søknadstidspunkter }: SkjemaProps) => {
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
                    <Fieldset error={errors.root?.message} legend="Endre søknadstidspunkt" hideLegend>
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
                        disabled={erLesevisning}
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

interface PersonSøknadstidspunktFeltProps {
    index: number;
    navn: string;
    fødselsdato: string;
    personIdent: string;
    erLesevisning: boolean;
    isSubmitting: boolean;
}

const PersonSøknadstidspunktFelt = ({
    index,
    navn,
    fødselsdato,
    personIdent,
    erLesevisning,
    isSubmitting,
}: PersonSøknadstidspunktFeltProps) => {
    const { control, trigger } = useFormContext<EndreSøknadstidspunktFormValues>();
    const dateValidationRef = useRef<DateValidationT | undefined>(undefined);

    const feltnavn = `personer.${index}.søknadstidspunkt` as const;

    const {
        field: { value, onChange },
        fieldState: { error },
    } = useController({
        name: feltnavn,
        control,
        rules: {
            validate: dato => {
                const dateValidation = dateValidationRef.current;

                if (dateValidation?.isAfter) {
                    return 'Du kan ikke sette en dato frem i tid.';
                }

                if (
                    dateValidation &&
                    !dateValidation.isEmpty &&
                    (!dateValidation.isValidDate || dateValidation.isInvalid)
                ) {
                    return 'Du må velge en gyldig dato';
                }

                return dato === null || dato instanceof Date || 'Du må velge en gyldig dato';
            },
        },
    });

    const { datepickerProps, inputProps } = useDatepicker({
        defaultSelected: value ?? undefined,
        toDate: dagensDato,
        onDateChange: date => onChange(date ?? null),
        onValidate: validation => {
            dateValidationRef.current = validation;
            // Re-valider feltet slik at inline-feil vises umiddelbart (onValidate fyres etter onDateChange).
            trigger(feltnavn);
        },
    });

    return (
        <Box padding="space-4">
            <HStack gap="space-4" align="end" wrap={false}>
                <VStack gap="space-1" flexGrow="1">
                    <BodyShort size="small" weight="semibold">
                        {formaterTekstStorForbokstav(navn)}
                    </BodyShort>
                    <Detail textColor="subtle">
                        {hentAlderSomString(fødselsdato)} | {formaterIdent(personIdent)}
                    </Detail>
                </VStack>
                <DatePicker {...datepickerProps} dropdownCaption>
                    <DatePicker.Input
                        {...inputProps}
                        label="Søknadstidspunkt"
                        hideLabel
                        placeholder={'DD.MM.ÅÅÅÅ'}
                        readOnly={erLesevisning || isSubmitting}
                        error={error?.message}
                        size="small"
                    />
                </DatePicker>
            </HStack>
        </Box>
    );
};
