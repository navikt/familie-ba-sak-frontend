import { CheckboksPanelGruppe, SkjemaGruppe, TextareaControlled } from 'nav-frontend-skjema';
import React from 'react';

import { Behandlingstype } from '../../../typer/behandling';
import { Valideringsstatus } from '../../../typer/felt';
import { IVilkårResultat, Resultat, vilkårConfig, IPeriodeResultat } from '../../../typer/vilkår';
import Informasjonsbolk from '../../Felleskomponenter/Informasjonsbolk/Informasjonsbolk';
import {
    actions,
    useBehandlingVilkårContext,
    useBehandlingVilkårDispatch,
} from './BehandleVilkårProvider';
import { erBehandlingenInnvilget } from '../../../utils/fagsak';

interface IBehandlingVilkårSkjema {
    opprettelseFeilmelding: string;
    visFeilmeldinger: boolean;
    behandlingstype: Behandlingstype;
}

const BehandlingVilkårSkjema: React.FunctionComponent<IBehandlingVilkårSkjema> = ({
    opprettelseFeilmelding,
    visFeilmeldinger,
    behandlingstype,
}) => {
    const context = useBehandlingVilkårContext();
    const dispatch = useBehandlingVilkårDispatch();

    const nesteMåned = () => {
        const iDag = new Date();
        const måned = (iDag.getMonth() + 2).toString();
        return [
            måned.length === 1 ? '0' + måned : måned,
            iDag
                .getFullYear()
                .toString()
                .substr(2),
        ].join('.');
    };
    return (
        <SkjemaGruppe
            className={'vilkår__skjemagruppe'}
            feil={
                visFeilmeldinger && opprettelseFeilmelding !== ''
                    ? opprettelseFeilmelding
                    : undefined
            }
        >
            <br />

            {context.periodeResultater.map((periodeResultat: IPeriodeResultat) => {
                return (
                    <CheckboksPanelGruppe
                        key={periodeResultat.personIdent}
                        legend={`Vurder vilkår for ${periodeResultat.personIdent}`}
                        checkboxes={periodeResultat.vilkårResultater.map(
                            (vilkårResultat: IVilkårResultat) => {
                                const vilkår = vilkårConfig[vilkårResultat.vilkårType];
                                return {
                                    id: `${periodeResultat.personIdent}_${vilkår.key}`,
                                    label: `${vilkår.lovreferanse}, ${vilkår.beskrivelse}`,
                                    value: vilkår.key,
                                    checked: vilkårResultat.resultat === Resultat.JA,
                                };
                            }
                        )}
                        onChange={(event: any) => {
                            dispatch({
                                type: actions.TOGGLE_VILKÅR,
                                payload: {
                                    personIdent: periodeResultat.personIdent,
                                    key: event.target.value,
                                },
                            });
                        }}
                    />
                );
            })}

            <br />

            <TextareaControlled
                label={'Begrunnelse'}
                maxLength={0}
                textareaClass={'vilkår__skjemagruppe--begrunnelse'}
                placeholder={'Begrunn vurderingen din'}
                defaultValue={context.begrunnelse.verdi}
                value={context.begrunnelse.verdi}
                onBlur={(evt: any) => {
                    dispatch({
                        type: actions.SETT_BEGRUNNELSE,
                        payload: evt.target.value,
                    });
                }}
                feil={
                    context.begrunnelse.valideringsstatus !== Valideringsstatus.OK &&
                    visFeilmeldinger &&
                    context.begrunnelse.feilmelding
                        ? context.begrunnelse.feilmelding
                        : undefined
                }
            />

            {behandlingstype === Behandlingstype.REVURDERING &&
                !erBehandlingenInnvilget(context.periodeResultater) && (
                    <div className={'vilkår__skjemagruppe--opphørsdato'}>
                        <Informasjonsbolk
                            informasjon={[{ label: `Forventet opphørsmåned`, tekst: nesteMåned() }]}
                        />
                    </div>
                )}
        </SkjemaGruppe>
    );
};

export default BehandlingVilkårSkjema;
