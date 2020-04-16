import { IFagsak } from '../../../typer/fagsak';
import { Ingress, Undertittel } from 'nav-frontend-typografi';
import AlertStripe from 'nav-frontend-alertstriper';
import * as React from 'react';
import { hentAktivBehandlingPåFagsak } from '../../../utils/fagsak';
import { useApp } from '../../../context/AppContext';
import { byggFeiletRessurs, Ressurs, RessursStatus } from '../../../typer/ressurs';
import { AxiosError } from 'axios';
import { Behandlingstype } from '../../../typer/behandling';
import { useHistory } from 'react-router';
import { IOppsummeringBeregning } from '../../../typer/beregning';
import { Oppsummeringsrad, OppsummeringsradHeader } from './Oppsummeringsrad';
import { datoformat, formaterIsoDato } from '../../../utils/formatter';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import SystemetLaster from '../../Felleskomponenter/SystemetLaster/SystemetLaster';

interface ITilkjentYtelseProps {
    fagsak: IFagsak;
}

const TilkjentYtelse: React.FunctionComponent<ITilkjentYtelseProps> = ({ fagsak }) => {
    const { axiosRequest } = useApp();
    const history = useHistory();
    const [tilkjentYtelseRessurs, setTilkjentYtelseRessurs] = React.useState<
        Ressurs<IOppsummeringBeregning[]>
    >({ status: RessursStatus.IKKE_HENTET });
    const aktivBehandling = hentAktivBehandlingPåFagsak(fagsak);

    React.useEffect(() => {
        setTilkjentYtelseRessurs({ status: RessursStatus.HENTER });
        axiosRequest<IOppsummeringBeregning[], void>({
            method: 'GET',
            url: `/familie-ba-sak/api/vedtak/oversikt/${aktivBehandling?.behandlingId}`,
        })
            .then((response: Ressurs<IOppsummeringBeregning[]>) => {
                setTilkjentYtelseRessurs(response);
            })
            .catch((_error: AxiosError) => {
                setTilkjentYtelseRessurs(
                    byggFeiletRessurs('Ukjent feil, Kunne ikke generere forhåndsvisning.', _error)
                );
            });
    }, []);

    const startdato = (oppsummeringBeregninger: IOppsummeringBeregning[]) => {
        return oppsummeringBeregninger[0]
            ? formaterIsoDato(oppsummeringBeregninger[0].periodeFom, datoformat.DATO_FORLENGET)
            : '';
    };

    const nesteOnClick = () => {
        history.push(`/fagsak/${fagsak.id}/vedtak`);
    };

    const forrigeOnClick = () => {
        aktivBehandling?.type === Behandlingstype.REVURDERING
            ? history.push(`/fagsak/${fagsak.id}/vilkaarsvurdering`)
            : history.push(`/fagsak/${fagsak.id}/beregning`);
    };
    switch (tilkjentYtelseRessurs.status) {
        case RessursStatus.HENTER:
        case RessursStatus.IKKE_HENTET:
            return <SystemetLaster />;
        case RessursStatus.FEILET:
            return <AlertStripe children={tilkjentYtelseRessurs.melding} type={'feil'} />;
        case RessursStatus.IKKE_TILGANG:
            return (
                <AlertStripe
                    children={'Du har ikke tilgang til å se behandlingsresultat for denne saken'}
                    type={'advarsel'}
                />
            );
        case RessursStatus.SUKSESS:
            return (
                <div className="tilkjentytelse">
                    <Skjemasteg
                        senderInn={false}
                        tittel="Behandlingsresultat"
                        forrigeOnClick={forrigeOnClick}
                        nesteOnClick={nesteOnClick}
                        maxWidthStyle={'80rem'}
                    >
                        <div className="tilkjentytelse-informasjon">
                            <Undertittel>
                                Vilkårene for barnetrygd er oppfylt f.o.m.{' '}
                                {startdato(tilkjentYtelseRessurs.data)}
                            </Undertittel>
                            <Ingress>Se detaljer under periode.</Ingress>
                        </div>
                        <div role="table">
                            <OppsummeringsradHeader />
                            {tilkjentYtelseRessurs.data.reverse().map((beregning, index) => {
                                return <Oppsummeringsrad beregning={beregning} key={index} />;
                            })}
                        </div>
                    </Skjemasteg>
                </div>
            );
        default:
            return <AlertStripe children={'En ukjent feil oppstod'} type={'advarsel'} />;
    }
};
export default TilkjentYtelse;
