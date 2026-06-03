import { useBehandling } from '@hooks/useBehandling';
import { useFagsakId } from '@hooks/useFagsakId';
import { BehandlingSteg } from '@typer/behandling';
import { Filtreringsregel, filtreringsregler } from '@typer/fødselshendelser';
import { useNavigate } from 'react-router';

import { BodyShort, List } from '@navikt/ds-react';

import VilkårResultatIkon from '../../../../../ikoner/VilkårResultatIkon';
import Skjemasteg from '../Skjemasteg';

const Filtreringsregler = () => {
    const fagsakId = useFagsakId();
    const behandling = useBehandling();
    const navigate = useNavigate();

    return (
        <Skjemasteg
            skalViseForrigeKnapp={false}
            tittel={'Filtreringsregler'}
            nesteOnClick={() => {
                navigate(`/fagsak/${fagsakId}/${behandling.behandlingId}/vilkaarsvurdering`);
            }}
            maxWidthStyle={'80rem'}
            senderInn={false}
            steg={BehandlingSteg.FILTRERING_FØDSELSHENDELSER}
        >
            <List>
                {Object.keys(Filtreringsregel).map(filtreringsregel => {
                    const fødselshendelsefiltreringResultat = behandling.fødselshendelsefiltreringResultater.find(
                        it => it.filtreringsregel === filtreringsregel
                    );

                    if (!fødselshendelsefiltreringResultat) return null;

                    return (
                        <List.Item
                            aria-hidden
                            icon={<VilkårResultatIkon resultat={fødselshendelsefiltreringResultat.resultat} />}
                            key={filtreringsregel}
                        >
                            <BodyShort>
                                {filtreringsregler[fødselshendelsefiltreringResultat.filtreringsregel]}
                            </BodyShort>
                        </List.Item>
                    );
                })}
            </List>
        </Skjemasteg>
    );
};

export default Filtreringsregler;
