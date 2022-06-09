import * as React from 'react';

import styled from 'styled-components';

import { SkjemaGruppe } from 'nav-frontend-skjema';

import { Delete } from '@navikt/ds-icons';
import { Label } from '@navikt/ds-react';
import {
    FamilieDatovelger,
    FamilieInput,
    FamilieKnapp,
    type ISODateString,
    type OptionType,
} from '@navikt/familie-form-elements';
import { Valideringsstatus } from '@navikt/familie-skjema';
import type { ISkjema } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';
import type { Currency } from '@navikt/land-verktoy';

import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import type { IBehandling } from '../../../../typer/behandling';
import { EøsPeriodeStatus, type IValutakurs } from '../../../../typer/eøsPerioder';
import { datoformatNorsk } from '../../../../utils/formatter';
import IkonKnapp, { IkonPosisjon } from '../../../Felleskomponenter/IkonKnapp/IkonKnapp';
import EøsPeriodeSkjema from '../EøsPeriode/EøsPeriodeSkjema';
import { FamilieValutavelger } from '../EøsPeriode/FamilieLandvelger';
import {
    EøsPeriodeSkjemaContainer,
    Knapperad,
    StyledLegend,
} from '../EøsPeriode/fellesKomponenter';

const ValutakursRad = styled.div`
    width: 28rem;
    display: flex;
    justify-content: space-between;

    & div.nav-datovelger__inputContainer {
        width: 8.1rem;
    }

    div.skjemaelement {
        margin-bottom: 0rem;

        label {
            font-weight: normal;
        }

        p.navds-label {
            font-weight: normal;
        }

        &:nth-of-type(1) {
            width: 14rem;
        }
        &:nth-of-type(3) {
            width: 4.5rem;
        }
    }
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
    valideringErOk: () => boolean;
    sendInnSkjema: () => void;
    toggleForm: (visAlert: boolean) => void;
    slettValutakurs: () => void;
}

const ValutakursTabellRadEndre: React.FC<IProps> = ({
    skjema,
    sendInnSkjema,
    valideringErOk,
    toggleForm,
    slettValutakurs,
}) => {
    const { erLesevisning } = useBehandling();
    const lesevisning = erLesevisning(true);

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
        <SkjemaGruppe feil={skjema.visFeilmeldinger && visSubmitFeilmelding()}>
            <EøsPeriodeSkjemaContainer>
                <EøsPeriodeSkjema
                    periode={skjema.felter.periode}
                    periodeFeilmeldingId={valutakursPeriodeFeilmeldingId(skjema)}
                    initielFom={skjema.felter.initielFom}
                    visFeilmeldinger={skjema.visFeilmeldinger}
                    lesevisning={lesevisning}
                />
                <SkjemaGruppe
                    className={lesevisning ? 'lesevisning' : ''}
                    feilmeldingId={valutakursValutaFeilmeldingId(skjema)}
                    feil={skjema.visFeilmeldinger && visKursGruppeFeilmelding()}
                >
                    <StyledLegend>
                        <Label size="small">Registrer valuta</Label>
                    </StyledLegend>
                    <ValutakursRad>
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
                        <FamilieDatovelger
                            {...skjema.felter.valutakursdato?.hentNavBaseSkjemaProps(
                                skjema.visFeilmeldinger
                            )}
                            className="skjemaelement"
                            id={`valutakurs_${skjema.felter.periodeId}`}
                            label={'Valutakursdato'}
                            value={skjema.felter.valutakursdato?.verdi}
                            placeholder={datoformatNorsk.DATO}
                            erLesesvisning={lesevisning}
                            onChange={(dato?: ISODateString) =>
                                skjema.felter.valutakursdato?.validerOgSettFelt(dato)
                            }
                            valgtDato={
                                skjema.felter.valutakursdato?.verdi !== null
                                    ? skjema.felter.valutakursdato?.verdi
                                    : undefined
                            }
                        />
                        <FamilieInput
                            label={'Valutakurs'}
                            erLesevisning={lesevisning}
                            value={skjema.felter.kurs?.verdi}
                            onChange={event =>
                                skjema.felter.kurs?.validerOgSettFelt(event.target.value)
                            }
                        />
                    </ValutakursRad>
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
                            onClick={() => slettValutakurs()}
                            id={`slett_valutakurs_${skjema.felter.barnIdenter.verdi.map(
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
            </EøsPeriodeSkjemaContainer>
        </SkjemaGruppe>
    );
};

export default ValutakursTabellRadEndre;
