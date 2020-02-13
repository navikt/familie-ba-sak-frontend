import { useBehandlingVilkårContext, useBehandlingVilkårDispatch, actions } from "./BehandleVilkårProvider";
import { RadioPanelGruppe, SkjemaGruppe } from 'nav-frontend-skjema';
import React from 'react';

interface IBehandlingVilkårSkjema {
    opprettelseFeilmelding: string;
    visFeilmeldinger: boolean;
}

const BehandlingVilkårSkjema: React.FunctionComponent<IBehandlingVilkårSkjema> = ({
    opprettelseFeilmelding,
    visFeilmeldinger,
}) => {
    const context = useBehandlingVilkårContext();
    const dispatch = useBehandlingVilkårDispatch();

    return (
        <SkjemaGruppe
            className={'fastsett__skjemagruppe'}
            feil={
                visFeilmeldinger && opprettelseFeilmelding !== ''
                    ? opprettelseFeilmelding
                    : undefined
            }
        >
            <RadioPanelGruppe
                className={'vilkår__skjemagruppe--vedtakresultat'}
                name="vedtakresultat"
                legend="Inngangsvilkår for barnetrygd"
                radios={[
                    { label: 'Inngangsvilkårene er oppfylt', value: 'INNVILGET', id: 'INNVILGET' },
                    { label: 'Inngangsvilkårene er ikke oppfylt', value: 'AVSLÅTT', id: 'AVSLÅTT' },
                ]}
                checked={context.vedtakResultat}
                onChange={(event: any) => {
                    dispatch({
                        payload: event.target.value,
                        type: actions.SETT_RESULTAT,
                    });
                }}
            />
        </SkjemaGruppe>
    );
};

export default BehandlingVilkårSkjema;
