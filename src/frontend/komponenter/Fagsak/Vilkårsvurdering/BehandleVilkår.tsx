import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { useHistory } from 'react-router';

import { IFagsak } from '../../../typer/fagsak';
import { hentAktivBehandlingPåFagsak } from '../../../utils/fagsak';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import useFagsakApi from '../useFagsakApi';
import { useVilkårsvurdering } from '../../../context/Vilkårsvurdering/VilkårsvurderingContext';
import BehandlingVilkårSkjema from './BehandleVilkårSkjema';
import { mapFraRestVilkårsvurderingTilUi } from '../../../context/Vilkårsvurdering/vilkårsvurdering';
import { IPersonResultat, IRestPersonResultat, IRestVilkårResultat } from '../../../typer/vilkår';
import { PersonType } from '../../../typer/person';
import { FeiloppsummeringFeil, Feiloppsummering } from 'nav-frontend-skjema';

interface IProps {
    fagsak: IFagsak;
}

const BehandleVilkår: React.FunctionComponent<IProps> = ({ fagsak }) => {
    const { vilkårsvurdering, settVilkårsvurdering } = useVilkårsvurdering();

    const [visFeilmeldinger, settVisFeilmeldinger] = React.useState(false);
    const [opprettelseFeilmelding, settOpprettelseFeilmelding] = React.useState('');
    const [feilmeldinger, settFeilmeldinger] = React.useState<FeiloppsummeringFeil[]>([]);

    const history = useHistory();
    const { opprettEllerOppdaterVilkårsvurdering, senderInn } = useFagsakApi(
        settVisFeilmeldinger,
        settOpprettelseFeilmelding,
        settFeilmeldinger
    );

    const aktivBehandling = hentAktivBehandlingPåFagsak(fagsak);

    React.useEffect(() => {
        if (aktivBehandling && aktivBehandling.personResultater.length !== 0) {
            settVilkårsvurdering(
                mapFraRestVilkårsvurderingTilUi(
                    aktivBehandling.personResultater,
                    aktivBehandling.personer
                ).sort((periodeResultat: IPersonResultat) =>
                    periodeResultat.person.type === PersonType.SØKER ? -1 : 1
                )
            );
        }
    }, [fagsak]);

    if (!aktivBehandling) {
        return (
            <div>
                <Normaltekst>Ingen aktiv behandling</Normaltekst>
            </div>
        );
    }

    if (vilkårsvurdering.length === 0) {
        return <div>Finner ingen vilkår på behandlingen. Det er sansynligvis noe feil.</div>;
    }

    return (
        <div className={'vilkårsvurdering'}>
            <Skjemasteg
                tittel={'Vilkår'}
                forrigeOnClick={() => {
                    history.push(`/fagsak/${fagsak.id}/registrer-soknad`);
                }}
                nesteOnClick={() => {
                    opprettEllerOppdaterVilkårsvurdering(vilkårsvurdering, fagsak);
                }}
                senderInn={senderInn}
            >
                {aktivBehandling.personResultater.length !== 0 &&
                    aktivBehandling.personResultater.filter(
                        (periodeResultat: IRestPersonResultat) => {
                            return (
                                periodeResultat.vilkårResultater.filter(
                                    (vilkårResultat: IRestVilkårResultat) =>
                                        vilkårResultat.resultat !== null
                                ).length > 0
                            );
                        }
                    ).length > 0 && (
                        <>
                            <br />
                            <AlertStripeAdvarsel
                                children={
                                    'Det finnes allerede en vilkårsvurdering på behandlingen. Vi har fylt ut gjeldende vurdering.'
                                }
                            />
                            <br />
                        </>
                    )}

                <BehandlingVilkårSkjema
                    feilmeldinger={feilmeldinger}
                    opprettelseFeilmelding={opprettelseFeilmelding}
                    visFeilmeldinger={visFeilmeldinger}
                    behandlingstype={aktivBehandling.type}
                />

                {feilmeldinger.length > 0 && (
                    <Feiloppsummering
                        tittel={'For å gå videre må du rette opp følgende:'}
                        feil={feilmeldinger}
                    />
                )}
            </Skjemasteg>
        </div>
    );
};

export default BehandleVilkår;
