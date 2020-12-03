import * as React from 'react';

import { useHistory } from 'react-router';

import { Feiloppsummering } from 'nav-frontend-skjema';
import { Feilmelding } from 'nav-frontend-typografi';

import { useBehandling } from '../../../context/BehandlingContext';
import { useVilkårsvurdering } from '../../../context/Vilkårsvurdering/VilkårsvurderingContext';
import { IBehandling } from '../../../typer/behandling';
import { IFagsak } from '../../../typer/fagsak';
import { IVilkårResultat } from '../../../typer/vilkår';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import useFagsakApi from '../useFagsakApi';
import { vilkårFeilmeldingId } from './GeneriskVilkår/GeneriskVilkår';
import VilkårsvurderingSkjema from './VilkårsvurderingSkjema';

interface IProps {
    fagsak: IFagsak;
    åpenBehandling: IBehandling;
}

const Vilkårsvurdering: React.FunctionComponent<IProps> = ({ fagsak, åpenBehandling }) => {
    const {
        erVilkårsvurderingenGyldig,
        hentVilkårMedFeil,
        vilkårsvurdering,
    } = useVilkårsvurdering();
    const { erLesevisning, opplysningsplikt } = useBehandling();

    const [visFeilmeldinger, settVisFeilmeldinger] = React.useState(false);
    const [opprettelseFeilmelding, settOpprettelseFeilmelding] = React.useState('');

    const history = useHistory();
    const { validerVilkårsvurderingOgSendInn, senderInn } = useFagsakApi(
        settVisFeilmeldinger,
        settOpprettelseFeilmelding
    );

    if (vilkårsvurdering.length === 0) {
        return <div>Finner ingen vilkår på behandlingen.</div>;
    }

    return (
        <Skjemasteg
            tittel={'Vilkårsvurdering'}
            forrigeOnClick={() => {
                if (opplysningsplikt) {
                    history.push(
                        `/fagsak/${fagsak.id}/${åpenBehandling.behandlingId}/opplysningsplikt`
                    );
                } else {
                    history.push(
                        `/fagsak/${fagsak.id}/${åpenBehandling.behandlingId}/registrer-soknad`
                    );
                }
            }}
            nesteOnClick={() => {
                if (erLesevisning()) {
                    history.push(
                        `/fagsak/${fagsak.id}/${åpenBehandling.behandlingId}/tilkjent-ytelse`
                    );
                } else if (erVilkårsvurderingenGyldig()) {
                    validerVilkårsvurderingOgSendInn(vilkårsvurdering, fagsak);
                } else {
                    settVisFeilmeldinger(true);
                }
            }}
            maxWidthStyle={'80rem'}
            senderInn={senderInn}
            className={'vilkårsvurdering'}
        >
            <VilkårsvurderingSkjema visFeilmeldinger={visFeilmeldinger} />

            {hentVilkårMedFeil().length > 0 && visFeilmeldinger && (
                <Feiloppsummering
                    tittel={'For å gå videre må du rette opp følgende:'}
                    feil={hentVilkårMedFeil().map((vilkårResultat: IVilkårResultat) => ({
                        feilmelding: `Vilkåret mangler resultat`,
                        skjemaelementId: vilkårFeilmeldingId(vilkårResultat),
                    }))}
                />
            )}

            {visFeilmeldinger && opprettelseFeilmelding !== '' && (
                <Feilmelding>{opprettelseFeilmelding}</Feilmelding>
            )}
        </Skjemasteg>
    );
};

export default Vilkårsvurdering;
