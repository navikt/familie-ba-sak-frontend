import {
    FamilieKnapp,
    FamilieRadioGruppe,
    FamilieTextareaControlled,
} from '@navikt/familie-form-elements';
import deepEqual from 'deep-equal';
import Chevron from 'nav-datovelger/lib/elementer/ChevronSvg';
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
import { IFelt, Valideringsstatus } from '../../../../typer/felt';
import { periodeToString } from '../../../../typer/periode';
import { IPerson } from '../../../../typer/person';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';
import {
    IPersonResultat,
    IRestPersonResultat,
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

interface IProps {
    person: IPerson;
    vilkårFraConfig: IVilkårConfig;
    vilkårResultat: IFelt<IVilkårResultat>;
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
        settVilkårsvurderingFraApi,
        putVilkår,
        deleteVilkår,
        vilkårSubmit,
        settVilkårSubmit,
    } = useVilkårsvurdering();

    const { erLesevisning, åpenBehandling } = useBehandling();
    const leseVisning = erLesevisning();

    const [ekspandertVilkår, settEkspandertVilkår] = useState(
        erLesevisning() || false || vilkårResultat.verdi.resultat.verdi === Resultat.KANSKJE
    );
    const [visFeilmeldingerForEttVilkår, settVisFeilmeldingerForEttVilkår] = useState(false);

    const [redigerbartVilkår, settRedigerbartVilkår] = useState<IFelt<IVilkårResultat>>(
        vilkårResultat
    );

    const validerOgSettRedigerbartVilkår = (endretVilkår: IFelt<IVilkårResultat>) => {
        settRedigerbartVilkår(validerVilkår(endretVilkår));
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
        const validertVilkår = redigerbartVilkår.valideringsFunksjon(redigerbartVilkår, person);

        const vilkårsvurderingForPerson = vilkårsvurdering.find(
            (personResultat: IPersonResultat) => personResultat.personIdent === person.personIdent
        );

        lagreVilkår(validertVilkår, vilkårsvurderingForPerson);
    };

    const lagreVilkår = (
        validertVilkår: IFelt<IVilkårResultat>,
        vilkårsvurderingForPerson: IPersonResultat | undefined
    ) => {
        if (
            vilkårsvurderingForPerson &&
            validertVilkår.valideringsstatus === Valideringsstatus.OK
        ) {
            const promise = putVilkår(vilkårsvurderingForPerson, redigerbartVilkår);
            håndterEndringPåVilkårsvurdering(promise);
        } else {
            settVisFeilmeldingerForEttVilkår(true);
            settRedigerbartVilkår(validertVilkår);
        }
    };

    const håndterEndringPåVilkårsvurdering = (promise: Promise<Ressurs<IRestPersonResultat[]>>) => {
        promise
            .then((nyVilkårsvurdering: Ressurs<IRestPersonResultat[]>) => {
                settVilkårSubmit(VilkårSubmit.NONE);
                if (nyVilkårsvurdering.status === RessursStatus.SUKSESS) {
                    settVilkårsvurderingFraApi(nyVilkårsvurdering.data);
                    settEkspandertVilkår(false);
                    settVisFeilmeldingerForEttVilkår(false);
                } else if (nyVilkårsvurdering.status === RessursStatus.FEILET) {
                    settVisFeilmeldingerForEttVilkår(true);
                    settRedigerbartVilkår({
                        ...redigerbartVilkår,
                        valideringsstatus: Valideringsstatus.FEIL,
                        feilmelding: nyVilkårsvurdering.frontendFeilmelding,
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
                settVisFeilmeldingerForEttVilkår(true);
                settRedigerbartVilkår({
                    ...redigerbartVilkår,
                    valideringsstatus: Valideringsstatus.FEIL,
                    feilmelding:
                        'En ukjent feil har oppstått, vi har ikke klart å lagre endringen.',
                });
            });
    };

    return (
        <tbody>
            <tr className={ekspandertVilkår ? 'ekspandert' : ''}>
                <td>
                    <div className={'vurdering'}>
                        <VilkårResultatIkon
                            resultat={vilkårResultat.verdi.resultat.verdi}
                            width={20}
                            heigth={20}
                        />
                        <Normaltekst
                            children={resultatTilUi(vilkårResultat.verdi.resultat.verdi)}
                        />
                    </div>
                </td>
                <td>
                    <Normaltekst children={periodeToString(vilkårResultat.verdi.periode.verdi)} />
                </td>
                <td>
                    <Normaltekst
                        className={'beskrivelse'}
                        children={vilkårResultat.verdi.begrunnelse.verdi}
                    />
                </td>
                <td>
                    <IkonKnapp
                        erLesevisning={erLesevisning()}
                        onClick={() => toggleForm(true)}
                        id={vilkårFeilmeldingId(vilkårResultat.verdi)}
                        label={
                            !ekspandertVilkår
                                ? vilkårResultat.verdi.resultat.verdi === Resultat.KANSKJE
                                    ? 'Vurder'
                                    : 'Endre'
                                : 'Lukk'
                        }
                        mini={true}
                        ikon={<Chevron retning={ekspandertVilkår ? 'opp' : 'ned'} />}
                    />
                </td>
                <td>
                    {vilkårResultat.verdi.endretAv === 'VL' ? (
                        <AutomatiskVurdering />
                    ) : (
                        <ManuellVurdering />
                    )}
                </td>
                <td>
                    <i>
                        {åpenBehandling.status === RessursStatus.SUKSESS &&
                        vilkårResultat.verdi.erVurdert
                            ? vilkårResultat.verdi.behandlingId === åpenBehandling.data.behandlingId
                                ? 'Vurdert i denne behandlingen'
                                : `Vurdert ${moment(vilkårResultat.verdi.endretTidspunkt).format(
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
                                verdi={resultater[redigerbartVilkår.verdi.resultat.verdi].navn}
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
                                    name={`vilkår-spørsmål_ja_${redigerbartVilkår.verdi.vilkårType}_${redigerbartVilkår.verdi.id}`}
                                    checked={
                                        redigerbartVilkår.verdi.vilkårType ===
                                        VilkårType.GIFT_PARTNERSKAP
                                            ? redigerbartVilkår.verdi.resultat.verdi ===
                                              Resultat.NEI
                                            : redigerbartVilkår.verdi.resultat.verdi === Resultat.JA
                                    }
                                    onChange={() =>
                                        radioOnChange(
                                            redigerbartVilkår.verdi.vilkårType ===
                                                VilkårType.GIFT_PARTNERSKAP
                                                ? Resultat.NEI
                                                : Resultat.JA
                                        )
                                    }
                                />
                                <Radio
                                    label={'Nei'}
                                    name={`vilkår-spørsmål_nei_${redigerbartVilkår.verdi.vilkårType}_${redigerbartVilkår.verdi.id}`}
                                    checked={
                                        redigerbartVilkår.verdi.vilkårType ===
                                        VilkårType.GIFT_PARTNERSKAP
                                            ? redigerbartVilkår.verdi.resultat.verdi === Resultat.JA
                                            : redigerbartVilkår.verdi.resultat.verdi ===
                                              Resultat.NEI
                                    }
                                    onChange={() =>
                                        radioOnChange(
                                            redigerbartVilkår.verdi.vilkårType ===
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
                                defaultValue={redigerbartVilkår.verdi.begrunnelse.verdi}
                                id={vilkårBegrunnelseFeilmeldingId(redigerbartVilkår.verdi)}
                                label={'Begrunnelse (valgfri)'}
                                placeholder={'Begrunn hvorfor det er gjort endriner på vilkåret.'}
                                textareaClass={'begrunnelse'}
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

                            <div className={'knapperad'}>
                                <div>
                                    <FamilieKnapp
                                        erLesevisning={leseVisning}
                                        onClick={onClickVilkårFerdig}
                                        mini={true}
                                        type={'standard'}
                                        spinner={vilkårSubmit === VilkårSubmit.PUT}
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
                                            redigerbartVilkår.verdi.id
                                        );
                                        håndterEndringPåVilkårsvurdering(promise);
                                    }}
                                    id={vilkårFeilmeldingId(vilkårResultat.verdi)}
                                    spinner={vilkårSubmit === VilkårSubmit.DELETE}
                                    label={'Slett'}
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
