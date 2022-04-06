import React, { useState } from 'react';

import styled from 'styled-components';

import navFarger from 'nav-frontend-core';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import { Delete } from '@navikt/ds-icons';
import {
    FamilieKnapp,
    FamilieReactSelect,
    FamilieSelect,
    type OptionType,
} from '@navikt/familie-form-elements';
import { type FeltState, Valideringsstatus } from '@navikt/familie-skjema';
import { type Ressurs, RessursStatus } from '@navikt/familie-typer';
import type { Country } from '@navikt/land-verktoy';

import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import { KompetanseSubmit, useKompetanse } from '../../../../context/Kompetanse/KompetanseContext';
import { validerKompetanse } from '../../../../context/Kompetanse/valideringKompetanse';
import type { IBehandling } from '../../../../typer/behandling';
import {
    AnnenForelderAktivitet,
    annenForelderAktiviteter,
    type IKompetanse,
    SøkerAktivitet,
    søkerAktiviteter,
    KompetanseResultat,
    kompetanseResultater,
} from '../../../../typer/kompetanse';
import { nyYearMonthPeriode } from '../../../../utils/kalender';
import IkonKnapp, { IkonPosisjon } from '../../../Felleskomponenter/IkonKnapp/IkonKnapp';
import MånedÅrVelger from '../../../Felleskomponenter/MånedÅrInput/MånedÅrVelger';
import FamilieLandvelger from './FamilieLandvelger';
import { kompetanseFeilmeldingId, kompetansePeriodeFeilmeldingId } from './KompetanseSkjema';

const Container = styled.div`
    max-width: 30rem;
    border-left: 0.0625rem solid ${navFarger.navOransje};
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

    div {
        z-index: 0;
    }

    div div.skjemaelement {
        margin-bottom: 0rem;
    }
`;

const Knapperad = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;
    margin-top: 2rem;
`;

interface IProps {
    redigerbartKompetanse: FeltState<IKompetanse>;
    settRedigerbartKompetanse: (redigerbartKompetanse: FeltState<IKompetanse>) => void;
    tilgjengeligeBarn: OptionType[];
    visFeilmeldinger: boolean;
    toggleForm: (visAlert: boolean) => void;
    settEkspandertKompetanse: (ekspandertKompetanse: boolean) => void;
}

const KompetanseTabellRadEndre: React.FC<IProps> = ({
    redigerbartKompetanse,
    tilgjengeligeBarn,
    settRedigerbartKompetanse,
    visFeilmeldinger,
    toggleForm,
    settEkspandertKompetanse,
}) => {
    const { erLesevisning, settÅpenBehandling } = useBehandling();
    const { kompetanseSubmit, putKompetanse, deleteKompetanse, settKompetanseSubmit } =
        useKompetanse();
    const lesevisning = erLesevisning(true);

    const valgteBarn = redigerbartKompetanse.verdi?.barnIdenter.verdi.map(barn => {
        const tilBarn = tilgjengeligeBarn.find(opt => {
            return opt.value.match(barn);
        });
        if (tilBarn) {
            return tilBarn;
        } else {
            throw new Error(
                'Skulle ikke være mulig å velge et barn, som ikke eksisterer i orginal kompetanse'
            );
        }
    });

    const [visFeilmeldingerForEnKompetanse, settVisFeilmeldingerForEnKompetanse] = useState(false);

    const skalViseFeilmeldinger = () => {
        return visFeilmeldinger || visFeilmeldingerForEnKompetanse;
    };

    const validerOgSettRedigbartKompetanse = (endretKompetanse: FeltState<IKompetanse>) => {
        settRedigerbartKompetanse(validerKompetanse(endretKompetanse));
    };

    const onEndretBarn = (valgteOptions: OptionType[]) => {
        validerOgSettRedigbartKompetanse({
            ...redigerbartKompetanse,
            verdi: {
                ...redigerbartKompetanse.verdi,
                barnIdenter: {
                    ...redigerbartKompetanse.verdi?.barnIdenter,
                    verdi: valgteOptions.map(option => option.value),
                },
            },
        });
    };

    const håndterEndringPåKompetanse = (promise: Promise<Ressurs<IBehandling>>) => {
        promise
            .then((respons: Ressurs<IBehandling>) => {
                settKompetanseSubmit(KompetanseSubmit.NONE);
                if (respons.status === RessursStatus.SUKSESS) {
                    settVisFeilmeldingerForEnKompetanse(false);
                    settEkspandertKompetanse(false);
                    settÅpenBehandling(respons);
                } else if (
                    respons.status === RessursStatus.FEILET ||
                    respons.status === RessursStatus.FUNKSJONELL_FEIL ||
                    respons.status === RessursStatus.IKKE_TILGANG
                ) {
                    settVisFeilmeldingerForEnKompetanse(true);
                    settRedigerbartKompetanse({
                        ...redigerbartKompetanse,
                        valideringsstatus: Valideringsstatus.FEIL,
                        feilmelding: respons.frontendFeilmelding,
                    });
                } else {
                    settVisFeilmeldingerForEnKompetanse(true);
                    settRedigerbartKompetanse({
                        ...redigerbartKompetanse,
                        valideringsstatus: Valideringsstatus.FEIL,
                        feilmelding:
                            'En ukjent feil har oppstått, vi har ikke klart å lagre endringen.',
                    });
                }
            })
            .catch(() => {
                settKompetanseSubmit(KompetanseSubmit.NONE);
                settRedigerbartKompetanse({
                    ...redigerbartKompetanse,
                    valideringsstatus: Valideringsstatus.FEIL,
                    feilmelding:
                        'En ukjent feil har oppstått, vi har ikke klart å lagre endringen.',
                });
                settVisFeilmeldingerForEnKompetanse(true);
            });
    };

    const lagreKompetanse = () => {
        const validertKompetanse = redigerbartKompetanse.valider(redigerbartKompetanse);

        if (validertKompetanse.valideringsstatus === Valideringsstatus.OK) {
            const promise = putKompetanse(validertKompetanse);
            håndterEndringPåKompetanse(promise);
        } else {
            settRedigerbartKompetanse(validertKompetanse);
            settVisFeilmeldingerForEnKompetanse(true);
        }
    };

    const finnÅrTilbakeTil = (): number => {
        return (
            new Date().getFullYear() -
            new Date(redigerbartKompetanse.verdi.initielFom).getFullYear()
        );
    };

    console.info();

    return (
        <SkjemaGruppe>
            <Container>
                <div className={'skjemaelement'}>
                    <FamilieReactSelect
                        erLesevisning={lesevisning}
                        label={'Barn'}
                        isMulti
                        options={tilgjengeligeBarn}
                        value={valgteBarn}
                        onChange={options => onEndretBarn(options as OptionType[])}
                        feil={
                            skalViseFeilmeldinger() &&
                            redigerbartKompetanse.verdi.barnIdenter.valideringsstatus ===
                                Valideringsstatus.FEIL
                                ? redigerbartKompetanse.verdi.barnIdenter.feilmelding
                                : ''
                        }
                    />
                </div>
                <SkjemaGruppe
                    className={lesevisning ? 'lesevisning' : ''}
                    feilmeldingId={kompetansePeriodeFeilmeldingId(redigerbartKompetanse)}
                    feil={
                        skalViseFeilmeldinger() &&
                        redigerbartKompetanse.verdi?.periode.valideringsstatus ===
                            Valideringsstatus.FEIL
                            ? redigerbartKompetanse.verdi.periode.feilmelding
                            : ''
                    }
                >
                    <StyledLegend>
                        <Element>Periode</Element>
                    </StyledLegend>
                    <FlexDiv>
                        <MånedÅrVelger
                            lesevisning={lesevisning}
                            id={`periode_fom`}
                            label={'F.o.m'}
                            antallÅrTilbake={finnÅrTilbakeTil()}
                            antallÅrFrem={0}
                            value={
                                redigerbartKompetanse.verdi?.periode.verdi?.fom
                                    ? redigerbartKompetanse.verdi?.periode.verdi?.fom
                                    : undefined
                            }
                            onEndret={årMåned => {
                                if (årMåned === redigerbartKompetanse.verdi.periode.verdi.fom) {
                                    // fom ikke endret
                                    return;
                                }
                                validerOgSettRedigbartKompetanse({
                                    ...redigerbartKompetanse,
                                    verdi: {
                                        ...redigerbartKompetanse.verdi,
                                        periode: {
                                            ...redigerbartKompetanse.verdi.periode,
                                            verdi: nyYearMonthPeriode(
                                                årMåned,
                                                redigerbartKompetanse.verdi.periode.verdi.tom
                                            ),
                                        },
                                    },
                                });
                            }}
                            feil={undefined}
                        />
                        <MånedÅrVelger
                            lesevisning={lesevisning}
                            id={`periode_tom`}
                            label={'T.o.m (valgfri)'}
                            antallÅrTilbake={finnÅrTilbakeTil()}
                            antallÅrFrem={0}
                            value={
                                redigerbartKompetanse.verdi?.periode.verdi.tom
                                    ? redigerbartKompetanse.verdi?.periode.verdi.tom
                                    : undefined
                            }
                            onEndret={årMåned => {
                                if (årMåned === redigerbartKompetanse.verdi.periode.verdi.tom) {
                                    // tom ikke endret
                                    return;
                                }
                                validerOgSettRedigbartKompetanse({
                                    ...redigerbartKompetanse,
                                    verdi: {
                                        ...redigerbartKompetanse.verdi,
                                        periode: {
                                            ...redigerbartKompetanse.verdi.periode,
                                            verdi: nyYearMonthPeriode(
                                                redigerbartKompetanse.verdi?.periode.verdi.fom,
                                                årMåned
                                            ),
                                        },
                                    },
                                });
                            }}
                            feil={undefined}
                        />
                    </FlexDiv>
                </SkjemaGruppe>
                <FamilieSelect
                    erLesevisning={lesevisning}
                    label={'Søkers aktivitet'}
                    value={
                        redigerbartKompetanse.verdi?.søkersAktivitet?.verdi
                            ? redigerbartKompetanse.verdi?.søkersAktivitet?.verdi
                            : undefined
                    }
                    lesevisningVerdi={
                        redigerbartKompetanse.verdi?.søkersAktivitet?.verdi
                            ? søkerAktiviteter[redigerbartKompetanse.verdi?.søkersAktivitet?.verdi]
                            : 'Ikke utfylt'
                    }
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
                        validerOgSettRedigbartKompetanse({
                            ...redigerbartKompetanse,
                            verdi: {
                                ...redigerbartKompetanse.verdi,
                                søkersAktivitet: {
                                    ...redigerbartKompetanse.verdi?.søkersAktivitet,
                                    verdi: event.target.value as SøkerAktivitet,
                                },
                            },
                        });
                    }}
                    feil={
                        skalViseFeilmeldinger() &&
                        redigerbartKompetanse.verdi?.søkersAktivitet?.valideringsstatus ===
                            Valideringsstatus.FEIL
                            ? redigerbartKompetanse.verdi.søkersAktivitet.feilmelding
                            : ''
                    }
                >
                    <option value={''}>Velg</option>
                    {Object.values(SøkerAktivitet).map(aktivitet => {
                        return (
                            <option key={aktivitet} value={aktivitet}>
                                {søkerAktiviteter[aktivitet]}
                            </option>
                        );
                    })}
                </FamilieSelect>
                <FamilieSelect
                    erLesevisning={lesevisning}
                    label={'Annen forelders aktivitet'}
                    value={
                        redigerbartKompetanse.verdi?.annenForeldersAktivitet?.verdi
                            ? redigerbartKompetanse.verdi?.annenForeldersAktivitet?.verdi
                            : undefined
                    }
                    lesevisningVerdi={
                        redigerbartKompetanse.verdi?.annenForeldersAktivitet?.verdi
                            ? annenForelderAktiviteter[
                                  redigerbartKompetanse.verdi?.annenForeldersAktivitet?.verdi
                              ]
                            : 'Ikke utfylt'
                    }
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
                        validerOgSettRedigbartKompetanse({
                            ...redigerbartKompetanse,
                            verdi: {
                                ...redigerbartKompetanse.verdi,
                                annenForeldersAktivitet: {
                                    ...redigerbartKompetanse.verdi?.annenForeldersAktivitet,
                                    verdi: event.target.value as AnnenForelderAktivitet,
                                },
                            },
                        });
                    }}
                    feil={
                        skalViseFeilmeldinger() &&
                        redigerbartKompetanse.verdi?.annenForeldersAktivitet?.valideringsstatus ===
                            Valideringsstatus.FEIL
                            ? redigerbartKompetanse.verdi.annenForeldersAktivitet?.feilmelding
                            : ''
                    }
                >
                    <option value={''}>Velg</option>
                    {Object.values(AnnenForelderAktivitet).map(aktivitet => {
                        return (
                            <option key={aktivitet} value={aktivitet}>
                                {annenForelderAktiviteter[aktivitet]}
                            </option>
                        );
                    })}
                </FamilieSelect>
                <FamilieLandvelger
                    erLesevisning={lesevisning}
                    id={'annenForeldersAktivitetsland'}
                    label={'Annen forelders aktivitetsland'}
                    eøs
                    medFlag
                    value={redigerbartKompetanse.verdi?.annenForeldersAktivitetsland?.verdi}
                    onChange={(value: Country) => {
                        validerOgSettRedigbartKompetanse({
                            ...redigerbartKompetanse,
                            verdi: {
                                ...redigerbartKompetanse.verdi,
                                annenForeldersAktivitetsland: {
                                    ...redigerbartKompetanse.verdi?.annenForeldersAktivitetsland,
                                    verdi: value.value,
                                },
                            },
                        });
                    }}
                    feil={
                        skalViseFeilmeldinger() &&
                        redigerbartKompetanse.verdi?.annenForeldersAktivitetsland
                            ?.valideringsstatus === Valideringsstatus.FEIL
                            ? redigerbartKompetanse.verdi.annenForeldersAktivitetsland?.feilmelding?.toString()
                            : ''
                    }
                />
                <FamilieLandvelger
                    erLesevisning={lesevisning}
                    id={'bostedadresse'}
                    label={'Barnets bostedsland'}
                    eøs
                    medFlag
                    value={redigerbartKompetanse.verdi?.barnetsBostedsland?.verdi}
                    onChange={(value: Country) => {
                        validerOgSettRedigbartKompetanse({
                            ...redigerbartKompetanse,
                            verdi: {
                                ...redigerbartKompetanse.verdi,
                                barnetsBostedsland: {
                                    ...redigerbartKompetanse.verdi?.barnetsBostedsland,
                                    verdi: value.value,
                                },
                            },
                        });
                    }}
                    feil={
                        skalViseFeilmeldinger() &&
                        redigerbartKompetanse.verdi?.barnetsBostedsland?.valideringsstatus ===
                            Valideringsstatus.FEIL
                            ? redigerbartKompetanse.verdi.barnetsBostedsland?.feilmelding?.toString()
                            : ''
                    }
                />
                <FamilieSelect
                    erLesevisning={lesevisning}
                    label={'Kompetanse'}
                    value={
                        redigerbartKompetanse.verdi?.resultat?.verdi
                            ? redigerbartKompetanse.verdi?.resultat?.verdi
                            : undefined
                    }
                    lesevisningVerdi={
                        redigerbartKompetanse.verdi?.resultat?.verdi
                            ? kompetanseResultater[redigerbartKompetanse.verdi?.resultat?.verdi]
                            : 'Ikke utfylt'
                    }
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
                        validerOgSettRedigbartKompetanse({
                            ...redigerbartKompetanse,
                            verdi: {
                                ...redigerbartKompetanse.verdi,
                                resultat: {
                                    ...redigerbartKompetanse.verdi?.resultat,
                                    verdi: event.target.value as KompetanseResultat,
                                },
                            },
                        });
                    }}
                    feil={
                        skalViseFeilmeldinger() &&
                        redigerbartKompetanse.verdi?.resultat?.valideringsstatus ===
                            Valideringsstatus.FEIL
                            ? redigerbartKompetanse.verdi.resultat?.feilmelding
                            : ''
                    }
                >
                    <option value={''}>Velg</option>
                    {Object.values(KompetanseResultat).map(aktivitet => {
                        return (
                            <option key={aktivitet} value={aktivitet}>
                                {kompetanseResultater[aktivitet]}
                            </option>
                        );
                    })}
                </FamilieSelect>
                <Knapperad>
                    <div>
                        <FamilieKnapp
                            erLesevisning={lesevisning}
                            onClick={lagreKompetanse}
                            mini={true}
                            type={
                                redigerbartKompetanse.valideringsstatus === Valideringsstatus.OK
                                    ? 'hoved'
                                    : 'standard'
                            }
                            spinner={kompetanseSubmit === KompetanseSubmit.PUT}
                            disabled={kompetanseSubmit === KompetanseSubmit.PUT}
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

                    <IkonKnapp
                        erLesevisning={lesevisning}
                        onClick={() => {
                            const promise = deleteKompetanse(redigerbartKompetanse.verdi.id);
                            håndterEndringPåKompetanse(promise);
                        }}
                        id={kompetanseFeilmeldingId(redigerbartKompetanse)}
                        spinner={kompetanseSubmit === KompetanseSubmit.DELETE}
                        disabled={kompetanseSubmit === KompetanseSubmit.DELETE}
                        mini={true}
                        label={'Fjern'}
                        ikonPosisjon={IkonPosisjon.VENSTRE}
                        ikon={<Delete />}
                    />
                </Knapperad>
            </Container>
        </SkjemaGruppe>
    );
};

export default KompetanseTabellRadEndre;
