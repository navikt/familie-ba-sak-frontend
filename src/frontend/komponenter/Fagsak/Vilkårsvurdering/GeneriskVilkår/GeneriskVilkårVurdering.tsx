import React, { useState } from 'react';
import deepEqual from 'deep-equal';
import { IFelt, Valideringsstatus } from '../../../../typer/felt';
<<<<<<< HEAD
import { IVilkårConfig, IVilkårResultat, Resultat } from '../../../../typer/vilkår';
=======
import { IVilkårResultat, Resultat, IVilkårConfig, resultatTilUi } from '../../../../typer/vilkår';
>>>>>>> b07cdae8c47113dd5abdabd1bcbcdc6d06dda1e8
import { useVilkårsvurdering } from '../../../../context/Vilkårsvurdering/VilkårsvurderingContext';
import { validerVilkår } from '../../../../context/Vilkårsvurdering/validering';
import { Radio, RadioGruppe, SkjemaGruppe, TextareaControlled } from 'nav-frontend-skjema';
import {
    vilkårBegrunnelseFeilmeldingId,
    vilkårFeilmeldingId,
    vilkårResultatFeilmeldingId,
} from './GeneriskVilkår';
import FastsettPeriode from './FastsettPeriode/FastsettPeriode';
import { Knapp } from 'nav-frontend-knapper';
import { IPerson } from '../../../../typer/person';
import classNames from 'classnames';
import { Undertekst, Normaltekst } from 'nav-frontend-typografi';
import { periodeToString } from '../../../../typer/periode';
<<<<<<< HEAD
import GeneriskVilkårVurderingLeseversjon from './GeneriskVilkårVurderingLeseversjon';
=======
import IkonKnapp from '../../../Felleskomponenter/IkonKnapp/IkonKnapp';
import PennFylt from '../../../../ikoner/PennFylt';
import Penn from '../../../../ikoner/Penn';
import Slett from '../../../../ikoner/Slett';
>>>>>>> b07cdae8c47113dd5abdabd1bcbcdc6d06dda1e8

interface IProps {
    person: IPerson;
    vilkårFraConfig: IVilkårConfig;
    vilkårResultat: IFelt<IVilkårResultat>;
    visFeilmeldinger: boolean;
    visLeseversjon: boolean;
}

const GeneriskVilkårVurdering: React.FC<IProps> = ({
    person,
    vilkårFraConfig,
    vilkårResultat,
    visFeilmeldinger,
    visLeseversjon,
}) => {
<<<<<<< HEAD
    const { fjernVilkår, settVilkårForPeriodeResultat } = useVilkårsvurdering();
    // TODO: BØR MAN KUNNE ÅPNE/LUKKE II LESEVERSJON?
    // TODO: SKAL I SÅ FALL EKSPANDERTE ÅPNA BY DEFAULT?
=======
    const {
        fjernEllerNullstillPeriodeForVilkår,
        settVilkårForPeriodeResultat,
    } = useVilkårsvurdering();
>>>>>>> b07cdae8c47113dd5abdabd1bcbcdc6d06dda1e8

    const [ekspandertVilkår, settEkspandertVilkår] = useState(false);
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
                'generisk-vilkår__en-periode',
                ekspandertVilkår ? 'aapen' : 'lukket',
                `resultat__${
                    vilkårResultat.verdi.resultat.verdi !== Resultat.KANSKJE
                        ? vilkårResultat.verdi.resultat.verdi.toLowerCase()
                        : 'ukjent'
                }`
            )}
        >
            <SkjemaGruppe feilmeldingId={vilkårFeilmeldingId(redigerbartVilkår.verdi)}>
<<<<<<< HEAD
                <div className={'horisontal-sentrert-div'}>
                    <Undertekst children={periodeToString(redigerbartVilkår.verdi.periode.verdi)} />
                    <UtførKnapp
                        onClick={() => toggleForm(true)}
                        aktiv={ekspandertVilkår}
                        id={vilkårFeilmeldingId(redigerbartVilkår.verdi)}
                    >
                        {!ekspandertVilkår ? 'Vurder' : 'Lukk'}
                    </UtførKnapp>
                    {!visLeseversjon && tillattFjerning && (
                        <UtførKnapp
                            onClick={() => fjernVilkår(redigerbartVilkår.verdi.id)}
                            aktiv={ekspandertVilkår}
                            id={vilkårFeilmeldingId(redigerbartVilkår.verdi)}
=======
                <div className={'generisk-vilkår__en-periode--tittel'}>
                    <div className={'flex--space'}>
                        <Normaltekst
                            children={resultatTilUi(vilkårResultat.verdi.resultat.verdi)}
                        />
                        <Undertekst
                            children={periodeToString(vilkårResultat.verdi.periode.verdi)}
                        />
                    </div>
                    <div style={{ flexGrow: 1 }} />
                    <div className={'flex--space'}>
                        <IkonKnapp
                            onClick={() => toggleForm(true)}
                            id={vilkårFeilmeldingId(vilkårResultat.verdi)}
>>>>>>> b07cdae8c47113dd5abdabd1bcbcdc6d06dda1e8
                        >
                            {!ekspandertVilkår
                                ? vilkårResultat.verdi.resultat.verdi === Resultat.KANSKJE
                                    ? 'Vurder'
                                    : 'Endre'
                                : 'Lukk'}
                            {ekspandertVilkår ? <PennFylt /> : <Penn />}
                        </IkonKnapp>
                        <IkonKnapp
                            onClick={() =>
                                fjernEllerNullstillPeriodeForVilkår(vilkårResultat.verdi.id)
                            }
                            id={vilkårFeilmeldingId(vilkårResultat.verdi)}
                        >
                            Slett
                            <Slett />
                        </IkonKnapp>
                    </div>
                </div>

                {visLeseversjon
                    ? ekspandertVilkår && (
                          <GeneriskVilkårVurderingLeseversjon
                              person={person}
                              vilkårFraConfig={vilkårFraConfig}
                              vilkårResultat={vilkårResultat}
                          />
                      )
                    : ekspandertVilkår && (
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
                                  feilmeldingId={vilkårResultatFeilmeldingId(
                                      redigerbartVilkår.verdi
                                  )}
                              >
                                  <Radio
                                      label={'Ja'}
                                      name={`vilkår-spørsmål_ja_${redigerbartVilkår.verdi.vilkårType}_${redigerbartVilkår.verdi.id}`}
                                      checked={
                                          redigerbartVilkår.verdi.resultat.verdi === Resultat.JA
                                      }
                                      onChange={() => radioOnChange(Resultat.JA)}
                                  />
                                  <Radio
                                      label={'Nei'}
                                      name={`vilkår-spørsmål_nei_${redigerbartVilkår.verdi.vilkårType}_${redigerbartVilkår.verdi.id}`}
                                      checked={
                                          redigerbartVilkår.verdi.resultat.verdi === Resultat.NEI
                                      }
                                      onChange={() => radioOnChange(Resultat.NEI)}
                                  />
                              </RadioGruppe>

                              <FastsettPeriode
                                  redigerbartVilkår={redigerbartVilkår}
                                  validerOgSettRedigerbartVilkår={validerOgSettRedigerbartVilkår}
                                  visFeilmeldinger={skalViseFeilmeldinger()}
                              />

<<<<<<< HEAD
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
=======
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
>>>>>>> b07cdae8c47113dd5abdabd1bcbcdc6d06dda1e8

                                      settVilkårForPeriodeResultat(
                                          person.personIdent,
                                          redigerbartVilkår
                                      );
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
