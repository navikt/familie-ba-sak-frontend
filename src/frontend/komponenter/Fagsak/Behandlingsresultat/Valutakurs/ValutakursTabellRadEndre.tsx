import * as React from 'react';

import styled from 'styled-components';

import { Delete } from '@navikt/ds-icons';
import { Alert, Link, Heading, Button, Fieldset } from '@navikt/ds-react';
import {
    AFontLineHeightLarge,
    AFontSizeLarge,
    AFontWeightRegular,
} from '@navikt/ds-tokens/dist/tokens';
import { FamilieDatovelger } from '@navikt/familie-datovelger';
import type { ISODateString } from '@navikt/familie-datovelger';
import type { OptionType } from '@navikt/familie-form-elements';
import { FamilieInput, FamilieKnapp, FamilieReactSelect } from '@navikt/familie-form-elements';
import { Valideringsstatus } from '@navikt/familie-skjema';
import type { ISkjema } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';
import type { Currency } from '@navikt/land-verktoy';

import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import type { IBehandling } from '../../../../typer/behandling';
import type { IValutakurs } from '../../../../typer/eøsPerioder';
import { EøsPeriodeStatus } from '../../../../typer/eøsPerioder';
import { datoformatNorsk } from '../../../../utils/formatter';
import EøsPeriodeSkjema from '../EøsPeriode/EøsPeriodeSkjema';
import { EøsPeriodeSkjemaContainer, Knapperad } from '../EøsPeriode/fellesKomponenter';
import { StyledFamilieValutavelger } from '../UtbetaltAnnetLand/UtenlandskPeriodeBeløpTabellRadEndre';

const ValutakursRad = styled.div`
    width: 32rem;
    display: flex;
    justify-content: space-between;
`;

const StyledISKAlert = styled(Alert)`
    margin-top: 2rem;
`;

const StyledFamilieDatovelger = styled(FamilieDatovelger)`
    .nav-datovelger {
        margin-top: 9px;
    }
    .nav-datovelger__input {
        min-height: 48px;
        font-size: ${AFontSizeLarge};
        font-weight: ${AFontWeightRegular};
        letter-spacing: 0;
        line-height: ${AFontLineHeightLarge};
    }

    .nav-datovelger__inputContainer {
        width: 9rem;
    }

    label {
        font-size: ${AFontSizeLarge};
        letter-spacing: 0;
        font-weight: bold;
        margin: 0;
        line-height: ${AFontLineHeightLarge};
    }
`;

const StyledFamilieInput = styled(FamilieInput)`
    width: 8rem;
`;

const StyledEøsPeriodeSkjema = styled(EøsPeriodeSkjema)`
    margin-top: 1.5rem;
`;

const StyledFieldset = styled(Fieldset)`
    margin-top: 1.5rem;
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
}

const ValutakursTabellRadEndre: React.FC<IProps> = ({
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
    const lesevisning = vurderErLesevisning(true);

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
            <EøsPeriodeSkjemaContainer maxWidth={34} lesevisning={lesevisning} status={status}>
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
                    periodeFeilmeldingId={valutakursPeriodeFeilmeldingId(skjema)}
                    initielFom={skjema.felter.initielFom}
                    visFeilmeldinger={skjema.visFeilmeldinger}
                    lesevisning={lesevisning}
                    maxWidth={32}
                />
                <StyledFieldset
                    className={lesevisning ? 'lesevisning' : ''}
                    errorId={valutakursValutaFeilmeldingId(skjema)}
                    error={skjema.visFeilmeldinger && visKursGruppeFeilmelding()}
                    legend={'Registrer valutakursdato'}
                >
                    <ValutakursRad>
                        <StyledFamilieDatovelger
                            {...skjema.felter.valutakursdato?.hentNavBaseSkjemaProps(
                                skjema.visFeilmeldinger
                            )}
                            limitations={{ weekendsNotSelectable: true }}
                            id={`valutakurs_${skjema.felter.periodeId}`}
                            label={'Valutakursdato'}
                            value={
                                skjema.felter.valutakursdato?.verdi !== null
                                    ? skjema.felter.valutakursdato?.verdi
                                    : undefined
                            }
                            placeholder={datoformatNorsk.DATO}
                            erLesesvisning={lesevisning}
                            onChange={(dato?: ISODateString) =>
                                skjema.felter.valutakursdato?.validerOgSettFelt(dato)
                            }
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
                            dempetEtikett={!lesevisning}
                        />
                        <StyledFamilieInput
                            label={'Valutakurs'}
                            erLesevisning={lesevisning}
                            value={skjema.felter.kurs?.verdi}
                            onChange={event =>
                                skjema.felter.kurs?.validerOgSettFelt(event.target.value)
                            }
                            disabled={!erManuellInputAvKurs}
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
                </StyledFieldset>

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

                    {skjema.felter.status?.verdi !== EøsPeriodeStatus.IKKE_UTFYLT &&
                        !lesevisning && (
                            <Button
                                variant={'tertiary'}
                                onClick={() => slettValutakurs()}
                                id={`slett_valutakurs_${skjema.felter.barnIdenter.verdi.map(
                                    barn => `${barn}-`
                                )}_${skjema.felter.initielFom.verdi}`}
                                loading={sletterValutakurs}
                                disabled={sletterValutakurs}
                                size={'small'}
                                icon={<Delete />}
                            >
                                Fjern
                            </Button>
                        )}
                </Knapperad>
            </EøsPeriodeSkjemaContainer>
        </Fieldset>
    );
};

export default ValutakursTabellRadEndre;
