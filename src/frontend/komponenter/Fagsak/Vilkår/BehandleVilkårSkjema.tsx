import {actions, useBehandlingVilkårContext, useBehandlingVilkårDispatch,} from './BehandleVilkårProvider';
import {CheckboksPanelGruppe, Input, RadioPanelGruppe, SkjemaGruppe, TextareaControlled,} from 'nav-frontend-skjema';
import React from 'react';
import {IVilkårConfig, IVilkårResultat, UtfallType, vilkårConfig} from '../../../typer/vilkår';
import {Valideringsstatus} from '../../../typer/felt';
import {BehandlingResultat, Behandlingstype} from '../../../typer/behandling';
import {Undertittel} from "nav-frontend-typografi";

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

    const inneværendeMåned = () => {
        const iDag = new Date();
        const måned = iDag.getMonth().toString();
        return [måned.length === 1 ? '0' + måned : måned, iDag.getFullYear().toString().substr(2)].join('.')
    };
    const [opphørsdato, settOpphørsdato] = React.useState(inneværendeMåned);

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
            {behandlingstype === Behandlingstype.REVURDERING && context.behandlingResultat === BehandlingResultat.AVSLÅTT && (
                <div className={'vilkår__opphør'}>
                    <Undertittel children={'Opphør utbetalinger for fagsak'}/>
                    <Input
                        bredde={'S'}
                        label={'Fra og med-dato'}
                        placeholder={'MM.YY'}
                        value={opphørsdato}
                        onChange={(event: any) => settOpphørsdato(event.target.value)}
                    />
                </div>
            )}

            <br/>

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

            <br/>

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
