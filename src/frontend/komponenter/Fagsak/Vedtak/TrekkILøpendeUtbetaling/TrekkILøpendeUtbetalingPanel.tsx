import React from 'react';

import styled, { css } from 'styled-components';

import { Delete } from '@navikt/ds-icons';
import { Button, Label } from '@navikt/ds-react';
import type { ISODateString } from '@navikt/familie-form-elements';
import { FamilieDatovelger, FamilieInput } from '@navikt/familie-form-elements';
import { Valideringsstatus } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';

import { datoformatNorsk } from '../../../../utils/formatter';
import EkspanderbartBegrunnelsePanel from '../VedtakBegrunnelserTabell/VedtaksperioderMedBegrunnelser/EkspanderbartBegrunnelsePanel';
import { useTrekkILøpendeUtbetalingProvider } from './TrekkILøpendeUtbetalingProvider';

const baseSkjemaelementStyle = css`
    margin-bottom: 1.5rem;
`;

const FlexDiv = styled.div`
    ${baseSkjemaelementStyle}
    margin-top: 0.5rem;
    width: 23rem;
    display: flex;
    justify-content: space-between;
`;

const StyledFamilieInput = styled(FamilieInput)`
    ${baseSkjemaelementStyle};
    width: 7.5rem;
    .navds-label {
        width: 18rem;
    }
    .navds-text-field__input {
        width: 11rem;
    }
`;

const AvbrytKnapp = styled(Button)`
    margin: 0.5rem 1rem 0.5rem 1rem;
`;

const Knapperad = styled.div`
    width: 100%;
    position: relative;
    display: inline-block;
`;

const KnappHøyre = styled(Button)`
    float: right;
    margin: 0.5rem 1rem 0.5rem 1rem;
`;

const TrekkILøpendeUtbetalingPanel: React.FC = () => {
    const {
        skjema,
        erPanelEkspandert,
        onPanelClose,
        valideringErOk,
        leggTilPeriode,
        oppdaterPeriode,
        fjern,
    } = useTrekkILøpendeUtbetalingProvider();

    const avbryt = () => {
        onPanelClose(false);
    };

    const erNyPeriode = skjema.felter.id.verdi === 0;

    return (
        <EkspanderbartBegrunnelsePanel
            åpen={erPanelEkspandert}
            onClick={() => onPanelClose(false)}
            periode={skjema.felter.periode.verdi}
            skalViseSum={true}
            summer={() => skjema.felter.feilutbetaltBeløp.verdi}
            tittel={''}
        >
            <Label>Angi periode med feilutbetalt beløp</Label>

            <FlexDiv>
                <FamilieDatovelger
                    allowInvalidDateSelection={false}
                    limitations={{
                        maxDate: new Date().toISOString(),
                    }}
                    erLesesvisning={false}
                    id={`for-mye-utbetalt-fom`}
                    label={'F.o.m'}
                    placeholder={datoformatNorsk.DATO}
                    onChange={(dato?: ISODateString) => {
                        skjema.felter.periode.validerOgSettFelt({
                            fom: dato,
                            tom: skjema.felter.periode.verdi.tom,
                        });
                    }}
                    valgtDato={skjema.felter.periode.verdi.fom}
                    feil={
                        skjema.visFeilmeldinger &&
                        skjema.felter.periode.valideringsstatus === Valideringsstatus.FEIL
                            ? skjema.felter.periode.feilmelding?.toString()
                            : ''
                    }
                />
                <FamilieDatovelger
                    allowInvalidDateSelection={false}
                    limitations={{
                        maxDate: new Date().toISOString(),
                    }}
                    erLesesvisning={false}
                    id={`for-mye-utbetalt-tom`}
                    label={'T.o.m'}
                    placeholder={datoformatNorsk.DATO}
                    onChange={(dato?: ISODateString) => {
                        skjema.felter.periode.validerOgSettFelt({
                            fom: skjema.felter.periode.verdi.fom,
                            tom: dato,
                        });
                    }}
                    valgtDato={skjema.felter.periode.verdi.tom}
                />
            </FlexDiv>
            <StyledFamilieInput
                label={'Hvor mye er utbetalt feil i perioden?'}
                id={'korrigering-belop'}
                type={'number'}
                value={skjema.felter.feilutbetaltBeløp.verdi}
                onChange={changeEvent =>
                    skjema.felter.feilutbetaltBeløp.validerOgSettFelt(
                        Number(changeEvent.target.value)
                    )
                }
                error={
                    skjema.visFeilmeldinger &&
                    skjema.felter.feilutbetaltBeløp.valideringsstatus === Valideringsstatus.FEIL
                        ? skjema.felter.feilutbetaltBeløp.feilmelding?.toString()
                        : ''
                }
                erLesevisning={false}
            />
            <Knapperad>
                <Button
                    onClick={erNyPeriode ? leggTilPeriode : oppdaterPeriode}
                    variant={valideringErOk() ? 'primary' : 'secondary'}
                    loading={skjema.submitRessurs.status === RessursStatus.HENTER}
                    disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                >
                    {erNyPeriode ? 'Legg til periode' : 'Lagre endringer'}
                </Button>
                <AvbrytKnapp
                    id={'avbryt'}
                    size={'small'}
                    onClick={avbryt}
                    variant={'tertiary'}
                    loading={false}
                    disabled={false}
                >
                    Avbryt
                </AvbrytKnapp>
                <KnappHøyre
                    id={'fjern-for-mye-utbetalt-periode'}
                    size={'small'}
                    onClick={() => fjern(skjema.felter.id.verdi)}
                    variant={'tertiary'}
                    loading={false}
                    disabled={false}
                    icon={<Delete />}
                >
                    Fjern
                </KnappHøyre>
            </Knapperad>
        </EkspanderbartBegrunnelsePanel>
    );
};
export default TrekkILøpendeUtbetalingPanel;
