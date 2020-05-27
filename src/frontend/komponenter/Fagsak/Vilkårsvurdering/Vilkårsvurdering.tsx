import { Feiloppsummering } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { useHistory } from 'react-router';
import { useBehandling } from '../../../context/BehandlingContext';
import { useVilkårsvurdering } from '../../../context/Vilkårsvurdering/VilkårsvurderingContext';
import { IFagsak } from '../../../typer/fagsak';
import { IVilkårResultat } from '../../../typer/vilkår';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import useFagsakApi from '../useFagsakApi';
import { vilkårFeilmeldingId } from './GeneriskVilkår/GeneriskVilkår';
import BehandlingVilkårSkjema from './VilkårsvurderingSkjema';

interface IProps {
    fagsak: IFagsak;
}

const Vilkårsvurdering: React.FunctionComponent<IProps> = ({ fagsak }) => {
    const {
        erVilkårsvurderingenGyldig,
        hentVilkårMedFeil,
        vilkårsvurdering,
    } = useVilkårsvurdering();
    const { erLesevisning, åpenBehandling } = useBehandling();

    const [visFeilmeldinger, settVisFeilmeldinger] = React.useState(false);
    const [opprettelseFeilmelding, settOpprettelseFeilmelding] = React.useState('');

    const history = useHistory();
    const { opprettEllerOppdaterVilkårsvurdering, senderInn } = useFagsakApi(
        settVisFeilmeldinger,
        settOpprettelseFeilmelding
    );

    if (!åpenBehandling) {
        return (
            <div>
                <Normaltekst>Kan ikke finne behandling.</Normaltekst>
            </div>
        );
    }

    if (vilkårsvurdering.length === 0) {
        return <div>Finner ingen vilkår på behandlingen. Det er sansynligvis noe feil.</div>;
    }

    return (
        <Skjemasteg
            tittel={'Vilkårsvurdering'}
            forrigeOnClick={() => {
                history.push(
                    `/fagsak/${fagsak.id}/${åpenBehandling.behandlingId}/registrer-soknad`
                );
            }}
            nesteOnClick={() => {
                if (erLesevisning()) {
                    history.push(
                        `/fagsak/${fagsak.id}/${åpenBehandling.behandlingId}/tilkjent-ytelse`
                    );
                } else if (erVilkårsvurderingenGyldig()) {
                    opprettEllerOppdaterVilkårsvurdering(vilkårsvurdering, fagsak);
                } else {
                    settVisFeilmeldinger(true);
                }
            }}
            senderInn={senderInn}
        >
            <BehandlingVilkårSkjema
                opprettelseFeilmelding={opprettelseFeilmelding}
                visFeilmeldinger={visFeilmeldinger}
                behandlingstype={åpenBehandling!!.type}
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
    );
};

export default Vilkårsvurdering;
