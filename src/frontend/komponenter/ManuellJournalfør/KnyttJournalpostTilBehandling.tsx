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
    behandlingÅrsak,
    IBehandling,
} from '../../typer/behandling';
import { hentAktivBehandlingPåFagsak } from '../../utils/fagsak';
import { datoformat, formaterIsoDato } from '../../utils/formatter';
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
    const { skjema, fagsak, hentSorterteBehandlinger, erLesevisning } = useManuellJournalfør();
    const åpenBehandling: IBehandling | undefined = fagsak
        ? hentAktivBehandlingPåFagsak(fagsak)
        : undefined;

    const visGenerellSakInfoStripe =
        skjema.felter.tilknyttedeBehandlingIder.verdi.length === 0 &&
        !skjema.felter.knyttTilNyBehandling.verdi;
    return (
        <KnyttDiv>
            {!!fagsak?.behandlinger.length && (
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
                            {hentSorterteBehandlinger().map((behandling: IBehandling) => (
                                <tr
                                    key={behandling.behandlingId}
                                    className={
                                        skjema.felter.tilknyttedeBehandlingIder.verdi.includes(
                                            behandling.behandlingId
                                        )
                                            ? 'tabell__tr--valgt'
                                            : ''
                                    }
                                    aria-selected={skjema.felter.tilknyttedeBehandlingIder.verdi.includes(
                                        behandling.behandlingId
                                    )}
                                >
                                    <KnyttTilBehandlingTd>
                                        <FamilieCheckbox
                                            id={skjema.felter.tilknyttedeBehandlingIder.id}
                                            erLesevisning={erLesevisning()}
                                            label={'-'}
                                            checked={skjema.felter.tilknyttedeBehandlingIder.verdi.includes(
                                                behandling.behandlingId
                                            )}
                                            onChange={() => {
                                                skjema.felter.tilknyttedeBehandlingIder.validerOgSettFelt(
                                                    [
                                                        ...skjema.felter.tilknyttedeBehandlingIder.verdi.filter(
                                                            it => it !== behandling.behandlingId
                                                        ),
                                                        ...(skjema.felter.tilknyttedeBehandlingIder.verdi.includes(
                                                            behandling.behandlingId
                                                        )
                                                            ? []
                                                            : [behandling.behandlingId]),
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
                                    <td>{behandlingÅrsak[behandling.årsak]}</td>
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
