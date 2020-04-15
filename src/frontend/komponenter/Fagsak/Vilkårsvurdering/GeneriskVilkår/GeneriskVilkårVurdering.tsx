import React, { useState } from 'react';
import deepEqual from 'deep-equal';
import { IFelt, Valideringsstatus } from '../../../../typer/felt';
import { IVilkårResultat, Resultat, IVilkårConfig } from '../../../../typer/vilkår';
import { useVilkårsvurdering } from '../../../../context/Vilkårsvurdering/VilkårsvurderingContext';
import { validerVilkår } from '../../../../context/Vilkårsvurdering/validering';
import { RadioGruppe, Radio, TextareaControlled, SkjemaGruppe } from 'nav-frontend-skjema';
import {
    vilkårResultatFeilmeldingId,
    vilkårBegrunnelseFeilmeldingId,
    vilkårFeilmeldingId,
} from './GeneriskVilkår';
import FastsettPeriode from './FastsettPeriode/FastsettPeriode';
import { Knapp } from 'nav-frontend-knapper';
import { IPerson } from '../../../../typer/person';
import classNames from 'classnames';
import UtførKnapp from './UtførKnapp';
import { Undertekst } from 'nav-frontend-typografi';
import { periodeToString } from '../../../../typer/periode';

interface IProps {
    person: IPerson;
    tillattFjerning: boolean;
    vilkårFraConfig: IVilkårConfig;
    vilkårResultat: IFelt<IVilkårResultat>;
    visFeilmeldinger: boolean;
}

const GeneriskVilkårVurdering: React.FC<IProps> = ({
    person,
    tillattFjerning,
    vilkårFraConfig,
    vilkårResultat,
    visFeilmeldinger,
}) => {
    const { fjernVilkår, settVilkårForPeriodeResultat } = useVilkårsvurdering();

    const [ekspandertVilkår, settEkspandertVilkår] = useState(
        vilkårResultat.verdi.resultat.verdi === Resultat.KANSKJE
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

    return (
        <li
            className={classNames(
                ekspandertVilkår ? 'aapen' : 'lukket',
                `resultat__${
                    redigerbartVilkår.verdi.resultat.verdi !== Resultat.KANSKJE
                        ? redigerbartVilkår.verdi.resultat.verdi.toLowerCase()
                        : 'ukjent'
                }`
            )}
        >
            <SkjemaGruppe feilmeldingId={vilkårFeilmeldingId(redigerbartVilkår.verdi)}>
                <div className={'horisontal-sentrert-div'}>
                    <Undertekst children={periodeToString(redigerbartVilkår.verdi.periode.verdi)} />
                    <UtførKnapp
                        onClick={() => toggleForm(true)}
                        aktiv={ekspandertVilkår}
                        id={vilkårFeilmeldingId(redigerbartVilkår.verdi)}
                    >
                        {!ekspandertVilkår ? 'Vurder' : 'Lukk'}
                    </UtførKnapp>
                    {tillattFjerning && (
                        <UtførKnapp
                            onClick={() => fjernVilkår(redigerbartVilkår.verdi.id)}
                            aktiv={ekspandertVilkår}
                            id={vilkårFeilmeldingId(redigerbartVilkår.verdi)}
                        >
                            Fjern
                        </UtførKnapp>
                    )}
                </div>

                {ekspandertVilkår && (
                    <div className={'generisk-vilkår__ekspandert'}>
                        <RadioGruppe
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
                                checked={redigerbartVilkår.verdi.resultat.verdi === Resultat.JA}
                                onChange={() => radioOnChange(Resultat.JA)}
                            />
                            <Radio
                                label={'Nei'}
                                name={`vilkår-spørsmål_nei_${redigerbartVilkår.verdi.vilkårType}_${redigerbartVilkår.verdi.id}`}
                                checked={redigerbartVilkår.verdi.resultat.verdi === Resultat.NEI}
                                onChange={() => radioOnChange(Resultat.NEI)}
                            />
                        </RadioGruppe>

                        <FastsettPeriode
                            redigerbartVilkår={redigerbartVilkår}
                            validerOgSettRedigerbartVilkår={validerOgSettRedigerbartVilkår}
                            visFeilmeldinger={skalViseFeilmeldinger()}
                        />

                        <TextareaControlled
                            defaultValue={redigerbartVilkår.verdi.begrunnelse.verdi}
                            id={vilkårBegrunnelseFeilmeldingId(redigerbartVilkår.verdi)}
                            label={'Begrunnelse'}
                            placeholder={'Begrunn vurderingen'}
                            textareaClass={'generisk-vilkår__ekspandert--begrunnelse'}
                            value={redigerbartVilkår.verdi.begrunnelse.verdi}
                            feil={
                                redigerbartVilkår.verdi.begrunnelse.valideringsstatus ===
                                    Valideringsstatus.FEIL && skalViseFeilmeldinger()
                                    ? redigerbartVilkår.verdi.begrunnelse.feilmelding
                                    : ''
                            }
                            onBlur={(event: any) => {
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

                        <Knapp
                            onClick={() => {
                                const erVilkårGyldig: boolean =
                                    redigerbartVilkår.valideringsFunksjon(redigerbartVilkår)
                                        .valideringsstatus === Valideringsstatus.OK;

                                settVilkårForPeriodeResultat(person.personIdent, redigerbartVilkår);
                                if (erVilkårGyldig) {
                                    settEkspandertVilkår(false);
                                    settVisFeilmeldingerForEttVilkår(false);
                                } else {
                                    settVisFeilmeldingerForEttVilkår(true);
                                }
                            }}
                            mini={true}
                            type={'standard'}
                        >
                            Ferdig
                        </Knapp>
                        <Knapp onClick={() => toggleForm(false)} mini={true} type={'flat'}>
                            Avbryt
                        </Knapp>
                    </div>
                )}
            </SkjemaGruppe>
        </li>
    );
};

export default GeneriskVilkårVurdering;
