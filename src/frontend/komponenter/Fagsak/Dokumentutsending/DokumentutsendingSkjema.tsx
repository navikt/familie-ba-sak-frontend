import React from 'react';

import styled from 'styled-components';

import { Flatknapp, Knapp } from 'nav-frontend-knapper';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Innholdstittel } from 'nav-frontend-typografi';

import { FamilieSelect } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import {
    dokumentÅrsak,
    DokumentÅrsak,
    useDokumentutsending,
} from '../../../context/DokumentutsendingContext';
import Knapperekke from '../../Felleskomponenter/Knapperekke';
import DeltBostedSkjema from './DeltBosted/DeltBostedSkjema';

const StyledSkjemaGruppe = styled(SkjemaGruppe)`
    max-width: 20rem;
    margin-top: 2rem;
`;

const DokumentutsendingSkjema: React.FC = () => {
    const {
        hentForhåndsvisningPåFagsak,
        hentetForhåndsvisning,
        sendBrevPåFagsak,
        skjemaErLåst,
        årsakFelt,
    } = useDokumentutsending();

    return (
        <div>
            <Innholdstittel children={'Send informasjonsbrev'} />

            <StyledSkjemaGruppe>
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

                {årsakFelt.verdi === DokumentÅrsak.DELT_BOSTED && <DeltBostedSkjema />}
            </StyledSkjemaGruppe>

            <Knapperekke>
                <Flatknapp
                    mini
                    spinner={hentetForhåndsvisning.status === RessursStatus.HENTER}
                    disabled={skjemaErLåst()}
                    onClick={hentForhåndsvisningPåFagsak}
                >
                    Forhåndsvis
                </Flatknapp>
                <Knapp
                    mini
                    spinner={skjemaErLåst()}
                    disabled={skjemaErLåst()}
                    onClick={sendBrevPåFagsak}
                >
                    Send brev
                </Knapp>
            </Knapperekke>
        </div>
    );
};

export default DokumentutsendingSkjema;
