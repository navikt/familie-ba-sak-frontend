import classNames from 'classnames';
import deepEqual from 'deep-equal';
import { Knapp } from 'nav-frontend-knapper';
import { FeiloppsummeringFeil, Radio, RadioGruppe, TextareaControlled } from 'nav-frontend-skjema';
import { Element, Feilmelding, Undertekst } from 'nav-frontend-typografi';
import React, { useState } from 'react';

import { useVilkårsvurdering } from '../../../../context/Vilkårsvurdering/VilkårsvurderingContext';
import { IPerson } from '../../../../typer/person';
import { IVilkårConfig, IVilkårResultat, Resultat, vilkårConfig } from '../../../../typer/vilkår';
import FastsettPeriode from './FastsettPeriode/FastsettPeriode';
import UtførKnapp from './UtførKnapp';

interface IProps {
    person: IPerson;
    vilkårResultat: IVilkårResultat;
}

export const vilkårResultatFeilmeldingId = (vilkårResultat: IVilkårResultat) =>
    `vilkår-resultat_${vilkårResultat.vilkårType}_${vilkårResultat.id}`;

export const vilkårBegrunnelseFeilmeldingId = (vilkårResultat: IVilkårResultat) =>
    `vilkår-begrunnelse_${vilkårResultat.vilkårType}_${vilkårResultat.id}`;

const GeneriskVilkår: React.FC<IProps> = ({ person, vilkårResultat }) => {
    const { settVilkårForPeriodeResultat } = useVilkårsvurdering();
    const vilkårFraConfig: IVilkårConfig = vilkårConfig[vilkårResultat.vilkårType];
    const [ekspandertVilkår, settEkspandertVilkår] = useState(false);
    const [feilmeldinger, settFeilmeldinger] = useState<FeiloppsummeringFeil[]>([]);

    const [redigerbartVilkår, settRedigerbartVilkår] = useState<IVilkårResultat>(vilkårResultat);

    const radioOnChange = (resultat: Resultat) => {
        settRedigerbartVilkår({
            ...redigerbartVilkår,
            resultat,
        });
    };

    const toggleForm = () => {
        if (!deepEqual(vilkårResultat, redigerbartVilkår)) {
            alert('Vurderingen har endringer som ikke er lagret!');
        } else {
            settEkspandertVilkår(!ekspandertVilkår);
            settRedigerbartVilkår(vilkårResultat);
        }
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
                <UtførKnapp onClick={toggleForm} aktiv={ekspandertVilkår} />
            </div>

            {ekspandertVilkår && (
                <div className={'generisk-vilkår__ekspandert'}>
                    <RadioGruppe
                        legend={
                            vilkårFraConfig.spørsmål
                                ? vilkårFraConfig.spørsmål(person.type.toLowerCase())
                                : ''
                        }
                        feilmeldingId={vilkårResultatFeilmeldingId(redigerbartVilkår)}
                    >
                        <Radio
                            label={'Ja'}
                            name={`vilkår-spørsmål_ja_${redigerbartVilkår.vilkårType}_${redigerbartVilkår.id}`}
                            checked={redigerbartVilkår.resultat === Resultat.JA}
                            onChange={() => radioOnChange(Resultat.JA)}
                        />
                        <Radio
                            label={'Nei'}
                            name={`vilkår-spørsmål_nei_${redigerbartVilkår.vilkårType}_${redigerbartVilkår.id}`}
                            checked={redigerbartVilkår.resultat === Resultat.NEI}
                            onChange={() => radioOnChange(Resultat.NEI)}
                        />

                        <FastsettPeriode
                            redigerbartVilkår={redigerbartVilkår}
                            settRedigerbartVilkår={settRedigerbartVilkår}
                        />
                    </RadioGruppe>

                    <TextareaControlled
                        defaultValue={redigerbartVilkår.begrunnelse}
                        id={vilkårBegrunnelseFeilmeldingId(redigerbartVilkår)}
                        label={'Begrunnelse'}
                        placeholder={'Begrunn vurderingen'}
                        textareaClass={'generisk-vilkår__ekspandert--begrunnelse'}
                        value={redigerbartVilkår.begrunnelse}
                        onBlur={(event: any) => {
                            settRedigerbartVilkår({
                                ...redigerbartVilkår,
                                begrunnelse: event?.target.value,
                            });
                        }}
                    />

                    {feilmeldinger.length > 0 && (
                        <>
                            {feilmeldinger.map((feilmelding: FeiloppsummeringFeil) => (
                                <Feilmelding
                                    key={feilmelding.skjemaelementId}
                                    children={feilmelding.feilmelding}
                                />
                            ))}
                            <br />
                        </>
                    )}

                    <Knapp
                        onClick={() => {
                            let harFeil = false;

                            if (redigerbartVilkår.resultat === undefined) {
                                settFeilmeldinger([
                                    ...feilmeldinger,
                                    {
                                        feilmelding: 'Resultat er ikke satt',
                                        skjemaelementId: vilkårResultatFeilmeldingId(
                                            redigerbartVilkår
                                        ),
                                    },
                                ]);
                                harFeil = true;
                            }

                            if (redigerbartVilkår.begrunnelse === '') {
                                settFeilmeldinger([
                                    ...feilmeldinger,
                                    {
                                        feilmelding: 'Begrunnelse er ikke satt',
                                        skjemaelementId: vilkårBegrunnelseFeilmeldingId(
                                            redigerbartVilkår
                                        ),
                                    },
                                ]);
                                harFeil = true;
                            }

                            if (!harFeil) {
                                settVilkårForPeriodeResultat(person.personIdent, redigerbartVilkår);
                                settEkspandertVilkår(!ekspandertVilkår);
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
        </li>
    );
};

export default GeneriskVilkår;
