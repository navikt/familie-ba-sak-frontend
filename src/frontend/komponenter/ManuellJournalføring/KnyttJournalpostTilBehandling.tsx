import React, { useState } from 'react';

import styled from 'styled-components';

import AlertStripe from 'nav-frontend-alertstriper';
import { Feilmelding, Undertittel } from 'nav-frontend-typografi';

import { FamilieCheckbox } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import { useManuellJournalføring } from '../../context/ManuellJournalføringContext';
import Pluss from '../../ikoner/Pluss';
import { BehandlingStatus, IBehandling } from '../../typer/behandling';
import familieDayjs from '../../utils/familieDayjs';
import { datoformat, formaterDato } from '../../utils/formatter';
import IkonKnapp from '../Felleskomponenter/IkonKnapp/IkonKnapp';

const KnyttDiv = styled.div`
    margin-top: 20px;
`;

const StyledDiv = styled.div`
    & .knapp.ikon-knapp {
        margin-top: 1rem;
        svg {
            margin: 0.5rem;
        }
    }
    & .typo-feilmelding {
        margin-top: 0.5rem;
    }
`;

const StyledTd = styled.td`
    label {
        text-indent: 2rem !important;
    }
`;

export const KnyttJournalpostTilBehandling: React.FC = () => {
    const {
        settTilknyttedeBehandlingIder,
        dataForManuellJournalføring,
        opprettFagsakOgBehandling,
        hentSorterteBehandlinger,
        hentAktivBehandlingForJournalføring,
        tilknyttedeBehandlingIder,
    } = useManuellJournalføring();

    const [oppretterBehandling, settOppretterBehandling] = useState(false);
    const [opprettBehandlingFeilmelding, settOpprettBehandlingFeilmelding] = useState<
        string | undefined
    >(undefined);

    if (dataForManuellJournalføring.status !== RessursStatus.SUKSESS) {
        return <></>;
    }

    const aktivBehandling = hentAktivBehandlingForJournalføring();
    const visOpprettBehandlingKnapp =
        !aktivBehandling || aktivBehandling.status === BehandlingStatus.AVSLUTTET;

    return (
        <KnyttDiv>
            <Undertittel>Knytt til behandling</Undertittel>
            <br />
            {visOpprettBehandlingKnapp && (
                <StyledDiv>
                    <AlertStripe type="info">
                        {(dataForManuellJournalføring.data.fagsak?.behandlinger.length
                            ? 'Det finnes ingen åpne behandlinger på denne brukeren.'
                            : 'Det er ikke registrert tidligere behandlinger på denne brukeren.') +
                            ' For å koble dokumentasjonen til en behandling, "Opprett ny behandling", eller journalfør uten å opprette behandling. '}
                    </AlertStripe>
                    <IkonKnapp
                        aria-labelledby={`utfør_opprett-fagsak-og-behandling-ved-journalføring`}
                        id={'opprettbehandling'}
                        onClick={() => {
                            settOppretterBehandling(true);
                            opprettFagsakOgBehandling()
                                .then(fagsakRessurs => {
                                    settOppretterBehandling(false);
                                    settOpprettBehandlingFeilmelding(
                                        fagsakRessurs.status === RessursStatus.FEILET ||
                                            fagsakRessurs.status === RessursStatus.FUNKSJONELL_FEIL
                                            ? fagsakRessurs.frontendFeilmelding
                                            : ''
                                    );
                                })
                                .finally(() => {
                                    settOppretterBehandling(false);
                                });
                        }}
                        label={'Opprett ny behandling'}
                        erLesevisning={false}
                        knappPosisjon={'venstre'}
                        type="flat"
                        spinner={oppretterBehandling}
                        disabled={oppretterBehandling}
                        ikon={<Pluss />}
                    />
                    {opprettBehandlingFeilmelding && (
                        <Feilmelding>{opprettBehandlingFeilmelding}</Feilmelding>
                    )}
                </StyledDiv>
            )}

            {dataForManuellJournalføring.data.fagsak?.behandlinger.length && (
                <table className="tabell">
                    <thead className="tabell__head">
                        <tr className="tabell__head__tr">
                            <th>{'Behandlingstype'}</th>
                            <th>{'Status'}</th>
                            <th>{'Dato'}</th>
                        </tr>
                    </thead>
                    <tbody className="tabell__body">
                        {hentSorterteBehandlinger().map((behandling: IBehandling) => (
                            <tr key={behandling.behandlingId}>
                                <StyledTd>
                                    <FamilieCheckbox
                                        erLesevisning={false}
                                        label={behandling.type}
                                        checked={tilknyttedeBehandlingIder.includes(
                                            behandling.behandlingId
                                        )}
                                        onChange={() => {
                                            const id = behandling.behandlingId;
                                            if (
                                                tilknyttedeBehandlingIder.includes(
                                                    behandling.behandlingId
                                                )
                                            ) {
                                                settTilknyttedeBehandlingIder(
                                                    tilknyttedeBehandlingIder.filter(
                                                        tilknyttedeBehandlingId =>
                                                            tilknyttedeBehandlingId !== id
                                                    )
                                                );
                                            } else {
                                                settTilknyttedeBehandlingIder([
                                                    ...tilknyttedeBehandlingIder,
                                                    id,
                                                ]);
                                            }
                                        }}
                                    />
                                </StyledTd>
                                <td>{behandling.status}</td>
                                <td>
                                    {formaterDato(
                                        familieDayjs(behandling.opprettetTidspunkt),
                                        datoformat.DATO_FORKORTTET
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </KnyttDiv>
    );
};
