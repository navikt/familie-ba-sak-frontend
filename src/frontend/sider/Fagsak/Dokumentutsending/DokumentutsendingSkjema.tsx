import { useBruker } from '@hooks/useBruker';
import { useSaksbehandler } from '@hooks/useSaksbehandler';
import { BrevmottakereAlert } from '@komponenter/Brevmottaker/BrevmottakereAlert';
import { LeggTilBarnModal } from '@komponenter/Modal/LeggTilBarn/LeggTilBarnModal';
import { LeggTilBarnModalContextProvider } from '@komponenter/Modal/LeggTilBarn/LeggTilBarnModalContext';
import type { IBarnMedOpplysninger } from '@typer/søknad';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { FileTextIcon, InformationSquareIcon } from '@navikt/aksel-icons';
import { Box, Button, Fieldset, Heading, HStack, InfoCard, VStack } from '@navikt/ds-react';

import { barnIBrevÅrsakTilTittel, finnBarnIBrevÅrsak } from './barnIBrevÅrsak';
import { DistribusjonskanalInfo } from './DistribusjonskanalInfo';
import { useDokumentutsendingContext } from './DokumentutsendingContextRHF';
import { DokumentÅrsakInstitusjon, DokumentÅrsakPerson } from './dokumentÅrsakTyper';
import { useFagsakContext } from '../FagsakContext';
import { useManuelleBrevmottakerePåFagsakContext } from '../ManuelleBrevmottakerePåFagsakContext';
import { BarnIBrevSkjema } from './skjema/BarnIBrevSkjema';
import { DeltBostedSkjema } from './skjema/DeltBostedSkjema';
import { FritekstAvsnitt } from './skjema/FritekstAvsnitt';
import { KanSøkeSkjema } from './skjema/KanSøkeSkjema';
import { MålformVelger } from './skjema/MålformVelger';
import type { DokumentutsendingFormValues } from './skjema/useDokumentutsendingSkjema';
import { DokumentutsendingFeltnavn } from './skjema/useDokumentutsendingSkjema';
import { ÅrsakVelger } from './skjema/ÅrsakVelger';

export function DokumentutsendingSkjema() {
    const bruker = useBruker();
    const saksbehandler = useSaksbehandler();
    const navigate = useNavigate();
    const { fagsak } = useFagsakContext();

    const { manuelleBrevmottakerePåFagsak } = useManuelleBrevmottakerePåFagsakContext();

    const { watch, getValues, setValue, handleSubmit } = useFormContext<DokumentutsendingFormValues>();

    const {
        hentForhåndsvisning,
        forhåndsvisningLaster,
        senderBrev,
        sendBrev,
        skjemaErLåst,
        skjemaFeilmelding,
        visForhåndsvisningBeskjed,
        brukerHarUkjentAdresse,
        brukerHarUtenlandskAdresse,
        distribusjonskanal,
    } = useDokumentutsendingContext();

    const årsak = watch(DokumentutsendingFeltnavn.ÅRSAK);
    const valgteBarn = watch(DokumentutsendingFeltnavn.VALGTE_BARN);

    const barnIBrevÅrsak = finnBarnIBrevÅrsak(årsak || undefined);
    const erLesevisning = !saksbehandler.harSkrivetilgang;

    function onLeggTilBarn(barn: IBarnMedOpplysninger) {
        setValue(DokumentutsendingFeltnavn.VALGTE_BARN, [...getValues(DokumentutsendingFeltnavn.VALGTE_BARN), barn], {
            shouldValidate: true,
        });
    }

    return (
        <LeggTilBarnModalContextProvider
            barn={valgteBarn}
            onLeggTilBarn={onLeggTilBarn}
            harBrevmottaker={manuelleBrevmottakerePåFagsak.length > 0}
        >
            {!erLesevisning && <LeggTilBarnModal />}
            <Box padding="space-32" overflow="auto">
                <form onSubmit={handleSubmit(sendBrev)}>
                    <Heading size={'large'} level={'1'} children={'Send informasjonsbrev'} />
                    {!brukerHarUtenlandskAdresse && <DistribusjonskanalInfo distribusjonskanal={distribusjonskanal} />}
                    {manuelleBrevmottakerePåFagsak.length > 0 && (
                        <BrevmottakereAlert
                            erPåBehandling={false}
                            brevmottakere={manuelleBrevmottakerePåFagsak}
                            bruker={bruker}
                        />
                    )}
                    <Box maxWidth="30rem" marginBlock="space-32 space-0">
                        <Fieldset
                            error={skjemaFeilmelding}
                            errorPropagation={false}
                            legend="Send informasjonsbrev"
                            hideLegend
                        >
                            <VStack gap="space-16">
                                <ÅrsakVelger />

                                {årsak === DokumentÅrsakPerson.DELT_BOSTED && <DeltBostedSkjema />}

                                {barnIBrevÅrsak !== undefined && (
                                    <BarnIBrevSkjema tittel={barnIBrevÅrsakTilTittel[barnIBrevÅrsak]} />
                                )}

                                {årsak === DokumentÅrsakPerson.KAN_SØKE && <KanSøkeSkjema />}

                                {(årsak === DokumentÅrsakPerson.INNHENTE_OPPLYSNINGER_KLAGE ||
                                    årsak === DokumentÅrsakInstitusjon.INNHENTE_OPPLYSNINGER_KLAGE_INSTITUSJON) && (
                                    <Box paddingBlock={'space-16 space-0'}>
                                        <FritekstAvsnitt />
                                    </Box>
                                )}

                                <MålformVelger />

                                {årsak && visForhåndsvisningBeskjed() && (
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
                                type={'submit'}
                                loading={senderBrev}
                                disabled={skjemaErLåst || brukerHarUkjentAdresse}
                            >
                                Send brev
                            </Button>

                            <Button
                                size="medium"
                                variant="tertiary"
                                type={'button'}
                                onClick={() => navigate(`/fagsak/${fagsak.id}/saksoversikt`)}
                            >
                                Avbryt
                            </Button>
                        </HStack>
                        {årsak && (
                            <Button
                                variant={'tertiary'}
                                type={'button'}
                                id={'forhandsvis-vedtaksbrev'}
                                size={'medium'}
                                loading={forhåndsvisningLaster}
                                disabled={skjemaErLåst}
                                onClick={hentForhåndsvisning}
                                icon={<FileTextIcon />}
                            >
                                {'Forhåndsvis'}
                            </Button>
                        )}
                    </HStack>
                </form>
            </Box>
        </LeggTilBarnModalContextProvider>
    );
}
