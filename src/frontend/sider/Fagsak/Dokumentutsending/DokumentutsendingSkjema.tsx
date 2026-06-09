import type { ChangeEvent } from 'react';
import { useEffect } from 'react';

import { DistribusjonskanalInfo } from '@sider/Fagsak/Dokumentutsending/DistribusjonskanalInfo';

import { FileTextIcon, InformationSquareIcon } from '@navikt/aksel-icons';
import { Box, Button, Fieldset, Heading, HStack, InfoCard, Label, Select, VStack } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import BarnIBrevSkjema from './BarnIBrev/BarnIBrevSkjema';
import { barnIBrevÅrsakTilTittel, finnBarnIBrevÅrsak } from './barnIBrevÅrsak';
import DeltBostedSkjema from './DeltBosted/DeltBostedSkjema';
import { dokumentÅrsak, DokumentÅrsakPerson, useDokumentutsendingContext } from './DokumentutsendingContext';
import FritekstAvsnitt from './FritekstAvsnitt/FritekstAvsnitt';
import KanSøkeSkjema from './KanSøke/KanSøkeSkjema';
import { LeggTilBarnKnapp } from './LeggTilBarnKnapp';
import { useFeatureToggles } from '../../../hooks/useFeatureToggles';
import { useSaksbehandler } from '../../../hooks/useSaksbehandler';
import { BrevmottakereAlert } from '../../../komponenter/Brevmottaker/BrevmottakereAlert';
import { LeggTilBarnModal } from '../../../komponenter/Modal/LeggTilBarn/LeggTilBarnModal';
import { LeggTilBarnModalContextProvider } from '../../../komponenter/Modal/LeggTilBarn/LeggTilBarnModalContext';
import MålformVelger from '../../../komponenter/MålformVelger';
import { FeatureToggle } from '../../../typer/featureToggles';
import type { IBarnMedOpplysninger } from '../../../typer/søknad';
import { useBrukerContext } from '../BrukerContext';
import { useManuelleBrevmottakerePåFagsakContext } from '../ManuelleBrevmottakerePåFagsakContext';

export function DokumentutsendingSkjema() {
    const { bruker } = useBrukerContext();

    const {
        hentForhåndsvisningPåFagsak,
        hentetDokument,
        skjema,
        nullstillSkjema,
        senderBrev,
        sendBrevPåFagsak,
        skjemaErLåst,
        hentSkjemaFeilmelding,
        visForhåndsvisningBeskjed,
        settVisfeilmeldinger,
        distribusjonskanal,
        brukerHarUkjentAdresse,
        hentDistribusjonskanal,
        brukerHarUtenlandskAdresse,
        dokumentÅrsaker,
    } = useDokumentutsendingContext();

    const saksbehandler = useSaksbehandler();
    const toggles = useFeatureToggles();

    const { manuelleBrevmottakerePåFagsak } = useManuelleBrevmottakerePåFagsakContext();

    const barnIBrevÅrsak = finnBarnIBrevÅrsak(skjema.felter.årsak.verdi);

    useEffect(() => {
        hentDistribusjonskanal(bruker.personIdent);
    }, []);

    const erLesevisning = !saksbehandler.harSkrivetilgang;

    function onLeggTilBarn(barn: IBarnMedOpplysninger) {
        if (skjema.felter.årsak.verdi === DokumentÅrsakPerson.DELT_BOSTED) {
            skjema.felter.barnMedDeltBosted.validerOgSettFelt([...skjema.felter.barnMedDeltBosted.verdi, barn]);
            if (barn.erFolkeregistrert) {
                skjema.felter.avtalerOmDeltBostedPerBarn.validerOgSettFelt({
                    ...skjema.felter.avtalerOmDeltBostedPerBarn.verdi,
                    [barn.ident]: [''],
                });
            }
        }
        if (finnBarnIBrevÅrsak(skjema.felter.årsak.verdi) !== undefined) {
            skjema.felter.barnIBrev.validerOgSettFelt([...skjema.felter.barnIBrev.verdi, barn]);
        }
    }

    const barn =
        skjema.felter.årsak.verdi === DokumentÅrsakPerson.DELT_BOSTED
            ? skjema.felter.barnMedDeltBosted.verdi
            : skjema.felter.barnIBrev.verdi;

    return (
        <LeggTilBarnModalContextProvider
            barn={barn}
            onLeggTilBarn={onLeggTilBarn}
            harBrevmottaker={manuelleBrevmottakerePåFagsak.length > 0}
        >
            {!erLesevisning && <LeggTilBarnModal />}
            <Box padding="space-32" overflow="auto">
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
                        error={hentSkjemaFeilmelding()}
                        errorPropagation={false}
                        legend="Send informasjonsbrev"
                        hideLegend
                    >
                        <VStack gap="space-16">
                            <Select
                                {...skjema.felter.årsak.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                                label={'Velg årsak'}
                                value={skjema.felter.årsak.verdi || ''}
                                onChange={(event: ChangeEvent<HTMLSelectElement>): void => {
                                    skjema.felter.årsak.onChange(event.target.value as DokumentÅrsakPerson);
                                }}
                                size={'medium'}
                            >
                                <option value="">Velg</option>
                                {dokumentÅrsaker
                                    .filter(årsak => {
                                        switch (årsak) {
                                            // TODO: Fjern dette når toggle selvstendigRettInfobrev skrus på.
                                            case DokumentÅrsakPerson.TIL_FORELDER_MED_SELVSTENDIG_RETT_VI_HAR_FÅTT_F016_KAN_SØKE_OM_BARNETRYGD:
                                                return toggles[FeatureToggle.selvstendigRettInfobrev];
                                            default:
                                                return true;
                                        }
                                    })
                                    .map(årsak => {
                                        return (
                                            <option
                                                key={årsak}
                                                aria-selected={skjema.felter.årsak.verdi === årsak}
                                                value={årsak}
                                            >
                                                {dokumentÅrsak[årsak]}
                                            </option>
                                        );
                                    })}
                            </Select>
                            {skjema.felter.årsak.verdi === DokumentÅrsakPerson.DELT_BOSTED && (
                                <Box>
                                    <DeltBostedSkjema
                                        avtalerOmDeltBostedPerBarnFelt={skjema.felter.avtalerOmDeltBostedPerBarn}
                                        barnMedDeltBostedFelt={skjema.felter.barnMedDeltBosted}
                                        visFeilmeldinger={skjema.visFeilmeldinger}
                                        settVisFeilmeldinger={settVisfeilmeldinger}
                                        manuelleBrevmottakere={manuelleBrevmottakerePåFagsak}
                                        vurderErLesevisning={() => !saksbehandler.harSkrivetilgang}
                                    />
                                    {!erLesevisning && <LeggTilBarnKnapp />}
                                </Box>
                            )}

                            {barnIBrevÅrsak != undefined && (
                                <Box>
                                    <BarnIBrevSkjema
                                        barnIBrevFelt={skjema.felter.barnIBrev}
                                        visFeilmeldinger={skjema.visFeilmeldinger}
                                        settVisFeilmeldinger={settVisfeilmeldinger}
                                        tittel={barnIBrevÅrsakTilTittel[barnIBrevÅrsak]}
                                    />
                                    {!erLesevisning && <LeggTilBarnKnapp />}
                                </Box>
                            )}

                            {skjema.felter.årsak.verdi === DokumentÅrsakPerson.KAN_SØKE && <KanSøkeSkjema />}
                            {skjema.felter.fritekstAvsnitt.erSynlig && (
                                <Box paddingBlock={'space-16 space-0'}>
                                    <FritekstAvsnitt />
                                </Box>
                            )}

                            <MålformVelger
                                målformFelt={skjema.felter.målform}
                                visFeilmeldinger={skjema.visFeilmeldinger}
                                erLesevisning={false}
                                Legend={<Label children={'Målform'} />}
                            />
                            {skjema.felter.årsak.verdi && visForhåndsvisningBeskjed() && (
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
                            loading={senderBrev()}
                            disabled={skjemaErLåst() || brukerHarUkjentAdresse()}
                            onClick={sendBrevPåFagsak}
                        >
                            Send brev
                        </Button>

                        <Button size="medium" variant="tertiary" onClick={nullstillSkjema}>
                            Avbryt
                        </Button>
                    </HStack>
                    {skjema.felter.årsak.verdi && (
                        <Button
                            variant={'tertiary'}
                            id={'forhandsvis-vedtaksbrev'}
                            size={'medium'}
                            loading={hentetDokument.status === RessursStatus.HENTER}
                            disabled={skjemaErLåst()}
                            onClick={hentForhåndsvisningPåFagsak}
                            icon={<FileTextIcon />}
                        >
                            {'Forhåndsvis'}
                        </Button>
                    )}
                </HStack>
            </Box>
        </LeggTilBarnModalContextProvider>
    );
}
