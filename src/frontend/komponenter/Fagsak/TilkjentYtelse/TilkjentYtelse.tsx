import { IFagsak } from '../../../typer/fagsak';
import { Systemtittel } from 'nav-frontend-typografi';
import AlertStripe from 'nav-frontend-alertstriper';
import * as React from 'react';
import { hentAktivBehandlingPåFagsak } from '../../../utils/fagsak';
import { useApp } from '../../../context/AppContext';
import { Ressurs, RessursStatus } from '../../../typer/ressurs';
import { AxiosError } from 'axios';
import { Knapp } from 'nav-frontend-knapper';
import { Behandlingstype } from '../../../typer/behandling';
import { useHistory } from 'react-router';
import { IOppsummeringBeregning } from '../../../typer/beregning';
import { Oppsummeringsrad, OppsummeringsradHeader } from './Oppsummeringsrad';

interface ITilkjentYtelseProps {
    fagsak: IFagsak;
}

const TilkjentYtelse: React.FunctionComponent<ITilkjentYtelseProps> = ({ fagsak }) => {
    const { axiosRequest } = useApp();
    const history = useHistory();
    const [oppsummeringBeregning, setOppsummeringBeregning] = React.useState<
        IOppsummeringBeregning[]
    >([]);
    const [errorMessage, setErrorMessage] = React.useState<string | undefined>(undefined);
    const aktivBehandling = hentAktivBehandlingPåFagsak(fagsak);
    React.useEffect(() => {
        axiosRequest<IOppsummeringBeregning[], void>({
            method: 'GET',
            url: `/familie-ba-sak/api/vedtak/oversikt/${aktivBehandling?.behandlingId}`,
        })
            .then((response: Ressurs<IOppsummeringBeregning[]>) => {
                if (response.status === RessursStatus.SUKSESS) {
                    setOppsummeringBeregning(response.data);
                    setErrorMessage(undefined);
                } else if (response.status === RessursStatus.FEILET) {
                    setErrorMessage(response.melding);
                } else {
                    setErrorMessage('Ukjent feil, kunne ikke vise tilkjent ytelse.');
                }
            })
            .catch((_error: AxiosError) => {
                setErrorMessage('Ukjent feil, Kunne ikke generere forhåndsvisning.');
            });
    }, []);
    return (
        <div>
            {errorMessage === undefined ? (
                <div>
                    <Systemtittel children={'Tilkjent ytelse'} />
                    <br />
                    <div>
                        <OppsummeringsradHeader />
                        {oppsummeringBeregning.map((beregning, index) => {
                            return <Oppsummeringsrad beregning={beregning} key={index} />;
                        })}
                    </div>
                </div>
            ) : (
                <AlertStripe type="feil">{errorMessage}</AlertStripe>
            )}
            <div className={'oppsummering__navigering'}>
                <Knapp
                    type={'hoved'}
                    onClick={() => {
                        aktivBehandling?.type === Behandlingstype.REVURDERING
                            ? history.push(`/fagsak/${fagsak.id}/vilkår`)
                            : history.push(`/fagsak/${fagsak.id}/beregning`);
                    }}
                    children={'Tilbake'}
                />
                <Knapp
                    type={'hoved'}
                    children={'Neste'}
                    onClick={() => {
                        history.push(`/fagsak/${fagsak.id}/vedtak`);
                    }}
                />
            </div>
        </div>
    );
};

export default TilkjentYtelse;
