import React, { useState } from 'react';

import { Country } from 'land-verktoy';
import styled from 'styled-components';

import navFarger from 'nav-frontend-core';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import { Delete } from '@navikt/ds-icons';
import {
    FamilieKnapp,
    FamilieReactSelect,
    FamilieSelect,
    OptionType,
} from '@navikt/familie-form-elements';
import { FeltState, Valideringsstatus } from '@navikt/familie-skjema';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import { KompetanseSubmit, useKompetanse } from '../../../../context/Kompetanse/KompetanseContext';
import { validerKompetanse } from '../../../../context/Kompetanse/valideringKompetanse';
import {
    AnnenForelderAktivitet,
    annenForelderAktiviteter,
    IKompetanse,
    IRestKompetanse,
    SøkerAktivitet,
    søkerAktiviteter,
} from '../../../../typer/kompetanse';
import IkonKnapp, { IkonPosisjon } from '../../../Felleskomponenter/IkonKnapp/IkonKnapp';
import MånedÅrVelger from '../../../Felleskomponenter/MånedÅrInput/MånedÅrVelger';
import FamilieLandvelger from './FamilieLandvelger';
import { kompetanseFeilmeldingId } from './KompetanseSkjema';

const Container = styled.div`
    max-width: 30rem;
    border-left: 0.0625rem solid ${navFarger.navOransje};
    padding-left: 2rem;

    & div.skjemaelement {
        margin-bottom: 1rem;
    }
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
    margin-bottom: 0px;

    div {
        z-index: 0;
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
    const { erLesevisning } = useBehandling();
    const {
        kompetanseSubmit,
        putKompetanse,
        deleteKompetanse,
        settKompetanseSubmit,
        hentKomeptanser,
    } = useKompetanse();
    const lesevisning = erLesevisning(true);

    const valgteBarn = redigerbartKompetanse.verdi?.barn.verdi.map(barn => {
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
                barn: {
                    ...redigerbartKompetanse.verdi?.barn,
                    verdi: valgteOptions.map(option => option.value),
                },
            },
        });
    };

    const håndterEndringPåKompetanse = (promise: Promise<Ressurs<IRestKompetanse[]>>) => {
        promise
            .then((oppdatertKompetanser: Ressurs<IRestKompetanse[]>) => {
                settKompetanseSubmit(KompetanseSubmit.NONE);
                if (oppdatertKompetanser.status === RessursStatus.SUKSESS) {
                    settVisFeilmeldingerForEnKompetanse(false);
                    // behandleHentetKompetanser(oppdatertKompetanser);
                    hentKomeptanser();
                    settEkspandertKompetanse(false);
                } else if (
                    oppdatertKompetanser.status === RessursStatus.FEILET ||
                    oppdatertKompetanser.status === RessursStatus.FUNKSJONELL_FEIL ||
                    oppdatertKompetanser.status === RessursStatus.IKKE_TILGANG
                ) {
                    settVisFeilmeldingerForEnKompetanse(true);
                    settRedigerbartKompetanse({
                        ...redigerbartKompetanse,
                        valideringsstatus: Valideringsstatus.FEIL,
                        feilmelding: oppdatertKompetanser.frontendFeilmelding,
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

    return (
        <SkjemaGruppe>
            <Container>
                <FamilieReactSelect
                    erLesevisning={lesevisning}
                    label={'Barn'}
                    isMulti
                    options={tilgjengeligeBarn}
                    value={valgteBarn}
                    onChange={options => onEndretBarn(options as OptionType[])}
                    feil={
                        skalViseFeilmeldinger() &&
                        redigerbartKompetanse.verdi.barn.valideringsstatus ===
                            Valideringsstatus.FEIL
                            ? redigerbartKompetanse.verdi.barn.feilmelding
                            : ''
                    }
                />
                <SkjemaGruppe className={lesevisning ? 'lesevisning' : ''}>
                    <StyledLegend>
                        <Element>Periode</Element>
                    </StyledLegend>
                    <FlexDiv>
                        <MånedÅrVelger
                            lesevisning={lesevisning}
                            id={`periode_fom`}
                            label={'F.o.m'}
                            antallÅrTilbake={2}
                            antallÅrFrem={99}
                            value={
                                redigerbartKompetanse.verdi?.fom.verdi
                                    ? redigerbartKompetanse.verdi?.fom.verdi
                                    : undefined
                            }
                            onEndret={årMåned => {
                                if (årMåned === redigerbartKompetanse.verdi.fom.verdi) {
                                    // fom ikke endret
                                    return;
                                }
                                validerOgSettRedigbartKompetanse({
                                    ...redigerbartKompetanse,
                                    verdi: {
                                        ...redigerbartKompetanse.verdi,
                                        fom: {
                                            ...redigerbartKompetanse.verdi?.fom,
                                            verdi: årMåned ? årMåned : '',
                                        },
                                    },
                                });
                            }}
                            feil={
                                skalViseFeilmeldinger() &&
                                redigerbartKompetanse.verdi.fom.valideringsstatus ===
                                    Valideringsstatus.FEIL
                                    ? redigerbartKompetanse.verdi.fom.feilmelding
                                    : ''
                            }
                        />
                        <MånedÅrVelger
                            lesevisning={lesevisning}
                            id={`periode_tom`}
                            label={'T.o.m (valgfri)'}
                            onEndret={årMåned => {
                                if (årMåned === redigerbartKompetanse.verdi.tom.verdi) {
                                    // tom ikke endret
                                    return;
                                }
                                validerOgSettRedigbartKompetanse({
                                    ...redigerbartKompetanse,
                                    verdi: {
                                        ...redigerbartKompetanse.verdi,
                                        tom: {
                                            ...redigerbartKompetanse.verdi?.tom,
                                            verdi: årMåned,
                                        },
                                    },
                                });
                            }}
                            antallÅrTilbake={2}
                            antallÅrFrem={99}
                            value={
                                redigerbartKompetanse.verdi?.tom.verdi
                                    ? redigerbartKompetanse.verdi?.tom.verdi
                                    : undefined
                            }
                            feil={
                                skalViseFeilmeldinger() &&
                                redigerbartKompetanse.verdi.tom.valideringsstatus ===
                                    Valideringsstatus.FEIL
                                    ? redigerbartKompetanse.verdi.tom.feilmelding
                                    : ''
                            }
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
                <FamilieLandvelger
                    erLesevisning={lesevisning}
                    id={'primærland'}
                    label={'Kompetent land (primærland)'}
                    eøs
                    medFlag
                    value={redigerbartKompetanse.verdi.primærland.verdi}
                    onChange={(value: Country) => {
                        validerOgSettRedigbartKompetanse({
                            ...redigerbartKompetanse,
                            verdi: {
                                ...redigerbartKompetanse.verdi,
                                primærland: {
                                    ...redigerbartKompetanse.verdi?.primærland,
                                    verdi: value.value,
                                },
                            },
                        });
                    }}
                    feil={
                        skalViseFeilmeldinger() &&
                        redigerbartKompetanse.verdi?.primærland?.valideringsstatus ===
                            Valideringsstatus.FEIL
                            ? redigerbartKompetanse.verdi.primærland?.feilmelding?.toString()
                            : ''
                    }
                />
                <FamilieLandvelger
                    erLesevisning={lesevisning}
                    id={'bostedadresse'}
                    label={'Differanseland (sekundærland)'}
                    eøs
                    medFlag
                    value={redigerbartKompetanse.verdi.sekundærland.verdi}
                    onChange={(value: Country) => {
                        validerOgSettRedigbartKompetanse({
                            ...redigerbartKompetanse,
                            verdi: {
                                ...redigerbartKompetanse.verdi,
                                sekundærland: {
                                    ...redigerbartKompetanse.verdi?.sekundærland,
                                    verdi: value.value,
                                },
                            },
                        });
                    }}
                    feil={
                        skalViseFeilmeldinger() &&
                        redigerbartKompetanse.verdi?.sekundærland?.valideringsstatus ===
                            Valideringsstatus.FEIL
                            ? redigerbartKompetanse.verdi.sekundærland?.feilmelding?.toString()
                            : ''
                    }
                />
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
                            promise.then(response => console.info(response));
                            //håndterEndringPåKompetanse(promise);
                        }}
                        id={kompetanseFeilmeldingId(redigerbartKompetanse)}
                        spinner={kompetanseSubmit === KompetanseSubmit.DELETE}
                        disabled={true || kompetanseSubmit === KompetanseSubmit.DELETE}
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
