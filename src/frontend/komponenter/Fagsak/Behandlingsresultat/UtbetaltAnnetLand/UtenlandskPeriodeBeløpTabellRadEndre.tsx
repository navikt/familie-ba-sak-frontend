import * as React from 'react';

import styled from 'styled-components';

import { SkjemaGruppe } from 'nav-frontend-skjema';

import { Delete } from '@navikt/ds-icons';
import { Alert, BodyShort, Button, Label } from '@navikt/ds-react';
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
import EøsPeriodeSkjema from '../EøsPeriode/EøsPeriodeSkjema';
import { FamilieValutavelger } from '../EøsPeriode/FamilieLandvelger';
import {
    EøsPeriodeSkjemaContainer,
    Knapperad,
    StyledLegend,
} from '../EøsPeriode/fellesKomponenter';

const UtbetaltBeløpRad = styled.div`
    width: 32rem;
    display: flex;
    justify-content: space-between;

    div.skjemaelement {
        margin-bottom: 0rem;

        label {
            font-weight: normal;
            margin-bottom: 0.5rem;
        }

        p.navds-label {
            font-weight: normal;
            margin-bottom: 0.5rem;
        }

        &:nth-of-type(1) {
            width: 6.5rem;
        }
        &:nth-of-type(2) {
            width: 16rem;
        }
        &:nth-of-type(3) {
            width: 7rem;
        }
    }
`;

const UtbetaltBeløpInfo = styled(Alert)`
    width: 60rem;
    margin-bottom: var(--navds-spacing-6);
`;

const UtbetaltBeløpText = styled(BodyShort)`
    font-weight: bold;
`;

const utenlandskPeriodeBeløpPeriodeFeilmeldingId = (
    utenlandskPeriodeBeløp: ISkjema<IUtenlandskPeriodeBeløp, IBehandling>
): string =>
    `utd_beløp-periode_${utenlandskPeriodeBeløp.felter.barnIdenter.verdi.map(
        barn => `${barn.value}`
    )}_${utenlandskPeriodeBeløp.felter.initielFom.verdi}`;

const utenlandskPeriodeBeløpUtbetaltFeilmeldingId = (
    utenlandskPeriodeBeløp: ISkjema<IUtenlandskPeriodeBeløp, IBehandling>
): string =>
    `utd_beløp-utbetalt_${utenlandskPeriodeBeløp.felter.barnIdenter.verdi.map(
        barn => `${barn.value}`
    )}_${utenlandskPeriodeBeløp.felter.initielFom.verdi}`;

interface IProps {
    skjema: ISkjema<IUtenlandskPeriodeBeløp, IBehandling>;
    tilgjengeligeBarn: OptionType[];
    status: EøsPeriodeStatus;
    valideringErOk: () => boolean;
    sendInnSkjema: () => void;
    toggleForm: (visAlert: boolean) => void;
    slettUtenlandskPeriodeBeløp: () => void;
}

const UtenlandskPeriodeBeløpTabellRadEndre: React.FC<IProps> = ({
    skjema,
    tilgjengeligeBarn,
    status,
    valideringErOk,
    sendInnSkjema,
    toggleForm,
    slettUtenlandskPeriodeBeløp,
}) => {
    const { vurderErLesevisning } = useBehandling();
    const lesevisning = vurderErLesevisning(true);

    const visUtbetaltBeløpGruppeFeilmelding = (): React.ReactNode => {
        if (skjema.felter.beløp?.valideringsstatus === Valideringsstatus.FEIL) {
            return skjema.felter.beløp.feilmelding;
        } else if (skjema.felter.valutakode?.valideringsstatus === Valideringsstatus.FEIL) {
            return skjema.felter.valutakode.feilmelding;
        } else if (skjema.felter.intervall?.valideringsstatus === Valideringsstatus.FEIL) {
            return skjema.felter.intervall.feilmelding;
        }
    };

    const visSubmitFeilmelding = () => {
        if (
            skjema.submitRessurs.status === RessursStatus.FEILET ||
            skjema.submitRessurs.status === RessursStatus.FUNKSJONELL_FEIL ||
            skjema.submitRessurs.status === RessursStatus.IKKE_TILGANG
        ) {
            return skjema.submitRessurs.frontendFeilmelding;
        } else {
            return null;
        }
    };

    return (
        <SkjemaGruppe feil={skjema.visFeilmeldinger && visSubmitFeilmelding()}>
            <EøsPeriodeSkjemaContainer maxWidth={34} lesevisning={lesevisning} status={status}>
                <UtbetaltBeløpInfo variant="info" inline>
                    <UtbetaltBeløpText size="small">
                        Dersom det er ulike beløp per barn utbetalt i det andre landet, må barna
                        registreres separat
                    </UtbetaltBeløpText>
                </UtbetaltBeløpInfo>
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
                <EøsPeriodeSkjema
                    periode={skjema.felter.periode}
                    periodeFeilmeldingId={utenlandskPeriodeBeløpPeriodeFeilmeldingId(skjema)}
                    initielFom={skjema.felter.initielFom}
                    visFeilmeldinger={skjema.visFeilmeldinger}
                    lesevisning={lesevisning}
                    maxWidth={32}
                />
                <SkjemaGruppe
                    className={lesevisning ? 'lesevisning' : ''}
                    feilmeldingId={utenlandskPeriodeBeløpUtbetaltFeilmeldingId(skjema)}
                    feil={skjema.visFeilmeldinger && visUtbetaltBeløpGruppeFeilmelding()}
                >
                    <StyledLegend>
                        <Label size="small">Utbetalt i det andre landet</Label>
                    </StyledLegend>
                    <UtbetaltBeløpRad>
                        <FamilieInput
                            label={'Beløp per barn'}
                            erLesevisning={lesevisning}
                            value={skjema.felter.beløp?.verdi}
                            onChange={event =>
                                skjema.felter.beløp?.validerOgSettFelt(event.target.value)
                            }
                        />
                        <FamilieValutavelger
                            erLesevisning={lesevisning}
                            id={'valuta'}
                            label={'Valuta'}
                            kunEøs
                            medFlag
                            size="small"
                            value={skjema.felter.valutakode?.verdi}
                            onChange={(value: Currency) => {
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
                            value={skjema.felter.intervall?.verdi || undefined}
                            onChange={event =>
                                skjema.felter.intervall?.validerOgSettFelt(
                                    event.target.value as UtenlandskPeriodeBeløpIntervall
                                )
                            }
                            lesevisningVerdi={
                                skjema.felter.intervall?.verdi
                                    ? utenlandskPeriodeBeløpIntervaller[
                                          skjema.felter.intervall.verdi
                                      ]
                                    : ''
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
                    </UtbetaltBeløpRad>
                </SkjemaGruppe>

                <Knapperad>
                    <div>
                        <FamilieKnapp
                            erLesevisning={lesevisning}
                            onClick={() => sendInnSkjema()}
                            size="small"
                            variant={valideringErOk() ? 'primary' : 'secondary'}
                            loading={skjema.submitRessurs.status === RessursStatus.HENTER}
                            disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                        >
                            Ferdig
                        </FamilieKnapp>
                        <FamilieKnapp
                            style={{ marginLeft: '1rem' }}
                            erLesevisning={lesevisning}
                            onClick={() => toggleForm(false)}
                            size="small"
                            variant="tertiary"
                        >
                            Avbryt
                        </FamilieKnapp>
                    </div>

                    {skjema.felter.status?.verdi !== EøsPeriodeStatus.IKKE_UTFYLT && !lesevisning && (
                        <Button
                            variant={'tertiary'}
                            onClick={() => slettUtenlandskPeriodeBeløp()}
                            id={`slett_utd_beløp_${skjema.felter.barnIdenter.verdi.map(
                                barn => `${barn}-`
                            )}_${skjema.felter.initielFom.verdi}`}
                            loading={skjema.submitRessurs.status === RessursStatus.HENTER}
                            disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                            size={'small'}
                            icon={<Delete />}
                        >
                            {'Fjern'}
                        </Button>
                    )}
                </Knapperad>
            </EøsPeriodeSkjemaContainer>
        </SkjemaGruppe>
    );
};

export default UtenlandskPeriodeBeløpTabellRadEndre;
