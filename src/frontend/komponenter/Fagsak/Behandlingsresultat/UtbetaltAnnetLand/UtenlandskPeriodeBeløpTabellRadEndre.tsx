import * as React from 'react';

import styled from 'styled-components';

import { TrashIcon } from '@navikt/aksel-icons';
import { Alert, BodyShort, Button, Fieldset, Select, TextField } from '@navikt/ds-react';
import { ASpacing6 } from '@navikt/ds-tokens/dist/tokens';
import type { OptionType } from '@navikt/familie-form-elements';
import { FamilieReactSelect } from '@navikt/familie-form-elements';
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
import { StyledFamilieValutavelger } from '../EøsPeriode/FamilieLandvelger';
import { EøsPeriodeSkjemaContainer, Knapperad } from '../EøsPeriode/fellesKomponenter';

const UtbetaltBeløpRad = styled.div`
    width: 32rem;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
`;

const UtbetaltBeløpInfo = styled(Alert)`
    margin-bottom: ${ASpacing6};
`;

const UtbetaltBeløpText = styled(BodyShort)`
    font-weight: bold;
`;

const StyledEøsPeriodeSkjema = styled(EøsPeriodeSkjema)`
    margin-top: 1.5rem;
`;

const StyledFieldset = styled(Fieldset)`
    margin-top: 1.5rem;
`;

const StyledTextField = styled(TextField)`
    width: 9rem;
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
        <Fieldset
            error={skjema.visFeilmeldinger && visSubmitFeilmelding()}
            legend={'Utenlandsk periodebeløp'}
            hideLegend
        >
            <EøsPeriodeSkjemaContainer $lesevisning={lesevisning} $status={status}>
                <UtbetaltBeløpInfo variant="info" inline>
                    <UtbetaltBeløpText size="small">
                        Dersom det er ulike beløp per barn utbetalt i det andre landet, må barna
                        registreres separat
                    </UtbetaltBeløpText>
                </UtbetaltBeløpInfo>
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
                <StyledEøsPeriodeSkjema
                    periode={skjema.felter.periode}
                    periodeFeilmeldingId={utenlandskPeriodeBeløpPeriodeFeilmeldingId(skjema)}
                    initielFom={skjema.felter.initielFom}
                    visFeilmeldinger={skjema.visFeilmeldinger}
                    lesevisning={lesevisning}
                />
                <StyledFieldset
                    className={lesevisning ? 'lesevisning' : ''}
                    errorId={utenlandskPeriodeBeløpUtbetaltFeilmeldingId(skjema)}
                    error={skjema.visFeilmeldinger && visUtbetaltBeløpGruppeFeilmelding()}
                    legend={'Utbetalt i det andre landet'}
                    size={'medium'}
                >
                    <UtbetaltBeløpRad>
                        <StyledTextField
                            label={'Beløp per barn'}
                            readOnly={lesevisning}
                            value={skjema.felter.beløp?.verdi}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                skjema.felter.beløp?.validerOgSettFelt(event.target.value)
                            }
                            size={'medium'}
                        />
                        <StyledFamilieValutavelger
                            erLesevisning={lesevisning}
                            id={'valuta'}
                            label={'Valuta'}
                            kunEøs
                            medFlag
                            value={skjema.felter.valutakode?.verdi}
                            onChange={(value: Currency) => {
                                if (value) {
                                    skjema.felter.valutakode?.validerOgSettFelt(value.value);
                                } else {
                                    skjema.felter.valutakode?.nullstill();
                                }
                            }}
                            utenMargin
                        />
                        <Select
                            label={'Intervall'}
                            readOnly={lesevisning}
                            value={skjema.felter.intervall?.verdi || undefined}
                            onChange={event =>
                                skjema.felter.intervall?.validerOgSettFelt(
                                    event.target.value as UtenlandskPeriodeBeløpIntervall
                                )
                            }
                            size={'medium'}
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
                        </Select>
                    </UtbetaltBeløpRad>
                </StyledFieldset>

                {!lesevisning && (
                    <Knapperad>
                        <div>
                            <Button
                                onClick={() => sendInnSkjema()}
                                size="small"
                                variant={valideringErOk() ? 'primary' : 'secondary'}
                                loading={skjema.submitRessurs.status === RessursStatus.HENTER}
                                disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                            >
                                Ferdig
                            </Button>
                            <Button
                                style={{ marginLeft: '1rem' }}
                                onClick={() => toggleForm(false)}
                                size="small"
                                variant="tertiary"
                            >
                                Avbryt
                            </Button>
                        </div>

                        {skjema.felter.status?.verdi !== EøsPeriodeStatus.IKKE_UTFYLT && (
                            <Button
                                variant={'tertiary'}
                                onClick={() => slettUtenlandskPeriodeBeløp()}
                                id={`slett_utd_beløp_${skjema.felter.barnIdenter.verdi.map(
                                    barn => `${barn}-`
                                )}_${skjema.felter.initielFom.verdi}`}
                                loading={skjema.submitRessurs.status === RessursStatus.HENTER}
                                disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                                size={'small'}
                                icon={<TrashIcon />}
                            >
                                {'Fjern'}
                            </Button>
                        )}
                    </Knapperad>
                )}
            </EøsPeriodeSkjemaContainer>
        </Fieldset>
    );
};

export default UtenlandskPeriodeBeløpTabellRadEndre;
