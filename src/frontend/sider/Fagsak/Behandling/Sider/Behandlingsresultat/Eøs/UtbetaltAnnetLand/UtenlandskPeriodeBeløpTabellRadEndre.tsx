import * as React from 'react';

import styled from 'styled-components';

import { TrashIcon } from '@navikt/aksel-icons';
import { Alert, BodyShort, Button, Fieldset, Select, TextField, UNSAFE_Combobox } from '@navikt/ds-react';
import type { ComboboxOption } from '@navikt/ds-react/cjs/form/combobox/types';
import type { ISkjema } from '@navikt/familie-skjema';
import { Valideringsstatus } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';
import type { Country, Currency } from '@navikt/land-verktoy';

import { useAppContext } from '../../../../../../../context/AppContext';
import type { IBehandling } from '../../../../../../../typer/behandling';
import type { IUtenlandskPeriodeBeløp } from '../../../../../../../typer/eøsPerioder';
import {
    EøsPeriodeStatus,
    UtenlandskPeriodeBeløpIntervall,
    utenlandskPeriodeBeløpIntervaller,
} from '../../../../../../../typer/eøsPerioder';
import { ToggleNavn } from '../../../../../../../typer/toggles';
import { onOptionSelected } from '../../../../../../../utils/skjema';
import { useBehandlingContext } from '../../../../context/BehandlingContext';
import EøsPeriodeSkjema from '../EøsKomponenter/EøsPeriodeSkjema';
import { EøsPeriodeSkjemaContainer, Knapperad } from '../EøsKomponenter/EøsSkjemaKomponenter';
import { FamilieLandvelger, StyledFamilieValutavelger } from '../EøsKomponenter/FamilieLandvelger';

const UtbetaltBeløpRad = styled.div`
    width: 32rem;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
`;

const UtbetaltBeløpText = styled(BodyShort)`
    font-weight: bold;
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
    tilgjengeligeBarn: ComboboxOption[];
    status: EøsPeriodeStatus;
    sendInnSkjema: () => void;
    toggleForm: (visAlert: boolean) => void;
    slettUtenlandskPeriodeBeløp: () => void;
}

const UtenlandskPeriodeBeløpTabellRadEndre: React.FC<IProps> = ({
    skjema,
    tilgjengeligeBarn,
    status,
    sendInnSkjema,
    toggleForm,
    slettUtenlandskPeriodeBeløp,
}) => {
    const { vurderErLesevisning } = useBehandlingContext();
    const lesevisning = vurderErLesevisning(true);
    const { toggles } = useAppContext();

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

    const onBarnSelected = (optionValue: string, isSelected: boolean) => {
        onOptionSelected(optionValue, isSelected, skjema.felter.barnIdenter, tilgjengeligeBarn);
    };

    return (
        <Fieldset
            error={skjema.visFeilmeldinger && visSubmitFeilmelding()}
            legend={'Utenlandsk periodebeløp'}
            hideLegend
        >
            <EøsPeriodeSkjemaContainer $lesevisning={lesevisning} $status={status} gap="6">
                <Alert variant="info" inline>
                    <UtbetaltBeløpText size="small">
                        Dersom det er ulike beløp per barn utbetalt i det andre landet, må barna registreres separat
                    </UtbetaltBeløpText>
                </Alert>
                <UNSAFE_Combobox
                    isMultiSelect
                    label={'Barn'}
                    options={tilgjengeligeBarn}
                    selectedOptions={skjema.felter.barnIdenter.verdi}
                    onToggleSelected={onBarnSelected}
                    readOnly={lesevisning}
                    error={skjema.felter.barnIdenter.hentNavInputProps(skjema.visFeilmeldinger).error}
                />
                <EøsPeriodeSkjema
                    periode={skjema.felter.periode}
                    periodeFeilmeldingId={utenlandskPeriodeBeløpPeriodeFeilmeldingId(skjema)}
                    initielFom={skjema.felter.initielFom}
                    visFeilmeldinger={skjema.visFeilmeldinger}
                    lesevisning={lesevisning}
                />
                <Fieldset
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
                    <FamilieLandvelger
                        erLesevisning={lesevisning}
                        id={'utbetalingsland'}
                        label={'Utbetalingsland'}
                        kunEøs
                        medFlag
                        size="medium"
                        kanNullstilles
                        value={skjema.felter.utbetalingsland.verdi}
                        onChange={(value: Country) => {
                            const nyVerdi = value ? value.value : undefined;
                            skjema.felter.utbetalingsland.validerOgSettFelt(nyVerdi);
                        }}
                        feil={
                            skjema.visFeilmeldinger &&
                            skjema.felter.utbetalingsland.valideringsstatus === Valideringsstatus.FEIL
                                ? skjema.felter.utbetalingsland.feilmelding?.toString()
                                : ''
                        }
                        utenMargin
                    />
                </Fieldset>

                {!lesevisning && (
                    <Knapperad>
                        <div>
                            <Button
                                onClick={() => sendInnSkjema()}
                                size="small"
                                variant={'primary'}
                                loading={skjema.submitRessurs.status === RessursStatus.HENTER}
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
