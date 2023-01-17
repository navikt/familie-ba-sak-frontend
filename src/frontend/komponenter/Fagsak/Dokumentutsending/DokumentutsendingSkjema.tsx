import React from 'react';

import styled from 'styled-components';

import { FileContent } from '@navikt/ds-icons';
import { Alert, Button, Fieldset, Heading, Label } from '@navikt/ds-react';
import { FamilieSelect } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import {
    dokumentÅrsak,
    DokumentÅrsak,
    useDokumentutsending,
} from '../../../context/DokumentutsendingContext';
import MålformVelger from '../../Felleskomponenter/MålformVelger';
import DeltBostedSkjema from './DeltBosted/DeltBostedSkjema';
import KanSøkeSkjema from './KanSøke/KanSøkeSkjema';

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
                    {...skjema.felter.årsak.hentNavBaseSkjemaProps(false)}
                    label={'Velg årsak'}
                    value={skjema.felter.årsak.verdi || ''}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
                        skjema.felter.årsak.onChange(event.target.value as DokumentÅrsak);
                    }}
                    size={'medium'}
                >
                    <option value={''}>Velg</option>
                    {Object.values(DokumentÅrsak).map(årsak => {
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
                    {skjema.felter.årsak.verdi === DokumentÅrsak.KAN_SØKE && <KanSøkeSkjema />}
                </ÅrsakSkjema>
                <MålformVelger
                    målformFelt={skjema.felter.målform}
                    visFeilmeldinger={false}
                    erLesevisning={false}
                    Legend={<Label children={'Målform'} />}
                />

                {visForhåndsvisningBeskjed() && (
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
            </Handlinger>
        </Container>
    );
};

export default DokumentutsendingSkjema;
