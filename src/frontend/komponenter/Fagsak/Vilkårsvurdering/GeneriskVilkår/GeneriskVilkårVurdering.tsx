import {
    FamilieKnapp,
    FamilieRadioGruppe,
    FamilieTextareaControlled,
} from '@navikt/familie-form-elements';
import deepEqual from 'deep-equal';
import { Radio } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { useState } from 'react';
import { useBehandling } from '../../../../context/BehandlingContext';
import { validerVilkår } from '../../../../context/Vilkårsvurdering/validering';
import {
    useVilkårsvurdering,
    VilkårSubmit,
} from '../../../../context/Vilkårsvurdering/VilkårsvurderingContext';
import Slett from '../../../../ikoner/Slett';
import { periodeToString } from '../../../../typer/periode';
import { IGrunnlagPerson } from '../../../../typer/person';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';
import {
    IPersonResultat,
    IVilkårConfig,
    IVilkårResultat,
    Resultat,
    resultater,
    resultatTilUi,
    VilkårType,
} from '../../../../typer/vilkår';
import IkonKnapp from '../../../Felleskomponenter/IkonKnapp/IkonKnapp';
import FastsettPeriode from './FastsettPeriode/FastsettPeriode';
import {
    vilkårBegrunnelseFeilmeldingId,
    vilkårFeilmeldingId,
    vilkårResultatFeilmeldingId,
} from './GeneriskVilkår';
import AutomatiskVurdering from '../../../../ikoner/AutomatiskVurdering';
import ManuellVurdering from '../../../../ikoner/ManuellVurdering';
import { datoformat } from '../../../../utils/formatter';
import moment from 'moment';
import VilkårResultatIkon from '../../../../ikoner/VilkårResultatIkon';
import FamilieChevron from '../../../../ikoner/FamilieChevron';
import { IFagsak } from '../../../../typer/fagsak';
import { useFagsakRessurser } from '../../../../context/FagsakContext';
import { FeltState, Valideringsstatus } from '../../../../familie-skjema/typer';

interface IProps {
    person: IGrunnlagPerson;
    vilkårFraConfig: IVilkårConfig;
    vilkårResultat: FeltState<IVilkårResultat>;
    visFeilmeldinger: boolean;
}

const GeneriskVilkårVurdering: React.FC<IProps> = ({
    person,
    vilkårFraConfig,
    vilkårResultat,
    visFeilmeldinger,
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
    const leseVisning = erLesevisning();

    const [ekspandertVilkår, settEkspandertVilkår] = useState(
        erLesevisning() || false || vilkårResultat.value.resultat.value === Resultat.KANSKJE
    );
    const [visFeilmeldingerForEttVilkår, settVisFeilmeldingerForEttVilkår] = useState(false);

    const [redigerbartVilkår, settRedigerbartVilkår] = useState<FeltState<IVilkårResultat>>(
        vilkårResultat
    );

    const validerOgSettRedigerbartVilkår = (endretVilkår: FeltState<IVilkårResultat>) => {
        settRedigerbartVilkår(validerVilkår(endretVilkår));
    };

    const radioOnChange = (resultat: Resultat) => {
        validerOgSettRedigerbartVilkår({
            ...redigerbartVilkår,
            value: {
                ...redigerbartVilkår.value,
                resultat: {
                    ...redigerbartVilkår.value.resultat,
                    value: resultat,
                },
            },
        });
    };

    const toggleForm = (visAlert: boolean) => {
        if (ekspandertVilkår && visAlert && !deepEqual(vilkårResultat, redigerbartVilkår)) {
            alert('Vurderingen har endringer som ikke er lagret!');
        } else {
            settEkspandertVilkår(!ekspandertVilkår);
            settRedigerbartVilkår(vilkårResultat);
        }
    };

    const skalViseFeilmeldinger = () => {
        return visFeilmeldinger || visFeilmeldingerForEttVilkår;
    };

    const onClickVilkårFerdig = () => {
        const validertVilkår = redigerbartVilkår.valider(redigerbartVilkår, person);

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
                } else if (oppdatertFagsak.status === RessursStatus.FEILET) {
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
        if (resultat === Resultat.JA) {
            return resultater[Resultat.NEI].navn;
        } else if (resultat === Resultat.NEI) return resultater[Resultat.JA].navn;
        else {
            return resultater[Resultat.KANSKJE].navn;
        }
    };

    return (
        <tbody>
            <tr className={ekspandertVilkår ? 'ekspandert' : ''}>
                <td>
                    <div className={'vurdering'}>
                        <VilkårResultatIkon
                            resultat={vilkårResultat.value.resultat.value}
                            width={20}
                            heigth={20}
                        />
                        <Normaltekst
                            children={resultatTilUi(vilkårResultat.value.resultat.value)}
                        />
                    </div>
                </td>
                <td>
                    <Normaltekst children={periodeToString(vilkårResultat.value.periode.value)} />
                </td>
                <td>
                    <Normaltekst
                        className={'beskrivelse'}
                        children={vilkårResultat.value.begrunnelse.value}
                    />
                </td>
                <td>
                    <IkonKnapp
                        erLesevisning={erLesevisning()}
                        onClick={() => toggleForm(true)}
                        id={vilkårFeilmeldingId(vilkårResultat.value)}
                        label={
                            !ekspandertVilkår
                                ? vilkårResultat.value.resultat.value === Resultat.KANSKJE
                                    ? 'Vurder'
                                    : 'Endre'
                                : 'Lukk'
                        }
                        mini={true}
                        ikon={<FamilieChevron retning={ekspandertVilkår ? 'opp' : 'ned'} />}
                    />
                </td>
                <td>
                    {vilkårResultat.value.endretAv === 'VL' ? (
                        <AutomatiskVurdering />
                    ) : (
                        <ManuellVurdering />
                    )}
                </td>
                <td>
                    <i>
                        {åpenBehandling.status === RessursStatus.SUKSESS &&
                        vilkårResultat.value.erVurdert
                            ? vilkårResultat.value.behandlingId === åpenBehandling.data.behandlingId
                                ? 'Vurdert i denne behandlingen'
                                : `Vurdert ${moment(vilkårResultat.value.endretTidspunkt).format(
                                      datoformat.DATO_FORKORTTET
                                  )}`
                            : ''}
                    </i>
                </td>
            </tr>

            {ekspandertVilkår && (
                <tr>
                    <td colSpan={6} className={'td-ekspandert'}>
                        <div className={'endre-vilkår'}>
                            <FamilieRadioGruppe
                                erLesevisning={leseVisning}
                                verdi={
                                    redigerbartVilkår.value.vilkårType ===
                                    VilkårType.GIFT_PARTNERSKAP
                                        ? vilkårResultatForEkteskapVisning(
                                              redigerbartVilkår.value.resultat.value
                                          )
                                        : resultater[redigerbartVilkår.value.resultat.value].navn
                                }
                                legend={
                                    vilkårFraConfig.spørsmål
                                        ? vilkårFraConfig.spørsmål(person.type.toLowerCase())
                                        : ''
                                }
                                feil={
                                    redigerbartVilkår.value.resultat.valideringsstatus ===
                                        Valideringsstatus.FEIL && skalViseFeilmeldinger()
                                        ? redigerbartVilkår.value.resultat.feilmelding
                                        : ''
                                }
                                feilmeldingId={vilkårResultatFeilmeldingId(redigerbartVilkår.value)}
                            >
                                <Radio
                                    label={'Ja'}
                                    name={`${redigerbartVilkår.value.vilkårType}_${redigerbartVilkår.value.id}`}
                                    checked={
                                        redigerbartVilkår.value.vilkårType ===
                                        VilkårType.GIFT_PARTNERSKAP
                                            ? redigerbartVilkår.value.resultat.value ===
                                              Resultat.NEI
                                            : redigerbartVilkår.value.resultat.value === Resultat.JA
                                    }
                                    onChange={() =>
                                        radioOnChange(
                                            redigerbartVilkår.value.vilkårType ===
                                                VilkårType.GIFT_PARTNERSKAP
                                                ? Resultat.NEI
                                                : Resultat.JA
                                        )
                                    }
                                />
                                <Radio
                                    label={'Nei'}
                                    name={`${redigerbartVilkår.value.vilkårType}_${redigerbartVilkår.value.id}`}
                                    checked={
                                        redigerbartVilkår.value.vilkårType ===
                                        VilkårType.GIFT_PARTNERSKAP
                                            ? redigerbartVilkår.value.resultat.value === Resultat.JA
                                            : redigerbartVilkår.value.resultat.value ===
                                              Resultat.NEI
                                    }
                                    onChange={() =>
                                        radioOnChange(
                                            redigerbartVilkår.value.vilkårType ===
                                                VilkårType.GIFT_PARTNERSKAP
                                                ? Resultat.JA
                                                : Resultat.NEI
                                        )
                                    }
                                />
                            </FamilieRadioGruppe>

                            <FastsettPeriode
                                hjelpetekst={
                                    'Oppgi datoen hvor vilkåret er oppfylt/ikke oppfylt. Virkningstidspunktet vil bli beregnet ut ifra dette.'
                                }
                                redigerbartVilkår={redigerbartVilkår}
                                validerOgSettRedigerbartVilkår={validerOgSettRedigerbartVilkår}
                                visFeilmeldinger={skalViseFeilmeldinger()}
                            />

                            <FamilieTextareaControlled
                                tekstLesevisning={''}
                                erLesevisning={leseVisning}
                                defaultValue={redigerbartVilkår.value.begrunnelse.value}
                                id={vilkårBegrunnelseFeilmeldingId(redigerbartVilkår.value)}
                                label={'Begrunnelse (valgfri)'}
                                placeholder={'Begrunn hvorfor det er gjort endringer på vilkåret.'}
                                textareaClass={'begrunnelse'}
                                value={redigerbartVilkår.value.begrunnelse.value}
                                feil={
                                    redigerbartVilkår.value.begrunnelse.valideringsstatus ===
                                        Valideringsstatus.FEIL && skalViseFeilmeldinger()
                                        ? redigerbartVilkår.value.begrunnelse.feilmelding
                                        : ''
                                }
                                onBlur={(event: React.FocusEvent<HTMLTextAreaElement>) => {
                                    validerOgSettRedigerbartVilkår({
                                        ...redigerbartVilkår,
                                        value: {
                                            ...redigerbartVilkår.value,
                                            begrunnelse: {
                                                ...redigerbartVilkår.value.begrunnelse,
                                                value: event?.target.value,
                                            },
                                        },
                                    });
                                }}
                            />

                            <div className={'knapperad'}>
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
                                            redigerbartVilkår.value.id
                                        );
                                        håndterEndringPåVilkårsvurdering(promise);
                                    }}
                                    id={vilkårFeilmeldingId(vilkårResultat.value)}
                                    spinner={vilkårSubmit === VilkårSubmit.DELETE}
                                    disabled={vilkårSubmit === VilkårSubmit.DELETE}
                                    mini={true}
                                    label={'Fjern'}
                                    knappPosisjon={'venstre'}
                                    ikon={<Slett />}
                                />
                            </div>
                        </div>
                    </td>
                </tr>
            )}
        </tbody>
    );
};

export default GeneriskVilkårVurdering;
