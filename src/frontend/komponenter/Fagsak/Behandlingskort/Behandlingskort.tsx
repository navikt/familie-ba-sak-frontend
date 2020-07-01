import classNames from 'classnames';
import moment from 'moment';
import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { useBehandling } from '../../../context/BehandlingContext';
import {
    behandlingsresultater,
    behandlingsstatuser,
    behandlingstyper,
} from '../../../typer/behandling';
import { IFagsak } from '../../../typer/fagsak';
import { hentDataFraRessurs } from '../../../typer/ressurs';
import { hentAktivVedtakPåBehandlig } from '../../../utils/fagsak';
import { datoformat } from '../../../utils/formatter';
import Informasjonsbolk from '../../Felleskomponenter/Informasjonsbolk/Informasjonsbolk';
import { sakstype } from '../Saksoversikt/Saksoversikt';

interface IBehandlingskortProps {
    fagsak: IFagsak;
}

const Behandlingskort: React.FC<IBehandlingskortProps> = ({ fagsak }) => {
    const åpenBehandling = hentDataFraRessurs(useBehandling().åpenBehandling);

    if (!åpenBehandling) {
        return <div />;
    }

    const antallBehandlinger = fagsak.behandlinger.length;
    const åpenBehandlingIndex = fagsak.behandlinger.findIndex(() => åpenBehandling) + 1;
    const aktivVedtak = hentAktivVedtakPåBehandlig(åpenBehandling);

    const behandlingsresultat = behandlingsresultater[åpenBehandling.samletResultat].navn;
    const tittel = `${
        åpenBehandling ? behandlingstyper[åpenBehandling.type].navn : 'ukjent'
    } (${åpenBehandlingIndex}/${antallBehandlinger}) - ${sakstype(åpenBehandling).toLowerCase()}`;

    console.log(åpenBehandling);

    return (
        <div className={classNames('behandlingskort', behandlingsresultat)}>
            <Normaltekst className={'behandlingskort__tittel'}>{tittel}</Normaltekst>
            <Informasjonsbolk
                informasjon={[
                    {
                        label: 'Behandlingsstatus',
                        tekst: behandlingsstatuser[åpenBehandling.status].navn,
                    },
                    {
                        label: 'Resultat',
                        tekst: behandlingsresultat,
                    },
                ]}
            />
            <table className="behandlingskort__tabell">
                <thead>
                    <tr>
                        <th>
                            <Normaltekst children={'Opprettet'} />
                        </th>
                        <th>
                            <Normaltekst children={'Vedtaksdato'} />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Normaltekst
                                children={moment(åpenBehandling.opprettetTidspunkt).format(
                                    datoformat.DATO
                                )}
                            />
                        </td>
                        <td>
                            <Normaltekst
                                children={
                                    moment(aktivVedtak?.vedtaksdato).format(datoformat.DATO) ??
                                    'Ikke satt'
                                }
                            />
                        </td>
                        <td>
                            <Normaltekst children={'4080 NFP Drammen'} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Behandlingskort;
