import { AxiosError } from 'axios';
import AlertStripe from 'nav-frontend-alertstriper';
import * as React from 'react';
import { useHistory } from 'react-router';
import { useApp } from '../../../context/AppContext';
import { IOppsummeringBeregning } from '../../../typer/beregning';
import { IFagsak } from '../../../typer/fagsak';
import { byggFeiletRessurs, Ressurs, RessursStatus } from '@navikt/familie-typer';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import { Oppsummeringsboks } from './Oppsummeringsboks';
import { IBehandling } from '../../../typer/behandling';
import TilkjentYtelseTidslinje from './TilkjentYtelseTidslinje';
import { useTidslinje } from '../../../context/TidslinjeContext';
import moment from 'moment';

interface ITilkjentYtelseProps {
    fagsak: IFagsak;
    åpenBehandling: IBehandling;
}

const TilkjentYtelse: React.FunctionComponent<ITilkjentYtelseProps> = ({
    fagsak,
    åpenBehandling,
}) => {
    const { axiosRequest } = useApp();
    const history = useHistory();
    const { aktivEtikett } = useTidslinje();
    const [tilkjentYtelseRessurs, setTilkjentYtelseRessurs] = React.useState<
        Ressurs<IOppsummeringBeregning[]>
    >({ status: RessursStatus.IKKE_HENTET });

    React.useEffect(() => {
        setTilkjentYtelseRessurs({ status: RessursStatus.HENTER });
        axiosRequest<IOppsummeringBeregning[], void>({
            method: 'GET',
            url: `/familie-ba-sak/api/vedtak/oversikt/${åpenBehandling?.behandlingId}`,
        })
            .then((response: Ressurs<IOppsummeringBeregning[]>) => {
                setTilkjentYtelseRessurs(response);
            })
            .catch((_error: AxiosError) => {
                setTilkjentYtelseRessurs(
                    byggFeiletRessurs('Ukjent feil, Kunne ikke generere forhåndsvisning.')
                );
            });
    }, []);

    const nesteOnClick = () => {
        history.push(`/fagsak/${fagsak.id}/${åpenBehandling?.behandlingId}/vedtak`);
    };

    const forrigeOnClick = () => {
        history.push(`/fagsak/${fagsak.id}/${åpenBehandling?.behandlingId}/vilkaarsvurdering`);
    };

    const filtrerPerioderForAktivEtikett = (
        tilkjentYtelseRessursData: IOppsummeringBeregning[]
    ): IOppsummeringBeregning[] => {
        return aktivEtikett
            ? tilkjentYtelseRessursData.filter(periode =>
                  periodeOverlapperMedValgtMåned(periode, aktivEtikett.dato)
              )
            : [];
    };

    const periodeOverlapperMedValgtMåned = (periode: IOppsummeringBeregning, dato: Date) => {
        return (
            moment(dato).isBetween(periode.periodeFom, periode.periodeTom) ||
            moment(dato).isSame(periode.periodeFom) ||
            moment(dato).isSame(periode.periodeTom)
        );
    };

    switch (tilkjentYtelseRessurs.status) {
        case RessursStatus.SUKSESS: {
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
                            perioder={filtrerPerioderForAktivEtikett(tilkjentYtelseRessurs.data)}
                            aktivEtikett={aktivEtikett}
                        />
                    )}
                </Skjemasteg>
            );
        }
        case RessursStatus.FEILET:
            return (
                <AlertStripe children={tilkjentYtelseRessurs.frontendFeilmelding} type={'feil'} />
            );
        case RessursStatus.IKKE_TILGANG:
            return (
                <AlertStripe
                    children={'Du har ikke tilgang til å se behandlingsresultat for denne saken'}
                    type={'advarsel'}
                />
            );
        default:
            return null;
    }
};
export default TilkjentYtelse;
