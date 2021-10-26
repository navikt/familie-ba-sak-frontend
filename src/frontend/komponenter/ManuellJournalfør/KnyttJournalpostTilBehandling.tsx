import React from 'react';

import styled from 'styled-components';

import AlertStripe from 'nav-frontend-alertstriper';
import { Undertittel } from 'nav-frontend-typografi';

import { FamilieCheckbox } from '@navikt/familie-form-elements';

import { useManuellJournalfør } from '../../context/ManuellJournalførContext';
import {
    behandlingsstatuser,
    BehandlingStatus,
    behandlingstyper,
    BehandlingÅrsak,
    behandlingÅrsak,
} from '../../typer/behandling';
import { hentAktivBehandlingPåMinimalFagsak } from '../../utils/fagsak';
import { datoformat, formaterIsoDato } from '../../utils/formatter';
import { VisningBehandling } from '../Fagsak/Saksoversikt/visningBehandling';
import { KnyttTilNyBehandling } from './KnyttTilNyBehandling';

const KnyttDiv = styled.div`
    margin-top: 20px;
`;

const BehandlingstypeTd = styled.td`
    min-width: 12rem;
    label {
        text-indent: 2rem !important;
    }
`;

const KnyttTilBehandlingTd = styled.td`
    width: 2rem;
`;

const GenerellSakInfoStripeTittel = styled.div`
    font-weight: bold;
`;
export const KnyttJournalpostTilBehandling: React.FC = () => {
    const { skjema, minimalFagsak, hentSorterteBehandlinger, erLesevisning } =
        useManuellJournalfør();
    const åpenBehandling: VisningBehandling | undefined = minimalFagsak
        ? hentAktivBehandlingPåMinimalFagsak(minimalFagsak)
        : undefined;

    const visGenerellSakInfoStripe =
        skjema.felter.tilknyttedeBehandlingIder.verdi.length === 0 &&
        !skjema.felter.knyttTilNyBehandling.verdi;
    return (
        <KnyttDiv>
            {!!minimalFagsak?.behandlinger.length && (
                <>
                    <Undertittel>Knytt til tidligere behandling(er)</Undertittel>
                    <table className="tabell">
                        <thead className="tabell__head">
                            <tr className="tabell__head__tr">
                                <th></th>
                                <th>{'Dato'}</th>
                                <th>{'Årsak'}</th>
                                <th>{'Behandlingstype'}</th>
                                <th>{'Status'}</th>
                            </tr>
                        </thead>
                        <tbody className="tabell__body">
                            {hentSorterteBehandlinger().map((behandling: VisningBehandling) => (
                                <tr
                                    key={behandling.behandlingId}
                                    className={
                                        skjema.felter.tilknyttedeBehandlingIder.verdi.includes(
                                            behandling.behandlingId as number
                                        )
                                            ? 'tabell__tr--valgt'
                                            : ''
                                    }
                                    aria-selected={skjema.felter.tilknyttedeBehandlingIder.verdi.includes(
                                        behandling.behandlingId as number
                                    )}
                                >
                                    <KnyttTilBehandlingTd>
                                        <FamilieCheckbox
                                            id={skjema.felter.tilknyttedeBehandlingIder.id}
                                            erLesevisning={erLesevisning()}
                                            label={'-'}
                                            checked={skjema.felter.tilknyttedeBehandlingIder.verdi.includes(
                                                behandling.behandlingId as number
                                            )}
                                            onChange={() => {
                                                skjema.felter.tilknyttedeBehandlingIder.validerOgSettFelt(
                                                    [
                                                        ...skjema.felter.tilknyttedeBehandlingIder.verdi.filter(
                                                            it =>
                                                                it !==
                                                                (behandling.behandlingId as number)
                                                        ),
                                                        ...(skjema.felter.tilknyttedeBehandlingIder.verdi.includes(
                                                            behandling.behandlingId as number
                                                        )
                                                            ? []
                                                            : [behandling.behandlingId as number]),
                                                    ]
                                                );
                                            }}
                                        />
                                    </KnyttTilBehandlingTd>
                                    <td>
                                        {formaterIsoDato(
                                            behandling.opprettetTidspunkt,
                                            datoformat.DATO_FORKORTTET
                                        )}
                                    </td>
                                    <td>{behandlingÅrsak[behandling.årsak as BehandlingÅrsak]}</td>
                                    <BehandlingstypeTd>
                                        {behandlingstyper[behandling.type].navn}
                                    </BehandlingstypeTd>
                                    <td>{behandlingsstatuser[behandling.status]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <br />
                </>
            )}
            {(!åpenBehandling || åpenBehandling.status === BehandlingStatus.AVSLUTTET) && (
                <KnyttTilNyBehandling />
            )}
            {visGenerellSakInfoStripe && (
                <>
                    <br />
                    <AlertStripe type="info">
                        <GenerellSakInfoStripeTittel>
                            {hentSorterteBehandlinger().length > 0
                                ? `Du velger å journalføre uten å knytte til behandling(er).`
                                : `Du velger å journalføre uten å knytte til ny behandling.`}
                        </GenerellSakInfoStripeTittel>
                        <div>
                            {`Journalposten knyttes kun til person (tilsvarende "Knytt til generell
                            sak" i Gosys)`}
                        </div>
                    </AlertStripe>
                </>
            )}
        </KnyttDiv>
    );
};
