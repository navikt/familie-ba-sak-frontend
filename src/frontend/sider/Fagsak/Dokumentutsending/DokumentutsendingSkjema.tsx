import { useBruker } from '@hooks/useBruker';
import { useFagsak } from '@hooks/useFagsak';
import { BrevmottakereAlert } from '@komponenter/Brevmottaker/BrevmottakereAlert';
import { LeggTilBarnModal } from '@komponenter/Modal/LeggTilBarn/LeggTilBarnModal';
import { LeggTilBarnModalContextProvider } from '@komponenter/Modal/LeggTilBarn/LeggTilBarnModalContext';
import { Mottaker } from '@komponenter/Saklinje/Meny/LeggTilEllerFjernBrevmottakere/useBrevmottakerSkjema';
import { FileTextIcon, InformationSquareIcon } from '@navikt/aksel-icons';
import { Box, Button, Fieldset, Heading, HStack, InfoCard, VStack } from '@navikt/ds-react';
import { useDistribusjonskanalContext } from '@sider/Fagsak/DistribusjonskanalProvider';
import { finnBarnIBrevÅrsak } from '@sider/Fagsak/Dokumentutsending/barnIBrevÅrsak';
import { DistribusjonskanalInfo } from '@sider/Fagsak/Dokumentutsending/DistribusjonskanalInfo';
import { DokumentÅrsak } from '@sider/Fagsak/Dokumentutsending/dokumentÅrsakTyper';
import { LeggTilBarnKnapp } from '@sider/Fagsak/Dokumentutsending/LeggTilBarnKnapp';
import { BarnCheckboxGruppe } from '@sider/Fagsak/Dokumentutsending/skjema/BarnCheckboxGruppe';
import { Dokumentvelger } from '@sider/Fagsak/Dokumentutsending/skjema/Dokumentvelger';
import { FritekstAvsnitt } from '@sider/Fagsak/Dokumentutsending/skjema/FritekstAvsnitt';
import { Fritekster } from '@sider/Fagsak/Dokumentutsending/skjema/Fritekster';
import { MålformVelger } from '@sider/Fagsak/Dokumentutsending/skjema/MålformVelger';
import { ValgteBarnFieldArrayProvider } from '@sider/Fagsak/Dokumentutsending/skjema/ValgteBarnFieldArrayContext';
import { ÅrsakVelger } from '@sider/Fagsak/Dokumentutsending/skjema/ÅrsakVelger';
import {
    DokumentutsendingFeltnavn,
    useDokumentutsendingSkjema,
} from '@sider/Fagsak/Dokumentutsending/useDokumentutsendingSkjema';
import { useManuelleBrevmottakerePåFagsakContext } from '@sider/Fagsak/ManuelleBrevmottakerePåFagsakContext';
import { Distribusjonskanal } from '@typer/dokument';
import { FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router';

interface Props {
    åpneBrevSendtDialog: () => void;
    settForhåndsvisningUrl: (url: string) => void;
}

export function DokumentutsendingSkjema({ åpneBrevSendtDialog, settForhåndsvisningUrl }: Props) {
    const bruker = useBruker();
    const navigate = useNavigate();
    const fagsak = useFagsak();

    const { manuelleBrevmottakerePåFagsak } = useManuelleBrevmottakerePåFagsakContext();
    const { distribusjonskanal, distribusjonskanalError } = useDistribusjonskanalContext();

    const { form, onSubmit, hentForhåndsvisning, forhåndsvisningLaster, visForhåndsvisningBeskjed } =
        useDokumentutsendingSkjema({ åpneBrevSendtDialog, settForhåndsvisningUrl });

    const {
        control,
        watch,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = form;

    const brukerHarUtenlandskAdresse = manuelleBrevmottakerePåFagsak.some(
        mottaker => mottaker.type === Mottaker.BRUKER_MED_UTENLANDSK_ADRESSE
    );

    const brukerHarUkjentAdresse =
        !brukerHarUtenlandskAdresse &&
        (distribusjonskanalError !== undefined ||
            distribusjonskanal === Distribusjonskanal.UKJENT ||
            distribusjonskanal === Distribusjonskanal.INGEN_DISTRIBUSJON);

    const skjemaErLåst = isSubmitting || forhåndsvisningLaster || brukerHarUkjentAdresse;

    const årsak = watch(DokumentutsendingFeltnavn.ÅRSAK);
    const barnIBrevÅrsak = finnBarnIBrevÅrsak(årsak);

    return (
        <ValgteBarnFieldArrayProvider control={control}>
            {({ valgteBarn, leggTilBarn }) => (
                <LeggTilBarnModalContextProvider
                    barn={valgteBarn}
                    onLeggTilBarn={barn => leggTilBarn(barn, { shouldFocus: false })}
                    harBrevmottaker={manuelleBrevmottakerePåFagsak.length > 0}
                >
                    <LeggTilBarnModal />
                    <Box padding="space-32" overflow="auto">
                        <FormProvider {...form}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Heading size={'large'} level={'1'}>
                                    Send informasjonsbrev
                                </Heading>
                                {!brukerHarUtenlandskAdresse && <DistribusjonskanalInfo />}
                                {manuelleBrevmottakerePåFagsak.length > 0 && (
                                    <BrevmottakereAlert
                                        erPåBehandling={false}
                                        brevmottakere={manuelleBrevmottakerePåFagsak}
                                        bruker={bruker}
                                    />
                                )}
                                <Box maxWidth="30rem" marginBlock="space-32 space-0">
                                    <Fieldset
                                        error={errors.root?.message}
                                        errorPropagation={false}
                                        legend="Send informasjonsbrev"
                                        hideLegend
                                    >
                                        <VStack gap="space-16">
                                            <ÅrsakVelger />

                                            {barnIBrevÅrsak !== undefined && (
                                                <Box>
                                                    <BarnCheckboxGruppe barnIBrevÅrsak={barnIBrevÅrsak} />
                                                    <LeggTilBarnKnapp />
                                                </Box>
                                            )}

                                            {årsak === DokumentÅrsak.KAN_SØKE && (
                                                <>
                                                    <Dokumentvelger />
                                                    <Fritekster />
                                                </>
                                            )}

                                            {(årsak === DokumentÅrsak.INNHENTE_OPPLYSNINGER_KLAGE ||
                                                årsak === DokumentÅrsak.INNHENTE_OPPLYSNINGER_KLAGE_INSTITUSJON) && (
                                                <Box paddingBlock={'space-16 space-0'}>
                                                    <FritekstAvsnitt />
                                                </Box>
                                            )}

                                            <MålformVelger />

                                            {årsak && visForhåndsvisningBeskjed && (
                                                <InfoCard data-color="info">
                                                    <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                                                        Du har gjort endringer i brevet som ikke er forhåndsvist
                                                    </InfoCard.Message>
                                                </InfoCard>
                                            )}
                                        </VStack>
                                    </Fieldset>
                                </Box>
                                <HStack justify={'space-between'} marginBlock={'space-24 space-0'}>
                                    <HStack gap={'space-16'}>
                                        <Button
                                            size="medium"
                                            variant="primary"
                                            type="submit"
                                            loading={isSubmitting}
                                            disabled={skjemaErLåst}
                                        >
                                            Send brev
                                        </Button>

                                        <Button
                                            size="medium"
                                            variant="tertiary"
                                            type="button"
                                            onClick={() => navigate(`/fagsak/${fagsak.id}/saksoversikt`)}
                                        >
                                            Avbryt
                                        </Button>
                                    </HStack>
                                    <Button
                                        variant="tertiary"
                                        type="button"
                                        id="forhandsvis-vedtaksbrev"
                                        size="medium"
                                        loading={forhåndsvisningLaster}
                                        disabled={skjemaErLåst}
                                        onClick={hentForhåndsvisning}
                                        icon={<FileTextIcon />}
                                    >
                                        Forhåndsvis
                                    </Button>
                                </HStack>
                            </form>
                        </FormProvider>
                    </Box>
                </LeggTilBarnModalContextProvider>
            )}
        </ValgteBarnFieldArrayProvider>
    );
}
