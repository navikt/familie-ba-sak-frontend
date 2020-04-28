import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { useHistory } from 'react-router';

import { IFagsak } from '../../../typer/fagsak';
import { hentAktivBehandlingPåFagsak } from '../../../utils/fagsak';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import useFagsakApi from '../useFagsakApi';
import { useVilkårsvurdering } from '../../../context/Vilkårsvurdering/VilkårsvurderingContext';
import BehandlingVilkårSkjema from './VilkårsvurderingSkjema';
import { IVilkårResultat } from '../../../typer/vilkår';
import { Feiloppsummering } from 'nav-frontend-skjema';
import { vilkårFeilmeldingId } from './GeneriskVilkår/GeneriskVilkår';
import { useFagsakRessurser } from '../../../context/FagsakContext';

interface IProps {
    fagsak: IFagsak;
}

const Vilkårsvurdering: React.FunctionComponent<IProps> = ({ fagsak }) => {
    const {
        erVilkårsvurderingenGyldig,
        hentVilkårMedFeil,
        vilkårsvurdering,
    } = useVilkårsvurdering();
    const { erLesevisning } = useFagsakRessurser();

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
        <Skjemasteg
            tittel={'Vilkårsvurdering'}
            forrigeOnClick={() => {
                history.push(`/fagsak/${fagsak.id}/registrer-soknad`);
            }}
            nesteOnClick={() => {
                if (erLesevisning()) {
                    history.push(`/fagsak/${fagsak.id}/tilkjent-ytelse`);
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
    );
};

export default Vilkårsvurdering;
