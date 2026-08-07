import { useBehandling } from '@hooks/useBehandling';
import { useSaksbehandler } from '@hooks/useSaksbehandler';
import { EgetVedtakInformasjon } from '@sider/Fagsak/Behandling/Høyremeny/Totrinnskontroll/EgetVedtakInformasjon';
import { BegrunnelseField } from '@sider/Fagsak/Behandling/Høyremeny/Totrinnskontroll/field/BegrunnelseField';
import { BeslutningField } from '@sider/Fagsak/Behandling/Høyremeny/Totrinnskontroll/field/BeslutningField';
import { Kontrollsider } from '@sider/Fagsak/Behandling/Høyremeny/Totrinnskontroll/Kontrollsider';
import {
    TotrinnskontrollFormField,
    useTotrinnskontrollForm,
} from '@sider/Fagsak/Behandling/Høyremeny/Totrinnskontroll/useTotrinnskontrollForm';
import { TotrinnskontrollBeslutning } from '@typer/totrinnskontroll';
import { FormProvider } from 'react-hook-form';

import { BodyShort, Button, Fieldset, Heading, VStack } from '@navikt/ds-react';

function finnSubmitKnappText(egetVedtak: boolean, beslutning: TotrinnskontrollBeslutning) {
    if (egetVedtak) {
        return 'Underkjenn eget vedtak';
    }
    if (beslutning === TotrinnskontrollBeslutning.UNDERKJENT) {
        return 'Send til saksbehandler';
    }
    return 'Godkjenn vedtaket';
}

export function TotrinnskontrollForm() {
    const saksbehandler = useSaksbehandler();
    const behandling = useBehandling();

    const { form, onSubmit } = useTotrinnskontrollForm();

    const {
        handleSubmit,
        watch,
        formState: { isSubmitting, errors },
    } = form;

    const beslutning = watch(TotrinnskontrollFormField.BESLUTNING);

    const egetVedtak = behandling.totrinnskontroll?.saksbehandlerId === saksbehandler.navIdent;

    return (
        <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Heading size={'medium'} level={'2'}>
                    Totrinnskontroll
                </Heading>
                {egetVedtak && <EgetVedtakInformasjon />}
                {!egetVedtak && <BodyShort>Kontrollér opplysninger og faglige vurderinger som er gjort</BodyShort>}
                {!egetVedtak && <Kontrollsider />}
                <VStack gap={'space-12'}>
                    <Fieldset
                        error={errors.root?.message}
                        legend={'Totrinnskontroll'}
                        hideLegend={true}
                        errorPropagation={false}
                    >
                        <VStack gap={'space-16'} marginBlock={'space-0 space-16'}>
                            <BeslutningField />
                            {beslutning === TotrinnskontrollBeslutning.UNDERKJENT && <BegrunnelseField />}
                        </VStack>
                    </Fieldset>
                    <Button variant={'primary'} type={'submit'} size={'small'} loading={isSubmitting}>
                        {finnSubmitKnappText(egetVedtak, beslutning)}
                    </Button>
                </VStack>
            </form>
        </FormProvider>
    );
}
