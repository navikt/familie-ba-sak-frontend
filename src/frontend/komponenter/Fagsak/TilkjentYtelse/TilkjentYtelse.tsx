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
import Chevron from 'nav-datovelger/lib/elementer/ChevronSvg';
import BeregningDetalj from './BeregningDetalj';
import { datoformat, formaterIsoDato } from '../../../utils/formatter';

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
    const [åpneElementer, setÅpneElementer] = React.useState<number[]>([]);
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

    const oppdaterÅpneElementer = (index: number) => {
        if (åpneElementer.includes(index)) {
            setÅpneElementer(åpneElementer.filter(element => element !== index));
        } else {
            setÅpneElementer([...åpneElementer, index]);
        }
    };

    const erElementÅpen = (index: number) => {
        return åpneElementer.includes(index);
    };

    return (
        <div>
            {errorMessage === undefined ? (
                <div>
                    <Systemtittel children={'Tilkjent ytelse'} />
                    <br />
                    <div>
                        <div className="tilkjentytelse-rad">
                            <div className="tilkjentytelse-kolonne" />
                            <div className="tilkjentytelse-kolonne">Periode</div>
                            <div className="tilkjentytelse-kolonne">Sakstype</div>
                            <div className="tilkjentytelse-kolonne">Satser</div>
                            <div className="tilkjentytelse-kolonne">Ant. barn</div>
                            <div className="tilkjentytelse-kolonne">Utbet./md.</div>
                        </div>
                        {oppsummeringBeregning.map((beregning, index) => {
                            return (
                                <div className="tilkjentytelse-rad" key={index}>
                                    <div className="tilkjentytelse-kolonne">
                                        <button onClick={() => oppdaterÅpneElementer(index)}>
                                            <Chevron
                                                retning={erElementÅpen(index) ? 'opp' : 'ned'}
                                            />
                                        </button>
                                    </div>
                                    <div className="tilkjentytelse-kolonne">
                                        {formaterIsoDato(beregning.periodeFom, datoformat.DATO)} -{' '}
                                        {formaterIsoDato(beregning.periodeTom, datoformat.DATO)}
                                    </div>
                                    <div className="tilkjentytelse-kolonne">
                                        {beregning.sakstype}
                                    </div>
                                    <div className="tilkjentytelse-kolonne">
                                        {beregning.stønadstype.join(',')}
                                    </div>
                                    <div className="tilkjentytelse-kolonne">
                                        {beregning.antallBarn}
                                    </div>
                                    <div className="tilkjentytelse-kolonne">
                                        {beregning.utbetaltPerMnd}
                                    </div>
                                    {erElementÅpen(index) && (
                                        <BeregningDetalj
                                            beregningDetaljer={beregning.beregningDetaljer}
                                        />
                                    )}
                                </div>
                            );
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
