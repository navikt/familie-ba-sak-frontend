import React from 'react';

import styled from 'styled-components';

import { FileContent } from '@navikt/ds-icons';
import { Alert, Button, Fieldset, Heading, Label } from '@navikt/ds-react';
import { FamilieSelect } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import BarnSøktForSkjema from './BarnSøktFor/BarnSøktForSkjema';
import DeltBostedSkjema from './DeltBosted/DeltBostedSkjema';
import KanSøkeSkjema from './KanSøke/KanSøkeSkjema';
import { useApp } from '../../../context/AppContext';
import {
    dokumentÅrsak,
    DokumentÅrsak,
    useDokumentutsending,
} from '../../../context/DokumentutsendingContext';
import { ToggleNavn } from '../../../typer/toggles';
import MålformVelger from '../../Felleskomponenter/MålformVelger';

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

const DokumentutsendingSkjema: React.FC = () => {
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
    } = useDokumentutsending();

    const årsakVerdi = skjema.felter.årsak.verdi;
    const barnSøktForÅrsaker = [
        DokumentÅrsak.TIL_FORELDER_MED_SELVSTENDIG_RETT_VI_HAR_FÅTT_F016_KAN_SØKE_OM_BARNETRYGD,
        DokumentÅrsak.TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HAR_FÅTT_EN_SØKNAD_FRA_ANNEN_FORELDER,
        DokumentÅrsak.TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HAR_GJORT_VEDTAK_TIL_ANNEN_FORELDER,
        DokumentÅrsak.TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_VARSEL_OM_ÅRLIG_KONTROLL,
    ];

    const { toggles } = useApp();

    return (
        <Container>
            <Heading size={'large'} level={'1'} children={'Send informasjonsbrev'} />

            <StyledFieldset
                error={hentSkjemaFeilmelding()}
                errorPropagation={false}
                legend="Send informasjonsbrev"
                hideLegend
            >
                <FamilieSelect
                    {...skjema.felter.årsak.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                    label={'Velg årsak'}
                    value={skjema.felter.årsak.verdi || ''}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
                        skjema.felter.årsak.onChange(event.target.value as DokumentÅrsak);
                    }}
                    size={'medium'}
                >
                    <option value="">Velg</option>
                    {Object.values(DokumentÅrsak)
                        .filter(
                            årsak =>
                                !barnSøktForÅrsaker.includes(årsak) ||
                                toggles[ToggleNavn.eøsPraksisendringSeptember2023]
                        )
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
                </FamilieSelect>

                <ÅrsakSkjema>
                    {skjema.felter.årsak.verdi === DokumentÅrsak.DELT_BOSTED && (
                        <DeltBostedSkjema
                            avtalerOmDeltBostedPerBarnFelt={
                                skjema.felter.avtalerOmDeltBostedPerBarn
                            }
                            barnMedDeltBostedFelt={skjema.felter.barnMedDeltBosted}
                            visFeilmeldinger={skjema.visFeilmeldinger}
                            settVisFeilmeldinger={settVisfeilmeldinger}
                        />
                    )}

                    {årsakVerdi !== undefined && barnSøktForÅrsaker.includes(årsakVerdi) && (
                        <BarnSøktForSkjema
                            barnSøktForFelt={skjema.felter.barnSøktFor}
                            visFeilmeldinger={skjema.visFeilmeldinger}
                            settVisFeilmeldinger={settVisfeilmeldinger}
                        />
                    )}

                    {skjema.felter.årsak.verdi === DokumentÅrsak.KAN_SØKE && <KanSøkeSkjema />}
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
                        disabled={skjemaErLåst()}
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
                        icon={<FileContent />}
                    >
                        {'Forhåndsvis'}
                    </Button>
                )}
            </Handlinger>
        </Container>
    );
};

export default DokumentutsendingSkjema;
