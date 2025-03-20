import * as React from 'react';

import styled from 'styled-components';

import {
    CogRotationIcon,
    PadlockLockedFillIcon,
    PersonGavelIcon,
    TrashIcon,
} from '@navikt/aksel-icons';
import {
    Alert,
    Button,
    Fieldset,
    Heading,
    HStack,
    Label,
    Link,
    TextField,
    UNSAFE_Combobox,
} from '@navikt/ds-react';
import type { ComboboxOption } from '@navikt/ds-react/cjs/form/combobox/types';
import type { ISkjema } from '@navikt/familie-skjema';
import { Valideringsstatus } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';
import type { Currency } from '@navikt/land-verktoy';

import { useBehandling } from '../../../../../../../context/behandlingContext/BehandlingContext';
import Datovelger from '../../../../../../../komponenter/datovelger/Datovelger';
import type { IBehandling } from '../../../../../../../typer/behandling';
import { VurderingsstrategiForValutakurser } from '../../../../../../../typer/behandling';
import {
    EøsPeriodeStatus,
    type IValutakurs,
    Vurderingsform,
} from '../../../../../../../typer/eøsPerioder';
import { onOptionSelected } from '../../../../../../../utils/skjema';
import EøsPeriodeSkjema from '../EøsKomponenter/EøsPeriodeSkjema';
import { EøsPeriodeSkjemaContainer, Knapperad } from '../EøsKomponenter/EøsSkjemaKomponenter';
import { StyledFamilieValutavelger } from '../EøsKomponenter/FamilieLandvelger';

const ValutakursRad = styled.div`
    width: 32rem;
    display: flex;
    gap: 1rem;
`;

const StyledISKAlert = styled(Alert)`
    margin-top: 2rem;
`;

const StyledTextField = styled(TextField)`
    width: 8rem;
`;

const valutakursPeriodeFeilmeldingId = (valutakurs: ISkjema<IValutakurs, IBehandling>): string =>
    `valutakurs-periode_${valutakurs.felter.barnIdenter.verdi.map(barn => `${barn.value}`)}_${
        valutakurs.felter.initielFom.verdi
    }`;

const valutakursValutaFeilmeldingId = (valutakurs: ISkjema<IValutakurs, IBehandling>): string =>
    `valutakurs-valuta_${valutakurs.felter.barnIdenter.verdi.map(barn => `${barn.value}`)}_${
        valutakurs.felter.initielFom.verdi
    }`;

interface IProps {
    skjema: ISkjema<IValutakurs, IBehandling>;
    tilgjengeligeBarn: ComboboxOption[];
    status: EøsPeriodeStatus;
    valideringErOk: () => boolean;
    sendInnSkjema: () => void;
    toggleForm: (visAlert: boolean) => void;
    slettValutakurs: () => void;
    sletterValutakurs: boolean;
    erManuellInputAvKurs: boolean;
    vurderingsform: Vurderingsform | undefined;
    åpenBehandling: IBehandling;
}

const ValutakursTabellRadEndre: React.FC<IProps> = ({
    vurderingsform,
    skjema,
    tilgjengeligeBarn,
    status,
    sendInnSkjema,
    valideringErOk,
    toggleForm,
    slettValutakurs,
    sletterValutakurs,
    erManuellInputAvKurs,
    åpenBehandling,
}) => {
    const { vurderErLesevisning } = useBehandling();
    const erValutakursVurdertAutomatisk = vurderingsform === Vurderingsform.AUTOMATISK;
    const skaAutomatiskeValutakurserKunneRedigeres =
        åpenBehandling.vurderingsstrategiForValutakurser ===
        VurderingsstrategiForValutakurser.MANUELL;

    const erLesevisning =
        vurderErLesevisning(true) ||
        (erValutakursVurdertAutomatisk && !skaAutomatiskeValutakurserKunneRedigeres);

    const visKursGruppeFeilmelding = (): React.ReactNode => {
        if (skjema.felter.valutakode?.valideringsstatus === Valideringsstatus.FEIL) {
            return skjema.felter.valutakode.feilmelding;
        } else if (skjema.felter.valutakursdato?.valideringsstatus === Valideringsstatus.FEIL) {
            return skjema.felter.valutakursdato.feilmelding;
        } else if (skjema.felter.kurs?.valideringsstatus === Valideringsstatus.FEIL) {
            return skjema.felter.kurs.feilmelding;
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
            legend={'Valutakurs skjema'}
            hideLegend
        >
            <EøsPeriodeSkjemaContainer $lesevisning={erLesevisning} $status={status} gap="6">
                {erValutakursVurdertAutomatisk && (
                    <HStack wrap={false} align={'center'} gap={'4'}>
                        <CogRotationIcon
                            title="Automatisk registrert valutakurs"
                            fontSize="1.5rem"
                        />
                        <Label>Automatisk registrert valutakurs</Label>
                    </HStack>
                )}
                {vurderingsform === Vurderingsform.MANUELL && (
                    <HStack wrap={false} align={'center'} gap={'4'}>
                        <PersonGavelIcon title="Manuelt registrert valutakurs" fontSize="1.5rem" />
                        <Label>Manuelt registrert valutakurs</Label>
                    </HStack>
                )}
                <UNSAFE_Combobox
                    isMultiSelect
                    label={'Barn'}
                    options={tilgjengeligeBarn}
                    selectedOptions={skjema.felter.barnIdenter.verdi}
                    onToggleSelected={onBarnSelected}
                    readOnly={erLesevisning}
                    error={
                        skjema.felter.barnIdenter.hentNavInputProps(skjema.visFeilmeldinger).error
                    }
                />
                <EøsPeriodeSkjema
                    periode={skjema.felter.periode}
                    periodeFeilmeldingId={valutakursPeriodeFeilmeldingId(skjema)}
                    initielFom={skjema.felter.initielFom}
                    visFeilmeldinger={skjema.visFeilmeldinger}
                    lesevisning={erLesevisning}
                />
                <Fieldset
                    className={erLesevisning ? 'lesevisning' : ''}
                    errorId={valutakursValutaFeilmeldingId(skjema)}
                    error={skjema.visFeilmeldinger && visKursGruppeFeilmelding()}
                    legend={'Registrer valutakursdato'}
                    hideLegend={erValutakursVurdertAutomatisk}
                >
                    <ValutakursRad>
                        <Datovelger
                            felt={skjema.felter.valutakursdato}
                            label={'Valutakursdato'}
                            visFeilmeldinger={false}
                            readOnly={erLesevisning}
                            disableWeekends
                            kanKunVelgeFortid
                        />
                        <StyledFamilieValutavelger
                            erLesevisning={true}
                            id={'valuta'}
                            label={
                                <HStack wrap={false} align={'center'} gap={'2'}>
                                    <PadlockLockedFillIcon />
                                    <Label>Valuta</Label>
                                </HStack>
                            }
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
                            dempetEtikett={!erLesevisning}
                        />
                        <StyledTextField
                            label={'Valutakurs'}
                            readOnly={erLesevisning || !erManuellInputAvKurs}
                            value={skjema.felter.kurs?.verdi}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                skjema.felter.kurs?.validerOgSettFelt(event.target.value)
                            }
                        />
                    </ValutakursRad>
                    {erManuellInputAvKurs && (
                        <StyledISKAlert variant="warning" size="small" inline>
                            <Heading size="xsmall">
                                Manuell innhenting av valutakurs for Islandske kroner (ISK)
                            </Heading>
                            Systemet har ikke valutakurser for valutakursdatoer før 1. februar 2018.
                            Disse må hentes fra{' '}
                            <Link
                                href="https://navno.sharepoint.com/:x:/r/sites/fag-og-ytelser-familie-barnetrygd/Delte%20dokumenter/E%C3%98S/Valutakalkulator%202022.xlsm?d=w200955f53e1d4323ae72f9d1b15f617c&csf=1&web=1&e=w3OE5N"
                                target="_blank"
                            >
                                Valutakalkulator
                            </Link>
                            .
                        </StyledISKAlert>
                    )}
                </Fieldset>

                {!erLesevisning && (
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

                        {skjema.felter.status?.verdi !== EøsPeriodeStatus.IKKE_UTFYLT &&
                            !erLesevisning && (
                                <Button
                                    variant={'tertiary'}
                                    onClick={() => slettValutakurs()}
                                    id={`slett_valutakurs_${skjema.felter.barnIdenter.verdi.map(
                                        barn => `${barn}-`
                                    )}_${skjema.felter.initielFom.verdi}`}
                                    loading={sletterValutakurs}
                                    disabled={sletterValutakurs}
                                    size={'small'}
                                    icon={<TrashIcon />}
                                >
                                    Fjern
                                </Button>
                            )}
                    </Knapperad>
                )}
            </EøsPeriodeSkjemaContainer>
        </Fieldset>
    );
};

export default ValutakursTabellRadEndre;
