import React, { ReactNode, useState } from 'react';

import styled from 'styled-components';

import navFarger from 'nav-frontend-core';
import { CheckboxGruppe, Radio, SkjemaGruppe } from 'nav-frontend-skjema';

import { Delete } from '@navikt/ds-icons';
import {
    FamilieKnapp,
    FamilieRadioGruppe,
    FamilieSelect,
    FamilieTextareaControlled,
} from '@navikt/familie-form-elements';
import { FeltState, Valideringsstatus } from '@navikt/familie-skjema';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../../../context/AppContext';
import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import { validerVilkår } from '../../../../context/Vilkårsvurdering/validering';
import {
    useVilkårsvurdering,
    VilkårSubmit,
} from '../../../../context/Vilkårsvurdering/VilkårsvurderingContext';
import { BehandlingÅrsak, IBehandling } from '../../../../typer/behandling';
import { IGrunnlagPerson } from '../../../../typer/person';
import { ToggleNavn } from '../../../../typer/toggles';
import {
    IPersonResultat,
    IVilkårConfig,
    IVilkårResultat,
    Regelverk,
    Resultat,
    resultater,
    VilkårType,
} from '../../../../typer/vilkår';
import { alleRegelverk } from '../../../../utils/vilkår';
import IkonKnapp, { IkonPosisjon } from '../../../Felleskomponenter/IkonKnapp/IkonKnapp';
import AvslagSkjema from './AvslagSkjema';
import DeltBostedCheckbox from './DeltBostedCheckbox';
import MedlemskapCheckbox from './MedlemskapCheckbox';
import SkjønnsvurderingCheckbox from './SkjønnsvurderingCheckbox';
import VelgPeriode from './VelgPeriode';
import {
    vilkårBegrunnelseFeilmeldingId,
    vilkårFeilmeldingId,
    vilkårResultatFeilmeldingId,
} from './VilkårTabell';

interface IProps {
    person: IGrunnlagPerson;
    vilkårFraConfig: IVilkårConfig;
    vilkårResultat: FeltState<IVilkårResultat>;
    visFeilmeldinger: boolean;
    toggleForm: (visAlert: boolean) => void;
    redigerbartVilkår: FeltState<IVilkårResultat>;
    settRedigerbartVilkår: (redigerbartVilkår: FeltState<IVilkårResultat>) => void;
    settEkspandertVilkår: (ekspandertVilkår: boolean) => void;
}

const Container = styled.div`
    max-width: 30rem;
    border-left: 0.0625rem solid ${navFarger.navBla};
    padding-left: 2rem;
    .skjemagruppe.radiogruppe {
        margin-bottom: 0 !important;
    }
    .begrunnelse-textarea {
        min-height: 8rem !important;
    }
`;

const Knapperad = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;
`;

const VilkårTabellRadEndre: React.FC<IProps> = ({
    person,
    vilkårFraConfig,
    vilkårResultat,
    visFeilmeldinger,
    toggleForm,
    redigerbartVilkår,
    settRedigerbartVilkår,
    settEkspandertVilkår,
}) => {
    const { toggles } = useApp();

    const { vilkårsvurdering, putVilkår, deleteVilkår, vilkårSubmit, settVilkårSubmit } =
        useVilkårsvurdering();

    const { erLesevisning, åpenBehandling, settÅpenBehandling } = useBehandling();
    const leseVisning = erLesevisning();
    const årsakErSøknad =
        åpenBehandling.status !== RessursStatus.SUKSESS ||
        åpenBehandling.data.årsak === BehandlingÅrsak.SØKNAD;

    const [visFeilmeldingerForEttVilkår, settVisFeilmeldingerForEttVilkår] = useState(false);

    const validerOgSettRedigerbartVilkår = (endretVilkår: FeltState<IVilkårResultat>) => {
        settRedigerbartVilkår(validerVilkår(endretVilkår, { person }));
    };

    const radioOnChange = (resultat: Resultat) => {
        validerOgSettRedigerbartVilkår({
            ...redigerbartVilkår,
            verdi: {
                ...redigerbartVilkår.verdi,
                resultat: {
                    ...redigerbartVilkår.verdi.resultat,
                    verdi: resultat,
                },
                erEksplisittAvslagPåSøknad: false,
                avslagBegrunnelser: {
                    ...redigerbartVilkår.verdi.avslagBegrunnelser,
                    verdi: [],
                },
            },
        });
    };

    const skalViseFeilmeldinger = () => {
        return visFeilmeldinger || visFeilmeldingerForEttVilkår;
    };

    const onClickVilkårFerdig = () => {
        const validertVilkår = redigerbartVilkår.valider(redigerbartVilkår, { person });

        const vilkårsvurderingForPerson = vilkårsvurdering.find(
            (personResultat: IPersonResultat) => personResultat.personIdent === person.personIdent
        );

        lagreVilkår(validertVilkår, vilkårsvurderingForPerson);
    };

    const lagreVilkår = (
        validertVilkår: FeltState<IVilkårResultat>,
        vilkårsvurderingForPerson: IPersonResultat | undefined
    ) => {
        if (
            vilkårsvurderingForPerson &&
            validertVilkår.valideringsstatus === Valideringsstatus.OK
        ) {
            const promise = putVilkår(vilkårsvurderingForPerson, redigerbartVilkår);
            håndterEndringPåVilkårsvurdering(promise);
        } else {
            settRedigerbartVilkår(validertVilkår);
            settVisFeilmeldingerForEttVilkår(true);
        }
    };

    const håndterEndringPåVilkårsvurdering = (promise: Promise<Ressurs<IBehandling>>) => {
        promise
            .then((oppdatertBehandling: Ressurs<IBehandling>) => {
                settVilkårSubmit(VilkårSubmit.NONE);
                if (oppdatertBehandling.status === RessursStatus.SUKSESS) {
                    settVisFeilmeldingerForEttVilkår(false);
                    settÅpenBehandling(oppdatertBehandling);
                    settEkspandertVilkår(false);
                } else if (
                    oppdatertBehandling.status === RessursStatus.FEILET ||
                    oppdatertBehandling.status === RessursStatus.FUNKSJONELL_FEIL ||
                    oppdatertBehandling.status === RessursStatus.IKKE_TILGANG
                ) {
                    settVisFeilmeldingerForEttVilkår(true);
                    settRedigerbartVilkår({
                        ...redigerbartVilkår,
                        valideringsstatus: Valideringsstatus.FEIL,
                        feilmelding: oppdatertBehandling.frontendFeilmelding,
                    });
                } else {
                    settVisFeilmeldingerForEttVilkår(true);
                    settRedigerbartVilkår({
                        ...redigerbartVilkår,
                        valideringsstatus: Valideringsstatus.FEIL,
                        feilmelding:
                            'En ukjent feil har oppstått, vi har ikke klart å lagre endringen.',
                    });
                }
            })
            .catch(() => {
                settVilkårSubmit(VilkårSubmit.NONE);
                settRedigerbartVilkår({
                    ...redigerbartVilkår,
                    valideringsstatus: Valideringsstatus.FEIL,
                    feilmelding:
                        'En ukjent feil har oppstått, vi har ikke klart å lagre endringen.',
                });
                settVisFeilmeldingerForEttVilkår(true);
            });
    };

    const vilkårResultatForEkteskapVisning = (resultat: Resultat) => {
        if (resultat === Resultat.OPPFYLT) {
            return resultater[Resultat.IKKE_OPPFYLT];
        } else if (resultat === Resultat.IKKE_OPPFYLT) return resultater[Resultat.OPPFYLT];
        else {
            return resultater[Resultat.IKKE_VURDERT];
        }
    };

    const erBegrunnelsePåkrevd = (): boolean =>
        redigerbartVilkår.verdi.vilkårType === VilkårType.UTVIDET_BARNETRYGD ||
        redigerbartVilkår.verdi.erSkjønnsmessigVurdert ||
        redigerbartVilkår.verdi.erMedlemskapVurdert ||
        (toggles[ToggleNavn.brukErDeltBosted] && redigerbartVilkår.verdi.erDeltBosted);

    return (
        <SkjemaGruppe
            feil={redigerbartVilkår.feilmelding !== '' ? redigerbartVilkår.feilmelding : undefined}
            utenFeilPropagering={true}
        >
            <Container>
                <FamilieRadioGruppe
                    erLesevisning={leseVisning}
                    verdi={
                        redigerbartVilkår.verdi.vilkårType === VilkårType.GIFT_PARTNERSKAP
                            ? vilkårResultatForEkteskapVisning(
                                  redigerbartVilkår.verdi.resultat.verdi
                              )
                            : resultater[redigerbartVilkår.verdi.resultat.verdi]
                    }
                    legend={
                        vilkårFraConfig.spørsmål
                            ? vilkårFraConfig.spørsmål(person.type.toLowerCase())
                            : ''
                    }
                    feil={
                        redigerbartVilkår.verdi.resultat.valideringsstatus ===
                            Valideringsstatus.FEIL && skalViseFeilmeldinger()
                            ? redigerbartVilkår.verdi.resultat.feilmelding
                            : ''
                    }
                    feilmeldingId={vilkårResultatFeilmeldingId(redigerbartVilkår.verdi)}
                >
                    <Radio
                        label={'Ja'}
                        name={`${redigerbartVilkår.verdi.vilkårType}_${redigerbartVilkår.verdi.id}`}
                        checked={
                            redigerbartVilkår.verdi.vilkårType === VilkårType.GIFT_PARTNERSKAP
                                ? redigerbartVilkår.verdi.resultat.verdi === Resultat.IKKE_OPPFYLT
                                : redigerbartVilkår.verdi.resultat.verdi === Resultat.OPPFYLT
                        }
                        onChange={() =>
                            radioOnChange(
                                redigerbartVilkår.verdi.vilkårType === VilkårType.GIFT_PARTNERSKAP
                                    ? Resultat.IKKE_OPPFYLT
                                    : Resultat.OPPFYLT
                            )
                        }
                    />
                    <Radio
                        label={'Nei'}
                        name={`${redigerbartVilkår.verdi.vilkårType}_${redigerbartVilkår.verdi.id}`}
                        checked={
                            redigerbartVilkår.verdi.vilkårType === VilkårType.GIFT_PARTNERSKAP
                                ? redigerbartVilkår.verdi.resultat.verdi === Resultat.OPPFYLT
                                : redigerbartVilkår.verdi.resultat.verdi === Resultat.IKKE_OPPFYLT
                        }
                        onChange={() =>
                            radioOnChange(
                                redigerbartVilkår.verdi.vilkårType === VilkårType.GIFT_PARTNERSKAP
                                    ? Resultat.OPPFYLT
                                    : Resultat.IKKE_OPPFYLT
                            )
                        }
                    />
                </FamilieRadioGruppe>

                {toggles[ToggleNavn.brukEøs] && redigerbartVilkår.verdi.vurderesEtter !== null && (
                    <FamilieSelect
                        erLesevisning={erLesevisning()}
                        lesevisningVerdi={
                            redigerbartVilkår.verdi.vurderesEtter
                                ? alleRegelverk[redigerbartVilkår.verdi.vurderesEtter].tekst
                                : 'Generell vurdering'
                        }
                        value={redigerbartVilkår.verdi.vurderesEtter}
                        label={'Vurderes etter'}
                        onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
                            settRedigerbartVilkår({
                                ...redigerbartVilkår,
                                verdi: {
                                    ...redigerbartVilkår.verdi,
                                    vurderesEtter: event.target.value as Regelverk,
                                },
                            });
                        }}
                    >
                        {Object.entries(alleRegelverk).map(
                            ([regelverk, { tekst }]: [
                                string,
                                { tekst: string; symbol: ReactNode }
                            ]) => {
                                return (
                                    <option
                                        key={regelverk}
                                        aria-selected={
                                            vilkårResultat.verdi.vurderesEtter === regelverk
                                        }
                                        value={regelverk}
                                    >
                                        {tekst}
                                    </option>
                                );
                            }
                        )}
                    </FamilieSelect>
                )}

                {redigerbartVilkår.verdi.vilkårType !== VilkårType.UTVIDET_BARNETRYGD && (
                    <CheckboxGruppe legend={'Utdypende vilkårsvurdering'}>
                        <SkjønnsvurderingCheckbox
                            redigerbartVilkår={redigerbartVilkår}
                            settRedigerbartVilkår={settRedigerbartVilkår}
                            settVisFeilmeldingerForEttVilkår={settVisFeilmeldingerForEttVilkår}
                        />

                        {redigerbartVilkår.verdi.vilkårType === VilkårType.BOSATT_I_RIKET && (
                            <MedlemskapCheckbox
                                redigerbartVilkår={redigerbartVilkår}
                                settRedigerbartVilkår={settRedigerbartVilkår}
                                settVisFeilmeldingerForEttVilkår={settVisFeilmeldingerForEttVilkår}
                            />
                        )}
                        {toggles[ToggleNavn.brukErDeltBosted] &&
                            redigerbartVilkår.verdi.vilkårType === VilkårType.BOR_MED_SØKER && (
                                <DeltBostedCheckbox
                                    redigerbartVilkår={redigerbartVilkår}
                                    settRedigerbartVilkår={settRedigerbartVilkår}
                                    settVisFeilmeldingerForEttVilkår={
                                        settVisFeilmeldingerForEttVilkår
                                    }
                                />
                            )}
                    </CheckboxGruppe>
                )}
                {redigerbartVilkår.verdi.resultat.verdi === Resultat.IKKE_OPPFYLT &&
                    årsakErSøknad && (
                        <AvslagSkjema
                            redigerbartVilkår={redigerbartVilkår}
                            settRedigerbartVilkår={settRedigerbartVilkår}
                            visFeilmeldinger={skalViseFeilmeldinger()}
                            settVisFeilmeldingerForEttVilkår={settVisFeilmeldingerForEttVilkår}
                        />
                    )}
                <VelgPeriode
                    redigerbartVilkår={redigerbartVilkår}
                    validerOgSettRedigerbartVilkår={validerOgSettRedigerbartVilkår}
                    visFeilmeldinger={skalViseFeilmeldinger()}
                />
                <FamilieTextareaControlled
                    tekstLesevisning={''}
                    erLesevisning={leseVisning}
                    defaultValue={redigerbartVilkår.verdi.begrunnelse.verdi}
                    id={vilkårBegrunnelseFeilmeldingId(redigerbartVilkår.verdi)}
                    label={`Begrunnelse ${erBegrunnelsePåkrevd() ? '' : '(valgfri)'}`}
                    textareaClass={'begrunnelse-textarea'}
                    placeholder={'Begrunn hvorfor det er gjort endringer på vilkåret.'}
                    value={redigerbartVilkår.verdi.begrunnelse.verdi}
                    feil={
                        redigerbartVilkår.verdi.begrunnelse.valideringsstatus ===
                            Valideringsstatus.FEIL && skalViseFeilmeldinger()
                            ? redigerbartVilkår.verdi.begrunnelse.feilmelding
                            : ''
                    }
                    onBlur={(event: React.FocusEvent<HTMLTextAreaElement>) => {
                        validerOgSettRedigerbartVilkår({
                            ...redigerbartVilkår,
                            verdi: {
                                ...redigerbartVilkår.verdi,
                                begrunnelse: {
                                    ...redigerbartVilkår.verdi.begrunnelse,
                                    verdi: event?.target.value,
                                },
                            },
                        });
                    }}
                />
                <Knapperad>
                    <div>
                        <FamilieKnapp
                            erLesevisning={leseVisning}
                            onClick={onClickVilkårFerdig}
                            mini={true}
                            type={'standard'}
                            spinner={vilkårSubmit === VilkårSubmit.PUT}
                            disabled={vilkårSubmit === VilkårSubmit.PUT}
                        >
                            Ferdig
                        </FamilieKnapp>
                        <FamilieKnapp
                            style={{ marginLeft: '1rem' }}
                            erLesevisning={leseVisning}
                            onClick={() => toggleForm(false)}
                            mini={true}
                            type={'flat'}
                        >
                            Avbryt
                        </FamilieKnapp>
                    </div>

                    <IkonKnapp
                        erLesevisning={erLesevisning()}
                        onClick={() => {
                            const promise = deleteVilkår(
                                person.personIdent,
                                redigerbartVilkår.verdi.id
                            );
                            håndterEndringPåVilkårsvurdering(promise);
                        }}
                        id={vilkårFeilmeldingId(vilkårResultat.verdi)}
                        spinner={vilkårSubmit === VilkårSubmit.DELETE}
                        disabled={vilkårSubmit === VilkårSubmit.DELETE}
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

export default VilkårTabellRadEndre;
