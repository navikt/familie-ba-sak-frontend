import { useBehandling } from '@hooks/useBehandling';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { useFagsak } from '@hooks/useFagsak';
import { LeggTilBarnModal } from '@komponenter/Modal/LeggTilBarn/LeggTilBarnModal';
import { LeggTilBarnModalContextProvider } from '@komponenter/Modal/LeggTilBarn/LeggTilBarnModalContext';
import { Button, Fieldset, VStack } from '@navikt/ds-react';
import { BarnaFieldArrayProvider } from '@sider/Fagsak/Behandling/Sider/RegistrerSøknad/form/BarnaFieldArrayContext';
import { BekreftEndringModal } from '@sider/Fagsak/Behandling/Sider/RegistrerSøknad/form/BekreftEndringModal';
import { useBekreftEndringModalContext } from '@sider/Fagsak/Behandling/Sider/RegistrerSøknad/form/BekreftEndringModalContext';
import { Feilsammendrag } from '@sider/Fagsak/Behandling/Sider/RegistrerSøknad/form/Feilsammendrag';
import { BarnaField } from '@sider/Fagsak/Behandling/Sider/RegistrerSøknad/form/field/BarnaField';
import { BegrunnelseField } from '@sider/Fagsak/Behandling/Sider/RegistrerSøknad/form/field/BegrunnelseField';
import { MålformField } from '@sider/Fagsak/Behandling/Sider/RegistrerSøknad/form/field/MålformField';
import { UnderkategoriField } from '@sider/Fagsak/Behandling/Sider/RegistrerSøknad/form/field/UnderkategoriField';
import {
    RegistrerSøknadFormField,
    useRegistrerSøknadForm,
} from '@sider/Fagsak/Behandling/Sider/RegistrerSøknad/form/useRegistrerSøknadForm';
import { erFagsakAvTypeEnsligMindreårig, erFagsakAvTypeInstitusjon, erFagsakAvTypeSkjermetBarn } from '@typer/fagsak';
import { FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { LeggTilBarnKnapp } from './LeggTilBarnKnapp';

export function RegistrerSøknadForm() {
    const navigate = useNavigate();
    const fagsak = useFagsak();
    const behandling = useBehandling();
    const erLesevisning = useErLesevisning();

    const { erBekreftEndringModalÅpen } = useBekreftEndringModalContext();

    const form = useRegistrerSøknadForm();

    const {
        id,
        control,
        handleSubmit,
        formState: { isSubmitting, errors },
        watch,
        onSubmit,
    } = form;

    const barn = watch(RegistrerSøknadFormField.BARN);

    const gjelderInstitusjon = erFagsakAvTypeInstitusjon(fagsak);
    const gjelderEnsligMindreårig = erFagsakAvTypeEnsligMindreårig(fagsak);
    const gjelderSkjermetBarn = erFagsakAvTypeSkjermetBarn(fagsak);
    const harBrevmottaker = behandling.brevmottakere.length > 0;

    const erMuligÅLeggeTilBarn =
        !erLesevisning && !gjelderInstitusjon && !gjelderEnsligMindreårig && !gjelderSkjermetBarn;

    function submitEllerNaviger(event: React.FormEvent<HTMLFormElement>) {
        if (erLesevisning) {
            event.preventDefault();
            navigate(`/fagsak/${fagsak.id}/${behandling.behandlingId}/vilkaarsvurdering`);
            return;
        }
        return handleSubmit(data => onSubmit(data, 'ubekreftet'))(event);
    }

    return (
        <BarnaFieldArrayProvider control={control}>
            {({ leggTilBarn }) => (
                <LeggTilBarnModalContextProvider
                    barn={barn}
                    onLeggTilBarn={leggTilBarn}
                    harBrevmottaker={harBrevmottaker}
                >
                    {erMuligÅLeggeTilBarn && <LeggTilBarnModal />}
                    <FormProvider {...form}>
                        <form id={id} onSubmit={submitEllerNaviger}>
                            {erBekreftEndringModalÅpen && <BekreftEndringModal onSubmit={onSubmit} />}
                            <VStack gap={'space-20'}>
                                <Fieldset
                                    error={errors.root?.message}
                                    legend={'Registrer søknad'}
                                    hideLegend={true}
                                    errorPropagation={false}
                                >
                                    <VStack gap={'space-20'} marginBlock={'space-20'}>
                                        {!gjelderInstitusjon && <UnderkategoriField />}
                                        <VStack gap={'space-0'}>
                                            <BarnaField />
                                            {erMuligÅLeggeTilBarn && <LeggTilBarnKnapp />}
                                        </VStack>
                                        <MålformField />
                                        <BegrunnelseField />
                                    </VStack>
                                </Fieldset>
                                <Feilsammendrag />
                                <div>
                                    <Button form={id} type={'submit'} variant={'primary'} loading={isSubmitting}>
                                        {erLesevisning ? 'Neste' : 'Bekreft og fortsett'}
                                    </Button>
                                </div>
                            </VStack>
                        </form>
                    </FormProvider>
                </LeggTilBarnModalContextProvider>
            )}
        </BarnaFieldArrayProvider>
    );
}
