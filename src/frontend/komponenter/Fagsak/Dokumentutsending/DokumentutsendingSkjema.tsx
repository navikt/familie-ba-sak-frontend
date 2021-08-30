import React from 'react';

import styled from 'styled-components';

import AlertStripe from 'nav-frontend-alertstriper';
import { Knapp } from 'nav-frontend-knapper';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Element, Innholdstittel } from 'nav-frontend-typografi';

import { FamilieSelect } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import {
    dokumentÅrsak,
    DokumentÅrsak,
    useDokumentutsending,
} from '../../../context/DokumentutsendingContext';
import { DokumentIkon } from '../../../ikoner/DokumentIkon';
import IkonKnapp from '../../Felleskomponenter/IkonKnapp/IkonKnapp';
import MålformVelger from '../../Felleskomponenter/MålformVelger';
import DeltBostedSkjema from './DeltBosted/DeltBostedSkjema';

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

const StyledAlertStripe = styled(AlertStripe)`
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
        hentetForhåndsvisning,
        målformFelt,
        nullstillSkjema,
        senderBrev,
        sendBrevPåFagsak,
        skjemaErLåst,
        årsakFelt,
        hentSkjemaFeilmelding,
        visForhåndsvisningBeskjed,
    } = useDokumentutsending();

    return (
        <Container>
            <Innholdstittel children={'Send informasjonsbrev'} />

            <StyledSkjemaGruppe feil={hentSkjemaFeilmelding()} utenFeilPropagering={true}>
                <FamilieSelect
                    {...årsakFelt.hentNavBaseSkjemaProps(false)}
                    label={'Velg årsak'}
                    value={årsakFelt.verdi}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
                        årsakFelt.onChange(event.target.value as DokumentÅrsak);
                    }}
                    bredde={'m'}
                >
                    {Object.values(DokumentÅrsak).map(årsak => {
                        return (
                            <option
                                key={årsak}
                                aria-selected={årsakFelt.verdi === årsak}
                                value={årsak}
                            >
                                {dokumentÅrsak[årsak]}
                            </option>
                        );
                    })}
                </FamilieSelect>

                <MålformVelger
                    målformFelt={målformFelt}
                    visFeilmeldinger={false}
                    erLesevisning={false}
                    Legend={<Element children={'Målform'} />}
                />

                <ÅrsakSkjema>
                    {årsakFelt.verdi === DokumentÅrsak.DELT_BOSTED && <DeltBostedSkjema />}
                </ÅrsakSkjema>

                {visForhåndsvisningBeskjed() && (
                    <StyledAlertStripe type={'info'}>
                        Du har gjort endringer i brevet som ikke er forhåndsvist
                    </StyledAlertStripe>
                )}
            </StyledSkjemaGruppe>

            <Handlinger>
                <IkonKnapp
                    id={'forhandsvis-vedtaksbrev'}
                    erLesevisning={false}
                    label={'Forhåndsvis'}
                    knappPosisjon={'venstre'}
                    ikon={<DokumentIkon />}
                    mini={true}
                    spinner={hentetForhåndsvisning.status === RessursStatus.HENTER}
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
