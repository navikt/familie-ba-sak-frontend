import React from 'react';

import { useHistory } from 'react-router';
import styled from 'styled-components';

import { Normaltekst } from 'nav-frontend-typografi';

import useSakOgBehandlingParams from '../../../hooks/useSakOgBehandlingParams';
import VilkårResultatIkon from '../../../ikoner/VilkårResultatIkon';
import type { IBehandling } from '../../../typer/behandling';
import { BehandlingSteg } from '../../../typer/behandling';
import { Filtreringsregel, filtreringsregler } from '../../../typer/fødselshendelser';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';

interface IProps {
    åpenBehandling: IBehandling;
}

const StyledUl = styled.ul`
    list-style: none;
    padding-left: 0;
`;

const StyledLi = styled.li`
    display: flex;
    padding-bottom: 1rem;
`;

const StyledVilkårResultatIkon = styled(VilkårResultatIkon)`
    margin-right: 1rem;
`;

const Filtreringsregler: React.FC<IProps> = ({ åpenBehandling }) => {
    const { fagsakId } = useSakOgBehandlingParams();
    const history = useHistory();

    return (
        <Skjemasteg
            skalViseForrigeKnapp={false}
            tittel={'Filtreringsregler'}
            nesteOnClick={() => {
                history.push(
                    `/fagsak/${fagsakId}/${åpenBehandling.behandlingId}/vilkaarsvurdering`
                );
            }}
            maxWidthStyle={'80rem'}
            senderInn={false}
            steg={BehandlingSteg.FILTRERING_FØDSELSHENDELSER}
        >
            <StyledUl>
                {Object.keys(Filtreringsregel).map(filtreringsregel => {
                    const fødselshendelsefiltreringResultat =
                        åpenBehandling.fødselshendelsefiltreringResultater.find(
                            it => it.filtreringsregel === filtreringsregel
                        );

                    if (!fødselshendelsefiltreringResultat) return null;

                    return (
                        <StyledLi key={filtreringsregel}>
                            <StyledVilkårResultatIkon
                                resultat={fødselshendelsefiltreringResultat.resultat}
                                width={24}
                                height={24}
                            />
                            <Normaltekst>
                                {
                                    filtreringsregler[
                                        fødselshendelsefiltreringResultat.filtreringsregel
                                    ]
                                }
                            </Normaltekst>
                        </StyledLi>
                    );
                })}
            </StyledUl>
        </Skjemasteg>
    );
};

export default Filtreringsregler;
