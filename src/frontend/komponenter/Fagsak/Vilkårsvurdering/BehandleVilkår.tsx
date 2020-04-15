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
import {
    IRestPersonResultat,
    IRestVilkårResultat,
    IVilkårResultat,
    Resultat,
} from '../../../typer/vilkår';
import { Feiloppsummering } from 'nav-frontend-skjema';
import { vilkårFeilmeldingId } from './GeneriskVilkår/GeneriskVilkår';

interface IProps {
    fagsak: IFagsak;
}

const BehandleVilkår: React.FunctionComponent<IProps> = ({ fagsak }) => {
    const {
        erVilkårsvurderingenGyldig,
        hentVilkårMedFeil,
        vilkårsvurdering,
    } = useVilkårsvurdering();

    const [visFeilmeldinger, settVisFeilmeldinger] = React.useState(false);
    const [opprettelseFeilmelding, settOpprettelseFeilmelding] = React.useState('');

    const history = useHistory();
    const { opprettEllerOppdaterVilkårsvurdering, senderInn } = useFagsakApi(
        settVisFeilmeldinger,
        settOpprettelseFeilmelding
    );

    const aktivBehandling = hentAktivBehandlingPåFagsak(fagsak);

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
                    if (erVilkårsvurderingenGyldig()) {
                        opprettEllerOppdaterVilkårsvurdering(vilkårsvurdering, fagsak);
                    } else {
                        settVisFeilmeldinger(true);
                    }
                }}
                senderInn={senderInn}
            >
                {aktivBehandling.personResultater.length !== 0 &&
                    aktivBehandling.personResultater.filter(
                        (personResultat: IRestPersonResultat) => {
                            return (
                                personResultat.vilkårResultater.filter(
                                    (vilkårResultat: IRestVilkårResultat) =>
                                        vilkårResultat.resultat !== Resultat.KANSKJE
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
                    opprettelseFeilmelding={opprettelseFeilmelding}
                    visFeilmeldinger={visFeilmeldinger}
                    behandlingstype={aktivBehandling.type}
                />

                {hentVilkårMedFeil().length > 0 && visFeilmeldinger && (
                    <Feiloppsummering
                        tittel={'For å gå videre må du rette opp følgende:'}
                        feil={hentVilkårMedFeil().map((vilkårResultat: IVilkårResultat) => ({
                            feilmelding: `Vilkåret mangler resultat`,
                            skjemaelementId: vilkårFeilmeldingId(vilkårResultat),
                        }))}
                    />
                )}
            </Skjemasteg>
        </div>
    );
};

export default BehandleVilkår;
