import React from 'react';

import styled from 'styled-components';

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
import Knapperekke from '../../Felleskomponenter/Knapperekke';
import MålformVelger from '../../Felleskomponenter/MålformVelger';
import DeltBostedSkjema from './DeltBosted/DeltBostedSkjema';

const StyledSkjemaGruppe = styled(SkjemaGruppe)`
    max-width: 20rem;
    margin-top: 2rem;
`;

const ÅrsakSkjema = styled.div`
    margin-bottom: 2rem;
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
    } = useDokumentutsending();

    return (
        <div>
            <Innholdstittel children={'Send informasjonsbrev'} />

            <StyledSkjemaGruppe feil={hentSkjemaFeilmelding()} utenFeilPropagering={true}>
                <FamilieSelect
                    {...årsakFelt.hentNavBaseSkjemaProps(false)}
                    label={'Velg årsak'}
                    value={årsakFelt.verdi}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
                        årsakFelt.onChange(event.target.value as DokumentÅrsak);
                    }}
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
            </StyledSkjemaGruppe>

            <Knapperekke>
                <Knapp
                    mini
                    spinner={senderBrev()}
                    disabled={skjemaErLåst()}
                    onClick={sendBrevPåFagsak}
                    type={'hoved'}
                >
                    Send brev
                </Knapp>
                <Knapp mini onClick={nullstillSkjema} type={'flat'}>
                    Avbryt
                </Knapp>

                <IkonKnapp
                    id={'forhandsvis-vedtaksbrev'}
                    erLesevisning={false}
                    label={'Forhåndsvis'}
                    ikon={<DokumentIkon />}
                    mini
                    spinner={hentetForhåndsvisning.status === RessursStatus.HENTER}
                    disabled={skjemaErLåst()}
                    onClick={hentForhåndsvisningPåFagsak}
                />
            </Knapperekke>
        </div>
    );
};

export default DokumentutsendingSkjema;
