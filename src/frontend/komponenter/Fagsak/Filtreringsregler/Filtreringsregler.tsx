import React from 'react';

import { useHistory } from 'react-router';
import styled from 'styled-components';

import { Normaltekst } from 'nav-frontend-typografi';

import VilkårResultatIkon from '../../../ikoner/VilkårResultatIkon';
import { IBehandling } from '../../../typer/behandling';
import { IFagsak } from '../../../typer/fagsak';
import { filtreringsregler } from '../../../typer/fødselshendelser';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';

interface IProps {
    fagsak: IFagsak;
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

const Filtreringsregler: React.FC<IProps> = ({ fagsak, åpenBehandling }) => {
    const history = useHistory();

    return (
        <Skjemasteg
            skalViseForrigeKnapp={false}
            tittel={'Filtreringsregler'}
            nesteOnClick={() => {
                history.push(
                    `/fagsak/${fagsak.id}/${åpenBehandling.behandlingId}/vilkaarsvurdering`
                );
            }}
            maxWidthStyle={'80rem'}
            senderInn={false}
        >
            <StyledUl>
                {åpenBehandling.fødselshendelsefiltreringResultater.map(
                    fødselshendelsefiltreringResultat => {
                        return (
                            <StyledLi key={fødselshendelsefiltreringResultat.filtreringsregel}>
                                <StyledVilkårResultatIkon
                                    resultat={fødselshendelsefiltreringResultat.resultat}
                                    width={24}
                                    heigth={24}
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
                    }
                )}
            </StyledUl>
        </Skjemasteg>
    );
};

export default Filtreringsregler;
