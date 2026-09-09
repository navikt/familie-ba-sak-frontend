import { useErLesevisning } from '@hooks/useErLesevisning';
import { useOpprettManueltBrevPdf } from '@hooks/useOpprettManueltBrevPdf';
import { LeggTilBarnModal } from '@komponenter/Modal/LeggTilBarn/LeggTilBarnModal';
import { LeggTilBarnModalContextProvider } from '@komponenter/Modal/LeggTilBarn/LeggTilBarnModalContext';
import { useSamhandlerRequest } from '@komponenter/Samhandler/useSamhandler';
import { FileTextIcon, XMarkOctagonFillIcon } from '@navikt/aksel-icons';
import { Button, Dialog, ErrorMessage, Fieldset, Heading, HStack, Label, Loader, VStack } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';
import type { IPersonInfo } from '@typer/person';
import type { IBarnMedOpplysninger } from '@typer/søknad';
import { useState } from 'react';
import { Controller, FormProvider } from 'react-hook-form';

import BrevmottakerListe from '../../../../../komponenter/Brevmottaker/BrevmottakerListe';
import Knapperekke from '../../../../../komponenter/Knapperekke';
import { useBehandlingContext } from '../../context/BehandlingContext';
import { AntallUkerSvarfristField } from './AntallUkerSvarfristField';
import { BarnBrevetGjelderField } from './BarnBrevetGjelderField';
import { BrevmalSelect } from './BrevmalSelect';
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
import { DatoAvtaleField } from './DatoAvtaleField';
import { DeltBostedField } from './DeltBostedField';
import { DokumenterField } from './DokumenterField';
import { FritekstAvsnittField } from './FritekstAvsnittField';
import { FritekstKulepunkterField } from './FritekstKulepunkterField';
import { LeggTilBarnKnapp } from './LeggTilBarnKnapp';
import { MottakerlandSedField } from './MottakerlandSedField';
import { BrevmodulFeltnavn, useBrevModul } from './useBrevModul';

interface IProps {
    onSubmitSuccess: () => void;
    bruker: IPersonInfo;
}

const Brevskjema = ({ onSubmitSuccess, bruker }: IProps) => {
    const { behandling } = useBehandlingContext();
    const { hentOgSettSamhandler, samhandlerRessurs } = useSamhandlerRequest(true);

    const {
        form,
        onSubmit,
        hentSkjemaData,
        mottakersMålform,
        hentMuligeBrevMaler,
        onEndreBrevmal,
        leggTilFritekstKulepunkt,
        institusjon,
        brevmottakere,
        visFritekstAvsnittTekstboks,
        settVisFritekstAvsnittTekstboks,
    } = useBrevModul({ onSubmitSuccess });

    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { isSubmitting, isSubmitted, errors },
    } = form;

    const [visForhåndsvisningDialog, settVisForhåndsvisningDialog] = useState(false);

    const {
        data: manueltBrevPdf,
        mutate: opprettManueltBrevPdf,
        isPending: opprettManueltBrevPdfIsPending,
        error: opprettManueltBrevPdfError,
    } = useOpprettManueltBrevPdf();

    const erLesevisning = useErLesevisning();

    const brevmal = watch(BrevmodulFeltnavn.BREVMAL);
    const barnMedDeltBosted = watch(BrevmodulFeltnavn.BARN_MED_DELT_BOSTED);
    const avtalerOmDeltBostedPerBarn = watch(BrevmodulFeltnavn.AVTALER_OM_DELT_BOSTED_PER_BARN);

    const brevMaler = hentMuligeBrevMaler();
    const skjemaErLåst = erLesevisning || isSubmitting || opprettManueltBrevPdfIsPending;

    const behandlingSteg = behandling.steg;

    if (institusjon) {
        if (!institusjon.navn && samhandlerRessurs.status === RessursStatus.IKKE_HENTET) {
            hentOgSettSamhandler(behandling.behandlingId);
        }
        institusjon.navn =
            samhandlerRessurs.status === RessursStatus.SUKSESS ? samhandlerRessurs.data.navn : institusjon.navn;
    }

    function onLeggTilBarn(barn: IBarnMedOpplysninger) {
        setValue(BrevmodulFeltnavn.BARN_MED_DELT_BOSTED, [...barnMedDeltBosted, barn], { shouldValidate: isSubmitted });
        if (barn.erFolkeregistrert) {
            setValue(
                BrevmodulFeltnavn.AVTALER_OM_DELT_BOSTED_PER_BARN,
                { ...avtalerOmDeltBostedPerBarn, [barn.ident]: [''] },
                { shouldValidate: isSubmitted }
            );
        }
    }

    return (
        <FormProvider {...form}>
            <LeggTilBarnModalContextProvider
                barn={barnMedDeltBosted}
                onLeggTilBarn={onLeggTilBarn}
                harBrevmottaker={brevmottakere.length > 0}
            >
                {!erLesevisning && <LeggTilBarnModal />}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Fieldset error={errors.root?.message} legend="Send brev" hideLegend>
                        {/* Skjult valideringsfelt: mottaker velges via brevmottaker-flyten, men
                            mottakerIdent må valideres før innsending. Feltet har ingen egen UI, derfor
                            returnerer render en tom fragment (<></>) – kun valideringsregelen brukes. */}
                        <Controller
                            name={BrevmodulFeltnavn.MOTTAKER_IDENT}
                            control={control}
                            rules={{ validate: verdi => verdi.length >= 1 || 'Du må velge en mottaker' }}
                            render={() => <></>}
                        />
                        <Label>Brev sendes til</Label>
                        <BrevmottakerListe bruker={bruker} brevmottakere={brevmottakere} />
                        <VStack gap={'space-16'}>
                            <BrevmalSelect
                                brevMaler={brevMaler}
                                mottakersMålform={mottakersMålform}
                                onEndreBrevmal={onEndreBrevmal}
                            />
                            {skalViseDokumenter(brevmal) && <DokumenterField />}
                            {skalViseFritekstKulepunkter(brevmal) && (
                                <FritekstKulepunkterField leggTilFritekstKulepunkt={leggTilFritekstKulepunkt} />
                            )}
                            {skalViseFritekstAvsnitt(brevmal) && (
                                <FritekstAvsnittField
                                    visFritekstAvsnittTekstboks={visFritekstAvsnittTekstboks}
                                    settVisFritekstAvsnittTekstboks={settVisFritekstAvsnittTekstboks}
                                />
                            )}
                            {skalViseBarnBrevetGjelder(brevmal) && (
                                <BarnBrevetGjelderField behandlingSteg={behandlingSteg} />
                            )}
                            {skalViseDeltBosted(brevmal) && (
                                <>
                                    <DeltBostedField />
                                    {!erLesevisning && <LeggTilBarnKnapp />}
                                </>
                            )}
                            {skalViseDatoAvtale(brevmal) && <DatoAvtaleField />}
                            {skalViseAntallUkerSvarfrist(brevmal) && <AntallUkerSvarfristField />}
                            {skalViseMottakerlandSed(brevmal, behandling.kategori) && <MottakerlandSedField />}
                        </VStack>
                    </Fieldset>
                    <Knapperekke>
                        {!erLesevisning && (
                            <>
                                <Button
                                    type={'button'}
                                    variant={'secondary'}
                                    id={'forhandsvis-vedtaksbrev'}
                                    size={'small'}
                                    disabled={skjemaErLåst}
                                    onClick={handleSubmit(values => {
                                        opprettManueltBrevPdf({
                                            behandlingId: behandling.behandlingId,
                                            payload: hentSkjemaData(values),
                                        });
                                        settVisForhåndsvisningDialog(true);
                                    })}
                                    icon={<FileTextIcon />}
                                >
                                    Forhåndsvis
                                </Button>
                                <Dialog open={visForhåndsvisningDialog} onOpenChange={settVisForhåndsvisningDialog}>
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
                                                    <ErrorMessage>{opprettManueltBrevPdfError.message}</ErrorMessage>
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
                    </Knapperekke>
                </form>
            </LeggTilBarnModalContextProvider>
        </FormProvider>
    );
};

export default Brevskjema;
