import React, { useEffect } from 'react';

import styled from 'styled-components';

import { FileTextIcon } from '@navikt/aksel-icons';
import { Alert, Box, Button, Fieldset, Heading, Label, Loader, Select } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import BarnIBrevSkjema from './BarnIBrev/BarnIBrevSkjema';
import DeltBostedSkjema from './DeltBosted/DeltBostedSkjema';
import {
    dokumentÅrsak,
    DokumentÅrsakPerson,
    DokumentÅrsakInstitusjon,
    useDokumentutsendingContext,
    type DokumentÅrsak,
} from './DokumentutsendingContext';
import FritekstAvsnitt from './FritekstAvsnitt/FritekstAvsnitt';
import { useAppContext } from '../../../context/AppContext';
import { BrevmottakereAlert } from '../../../komponenter/Brevmottaker/BrevmottakereAlert';
import MålformVelger from '../../../komponenter/MålformVelger';
import { Distribusjonskanal } from '../../../typer/dokument';
import type { IPersonInfo } from '../../../typer/person';
import { ToggleNavn } from '../../../typer/toggles';
import { useFagsakContext } from '../FagsakContext';
import KanSøkeSkjema from './KanSøke/KanSøkeSkjema';

interface Props {
    bruker: IPersonInfo;
}

const Container = styled.div`
    padding: 2rem;
    overflow: auto;
`;

const StyledFieldset = styled(Fieldset)`
    max-width: 30rem;
    margin-top: 2rem;
`;

const ÅrsakSkjema = styled.div`
    margin-bottom: 2rem;
`;

const StyledAlert = styled(Alert)`
    margin: 1rem 0;
`;

const Handlinger = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
`;

const SendBrevKnapp = styled(Button)`
    margin-right: 1rem;
`;

const StyledBrevmottakereAlert = styled(BrevmottakereAlert)`
    margin: 1rem 0;
`;

enum BarnIBrevÅrsak {
    BARN_SØKT_FOR,
    BARN_BOSATT_MED_SØKER,
}

const DokumentutsendingSkjema: React.FC<Props> = ({ bruker }) => {
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
    } = useDokumentutsendingContext();
    const { harInnloggetSaksbehandlerSkrivetilgang, toggles } = useAppContext();

    const { manuelleBrevmottakerePåFagsak } = useFagsakContext();

    const finnBarnIBrevÅrsak = (årsak: DokumentÅrsak | undefined): BarnIBrevÅrsak | undefined => {
        switch (årsak) {
            case DokumentÅrsakPerson.TIL_FORELDER_MED_SELVSTENDIG_RETT_VI_HAR_FÅTT_F016_KAN_SØKE_OM_BARNETRYGD:
            case DokumentÅrsakPerson.TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HAR_FÅTT_EN_SØKNAD_FRA_ANNEN_FORELDER:
            case DokumentÅrsakPerson.TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HAR_GJORT_VEDTAK_TIL_ANNEN_FORELDER:
            case DokumentÅrsakPerson.TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_VARSEL_OM_ÅRLIG_KONTROLL:
            case DokumentÅrsakPerson.TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HENTER_IKKE_REGISTEROPPLYSNINGER:
                return BarnIBrevÅrsak.BARN_SØKT_FOR;
            case DokumentÅrsakPerson.KAN_HA_RETT_TIL_PENGESTØTTE_FRA_NAV:
                return BarnIBrevÅrsak.BARN_BOSATT_MED_SØKER;
            default:
                return undefined;
        }
    };

    const barnIBrevÅrsakTilTittel: Record<BarnIBrevÅrsak, string> = {
        [BarnIBrevÅrsak.BARN_SØKT_FOR]: 'Hvilke barn er søkt for?',
        [BarnIBrevÅrsak.BARN_BOSATT_MED_SØKER]: 'Hvilke barn er bosatt med søker?',
    };

    const barnIBrevÅrsak = finnBarnIBrevÅrsak(skjema.felter.årsak.verdi);

    useEffect(() => {
        hentDistribusjonskanal(bruker.personIdent);
    }, []);

    const distribusjonskanalInfo = () => {
        switch (distribusjonskanal.status) {
            case RessursStatus.SUKSESS:
                switch (distribusjonskanal.data) {
                    case Distribusjonskanal.INGEN_DISTRIBUSJON:
                    case Distribusjonskanal.UKJENT:
                        return (
                            <StyledAlert
                                variant={'warning'}
                                children={
                                    'Brevet kan ikke sendes fordi mottaker har ukjent adresse'
                                }
                            />
                        );
                    case Distribusjonskanal.DITT_NAV:
                    case Distribusjonskanal.DPVT:
                    case Distribusjonskanal.SDP:
                        return <StyledAlert variant={'info'} children={'Brevet sendes digitalt'} />;
                    default:
                        return <StyledAlert variant={'info'} children={'Brevet sendes per post'} />;
                }
            case RessursStatus.FEILET:
            case RessursStatus.FUNKSJONELL_FEIL:
            case RessursStatus.IKKE_TILGANG:
                return (
                    <StyledAlert
                        variant={'error'}
                        children={distribusjonskanal.frontendFeilmelding}
                    />
                );
            case RessursStatus.IKKE_HENTET:
            case RessursStatus.HENTER:
                return (
                    <StyledAlert variant={'info'}>
                        <Loader title="Laster" />
                    </StyledAlert>
                );
            default:
                return (
                    <StyledAlert
                        variant={'error'}
                        children={'Ukjent feil ved henting av distribusjonskanal'}
                    />
                );
        }
    };

    return (
        <Container>
            <Heading size={'large'} level={'1'} children={'Send informasjonsbrev'} />
            {!brukerHarUtenlandskAdresse && distribusjonskanalInfo()}

            {manuelleBrevmottakerePåFagsak.length > 0 && (
                <StyledBrevmottakereAlert
                    erPåBehandling={false}
                    brevmottakere={manuelleBrevmottakerePåFagsak}
                    bruker={bruker}
                />
            )}

            <StyledFieldset
                error={hentSkjemaFeilmelding()}
                errorPropagation={false}
                legend="Send informasjonsbrev"
                hideLegend
            >
                <Select
                    {...skjema.felter.årsak.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                    label={'Velg årsak'}
                    value={skjema.felter.årsak.verdi || ''}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
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
                                    return toggles[ToggleNavn.selvstendigRettInfobrev];
                                case DokumentÅrsakPerson.INNHENTE_OPPLYSNINGER_KLAGE:
                                case DokumentÅrsakInstitusjon.INNHENTE_OPPLYSNINGER_KLAGE_INSTITUSJON: {
                                    return toggles[ToggleNavn.innhenteOpplysningerKlageBrev];
                                }
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

                <ÅrsakSkjema>
                    {skjema.felter.årsak.verdi === DokumentÅrsakPerson.DELT_BOSTED && (
                        <DeltBostedSkjema
                            avtalerOmDeltBostedPerBarnFelt={
                                skjema.felter.avtalerOmDeltBostedPerBarn
                            }
                            barnMedDeltBostedFelt={skjema.felter.barnMedDeltBosted}
                            visFeilmeldinger={skjema.visFeilmeldinger}
                            settVisFeilmeldinger={settVisfeilmeldinger}
                            manuelleBrevmottakere={manuelleBrevmottakerePåFagsak}
                            vurderErLesevisning={() => !harInnloggetSaksbehandlerSkrivetilgang()}
                        />
                    )}

                    {barnIBrevÅrsak != undefined && (
                        <BarnIBrevSkjema
                            barnIBrevFelt={skjema.felter.barnIBrev}
                            visFeilmeldinger={skjema.visFeilmeldinger}
                            settVisFeilmeldinger={settVisfeilmeldinger}
                            tittel={barnIBrevÅrsakTilTittel[barnIBrevÅrsak]}
                        />
                    )}

                    {skjema.felter.årsak.verdi === DokumentÅrsakPerson.KAN_SØKE && (
                        <KanSøkeSkjema />
                    )}
                    {skjema.felter.fritekstAvsnitt.erSynlig && (
                        <Box paddingBlock={'space-4 0'}>
                            <FritekstAvsnitt />
                        </Box>
                    )}
                </ÅrsakSkjema>

                <MålformVelger
                    målformFelt={skjema.felter.målform}
                    visFeilmeldinger={skjema.visFeilmeldinger}
                    erLesevisning={false}
                    Legend={<Label children={'Målform'} />}
                />

                {skjema.felter.årsak.verdi && visForhåndsvisningBeskjed() && (
                    <StyledAlert variant="info">
                        Du har gjort endringer i brevet som ikke er forhåndsvist
                    </StyledAlert>
                )}
            </StyledFieldset>

            <Handlinger>
                <div>
                    <SendBrevKnapp
                        size="medium"
                        variant="primary"
                        loading={senderBrev()}
                        disabled={skjemaErLåst() || brukerHarUkjentAdresse()}
                        onClick={sendBrevPåFagsak}
                    >
                        Send brev
                    </SendBrevKnapp>

                    <Button size="medium" variant="tertiary" onClick={nullstillSkjema}>
                        Avbryt
                    </Button>
                </div>
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
            </Handlinger>
        </Container>
    );
};

export default DokumentutsendingSkjema;
