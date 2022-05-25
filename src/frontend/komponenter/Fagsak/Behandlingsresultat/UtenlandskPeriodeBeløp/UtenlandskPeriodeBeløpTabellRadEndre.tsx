import * as React from 'react';

import styled from 'styled-components';

import { SkjemaGruppe } from 'nav-frontend-skjema';

import { Delete } from '@navikt/ds-icons';
import { Label } from '@navikt/ds-react';
import {
    FamilieInput,
    FamilieKnapp,
    FamilieReactSelect,
    FamilieSelect,
    type OptionType,
} from '@navikt/familie-form-elements';
import { Valideringsstatus } from '@navikt/familie-skjema';
import type { ISkjema } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';
import type { Currency } from '@navikt/land-verktoy';

import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import type { IBehandling } from '../../../../typer/behandling';
import {
    utenlandskPeriodeBeløpIntervaller,
    EøsPeriodeStatus,
    UtenlandskPeriodeBeløpIntervall,
} from '../../../../typer/eøsPerioder';
import type { IUtenlandskPeriodeBeløp } from '../../../../typer/eøsPerioder';
import IkonKnapp, { IkonPosisjon } from '../../../Felleskomponenter/IkonKnapp/IkonKnapp';
import EndreUtenlandskPeriodeBeløp from './EndreUtenlandskPeriodeBeløp';
import FamilieValutavelger from './FamilieValutavelger';

const Container = styled.div`
    max-width: 30rem;
    border-left: 0.0625rem solid var(--navds-global-color-orange-500);
    padding-left: 2rem;
`;

const StyledLegend = styled.legend`
    && {
        display: flex;
        margin-bottom: 0;
    }
`;

const FlexDiv = styled.div`
    width: 28rem;
    display: flex;
    justify-content: space-between;

    div.skjemaelement {
        margin-bottom: 0rem;

        label {
            font-weight: 400;
        }

        p.navds-label {
            font-weight: 400;
        }

        &:nth-of-type(1) {
            width: 4.5rem;
        }
        &:nth-of-type(2) {
            width: 15rem;
        }
        &:nth-of-type(3) {
            width: 7rem;
        }
    }
`;

const StyledFamilieValutavelger = styled(FamilieValutavelger)`
    p.navds-label--small {
        line-height: 1.4;
    }
    & .c-countrySelect__select__indicator-separator {
        width: 1px !important;
        background-color: var(--navds-global-color-gray-300);
    }
`;

const Knapperad = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;
    margin-top: 2rem;
`;

const utenlandskPeriodeBeløpUtbetaltFeilmeldingId = (
    utenlandskPeriodeBeløp: ISkjema<IUtenlandskPeriodeBeløp, IBehandling>
): string =>
    `utd_beløp-utbetalt_${utenlandskPeriodeBeløp.felter.barnIdenter.verdi.map(
        barn => `${barn.value}`
    )}_${utenlandskPeriodeBeløp.felter.initielFom.verdi}`;

interface IProps {
    skjema: ISkjema<IUtenlandskPeriodeBeløp, IBehandling>;
    tilgjengeligeBarn: OptionType[];
    valideringErOk: () => boolean;
    sendInnSkjema: () => void;
    toggleForm: (visAlert: boolean) => void;
    slettUtenlandskPeriodeBeløp: () => void;
}

const UtenlandskPeriodeBeløpTabellRadEndre: React.FC<IProps> = ({
    skjema,
    tilgjengeligeBarn,
    valideringErOk,
    sendInnSkjema,
    toggleForm,
    slettUtenlandskPeriodeBeløp,
}) => {
    const { erLesevisning } = useBehandling();
    const lesevisning = erLesevisning(true);

    const visUtbetaltBeløpGruppeFeilmelding = (): React.ReactNode => {
        if (skjema.felter.beløp?.valideringsstatus === Valideringsstatus.FEIL) {
            return skjema.felter.beløp.feilmelding;
        } else if (skjema.felter.valutakode?.valideringsstatus === Valideringsstatus.FEIL) {
            return skjema.felter.valutakode.feilmelding;
        } else if (skjema.felter.intervall?.valideringsstatus === Valideringsstatus.FEIL) {
            return skjema.felter.intervall.feilmelding;
        }
    };

    return (
        <SkjemaGruppe>
            <Container>
                <div className={'skjemaelement'}>
                    <FamilieReactSelect
                        {...skjema.felter.barnIdenter.hentNavInputProps(skjema.visFeilmeldinger)}
                        erLesevisning={lesevisning}
                        label={'Barn'}
                        isMulti
                        options={tilgjengeligeBarn}
                        value={skjema.felter.barnIdenter.verdi}
                        onChange={options =>
                            skjema.felter.barnIdenter.validerOgSettFelt(options as OptionType[])
                        }
                    />
                </div>
                <EndreUtenlandskPeriodeBeløp skjema={skjema} lesevisning={lesevisning} />
                <SkjemaGruppe
                    className={lesevisning ? 'lesevisning' : ''}
                    feilmeldingId={utenlandskPeriodeBeløpUtbetaltFeilmeldingId(skjema)}
                    feil={skjema.visFeilmeldinger && visUtbetaltBeløpGruppeFeilmelding()}
                >
                    <StyledLegend>
                        <Label size="small">Utbetalt i det andre landet</Label>
                    </StyledLegend>
                    <FlexDiv>
                        <FamilieInput
                            label={'Beløp'}
                            erLesevisning={lesevisning}
                            value={skjema.felter.beløp?.verdi}
                            onChange={event =>
                                skjema.felter.beløp?.validerOgSettFelt(event.target.value)
                            }
                        />
                        <StyledFamilieValutavelger
                            erLesevisning={lesevisning}
                            id={'valuta'}
                            label={'Valuta'}
                            kunEøs
                            size="small"
                            medFlag
                            value={skjema.felter.valutakode?.verdi}
                            onChange={(value: Currency) => {
                                console.info('value', value);
                                if (value) {
                                    skjema.felter.valutakode?.validerOgSettFelt(value.value);
                                } else {
                                    skjema.felter.valutakode?.nullstill();
                                }
                            }}
                            utenMargin
                            kanNullstilles
                        />
                        <FamilieSelect
                            label={'Intervall'}
                            erLesevisning={lesevisning}
                            value={skjema.felter.intervall?.verdi}
                            onChange={event =>
                                skjema.felter.intervall?.validerOgSettFelt(
                                    event.target.value as UtenlandskPeriodeBeløpIntervall
                                )
                            }
                        >
                            <option key={'-'} value={''}>
                                Velg
                            </option>
                            {Object.values(UtenlandskPeriodeBeløpIntervall).map(intervall => {
                                return (
                                    <option key={intervall} value={intervall}>
                                        {utenlandskPeriodeBeløpIntervaller[intervall]}
                                    </option>
                                );
                            })}
                        </FamilieSelect>
                    </FlexDiv>
                </SkjemaGruppe>

                <Knapperad>
                    <div>
                        <FamilieKnapp
                            erLesevisning={lesevisning}
                            onClick={() => sendInnSkjema()}
                            mini={true}
                            type={valideringErOk() ? 'hoved' : 'standard'}
                            spinner={skjema.submitRessurs.status === RessursStatus.HENTER}
                            disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                        >
                            Ferdig
                        </FamilieKnapp>
                        <FamilieKnapp
                            style={{ marginLeft: '1rem' }}
                            erLesevisning={lesevisning}
                            onClick={() => toggleForm(false)}
                            mini={true}
                            type={'flat'}
                        >
                            Avbryt
                        </FamilieKnapp>
                    </div>

                    {skjema.felter.status?.verdi !== EøsPeriodeStatus.IKKE_UTFYLT && (
                        <IkonKnapp
                            erLesevisning={lesevisning}
                            onClick={() => slettUtenlandskPeriodeBeløp()}
                            id={`slett_utd_beløp_${skjema.felter.barnIdenter.verdi.map(
                                barn => `${barn}-`
                            )}_${skjema.felter.initielFom.verdi}`}
                            spinner={skjema.submitRessurs.status === RessursStatus.HENTER}
                            disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                            mini={true}
                            label={'Fjern'}
                            ikonPosisjon={IkonPosisjon.VENSTRE}
                            ikon={<Delete />}
                        />
                    )}
                </Knapperad>
            </Container>
        </SkjemaGruppe>
    );
};

export default UtenlandskPeriodeBeløpTabellRadEndre;
