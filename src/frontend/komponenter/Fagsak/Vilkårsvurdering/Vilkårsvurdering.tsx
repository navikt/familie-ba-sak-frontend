import * as React from 'react';
import { useState, useEffect } from 'react';

import { useHistory } from 'react-router';

import { Feiloppsummering } from 'nav-frontend-skjema';
import { Feilmelding } from 'nav-frontend-typografi';

import { useBehandling } from '../../../context/BehandlingContext';
import { VedtakBegrunnelserProvider } from '../../../context/VedtakBegrunnelserContext';
import { useVilkårsvurdering } from '../../../context/Vilkårsvurdering/VilkårsvurderingContext';
import { IBehandling, BehandlingÅrsak } from '../../../typer/behandling';
import { IFagsak } from '../../../typer/fagsak';
import { IAnnenVurdering, IVilkårResultat, vilkårConfig } from '../../../typer/vilkår';
import { hentAktivVedtakPåBehandlig } from '../../../utils/fagsak';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import useFagsakApi from '../useFagsakApi';
import { annenVurderingFeilmeldingId } from './GeneriskAnnenVurdering/AnnenVurderingTabell';
import { vilkårFeilmeldingId } from './GeneriskVilkår/VilkårTabell';
import VilkårsvurderingSkjema from './VilkårsvurderingSkjema';

interface IProps {
    fagsak: IFagsak;
    åpenBehandling: IBehandling;
}

const Vilkårsvurdering: React.FunctionComponent<IProps> = ({ fagsak, åpenBehandling }) => {
    const {
        erVilkårsvurderingenGyldig,
        hentVilkårMedFeil,
        hentAndreVurderingerMedFeil,
        vilkårsvurdering,
    } = useVilkårsvurdering();
    const { erLesevisning } = useBehandling();

    const [visFeilmeldinger, settVisFeilmeldinger] = React.useState(false);

    const [tømFeilmelding, settTømFeilmelding] = useState<boolean>(false);
    useEffect(() => settTømFeilmelding(false), [tømFeilmelding]);

    const [opprettelseFeilmelding, settOpprettelseFeilmelding] = React.useState('');

    const history = useHistory();
    const { validerVilkårsvurderingOgSendInn, senderInn } = useFagsakApi(
        settVisFeilmeldinger,
        settOpprettelseFeilmelding
    );

    const aktivVedtak = hentAktivVedtakPåBehandlig(åpenBehandling);

    if (vilkårsvurdering.length === 0) {
        return <div>Finner ingen vilkår på behandlingen.</div>;
    }

    return (
        <Skjemasteg
            skalViseForrigeKnapp={
                !åpenBehandling.skalBehandlesAutomatisk &&
                åpenBehandling.årsak === BehandlingÅrsak.SØKNAD
            }
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
                    validerVilkårsvurderingOgSendInn(fagsak);
                } else {
                    // Fjerner feilmeldingen fra DOMen for å trigge aria-live på nytt
                    settTømFeilmelding(true);
                    settVisFeilmeldinger(true);
                }
            }}
            maxWidthStyle={'80rem'}
            senderInn={senderInn}
        >
            <VedtakBegrunnelserProvider fagsak={fagsak} aktivVedtak={aktivVedtak}>
                <VilkårsvurderingSkjema visFeilmeldinger={visFeilmeldinger} />
            </VedtakBegrunnelserProvider>

            {(hentVilkårMedFeil().length > 0 || hentAndreVurderingerMedFeil().length > 0) &&
                !tømFeilmelding &&
                visFeilmeldinger && (
                    <Feiloppsummering
                        aria-live={'polite'}
                        tittel={'For å gå videre må du rette opp følgende:'}
                        feil={[
                            ...hentVilkårMedFeil().map((vilkårResultat: IVilkårResultat) => ({
                                feilmelding: `Vilkåret "${
                                    vilkårConfig[vilkårResultat.vilkårType].tittel
                                }" mangler resultat`,
                                skjemaelementId: vilkårFeilmeldingId(vilkårResultat),
                            })),
                            ...hentAndreVurderingerMedFeil().map(
                                (annenVurdering: IAnnenVurdering) => ({
                                    feilmelding: `Annen vurdering mangler resultat`,
                                    skjemaelementId: annenVurderingFeilmeldingId(annenVurdering),
                                })
                            ),
                        ]}
                    />
                )}

            {!tømFeilmelding && visFeilmeldinger && opprettelseFeilmelding !== '' && (
                <Feilmelding aria-live={'polite'}>{opprettelseFeilmelding}</Feilmelding>
            )}
        </Skjemasteg>
    );
};

export default Vilkårsvurdering;
