import * as React from 'react';
import { useHistory } from 'react-router';
import { IFagsak } from '../../../typer/fagsak';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import { IBehandling } from '../../../typer/behandling';

interface ITilkjentYtelseProps {
    fagsak: IFagsak;
    åpenBehandling: IBehandling;
}

const Opplysningsplikt: React.FunctionComponent<ITilkjentYtelseProps> = ({
    fagsak,
    åpenBehandling,
}) => {
    const history = useHistory();
    const nesteOnClick = () => {
        history.push(`/fagsak/${fagsak.id}/${åpenBehandling?.behandlingId}/registrere-søknad`);
    };

    const forrigeOnClick = () => {
        history.push(`/fagsak/${fagsak.id}/${åpenBehandling?.behandlingId}/vilkaarsvurdering`);
    };

    return (
        <Skjemasteg
            senderInn={false}
            tittel="Opplysningsplikt"
            className="opplysningsplikt"
            forrigeOnClick={forrigeOnClick}
            nesteOnClick={nesteOnClick}
            maxWidthStyle={'80rem'}
        >
            Hei test
        </Skjemasteg>
    );
};

export default Opplysningsplikt;
