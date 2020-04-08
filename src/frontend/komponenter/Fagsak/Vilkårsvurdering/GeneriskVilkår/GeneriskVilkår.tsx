import classNames from 'classnames';
import deepEqual from 'deep-equal';
import { Knapp } from 'nav-frontend-knapper';
import { Radio, RadioGruppe, TextareaControlled, SkjemaGruppe } from 'nav-frontend-skjema';
import { Element, Undertekst } from 'nav-frontend-typografi';
import React, { useState } from 'react';

import { useVilkårsvurdering } from '../../../../context/Vilkårsvurdering/VilkårsvurderingContext';
import { IPerson } from '../../../../typer/person';
import { IVilkårConfig, IVilkårResultat, Resultat, vilkårConfig } from '../../../../typer/vilkår';
import FastsettPeriode from './FastsettPeriode/FastsettPeriode';
import UtførKnapp from './UtførKnapp';
import { IFelt, Valideringsstatus } from '../../../../typer/felt';
import { validerVilkår } from '../../../../context/Vilkårsvurdering/validering';

export const vilkårFeilmeldingId = (vilkårResultat: IVilkårResultat) =>
    `vilkår_${vilkårResultat.vilkårType}_${vilkårResultat.id}`;

export const vilkårResultatFeilmeldingId = (vilkårResultat: IVilkårResultat) =>
    `vilkår-resultat_${vilkårResultat.vilkårType}_${vilkårResultat.id}`;

export const vilkårBegrunnelseFeilmeldingId = (vilkårResultat: IVilkårResultat) =>
    `vilkår-begrunnelse_${vilkårResultat.vilkårType}_${vilkårResultat.id}`;

export const vilkårPeriodeFeilmeldingId = (vilkårResultat: IVilkårResultat) =>
    `vilkår-periode_${vilkårResultat.vilkårType}_${vilkårResultat.id}`;

interface IProps {
    person: IPerson;
    vilkårResultat: IFelt<IVilkårResultat>;
    visFeilmeldinger: boolean;
}

const GeneriskVilkår: React.FC<IProps> = ({ person, vilkårResultat, visFeilmeldinger }) => {
    const { settVilkårForPeriodeResultat } = useVilkårsvurdering();
    const vilkårFraConfig: IVilkårConfig = vilkårConfig[vilkårResultat.verdi.vilkårType];

    const [visFeilmeldingerForEttVilkår, settVisFeilmeldingerForEttVilkår] = useState(false);

    const [ekspandertVilkår, settEkspandertVilkår] = useState(false);

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

    const toggleForm = () => {
        if (ekspandertVilkår && !deepEqual(vilkårResultat, redigerbartVilkår)) {
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
                <div className={'generisk-vilkår__tittel-og-utfør'}>
                    <Element children={vilkårFraConfig.tittel} />
                    <Undertekst children={vilkårFraConfig.lovreferanse} />
                    <UtførKnapp
                        onClick={toggleForm}
                        aktiv={ekspandertVilkår}
                        vilkårResultat={vilkårResultat.verdi}
                    />
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
                        <Knapp onClick={toggleForm} mini={true} type={'flat'}>
                            Avbryt
                        </Knapp>
                    </div>
                )}
            </SkjemaGruppe>
        </li>
    );
};

export default GeneriskVilkår;
