import React from 'react';

import { FormProvider } from 'react-hook-form';

import { Alert, BodyLong, Button, Fieldset, Modal, VStack } from '@navikt/ds-react';
import { type Ressurs } from '@navikt/familie-typer';

import { BegrunnelseFelt } from './BegrunnelseFelt';
import { ForhåndsvisBrevLenke } from './ForhåndsvisBrevLenke';
import {
    HENLEGG_BEHANDLING_FORM_ID,
    HenleggBehandlingFormFields,
    HenleggBehandlingServerErrors,
    useHenleggBehandlingForm,
} from './useHenleggBehandlingForm';
import { ÅrsakFelt } from './ÅrsakFelt';
import { type FamilieAxiosRequestConfig } from '../../../../../context/AppContext';
import { ModalType } from '../../../../../context/ModalContext';
import { useModal } from '../../../../../hooks/useModal';
import { HenleggÅrsak } from '../../../../../typer/behandling';
import { hentFrontendFeilmelding } from '../../../../../utils/ressursUtils';

interface Props {
    hentetDokument: Ressurs<string>;
    nullstillDokument: () => void;
    hentForhåndsvisning: <T>(familieAxiosRequestConfig: FamilieAxiosRequestConfig<T>) => void;
}

// TODO : Flytt instansieringen av denne til BehandlingContainer når man kan fjerne props avhengigheten til dokument.
export function HenleggBehandlingModal({
    hentetDokument,
    nullstillDokument,
    hentForhåndsvisning,
}: Props) {
    const { erModalÅpen, tittel, lukkModal, bredde } = useModal(ModalType.HENLEGG_BEHANDLING);

    function onClose() {
        nullstillDokument();
        lukkModal();
    }

    return (
        <Modal
            open={erModalÅpen}
            width={bredde}
            onClose={onClose}
            header={{ heading: tittel, size: 'medium' }}
            portal={true}
        >
            {erModalÅpen && (
                <Innhold
                    hentetDokument={hentetDokument}
                    hentForhåndsvisning={hentForhåndsvisning}
                />
            )}
        </Modal>
    );
}

interface InnholdProps {
    hentetDokument: Ressurs<string>;
    hentForhåndsvisning: <T>(familieAxiosRequestConfig: FamilieAxiosRequestConfig<T>) => void;
}

function Innhold({ hentetDokument, hentForhåndsvisning }: InnholdProps) {
    const { lukkModal } = useModal(ModalType.HENLEGG_BEHANDLING);

    const { form, onSubmit } = useHenleggBehandlingForm();

    const {
        watch,
        handleSubmit,
        formState: { errors },
    } = form;

    const valgtÅrsak = watch(HenleggBehandlingFormFields.ÅRSAK);

    const dokumentError = hentFrontendFeilmelding(hentetDokument);
    const submitError = HenleggBehandlingServerErrors.onSubmitError.lookup(errors);

    return (
        <>
            <Modal.Body>
                <VStack gap={'4'}>
                    <Alert variant={'info'}>
                        <BodyLong>
                            Skriv en begrunnelse som forklarer hvorfor behandlingen henlegges. Dette
                            kan gi andre saksbehandlere bedre grunnlag hvis de gjenopptar saken, og
                            kan gjøre det lettere for teamet å feilsøke.
                        </BodyLong>
                    </Alert>
                    <FormProvider {...form}>
                        <form id={HENLEGG_BEHANDLING_FORM_ID} onSubmit={handleSubmit(onSubmit)}>
                            <Fieldset
                                legend={'Henlegg behandling'}
                                hideLegend={true}
                                error={dokumentError || submitError}
                            >
                                <VStack gap={'4'}>
                                    <ÅrsakFelt />
                                    <BegrunnelseFelt />
                                </VStack>
                            </Fieldset>
                        </form>
                    </FormProvider>
                </VStack>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    form={HENLEGG_BEHANDLING_FORM_ID}
                    variant={'primary'}
                    size={'small'}
                    type={'submit'}
                    loading={form.formState.isSubmitting}
                    disabled={form.formState.isSubmitting}
                >
                    {valgtÅrsak === HenleggÅrsak.SØKNAD_TRUKKET
                        ? 'Bekreft og send brev'
                        : 'Bekreft'}
                </Button>
                <Button variant={'tertiary'} size={'small'} onClick={() => lukkModal()}>
                    Avbryt
                </Button>
                {valgtÅrsak === HenleggÅrsak.SØKNAD_TRUKKET && (
                    <ForhåndsvisBrevLenke hentForhåndsvisning={hentForhåndsvisning} />
                )}
            </Modal.Footer>
        </>
    );
}
