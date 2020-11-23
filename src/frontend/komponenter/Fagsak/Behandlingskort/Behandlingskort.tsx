import classNames from 'classnames';
import moment from 'moment';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import {
    behandlingsresultater,
    behandlingsstatuser,
    behandlingstyper,
    behandlingÅrsak,
    IBehandling,
} from '../../../typer/behandling';
import { IFagsak } from '../../../typer/fagsak';
import { hentAktivVedtakPåBehandlig } from '../../../utils/fagsak';
import { datoformat, formaterIverksattDato } from '../../../utils/formatter';
import Informasjonsbolk from '../../Felleskomponenter/Informasjonsbolk/Informasjonsbolk';
import { sakstype } from '../Saksoversikt/Saksoversikt';

interface IBehandlingskortProps {
    fagsak: IFagsak;
    åpenBehandling: IBehandling;
}

const Behandlingskort: React.FC<IBehandlingskortProps> = ({ fagsak, åpenBehandling }) => {
    const antallBehandlinger = fagsak.behandlinger.length;
    const åpenBehandlingIndex = fagsak.behandlinger.findIndex(() => åpenBehandling) + 1;
    const aktivVedtak = hentAktivVedtakPåBehandlig(åpenBehandling);

    const behandlingsresultat = behandlingsresultater[åpenBehandling.samletResultat];
    const tittel = `${
        åpenBehandling ? behandlingstyper[åpenBehandling.type].navn : 'ukjent'
    } (${åpenBehandlingIndex}/${antallBehandlinger}) - ${sakstype(åpenBehandling).toLowerCase()}`;

    return (
        <div className={classNames('behandlingskort', behandlingsresultat)}>
            <Undertittel>{tittel}</Undertittel>
            <Normaltekst>{behandlingÅrsak[åpenBehandling.årsak]}</Normaltekst>
            <hr />
            <Informasjonsbolk
                informasjon={[
                    {
                        label: 'Behandlingsstatus',
                        tekst: behandlingsstatuser[åpenBehandling.status],
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
                        tekst: formaterIverksattDato(aktivVedtak?.vedtaksdato),
                    },
                ]}
            />

            <Informasjonsbolk
                informasjon={[
                    {
                        label: 'Enhet',
                        tekst: åpenBehandling.arbeidsfordelingPåBehandling.behandlendeEnhetId,
                        tekstTitle:
                            åpenBehandling.arbeidsfordelingPåBehandling.behandlendeEnhetNavn,
                    },
                ]}
            />
        </div>
    );
};

export default Behandlingskort;
