import React from 'react';

import styled from 'styled-components';

import { Knapp } from 'nav-frontend-knapper';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Element, Innholdstittel } from 'nav-frontend-typografi';

import { Alert } from '@navikt/ds-react';
import { FamilieSelect } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import {
    dokumentÅrsak,
    DokumentÅrsak,
    useDokumentutsending,
} from '../../../context/DokumentutsendingContext';
import { DokumentIkon } from '../../../ikoner/DokumentIkon';
import IkonKnapp, { IkonPosisjon } from '../../Felleskomponenter/IkonKnapp/IkonKnapp';
import MålformVelger from '../../Felleskomponenter/MålformVelger';
import DeltBostedSkjema from './DeltBosted/DeltBostedSkjema';
import KanSøkeSkjema from './KanSøke/KanSøkeSkjema';

const Container = styled.div`
    padding: 2rem;
    overflow: auto;
`;

const StyledSkjemaGruppe = styled(SkjemaGruppe)`
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
`;

const SendBrevKnapp = styled(Knapp)`
    margin-right: 2rem;
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
            <Innholdstittel children={'Send informasjonsbrev'} />

            <StyledSkjemaGruppe feil={hentSkjemaFeilmelding()} utenFeilPropagering={true}>
                <FamilieSelect
                    {...skjema.felter.årsak.hentNavBaseSkjemaProps(false)}
                    label={'Velg årsak'}
                    value={skjema.felter.årsak.verdi}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
                        skjema.felter.årsak.onChange(event.target.value as DokumentÅrsak);
                    }}
                    bredde={'m'}
                >
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

                <MålformVelger
                    målformFelt={skjema.felter.målform}
                    visFeilmeldinger={false}
                    erLesevisning={false}
                    Legend={<Element children={'Målform'} />}
                />

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

                {visForhåndsvisningBeskjed() && (
                    <StyledAlert variant="info">
                        Du har gjort endringer i brevet som ikke er forhåndsvist
                    </StyledAlert>
                )}
            </StyledSkjemaGruppe>

            <Handlinger>
                <IkonKnapp
                    id={'forhandsvis-vedtaksbrev'}
                    erLesevisning={false}
                    label={'Forhåndsvis'}
                    ikonPosisjon={IkonPosisjon.VENSTRE}
                    ikon={<DokumentIkon />}
                    mini={true}
                    spinner={hentetDokument.status === RessursStatus.HENTER}
                    disabled={skjemaErLåst()}
                    onClick={hentForhåndsvisningPåFagsak}
                />

                <div>
                    <SendBrevKnapp
                        mini
                        spinner={senderBrev()}
                        disabled={skjemaErLåst()}
                        onClick={sendBrevPåFagsak}
                        type={'hoved'}
                    >
                        Send brev
                    </SendBrevKnapp>

                    <Knapp mini onClick={nullstillSkjema} type={'flat'}>
                        Avbryt
                    </Knapp>
                </div>
            </Handlinger>
        </Container>
    );
};

export default DokumentutsendingSkjema;
