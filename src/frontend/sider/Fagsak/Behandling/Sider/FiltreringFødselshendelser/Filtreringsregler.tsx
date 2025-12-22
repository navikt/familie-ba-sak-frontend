import React from 'react';

import { useNavigate } from 'react-router';

import { BodyShort, List } from '@navikt/ds-react';

import useSakOgBehandlingParams from '../../../../../hooks/useSakOgBehandlingParams';
import VilkårResultatIkon from '../../../../../ikoner/VilkårResultatIkon';
import type { IBehandling } from '../../../../../typer/behandling';
import { BehandlingSteg } from '../../../../../typer/behandling';
import { Filtreringsregel, filtreringsregler } from '../../../../../typer/fødselshendelser';
import Skjemasteg from '../Skjemasteg';

interface IProps {
    åpenBehandling: IBehandling;
}

const Filtreringsregler: React.FC<IProps> = ({ åpenBehandling }) => {
    const { fagsakId } = useSakOgBehandlingParams();
    const navigate = useNavigate();

    return (
        <Skjemasteg
            skalViseForrigeKnapp={false}
            tittel={'Filtreringsregler'}
            nesteOnClick={() => {
                navigate(`/fagsak/${fagsakId}/${åpenBehandling.behandlingId}/vilkaarsvurdering`);
            }}
            maxWidthStyle={'80rem'}
            senderInn={false}
            steg={BehandlingSteg.FILTRERING_FØDSELSHENDELSER}
        >
            <List>
                {Object.keys(Filtreringsregel).map(filtreringsregel => {
                    const fødselshendelsefiltreringResultat = åpenBehandling.fødselshendelsefiltreringResultater.find(
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
