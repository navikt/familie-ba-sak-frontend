import { AxiosError } from 'axios';
import AlertStripe from 'nav-frontend-alertstriper';
import { Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { useHistory } from 'react-router';
import { useApp } from '../../../context/AppContext';
import { IOppsummeringBeregning } from '../../../typer/beregning';
import { IFagsak } from '../../../typer/fagsak';
import { byggFeiletRessurs, Ressurs, RessursStatus } from '../../../typer/ressurs';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import { Oppsummeringsrad, OppsummeringsradHeader } from './Oppsummeringsrad';
import { IBehandling } from '../../../typer/behandling';
import TilkjentYtelseTidslinje from './TilkjentYtelseTidslinje';

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

    switch (tilkjentYtelseRessurs.status) {
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
        case RessursStatus.SUKSESS: {
            const harAndeler = tilkjentYtelseRessurs.data.length > 0;
            return (
                <Skjemasteg
                    className={'tilkjentytelse'}
                    senderInn={false}
                    tittel="Behandlingsresultat"
                    forrigeOnClick={forrigeOnClick}
                    nesteOnClick={nesteOnClick}
                    maxWidthStyle={'80rem'}
                >
                    <TilkjentYtelseTidslinje />
                    {harAndeler ? (
                        <div role="table">
                            <OppsummeringsradHeader />
                            {tilkjentYtelseRessurs.data
                                .slice()
                                .reverse()
                                .map((beregning, index) => {
                                    return <Oppsummeringsrad beregning={beregning} key={index} />;
                                })}
                        </div>
                    ) : (
                        <div className="tilkjentytelse-informasjon">
                            <Undertittel>Vilkårene for barnetrygd er ikke oppfylt.</Undertittel>
                        </div>
                    )}
                </Skjemasteg>
            );
        }
        default:
            return <AlertStripe children={'En ukjent feil oppstod'} type={'advarsel'} />;
    }
};
export default TilkjentYtelse;
