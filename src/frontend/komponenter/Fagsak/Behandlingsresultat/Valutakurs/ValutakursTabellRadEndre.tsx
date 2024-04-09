import * as React from 'react';

import styled from 'styled-components';

import { TrashIcon, CogRotationIcon } from '@navikt/aksel-icons';
import { Alert, Button, Fieldset, Heading, HStack, Label, Link, TextField } from '@navikt/ds-react';
import type { OptionType } from '@navikt/familie-form-elements';
import { FamilieKnapp, FamilieReactSelect } from '@navikt/familie-form-elements';
import type { ISkjema } from '@navikt/familie-skjema';
import { Valideringsstatus } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';
import type { Currency } from '@navikt/land-verktoy';

import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import type { IBehandling } from '../../../../typer/behandling';
import { EøsPeriodeStatus, type IValutakurs, Vurderingsform } from '../../../../typer/eøsPerioder';
import Datovelger from '../../../Felleskomponenter/Datovelger/Datovelger';
import EøsPeriodeSkjema from '../EøsPeriode/EøsPeriodeSkjema';
import { EøsPeriodeSkjemaContainer, Knapperad } from '../EøsPeriode/fellesKomponenter';
import { StyledFamilieValutavelger } from '../UtbetaltAnnetLand/UtenlandskPeriodeBeløpTabellRadEndre';

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
    tilgjengeligeBarn: OptionType[];
    status: EøsPeriodeStatus;
    valideringErOk: () => boolean;
    sendInnSkjema: () => void;
    toggleForm: (visAlert: boolean) => void;
    slettValutakurs: () => void;
    sletterValutakurs: boolean;
    erManuellInputAvKurs: boolean;
    vurderingsform: Vurderingsform | undefined;
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
}) => {
    const { vurderErLesevisning } = useBehandling();
    const erLesevisning = vurderErLesevisning(true) || vurderingsform === Vurderingsform.AUTOMATISK;

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

    return (
        <Fieldset
            error={skjema.visFeilmeldinger && visSubmitFeilmelding()}
            legend={'Valutakurs skjema'}
            hideLegend
        >
            <EøsPeriodeSkjemaContainer $lesevisning={erLesevisning} $status={status} gap="6">
                {vurderingsform === Vurderingsform.AUTOMATISK && (
                    <HStack wrap={false} align={'center'} gap={'4'}>
                        <CogRotationIcon title="Automatisk vurdert" fontSize="1.5rem" />
                        <Label>Automatisk vurdert</Label>
                    </HStack>
                )}
                <FamilieReactSelect
                    {...skjema.felter.barnIdenter.hentNavInputProps(skjema.visFeilmeldinger)}
                    erLesevisning={erLesevisning}
                    label={'Barn'}
                    isMulti
                    options={tilgjengeligeBarn}
                    value={skjema.felter.barnIdenter.verdi}
                    onChange={options =>
                        skjema.felter.barnIdenter.validerOgSettFelt(options as OptionType[])
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
                            <FamilieKnapp
                                erLesevisning={erLesevisning}
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
                                erLesevisning={erLesevisning}
                                onClick={() => toggleForm(false)}
                                size="small"
                                variant="tertiary"
                            >
                                Avbryt
                            </FamilieKnapp>
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
