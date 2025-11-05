import * as React from 'react';

import { FormProvider, get } from 'react-hook-form';
import styled from 'styled-components';

import { BodyShort, Button, ErrorSummary, Fieldset, Modal, VStack } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { AnnetField } from './AnnetField';
import { BarnField } from './BarnField';
import { LeggTilBarnKnapp } from './LeggTilBarnKnapp';
import { MålformField } from './MålformField';
import { useSøknadContext } from './SøknadContext';
import { UnderkategoriField } from './UnderkategoriField';
import { LeggTilBarnModal } from '../../../../../komponenter/Modal/LeggTilBarn/LeggTilBarnModal';
import { LeggTilBarnModalContextProvider } from '../../../../../komponenter/Modal/LeggTilBarn/LeggTilBarnModalContext';
import { sjekkGjelderInstitusjon } from '../../../../../typer/fagsak';
import type { IBarnMedOpplysninger } from '../../../../../typer/søknad';
import { useFagsakContext } from '../../../FagsakContext';
import { useBehandlingContext } from '../../context/BehandlingContext';
import { Steg } from '../Steg';
import { PreutfyltAlert } from './PreutfyltAlert';
import { useRegistrerSøknadForm } from './useRegistrerSøknadForm';
import { FormDebugger } from '../../../../../komponenter/FormDebugger';

const FjernVilkårAdvarsel = styled(BodyShort)`
    white-space: pre-wrap;
`;

export function RegistrerSøknad() {
    const { fagsak } = useFagsakContext();
    const { behandling, vurderErLesevisning } = useBehandlingContext();

    const { nesteAction, settVisBekreftModal, skjema, visBekreftModal } = useSøknadContext();

    const erLesevisning = vurderErLesevisning();
    const gjelderInstitusjon = sjekkGjelderInstitusjon(fagsak);

    const { form, onSubmit } = useRegistrerSøknadForm();
    const errors = form.formState.errors;

    function onLeggTilBarn(barn: IBarnMedOpplysninger) {
        console.log(barn);
    }

    return (
        <LeggTilBarnModalContextProvider
            barn={skjema.felter.barnaMedOpplysninger.verdi}
            onLeggTilBarn={onLeggTilBarn}
            harBrevmottaker={behandling.brevmottakere.length > 0}
        >
            {!erLesevisning && <LeggTilBarnModal />}
            <Steg tittel={'Registrer opplysninger fra søknaden'}>
                <VStack gap={'space-16'}>
                    <PreutfyltAlert />
                    <FormProvider {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <Fieldset legend={''} hideLegend={true}>
                                <VStack gap={'space-24'}>
                                    {!gjelderInstitusjon && <UnderkategoriField />}
                                    <BarnField />
                                    {!erLesevisning && (
                                        <div>
                                            <LeggTilBarnKnapp />
                                        </div>
                                    )}
                                    <MålformField />
                                    <AnnetField />
                                    {Object.keys(errors).length > 0 && (
                                        <ErrorSummary
                                            heading={'For å gå videre må du rette opp følgende:'}
                                            size={'small'}
                                        >
                                            {Object.keys(errors).map(fieldname => (
                                                <ErrorSummary.Item key={fieldname} href={`#${fieldname}`}>
                                                    {get(errors, fieldname)?.message}
                                                </ErrorSummary.Item>
                                            ))}
                                        </ErrorSummary>
                                    )}
                                    <div>
                                        <Button
                                            variant={'primary'}
                                            type={'submit'}
                                            loading={form.formState.isSubmitting}
                                            disabled={form.formState.isSubmitting}
                                        >
                                            {erLesevisning ? 'Neste' : 'Bekreft og fortsett'}
                                        </Button>
                                    </div>
                                    <FormDebugger />
                                </VStack>
                            </Fieldset>
                        </form>
                    </FormProvider>
                </VStack>
            </Steg>
            {visBekreftModal && (
                <Modal
                    open
                    onClose={() => settVisBekreftModal(false)}
                    header={{
                        heading: 'Er du sikker på at du vil gå videre?',
                        size: 'small',
                        closeButton: false,
                    }}
                    width={'35rem'}
                >
                    <Modal.Body>
                        <FjernVilkårAdvarsel>
                            {skjema.submitRessurs.status === RessursStatus.FEILET ||
                                (skjema.submitRessurs.status === RessursStatus.FUNKSJONELL_FEIL &&
                                    skjema.submitRessurs.frontendFeilmelding)}
                        </FjernVilkårAdvarsel>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            key={'ja'}
                            variant={'primary'}
                            onClick={() => {
                                settVisBekreftModal(false);
                                nesteAction(true);
                            }}
                            children={'Ja'}
                            loading={skjema.submitRessurs.status === RessursStatus.HENTER}
                            disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                        />
                        <Button
                            variant={'secondary'}
                            key={'nei'}
                            onClick={() => {
                                settVisBekreftModal(false);
                            }}
                            children={'Nei'}
                        />
                    </Modal.Footer>
                </Modal>
            )}
        </LeggTilBarnModalContextProvider>
    );
}
