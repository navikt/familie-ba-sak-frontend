import React, { useState } from 'react';
import { IVilkårConfig, vilkårConfig, IVilkårResultat, Resultat } from '../../../../typer/vilkår';
import { Element, Undertekst } from 'nav-frontend-typografi';
import UtførKnapp from './UtførKnapp';
import { RadioGruppe, Radio, TextareaControlled } from 'nav-frontend-skjema';
import { useVilkårsvurdering } from '../../../../context/VilkårsvurderingContext';
import { IPerson } from '../../../../typer/person';
import FastsettPeriode from './FastsettPeriode/FastsettPeriode';
import classNames from 'classnames';
import { Knapp } from 'nav-frontend-knapper';

interface IProps {
    person: IPerson;
    vilkårResultat: IVilkårResultat;
}

const GeneriskVilkår: React.FC<IProps> = ({ person, vilkårResultat }) => {
    const { settVilkårForPeriodeResultat } = useVilkårsvurdering();
    const vilkårFraConfig: IVilkårConfig = vilkårConfig[vilkårResultat.vilkårType];
    const [ekspandertVilkår, settEkspandertVilkår] = useState(false);
    const [visFeilmeldinger, settVisFeilmeldinger] = useState(false);

    const [redigerbartVilkår, settRedigerbartVilkår] = useState<IVilkårResultat>(vilkårResultat);

    const radioOnChange = (resultat: Resultat) => {
        settRedigerbartVilkår({
            ...redigerbartVilkår,
            resultat,
        });
    };

    return (
        <li
            className={classNames(
                ekspandertVilkår ? 'aapen' : 'lukket',
                `resultat__${
                    redigerbartVilkår.resultat ? redigerbartVilkår.resultat.toLowerCase() : 'ukjent'
                }`
            )}
        >
            <div className={'generisk-vilkår__tittel-og-utfør'}>
                <Element children={vilkårFraConfig.tittel} />
                <Undertekst children={vilkårFraConfig.lovreferanse} />
                <UtførKnapp
                    onClick={() => settEkspandertVilkår(!ekspandertVilkår)}
                    aktiv={ekspandertVilkår}
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
                    >
                        <Radio
                            label={'Ja'}
                            name={`vilkår-spørsmål_ja_${redigerbartVilkår.vilkårType}_${person.personIdent}`}
                            checked={redigerbartVilkår.resultat === Resultat.JA}
                            onChange={() => radioOnChange(Resultat.JA)}
                        />
                        <Radio
                            label={'Nei'}
                            name={`vilkår-spørsmål_nei_${redigerbartVilkår.vilkårType}_${person.personIdent}`}
                            checked={redigerbartVilkår.resultat === Resultat.NEI}
                            onChange={() => radioOnChange(Resultat.NEI)}
                        />

                        <FastsettPeriode
                            redigerbartVilkår={redigerbartVilkår}
                            settRedigerbartVilkår={settRedigerbartVilkår}
                        />
                    </RadioGruppe>

                    <TextareaControlled
                        label={'Begrunnelse'}
                        textareaClass={'generisk-vilkår__ekspandert--begrunnelse'}
                        placeholder={'Begrunn vurderingen'}
                        defaultValue={redigerbartVilkår.begrunnelse}
                        value={redigerbartVilkår.begrunnelse}
                        onBlur={(event: any) => {
                            settRedigerbartVilkår({
                                ...redigerbartVilkår,
                                begrunnelse: event?.target.value,
                            });
                        }}
                        feil={
                            visFeilmeldinger && redigerbartVilkår.begrunnelse === ''
                                ? 'Begrunnelse er påkrevd'
                                : undefined
                        }
                    />

                    <Knapp
                        type={'hoved'}
                        onClick={() => {
                            settVilkårForPeriodeResultat(person.personIdent, redigerbartVilkår);
                        }}
                        children={'Ferdig'}
                    />
                </div>
            )}
        </li>
    );
};

export default GeneriskVilkår;
