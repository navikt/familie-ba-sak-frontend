import React, { useState } from 'react';

import styled from 'styled-components';

import navFarger from 'nav-frontend-core';
import { Radio } from 'nav-frontend-skjema';

import {
    FamilieCheckbox,
    FamilieKnapp,
    FamilieRadioGruppe,
    FamilieTextareaControlled,
} from '@navikt/familie-form-elements';
import { FeltState, Valideringsstatus } from '@navikt/familie-skjema';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../../../context/AppContext';
import { useBehandling } from '../../../../context/BehandlingContext';
import { useFagsakRessurser } from '../../../../context/FagsakContext';
import { validerVilkår } from '../../../../context/Vilkårsvurdering/validering';
import {
    useVilkårsvurdering,
    VilkårSubmit,
} from '../../../../context/Vilkårsvurdering/VilkårsvurderingContext';
import Slett from '../../../../ikoner/Slett';
import { BehandlingÅrsak } from '../../../../typer/behandling';
import { IFagsak } from '../../../../typer/fagsak';
import { IGrunnlagPerson } from '../../../../typer/person';
import { ToggleNavn } from '../../../../typer/toggles';
import {
    IPersonResultat,
    IVilkårConfig,
    IVilkårResultat,
    Resultat,
    resultater,
    VilkårType,
} from '../../../../typer/vilkår';
import IkonKnapp from '../../../Felleskomponenter/IkonKnapp/IkonKnapp';
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
    border-left: 1px solid ${navFarger.navBlaLighten20};
    padding-left: 2rem;
    .skjemagruppe.radiogruppe {
        margin-bottom: 0;
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
    const {
        vilkårsvurdering,
        putVilkår,
        deleteVilkår,
        vilkårSubmit,
        settVilkårSubmit,
    } = useVilkårsvurdering();

    const { erLesevisning, åpenBehandling } = useBehandling();
    const { settFagsak } = useFagsakRessurser();
    const { toggles } = useApp();
    const leseVisning = erLesevisning();
    const årsakErIkkeSøknad =
        åpenBehandling.status === RessursStatus.SUKSESS &&
        åpenBehandling.data.årsak !== BehandlingÅrsak.SØKNAD;

    const visAvslag = toggles[ToggleNavn.visAvslag];

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
                erEksplisittAvslagPåSøknad: undefined,
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

    const håndterEndringPåVilkårsvurdering = (promise: Promise<Ressurs<IFagsak>>) => {
        promise
            .then((oppdatertFagsak: Ressurs<IFagsak>) => {
                settVilkårSubmit(VilkårSubmit.NONE);
                if (oppdatertFagsak.status === RessursStatus.SUKSESS) {
                    settVisFeilmeldingerForEttVilkår(false);
                    settFagsak(oppdatertFagsak);
                    settEkspandertVilkår(false);
                } else if (
                    oppdatertFagsak.status === RessursStatus.FEILET ||
                    oppdatertFagsak.status === RessursStatus.FUNKSJONELL_FEIL ||
                    oppdatertFagsak.status === RessursStatus.IKKE_TILGANG
                ) {
                    settVisFeilmeldingerForEttVilkår(true);
                    settRedigerbartVilkår({
                        ...redigerbartVilkår,
                        valideringsstatus: Valideringsstatus.FEIL,
                        feilmelding: oppdatertFagsak.frontendFeilmelding,
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

    return (
        <Container>
            <FamilieRadioGruppe
                erLesevisning={leseVisning}
                verdi={
                    redigerbartVilkår.verdi.vilkårType === VilkårType.GIFT_PARTNERSKAP
                        ? vilkårResultatForEkteskapVisning(redigerbartVilkår.verdi.resultat.verdi)
                        : resultater[redigerbartVilkår.verdi.resultat.verdi]
                }
                legend={
                    vilkårFraConfig.spørsmål
                        ? vilkårFraConfig.spørsmål(person.type.toLowerCase())
                        : ''
                }
                feil={
                    redigerbartVilkår.verdi.resultat.valideringsstatus === Valideringsstatus.FEIL &&
                    skalViseFeilmeldinger()
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
            {visAvslag &&
                redigerbartVilkår.verdi.resultat.verdi === Resultat.IKKE_OPPFYLT &&
                !årsakErIkkeSøknad && (
                    <FamilieCheckbox
                        erLesevisning={false}
                        label={'Vurderingen er et avslag'}
                        checked={redigerbartVilkår.verdi.erEksplisittAvslagPåSøknad}
                        onChange={() => {
                            validerOgSettRedigerbartVilkår({
                                ...redigerbartVilkår,
                                verdi: {
                                    ...redigerbartVilkår.verdi,
                                    erEksplisittAvslagPåSøknad: !redigerbartVilkår.verdi
                                        .erEksplisittAvslagPåSøknad,
                                },
                            });
                        }}
                    />
                )}

            <VelgPeriode
                hjelpetekst={
                    redigerbartVilkår.verdi.erEksplisittAvslagPåSøknad
                        ? 'Oppgi datoen hvor vilkåret er oppfylt/ikke oppfylt. Virkningstidspunktet vil bli beregnet ut ifra dette. AVSLAGSTEKST HER' // TODO: Add
                        : 'Oppgi datoen hvor vilkåret er oppfylt/ikke oppfylt. Virkningstidspunktet vil bli beregnet ut ifra dette.'
                }
                redigerbartVilkår={redigerbartVilkår}
                validerOgSettRedigerbartVilkår={validerOgSettRedigerbartVilkår}
                visFeilmeldinger={skalViseFeilmeldinger()}
            />

            <FamilieTextareaControlled
                tekstLesevisning={''}
                erLesevisning={leseVisning}
                defaultValue={redigerbartVilkår.verdi.begrunnelse.verdi}
                id={vilkårBegrunnelseFeilmeldingId(redigerbartVilkår.verdi)}
                label={'Begrunnelse (valgfri)'}
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
                    knappPosisjon={'venstre'}
                    ikon={<Slett />}
                />
            </Knapperad>
        </Container>
    );
};

export default VilkårTabellRadEndre;
