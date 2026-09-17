import { useBehandling } from '@hooks/useBehandling';
import { useBruker } from '@hooks/useBruker';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { useFagsak } from '@hooks/useFagsak';
import { useOpprettManueltBrevPdf } from '@hooks/useOpprettManueltBrevPdf';
import { LeggTilBarnModal } from '@komponenter/Modal/LeggTilBarn/LeggTilBarnModal';
import { LeggTilBarnModalContextProvider } from '@komponenter/Modal/LeggTilBarn/LeggTilBarnModalContext';
import { useSamhandlerRequest } from '@komponenter/Samhandler/useSamhandler';
import { FileTextIcon, XMarkOctagonFillIcon } from '@navikt/aksel-icons';
import { Button, Dialog, ErrorMessage, Fieldset, Heading, HStack, Label, Loader, VStack } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';
import { useEffect, useState } from 'react';
import { FormProvider, useController } from 'react-hook-form';

import BrevmottakerListe from '../../../../../komponenter/Brevmottaker/BrevmottakerListe';
import { AntallUkerSvarfristField } from './AntallUkerSvarfristField';
import { BarnBrevetGjelderField } from './BarnBrevetGjelderField';
import { BrevmalField } from './BrevmalField';
import styles from './Brevskjema.module.css';
import {
    skalViseAntallUkerSvarfrist,
    skalViseBarnBrevetGjelder,
    skalViseDatoAvtale,
    skalViseDeltBosted,
    skalViseDokumenter,
    skalViseFritekstAvsnitt,
    skalViseFritekstKulepunkter,
    skalViseMottakerlandSed,
} from './brevmalRegler';
import { BarnMedDeltBostedFieldArrayProvider } from './DeltBosted/BarnMedDeltBostedFieldArrayContext';
import { DeltBostedField } from './DeltBosted/DeltBostedField';
import { DokumenterField } from './DokumenterField';
import { FritekstAvsnittField } from './FritekstAvsnittField';
import { FritekstKulepunkter } from './FritekstKulepunkter';
import { LeggTilBarnKnapp } from './LeggTilBarnKnapp';
import { MottakerlandSedField } from './MottakerlandSedField';
import { SamboerFraDatoField } from './SamboerFraDatoField';
import { SendManueltBrevFeltnavn, useSendManueltBrevForm } from './useSendManueltBrevForm';

interface IProps {
    onSubmitSuccess: () => void;
}

const Brevskjema = ({ onSubmitSuccess }: IProps) => {
    const behandling = useBehandling();
    const fagsak = useFagsak();
    const bruker = useBruker();
    const { hentOgSettSamhandler, samhandlerRessurs } = useSamhandlerRequest(true);

    const { form, onSubmit, hentSkjemaData } = useSendManueltBrevForm({ onSubmitSuccess });

    const brevmottakere = behandling.brevmottakere;

    const {
        control,
        handleSubmit,
        getValues,
        watch,
        formState: { isSubmitting, errors },
    } = form;

    const { fieldState: mottakerIdentState } = useController({
        name: SendManueltBrevFeltnavn.MOTTAKER_IDENT,
        control,
        rules: { validate: verdi => verdi.length >= 1 || 'Du må velge en mottaker' },
    });

    const [visForhåndsvisningDialog, settVisForhåndsvisningDialog] = useState(false);

    const {
        data: manueltBrevPdf,
        mutate: opprettManueltBrevPdf,
        isPending: opprettManueltBrevPdfIsPending,
        error: opprettManueltBrevPdfError,
    } = useOpprettManueltBrevPdf();

    const erLesevisning = useErLesevisning();

    const brevmal = watch(SendManueltBrevFeltnavn.BREVMAL);

    const skjemaErLåst = erLesevisning || isSubmitting || opprettManueltBrevPdfIsPending;

    const institusjon = fagsak.institusjon;
    const institusjonNavn =
        samhandlerRessurs.status === RessursStatus.SUKSESS ? samhandlerRessurs.data.navn : institusjon?.navn;

    useEffect(() => {
        if (institusjon && !institusjon.navn && samhandlerRessurs.status === RessursStatus.IKKE_HENTET) {
            hentOgSettSamhandler(behandling.behandlingId);
        }
    }, [institusjon, samhandlerRessurs.status, behandling.behandlingId, hentOgSettSamhandler]);

    return (
        <FormProvider {...form}>
            <BarnMedDeltBostedFieldArrayProvider control={control}>
                {({ barnMedDeltBosted, leggTilBarn }) => (
                    <LeggTilBarnModalContextProvider
                        barn={barnMedDeltBosted}
                        onLeggTilBarn={leggTilBarn}
                        harBrevmottaker={brevmottakere.length > 0}
                    >
                        {!erLesevisning && <LeggTilBarnModal />}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Fieldset error={errors.root?.message} legend="Send brev" hideLegend>
                                <Label>Brev sendes til</Label>
                                <BrevmottakerListe
                                    bruker={bruker}
                                    brevmottakere={brevmottakere}
                                    institusjonNavn={institusjonNavn}
                                />
                                {mottakerIdentState.error && (
                                    <ErrorMessage>{mottakerIdentState.error.message}</ErrorMessage>
                                )}
                                <VStack gap={'space-16'}>
                                    <BrevmalField />
                                    {skalViseDokumenter(brevmal) && <DokumenterField />}
                                    {skalViseFritekstKulepunkter(brevmal) && <FritekstKulepunkter />}
                                    {skalViseFritekstAvsnitt(brevmal) && <FritekstAvsnittField />}
                                    {skalViseBarnBrevetGjelder(brevmal) && <BarnBrevetGjelderField />}
                                    {skalViseDeltBosted(brevmal) && (
                                        <>
                                            <DeltBostedField />
                                            {!erLesevisning && <LeggTilBarnKnapp />}
                                        </>
                                    )}
                                    {skalViseDatoAvtale(brevmal) && <SamboerFraDatoField />}
                                    {skalViseAntallUkerSvarfrist(brevmal) && <AntallUkerSvarfristField />}
                                    {skalViseMottakerlandSed(brevmal, behandling.kategori) && <MottakerlandSedField />}
                                </VStack>
                            </Fieldset>
                            <HStack marginBlock={'space-16 space-0'} justify={'space-between'}>
                                {!erLesevisning && (
                                    <>
                                        <Button
                                            type={'button'}
                                            variant={'secondary'}
                                            size={'small'}
                                            disabled={skjemaErLåst}
                                            onClick={() => {
                                                opprettManueltBrevPdf({
                                                    behandlingId: behandling.behandlingId,
                                                    payload: hentSkjemaData(getValues()),
                                                });
                                                settVisForhåndsvisningDialog(true);
                                            }}
                                            icon={<FileTextIcon />}
                                        >
                                            Forhåndsvis
                                        </Button>
                                        <Dialog
                                            open={visForhåndsvisningDialog}
                                            onOpenChange={settVisForhåndsvisningDialog}
                                        >
                                            <Dialog.Popup width={'max(100rem, 60vw)'} height={'80vh'}>
                                                <Dialog.Header>
                                                    <Dialog.Title>Forhåndsvisning av brev</Dialog.Title>
                                                </Dialog.Header>
                                                <Dialog.Body className={styles.body}>
                                                    {opprettManueltBrevPdfIsPending && (
                                                        <HStack
                                                            height={'100%'}
                                                            justify={'center'}
                                                            align={'center'}
                                                            gap={'space-8'}
                                                        >
                                                            <Loader size={'small'} title={'Laster dokument...'} />
                                                            <Heading size={'small'} level={'2'}>
                                                                Laster dokument...
                                                            </Heading>
                                                        </HStack>
                                                    )}
                                                    {opprettManueltBrevPdfError && (
                                                        <HStack
                                                            height={'100%'}
                                                            justify={'center'}
                                                            align={'center'}
                                                            gap={'space-8'}
                                                        >
                                                            <XMarkOctagonFillIcon
                                                                color={'var(--ax-text-danger-subtle)'}
                                                                fontSize={'1.2rem'}
                                                            />
                                                            <ErrorMessage>
                                                                {opprettManueltBrevPdfError.message}
                                                            </ErrorMessage>
                                                        </HStack>
                                                    )}
                                                    {!opprettManueltBrevPdfIsPending && !opprettManueltBrevPdfError && (
                                                        <iframe
                                                            className={styles.iframe}
                                                            title={'Dokument'}
                                                            src={manueltBrevPdf}
                                                        />
                                                    )}
                                                </Dialog.Body>
                                            </Dialog.Popup>
                                        </Dialog>
                                    </>
                                )}
                                <Button
                                    type={'submit'}
                                    variant={'primary'}
                                    size={'small'}
                                    loading={isSubmitting}
                                    disabled={skjemaErLåst}
                                >
                                    Send brev
                                </Button>
                            </HStack>
                        </form>
                    </LeggTilBarnModalContextProvider>
                )}
            </BarnMedDeltBostedFieldArrayProvider>
        </FormProvider>
    );
};

export default Brevskjema;
