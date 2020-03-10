import {
    CheckboksPanelGruppe, RadioPanelGruppe, SkjemaGruppe, TextareaControlled
} from 'nav-frontend-skjema';
import React from 'react';

import { BehandlingResultat, Behandlingstype } from '../../../typer/behandling';
import { Valideringsstatus } from '../../../typer/felt';
import { IVilkårConfig, IVilkårResultat, UtfallType, vilkårConfig } from '../../../typer/vilkår';
import Informasjonsbolk from '../../Felleskomponenter/Informasjonsbolk/Informasjonsbolk';
import {
    actions, useBehandlingVilkårContext, useBehandlingVilkårDispatch
} from './BehandleVilkårProvider';

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
            <RadioPanelGruppe
                name="behandlingresultat"
                legend="Vilkår for barnetrygd"
                radios={[
                    {
                        autoFocus: true,
                        label:
                            behandlingstype === Behandlingstype.REVURDERING
                                ? 'Fortsatt innvilget'
                                : 'Vilkårene er oppfylt',
                        value: 'INNVILGET',
                        id: 'INNVILGET',
                        checked: context.behandlingResultat === BehandlingResultat.INNVILGET,
                    },
                    {
                        label:
                            behandlingstype === Behandlingstype.REVURDERING
                                ? 'Opphør'
                                : 'Vilkårene er ikke oppfylt',
                        value: 'AVSLÅTT',
                        id: 'AVSLÅTT',
                        checked: context.behandlingResultat === BehandlingResultat.AVSLÅTT,
                    },
                ]}
                onChange={(event: any) => {
                    dispatch({
                        payload: event.target.value,
                        type: actions.SETT_RESULTAT,
                    });
                }}
                feil={
                    visFeilmeldinger &&
                    !context.behandlingResultat &&
                    'Du må velge et behandlingsresultat'
                }
            />
            {behandlingstype === Behandlingstype.REVURDERING &&
                context.behandlingResultat === BehandlingResultat.AVSLÅTT && (
                    <div className={'vilkår__skjemagruppe--opphørsdato'}>
                        <Informasjonsbolk
                            informasjon={[{ label: `Forventet opphørsmåned`, tekst: nesteMåned() }]}
                        />
                    </div>
                )}

            <br />

            <CheckboksPanelGruppe
                legend={'Velg hjemler for vurderingen'}
                checkboxes={Object.values(vilkårConfig).map((vilkår: IVilkårConfig) => {
                    return {
                        id: vilkår.key,
                        label: `${vilkår.lovreferanse}, ${vilkår.beskrivelse}`,
                        value: vilkår.key,
                        checked:
                            context.samletVilkårResultat.find(
                                (vilkårResultat: IVilkårResultat) =>
                                    vilkårResultat.vilkårType === vilkår.key
                            )?.utfallType === UtfallType.OPPFYLT,
                    };
                })}
                onChange={(event: any) => {
                    dispatch({
                        type: actions.TOGGLE_VILKÅR,
                        payload: {
                            key: event.target.value,
                        },
                    });
                }}
            />

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
        </SkjemaGruppe>
    );
};

export default BehandlingVilkårSkjema;
