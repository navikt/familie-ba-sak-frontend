import { Button, Fieldset, HStack } from '@navikt/ds-react';
import { FormProvider } from 'react-hook-form';
import { BehandlingstemaField } from './fields/BehandlingstemaField';
import { BehandlingstypeField } from './fields/BehandlingstypeField';
import { EnhetField } from './fields/EnhetField';
import { FristField } from './fields/FristField';
import { OppgavetypeField } from './fields/OppgavetypeField';
import { RegistrertDatoField } from './fields/RegistrertDatoField';
import { SaksbehandlerField } from './fields/SaksbehandlerField';
import { useOppdaterLocalStorage } from './useOppdaterLocalStorage';
import { useOppdaterURL } from './useOppdaterURL';
import { Mode, STANDARDVERDIER, useOppgavefilterForm } from './useOppgavefilterForm';

export function OppgavefilterForm() {
    const { form, onSubmit } = useOppgavefilterForm();

    const oppdaterURL = useOppdaterURL();
    const oppdaterLocalStorage = useOppdaterLocalStorage();

    const {
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = form;

    function tilbakestill() {
        reset(STANDARDVERDIER);
        oppdaterLocalStorage(STANDARDVERDIER);
        oppdaterURL(STANDARDVERDIER);
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={handleSubmit(values => onSubmit(values, Mode.RESET_PAGE_PARAM))}>
                <Fieldset
                    legend={'Oppgavebenken filterskjema'}
                    hideLegend={true}
                    error={errors.root?.message}
                    errorPropagation={false}
                >
                    <HStack align={'start'} gap={'space-12'}>
                        <RegistrertDatoField />
                        <OppgavetypeField />
                        <BehandlingstemaField />
                        <BehandlingstypeField />
                        <FristField />
                        <EnhetField />
                        <SaksbehandlerField />
                        <HStack align={'center'} gap={'space-12'} wrap={false} marginBlock={'space-32 space-0'}>
                            <Button type={'submit'} variant={'primary'} loading={isSubmitting}>
                                Hent oppgaver
                            </Button>
                            <Button type={'button'} variant={'secondary'} onClick={tilbakestill}>
                                Tilbakestill filtrering
                            </Button>
                        </HStack>
                    </HStack>
                </Fieldset>
            </form>
        </FormProvider>
    );
}
