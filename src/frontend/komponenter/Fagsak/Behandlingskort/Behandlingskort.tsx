import classNames from 'classnames';
import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import {
    behandlingsresultater,
    behandlingstyper,
    behandlingsstatuser,
} from '../../../typer/behandling';
import { IFagsak } from '../../../typer/fagsak';
import { useBehandling } from '../../../context/BehandlingContext';
import { hentDataFraRessurs } from '../../../typer/ressurs';
import { sakstype } from '../Saksoversikt/Saksoversikt';
import Informasjonsbolk from '../../Felleskomponenter/Informasjonsbolk/Informasjonsbolk';
import { datoformat } from '../../../utils/formatter';
import moment from 'moment';

interface IBehandlingskortProps {
    fagsak: IFagsak;
}

const Behandlingskort: React.FC<IBehandlingskortProps> = ({ fagsak }) => {
    const åpenBehandling = hentDataFraRessurs(useBehandling().åpenBehandling);

    const antallBehandlinger = fagsak.behandlinger.length;
    const åpenBehandlingIndex = fagsak.behandlinger.findIndex(() => åpenBehandling) + 1;

    const behandlingsresultat = åpenBehandling
        ? behandlingsresultater[åpenBehandling.samletResultat].navn
        : 'Ukjent';

    const tittel = `${
        behandlingstyper[åpenBehandling.type].navn
    } (${åpenBehandlingIndex}/${antallBehandlinger}) - ${sakstype(åpenBehandling).toLowerCase()}`;

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
            <Informasjonsbolk
                informasjon={[
                    {
                        label: 'Opprettet',
                        tekst: moment(åpenBehandling.opprettetTidspunkt).format(datoformat.DATO),
                    },
                    {
                        label: 'Resultat',
                        tekst: behandlingsresultat,
                    },
                ]}
            />
        </div>
    );
};

export default Behandlingskort;
