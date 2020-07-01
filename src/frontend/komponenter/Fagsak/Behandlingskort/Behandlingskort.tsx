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
import { hentAktivVedtakPåBehandlig } from '../../../utils/fagsak';

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
                        label: 'Vedtaksdato',
                        tekst:
                            moment(aktivVedtak?.vedtaksdato).format(datoformat.DATO) ?? 'Ikke satt',
                    },
                ]}
            />
        </div>
    );
};

export default Behandlingskort;
