import React from 'react';

import styled from 'styled-components';

import { Label, Radio } from '@navikt/ds-react';
import { ASpacing3 } from '@navikt/ds-tokens/dist/tokens';
import type { ISODateString } from '@navikt/familie-form-elements';
import { FamilieInput, FamilieRadioGruppe } from '@navikt/familie-form-elements';
import { FamilieDatovelger } from '@navikt/familie-form-elements';
import type { ISkjema } from '@navikt/familie-skjema';
import { Valideringsstatus } from '@navikt/familie-skjema';
import type { Country } from '@navikt/land-verktoy';

import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import type { IBehandling } from '../../../../typer/behandling';
import type { IRefusjonEøsSkjemaFelter } from '../../../../typer/refusjon-eøs';
import { randomUUID } from '../../../../utils/commons';
import { serializeIso8601String, sisteDagIInneværendeMåned } from '../../../../utils/kalender';
import { FamilieLandvelger } from '../../Behandlingsresultat/EøsPeriode/FamilieLandvelger';
import { tilFørsteDagIMånedenHvisGyldigInput, tilSisteDagIMånedenHvisGyldigInput } from '../utils';

interface IRefusjonEøsSkjemaProps {
    skjema: ISkjema<IRefusjonEøsSkjemaFelter, IBehandling>;
}

const StyledFamilieLandvelger = styled(FamilieLandvelger)`
    max-width: 24rem;
    > * {
        margin: 0;
    }
`;

const FlexDatoInputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${ASpacing3};
`;

const FlexRowDiv = styled.div`
    display: flex;
`;

const StyledFamilieInput = styled(FamilieInput)`
    width: 11rem;
    .navds-label {
        width: 18rem;
    }
    .navds-text-field__input {
        width: 11rem;
    }
`;

const RefusjonEøsSkjema: React.FunctionComponent<IRefusjonEøsSkjemaProps> = ({ skjema }) => {
    const { vurderErLesevisning } = useBehandling();
    const erLesevisning = vurderErLesevisning();

    const inputUuid = randomUUID();
    return (
        <>
            <StyledFamilieLandvelger
                erLesevisning={erLesevisning}
                label={'EØS-land'}
                id={`refusjon-eøs-land-${inputUuid}`}
                value={skjema.felter.land.verdi}
                placeholder={'Velg'}
                onChange={(value: Country) => {
                    skjema.felter.land.validerOgSettFelt(value.value);
                }}
                kunEøs
                eksluderLand={['NO']}
                feil={
                    skjema.visFeilmeldinger &&
                    skjema.felter.land.valideringsstatus === Valideringsstatus.FEIL
                        ? skjema.felter.land.feilmelding?.toString()
                        : ''
                }
            />

            <FamilieRadioGruppe
                erLesevisning={erLesevisning}
                legend="Tekst i vedtaksbrev"
                value={
                    erLesevisning
                        ? `Refusjon ${
                              skjema.felter.refusjonAvklart.verdi ? 'avklart' : 'ikke avklart'
                          }`
                        : skjema.felter.refusjonAvklart.verdi
                }
                onChange={(val: boolean | undefined) =>
                    skjema.felter.refusjonAvklart.validerOgSettFelt(val)
                }
                error={skjema.visFeilmeldinger && skjema.felter.refusjonAvklart.feilmelding}
                size="small"
            >
                <Radio
                    name={'refusjonAvklart'}
                    value={true}
                    id={`ja-refusjon-er-avklart-${inputUuid}`}
                >
                    {'Refusjon avklart'}
                </Radio>
                <Radio
                    name={'refusjonAvklart'}
                    value={false}
                    id={`nei-refusjon-er-ikke-avklart-${inputUuid}`}
                >
                    {'Refusjon ikke avklart'}
                </Radio>
            </FamilieRadioGruppe>
            <FlexDatoInputWrapper>
                <Label size="small">Angi periode som skal refunderes til EØS-land</Label>
                <FlexRowDiv style={{ gap: '2rem' }}>
                    <FamilieDatovelger
                        {...skjema.felter.fom?.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                        id={`fom-dato-${inputUuid}`}
                        label="F.o.m"
                        value={skjema.felter.fom.verdi}
                        onChange={(dato?: ISODateString) => {
                            skjema.felter.fom.validerOgSettFelt(
                                tilFørsteDagIMånedenHvisGyldigInput(dato)
                            );
                        }}
                        limitations={{
                            maxDate: serializeIso8601String(sisteDagIInneværendeMåned()),
                        }}
                        erLesesvisning={erLesevisning}
                    />
                    <FamilieDatovelger
                        {...skjema.felter.tom?.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                        id={`fom-dato-${inputUuid}`}
                        label="T.o.m"
                        value={skjema.felter.tom.verdi}
                        onChange={(dato?: ISODateString) =>
                            skjema.felter.tom.validerOgSettFelt(
                                tilSisteDagIMånedenHvisGyldigInput(dato)
                            )
                        }
                        limitations={{
                            maxDate: serializeIso8601String(sisteDagIInneværendeMåned()),
                        }}
                        erLesesvisning={erLesevisning}
                    />
                </FlexRowDiv>
            </FlexDatoInputWrapper>
            <StyledFamilieInput
                {...skjema.felter.refusjonsbeløp.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                size="small"
                label="Refusjonsbeløp (kr/mnd)"
                value={skjema.felter.refusjonsbeløp.verdi}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                onChange={changeEvent =>
                    skjema.felter.refusjonsbeløp.validerOgSettFelt(changeEvent.target.value)
                }
                erLesevisning={erLesevisning}
            />
        </>
    );
};

export default RefusjonEøsSkjema;
