import React, { useState } from 'react';

import styled from 'styled-components';

import { Delete } from '@navikt/ds-icons';
import { Alert } from '@navikt/ds-react';
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
import { useEøs } from '../../../../context/Eøs/EøsContext';
import { KompetanseSubmit } from '../../../../context/Kompetanse/KompetanseContext';
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
    EøsPeriodeStatus,
} from '../../../../typer/eøsPerioder';
import IkonKnapp, { IkonPosisjon } from '../../../Felleskomponenter/IkonKnapp/IkonKnapp';
import EndreKompetansePeriode from './EndreKompetansePeriode';
import FamilieLandvelger from './FamilieLandvelger';
import { kompetanseFeilmeldingId } from './KompetanseSkjema';

const Container = styled.div`
    max-width: 30rem;
    border-left: 0.0625rem solid var(--navds-global-color-orange-500);
    padding-left: 2rem;
`;

const Knapperad = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;
    margin-top: 2rem;
`;

const StyledFamilieLandvelger = styled(FamilieLandvelger)`
    & .c-countrySelect__select__indicator-separator {
        width: 1px !important;
        background-color: var(--navds-global-color-gray-300);
    }
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
    const { kompetanseSubmit, putKompetanse, deleteKompetanse, settKompetanseSubmit } = useEøs();
    const lesevisning = erLesevisning(true);

    const valgteBarn = redigerbartKompetanse.verdi?.barnIdenter.verdi.map(barn => {
        const tilBarn = tilgjengeligeBarn.find(opt => {
            return opt.value.match(barn);
        });
        if (tilBarn) {
            return tilBarn;
        } else {
            throw new Error(
                'Skulle ikke være mulig å velge et barn, som ikke eksisterer i original kompetanse'
            );
        }
    });

    const [visFeilmeldingerForEnKompetanse, settVisFeilmeldingerForEnKompetanse] = useState(false);

    const skalViseFeilmeldinger = () => {
        return visFeilmeldinger || visFeilmeldingerForEnKompetanse;
    };

    const validerOgSettRedigerbartKompetanse = (endretKompetanse: FeltState<IKompetanse>) => {
        settRedigerbartKompetanse(validerKompetanse(endretKompetanse));
    };

    const onEndretBarn = (valgteOptions: OptionType[]) => {
        validerOgSettRedigerbartKompetanse({
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
                    settRedigerbartKompetanse({
                        ...redigerbartKompetanse,
                        valideringsstatus: Valideringsstatus.FEIL,
                        feilmelding: respons.frontendFeilmelding,
                    });
                    settVisFeilmeldingerForEnKompetanse(true);
                } else {
                    settRedigerbartKompetanse({
                        ...redigerbartKompetanse,
                        valideringsstatus: Valideringsstatus.FEIL,
                        feilmelding:
                            'En ukjent feil har oppstått, vi har ikke klart å lagre endringen.',
                    });
                    settVisFeilmeldingerForEnKompetanse(true);
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

    const toPrimærland =
        redigerbartKompetanse.verdi.resultat?.verdi === KompetanseResultat.TO_PRIMÆRLAND;

    return (
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
            <EndreKompetansePeriode
                lesevisning={lesevisning}
                visFeilmeldinger={skalViseFeilmeldinger()}
                redigerbartKompetanse={redigerbartKompetanse}
                validerOgSettRedigerbartKompetanse={validerOgSettRedigerbartKompetanse}
            />

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
                    validerOgSettRedigerbartKompetanse({
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
                    validerOgSettRedigerbartKompetanse({
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
            <StyledFamilieLandvelger
                erLesevisning={lesevisning}
                id={'annenForeldersAktivitetsland'}
                label={'Annen forelders aktivitetsland'}
                kunEøs
                medFlag
                kanNullstilles
                value={redigerbartKompetanse.verdi?.annenForeldersAktivitetsland?.verdi}
                onChange={(value: Country) => {
                    const nyVerdi = value ? value.value : undefined;
                    validerOgSettRedigerbartKompetanse({
                        ...redigerbartKompetanse,
                        verdi: {
                            ...redigerbartKompetanse.verdi,
                            annenForeldersAktivitetsland: {
                                ...redigerbartKompetanse.verdi?.annenForeldersAktivitetsland,
                                verdi: nyVerdi,
                            },
                        },
                    });
                }}
                feil={
                    skalViseFeilmeldinger() &&
                    redigerbartKompetanse.verdi?.annenForeldersAktivitetsland?.valideringsstatus ===
                        Valideringsstatus.FEIL
                        ? redigerbartKompetanse.verdi.annenForeldersAktivitetsland?.feilmelding?.toString()
                        : ''
                }
            />
            <StyledFamilieLandvelger
                erLesevisning={lesevisning}
                id={'bostedadresse'}
                label={'Barnets bostedsland'}
                kunEøs
                medFlag
                kanNullstilles
                value={redigerbartKompetanse.verdi?.barnetsBostedsland?.verdi}
                onChange={(value: Country) => {
                    const nyVerdi = value ? value.value : undefined;
                    validerOgSettRedigerbartKompetanse({
                        ...redigerbartKompetanse,
                        verdi: {
                            ...redigerbartKompetanse.verdi,
                            barnetsBostedsland: {
                                ...redigerbartKompetanse.verdi?.barnetsBostedsland,
                                verdi: nyVerdi,
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
                    validerOgSettRedigerbartKompetanse({
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
            {toPrimærland && (
                <Alert
                    variant={'warning'}
                    inline
                    size={'small'}
                    children={
                        'Norge og annen forelders aktivitetsland er primærland. Saksbehandler må manuelt vurdere om Norge skal utbetale barnetrygden.'
                    }
                />
            )}
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

                {redigerbartKompetanse.verdi.status !== EøsPeriodeStatus.IKKE_UTFYLT && (
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
                )}
            </Knapperad>
        </Container>
    );
};

export default KompetanseTabellRadEndre;
