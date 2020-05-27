import classNames from 'classnames';
import deepEqual from 'deep-equal';
import Chevron from 'nav-datovelger/lib/elementer/ChevronSvg';
import { Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import { Normaltekst, Undertekst } from 'nav-frontend-typografi';
import React, { useState } from 'react';
import { Collapse } from 'react-collapse';
import { useBehandling } from '../../../../context/BehandlingContext';
import { validerVilkår } from '../../../../context/Vilkårsvurdering/validering';
import { useVilkårsvurdering } from '../../../../context/Vilkårsvurdering/VilkårsvurderingContext';
import Slett from '../../../../ikoner/Slett';
import { IFelt, Valideringsstatus } from '../../../../typer/felt';
import { periodeToString } from '../../../../typer/periode';
import { IPerson } from '../../../../typer/person';
import {
    IVilkårConfig,
    IVilkårResultat,
    Resultat,
    resultater,
    resultatTilUi,
} from '../../../../typer/vilkår';
import IkonKnapp from '../../../Felleskomponenter/IkonKnapp/IkonKnapp';
import FamilieKnapp from '../../../Felleskomponenter/InputMedLesevisning/FamilieKnapp';
import FamilieRadioGruppe from '../../../Felleskomponenter/InputMedLesevisning/FamilieRadioGruppe';
import FamilieTextareaControlled from '../../../Felleskomponenter/InputMedLesevisning/FamilieTextareaControlled';
import FastsettPeriode from './FastsettPeriode/FastsettPeriode';
import {
    vilkårBegrunnelseFeilmeldingId,
    vilkårFeilmeldingId,
    vilkårResultatFeilmeldingId,
} from './GeneriskVilkår';

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
        fjernEllerNullstillPeriodeForVilkår,
        settVilkårForPeriodeResultat,
    } = useVilkårsvurdering();
    const { erLesevisning } = useBehandling();

    const [ekspandertVilkår, settEkspandertVilkår] = useState(erLesevisning() || false);
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
                `resultat__${
                    vilkårResultat.verdi.resultat.verdi !== Resultat.KANSKJE
                        ? vilkårResultat.verdi.resultat.verdi.toLowerCase()
                        : 'ukjent'
                }`
            )}
        >
            <SkjemaGruppe feilmeldingId={vilkårFeilmeldingId(redigerbartVilkår.verdi)}>
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
                    {!erLesevisning() && (
                        <div className={'flex--space'}>
                            <IkonKnapp
                                onClick={() => toggleForm(true)}
                                id={vilkårFeilmeldingId(vilkårResultat.verdi)}
                            >
                                {!ekspandertVilkår
                                    ? vilkårResultat.verdi.resultat.verdi === Resultat.KANSKJE
                                        ? 'Vurder'
                                        : 'Endre'
                                    : 'Lukk'}
                                <Chevron retning={ekspandertVilkår ? 'opp' : 'ned'} />
                            </IkonKnapp>
                        </div>
                    )}
                </div>

                <Collapse isOpened={ekspandertVilkår}>
                    <div className={'generisk-vilkår__ekspandert'}>
                        <FamilieRadioGruppe
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
                                checked={redigerbartVilkår.verdi.resultat.verdi === Resultat.JA}
                                onChange={() => radioOnChange(Resultat.JA)}
                            />
                            <Radio
                                label={'Nei'}
                                name={`vilkår-spørsmål_nei_${redigerbartVilkår.verdi.vilkårType}_${redigerbartVilkår.verdi.id}`}
                                checked={redigerbartVilkår.verdi.resultat.verdi === Resultat.NEI}
                                onChange={() => radioOnChange(Resultat.NEI)}
                            />
                        </FamilieRadioGruppe>

                        <FastsettPeriode
                            redigerbartVilkår={redigerbartVilkår}
                            validerOgSettRedigerbartVilkår={validerOgSettRedigerbartVilkår}
                            visFeilmeldinger={skalViseFeilmeldinger()}
                        />

                        <FamilieTextareaControlled
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

                        <div className={'generisk-vilkår__ekspandert--knapperad'}>
                            <div>
                                <FamilieKnapp
                                    onClick={() => {
                                        const erVilkårGyldig: boolean =
                                            redigerbartVilkår.valideringsFunksjon(redigerbartVilkår)
                                                .valideringsstatus === Valideringsstatus.OK;

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
                                </FamilieKnapp>
                                <FamilieKnapp
                                    onClick={() => toggleForm(false)}
                                    mini={true}
                                    type={'flat'}
                                >
                                    Avbryt
                                </FamilieKnapp>
                            </div>

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
                </Collapse>
            </SkjemaGruppe>
        </li>
    );
};

export default GeneriskVilkårVurdering;
