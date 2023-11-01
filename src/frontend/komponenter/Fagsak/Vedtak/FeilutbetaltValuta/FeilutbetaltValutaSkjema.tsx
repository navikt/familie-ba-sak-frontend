import React from 'react';

import styled from 'styled-components';

import { Label, TextField } from '@navikt/ds-react';
import type { ISkjema } from '@navikt/familie-skjema';

import { useApp } from '../../../../context/AppContext';
import type { IBehandling } from '../../../../typer/behandling';
import type { IFeilutbetaltValutaSkjemaFelter } from '../../../../typer/eøs-feilutbetalt-valuta';
import { ToggleNavn } from '../../../../typer/toggles';
import Månedvelger, { DagIMåneden } from '../../../Felleskomponenter/Datovelger/Månedvelger';

interface IFeilutbetaltValutaSkjemaProps {
    skjema: ISkjema<IFeilutbetaltValutaSkjemaFelter, IBehandling>;
}

const FlexDatoInputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const FlexRowDiv = styled.div`
    display: flex;
`;

const StyledTextField = styled(TextField)`
    width: 7.5rem;
    .navds-label {
        width: 18rem;
    }
    .navds-text-field__input {
        width: 11rem;
    }
`;

const FeilutbetaltValutaSkjema: React.FunctionComponent<IFeilutbetaltValutaSkjemaProps> = ({
    skjema,
}) => {
    const { toggles } = useApp();
    return (
        <>
            <FlexDatoInputWrapper>
                <Label size="small">Angi periode med feilutbetalt valuta</Label>
                <FlexRowDiv style={{ gap: '2rem' }}>
                    <Månedvelger
                        felt={skjema.felter.fom}
                        label={'F.o.m'}
                        visFeilmeldinger={skjema.visFeilmeldinger}
                        dagIMåneden={DagIMåneden.FØRSTE_DAG}
                        kanKunVelgeFortid
                    />
                    <Månedvelger
                        felt={skjema.felter.tom}
                        label={'T.o.m'}
                        visFeilmeldinger={skjema.visFeilmeldinger}
                        dagIMåneden={DagIMåneden.SISTE_DAG}
                        tilhørendeFomFelt={skjema.felter.fom}
                        kanKunVelgeFortid
                    />
                </FlexRowDiv>
            </FlexDatoInputWrapper>
            <StyledTextField
                {...skjema.felter.feilutbetaltBeløp.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                size="small"
                label={
                    toggles[ToggleNavn.feilutbetaltValutaPerMåned]
                        ? 'Feilutbetalt beløp per måned'
                        : 'Feilutbetalt beløp'
                }
                value={skjema.felter.feilutbetaltBeløp.verdi}
                type="number"
                onChange={changeEvent =>
                    skjema.felter.feilutbetaltBeløp.validerOgSettFelt(changeEvent.target.value)
                }
            />
        </>
    );
};

export default FeilutbetaltValutaSkjema;
