import React from 'react';

import styled from 'styled-components';

import { Label } from '@navikt/ds-react';
import type { ISODateString } from '@navikt/familie-form-elements';
import { FamilieInput } from '@navikt/familie-form-elements';
import { FamilieDatovelger } from '@navikt/familie-form-elements';
import type { ISkjema } from '@navikt/familie-skjema';

import type { IBehandling } from '../../../../typer/behandling';
import type { IFeilutbetaltValutaSkjemaFelter } from '../../../../typer/eøs-feilutbetalt-valuta';
import type { FamilieIsoDate } from '../../../../utils/kalender';
import {
    erIsoStringGyldig,
    FamilieIsoTilFørsteDagIMåneden,
    FamilieIsoTilSisteDagIMåneden,
    serializeIso8601String,
    sisteDagIInneværendeMåned,
} from '../../../../utils/kalender';

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

const StyledFamilieInput = styled(FamilieInput)`
    width: 7.5rem;
    .navds-label {
        width: 18rem;
    }
    .navds-text-field__input {
        width: 11rem;
    }
`;

const gjørOmDatoHvisGyldigInput = (
    dato: string | undefined,
    omgjøringsfunksjon: (dato: FamilieIsoDate) => FamilieIsoDate
): string => {
    if (dato === undefined) return '';
    if (erIsoStringGyldig(dato)) return omgjøringsfunksjon(dato);
    else return dato;
};

const FeilutbetaltValutaSkjema: React.FunctionComponent<IFeilutbetaltValutaSkjemaProps> = ({
    skjema,
}) => {
    return (
        <>
            <FlexDatoInputWrapper>
                <Label size="small">Angi periode med feilutbetalt valuta</Label>
                <FlexRowDiv style={{ gap: '2rem' }}>
                    <FamilieDatovelger
                        {...skjema.felter.fom?.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                        id="fom-dato"
                        label="F.o.m"
                        value={skjema.felter.fom.verdi}
                        valgtDato={skjema.felter.fom.verdi}
                        onChange={(dato?: ISODateString) => {
                            skjema.felter.fom?.validerOgSettFelt(
                                gjørOmDatoHvisGyldigInput(dato, FamilieIsoTilFørsteDagIMåneden)
                            );
                        }}
                        limitations={{
                            maxDate: serializeIso8601String(sisteDagIInneværendeMåned()),
                        }}
                    />
                    <FamilieDatovelger
                        {...skjema.felter.tom?.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                        id="fom-dato"
                        label="T.o.m"
                        value={skjema.felter.tom.verdi}
                        valgtDato={skjema.felter.tom.verdi}
                        onChange={(dato?: ISODateString) =>
                            skjema.felter.tom?.validerOgSettFelt(
                                gjørOmDatoHvisGyldigInput(dato, FamilieIsoTilSisteDagIMåneden)
                            )
                        }
                        limitations={{
                            maxDate: serializeIso8601String(sisteDagIInneværendeMåned()),
                        }}
                    />
                </FlexRowDiv>
            </FlexDatoInputWrapper>
            <StyledFamilieInput
                {...skjema.felter.feilutbetaltBeløp.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                size="small"
                label="Feilutbetalt beløp"
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
