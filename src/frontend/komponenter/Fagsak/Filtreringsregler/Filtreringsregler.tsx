import React from 'react';

import { useNavigate } from 'react-router-dom';
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

const StyledNormalTekst = styled(Normaltekst)`
    margin-left: 0.5rem;
`;

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
            <StyledUl>
                {Object.keys(Filtreringsregel).map(filtreringsregel => {
                    const fødselshendelsefiltreringResultat =
                        åpenBehandling.fødselshendelsefiltreringResultater.find(
                            it => it.filtreringsregel === filtreringsregel
                        );

                    if (!fødselshendelsefiltreringResultat) return null;

                    return (
                        <StyledLi key={filtreringsregel}>
                            <VilkårResultatIkon
                                resultat={fødselshendelsefiltreringResultat.resultat}
                                width={20}
                                height={20}
                            />
                            <StyledNormalTekst>
                                {
                                    filtreringsregler[
                                        fødselshendelsefiltreringResultat.filtreringsregel
                                    ]
                                }
                            </StyledNormalTekst>
                        </StyledLi>
                    );
                })}
            </StyledUl>
        </Skjemasteg>
    );
};

export default Filtreringsregler;
