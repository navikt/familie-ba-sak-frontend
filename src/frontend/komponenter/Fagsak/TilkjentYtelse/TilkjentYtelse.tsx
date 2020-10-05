import * as React from 'react';
import { useHistory } from 'react-router';
import { IFagsak } from '../../../typer/fagsak';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import { Oppsummeringsboks } from './Oppsummeringsboks';
import { IBehandling } from '../../../typer/behandling';
import TilkjentYtelseTidslinje from './TilkjentYtelseTidslinje';
import { useTidslinje } from '../../../context/TidslinjeContext';
import { periodeOverlapperMedValgtDato } from '../../../utils/tid';
import { IOppsummeringBeregning } from '../../../typer/beregning';

interface ITilkjentYtelseProps {
    fagsak: IFagsak;
    åpenBehandling: IBehandling;
}

const TilkjentYtelse: React.FunctionComponent<ITilkjentYtelseProps> = ({
    fagsak,
    åpenBehandling,
}) => {
    const history = useHistory();
    const { aktivEtikett } = useTidslinje();
    const nesteOnClick = () => {
        history.push(`/fagsak/${fagsak.id}/${åpenBehandling?.behandlingId}/vedtak`);
    };

    const forrigeOnClick = () => {
        history.push(`/fagsak/${fagsak.id}/${åpenBehandling?.behandlingId}/vilkaarsvurdering`);
    };

    const filtrerPerioderForAktivEtikett = (
        beregningOversikt: IOppsummeringBeregning[]
    ): IOppsummeringBeregning[] => {
        return aktivEtikett
            ? beregningOversikt.filter(periode =>
                  periodeOverlapperMedValgtDato(
                      periode.periodeFom,
                      periode.periodeTom,
                      aktivEtikett.dato
                  )
              )
            : [];
    };
    return (
        <Skjemasteg
            senderInn={false}
            tittel="Behandlingsresultat"
            className="tilkjentytelse"
            forrigeOnClick={forrigeOnClick}
            nesteOnClick={nesteOnClick}
            maxWidthStyle={'80rem'}
        >
            <TilkjentYtelseTidslinje />
            {aktivEtikett && (
                <Oppsummeringsboks
                    perioder={filtrerPerioderForAktivEtikett(åpenBehandling.beregningOversikt)}
                    aktivEtikett={aktivEtikett}
                />
            )}
        </Skjemasteg>
    );
};

export default TilkjentYtelse;
