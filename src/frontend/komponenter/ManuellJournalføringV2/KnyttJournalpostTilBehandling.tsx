import React, { useState } from 'react';

import styled from 'styled-components';

import AlertStripe from 'nav-frontend-alertstriper';
import { Feilmelding, Undertittel } from 'nav-frontend-typografi';

import { FamilieCheckbox } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import { useManuellJournalføringV2 } from '../../context/ManuellJournalføringContextV2';
import Pluss from '../../ikoner/Pluss';
import { BehandlingStatus, IBehandling } from '../../typer/behandling';
import familieDayjs from '../../utils/familieDayjs';
import { datoformat, formaterDato } from '../../utils/formatter';
import IkonKnapp from '../Felleskomponenter/IkonKnapp/IkonKnapp';

const KnyttDiv = styled.div`
    margin-top: 20px;
`;

export const KnyttJournalpostTilBehandling: React.FC = () => {
    const {
        innsendingsfeilmelding,
        settTilknyttedeBehandlingIder,
        dataForManuellJournalføring,
        opprettFagsakOgBehandling,
        hentSortertBehandlinger,
        hentAktivBehandlingForJournalføring,
        tilknyttedeBehandlingIder,
    } = useManuellJournalføringV2();

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
                <div className={'journalføring__opprett-behandling'}>
                    <AlertStripe type="info">
                        {(dataForManuellJournalføring.data.fagsak?.behandlinger.length
                            ? 'Det finnes ingen åpne behandlinger på denne brukeren.'
                            : 'Det er ikke registrert tidligere behandlinger på denne brukeren.') +
                            ' For å koble dokumentasjonen til en behandling, "Opprett ny behandling", eller journalfør uten å opprette behandling. '}
                    </AlertStripe>
                    <IkonKnapp
                        aria-labelledby={`utfør_opprett-fagsak-og-behandling-ved-journalføring`}
                        className={'ikon-knapp'}
                        id={'opprettbehandling'}
                        onClick={() => {
                            settOppretterBehandling(true);
                            opprettFagsakOgBehandling().then(fagsakRessurs => {
                                settOppretterBehandling(false);
                                if (
                                    fagsakRessurs.status === RessursStatus.FEILET ||
                                    fagsakRessurs.status === RessursStatus.FUNKSJONELL_FEIL
                                ) {
                                    settOpprettBehandlingFeilmelding(
                                        fagsakRessurs.frontendFeilmelding
                                    );
                                } else {
                                    settOpprettBehandlingFeilmelding('');
                                }
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
                </div>
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
                        {hentSortertBehandlinger().map((behandling: IBehandling) => (
                            <tr key={behandling.behandlingId}>
                                <td className={'behandlingliste__tabell--behandlingtype'}>
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
                                </td>
                                <td className={'behandlingliste__tabell--status'}>
                                    {behandling.status}
                                </td>
                                <td className={'behandlingliste__tabell--dato'}>
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
            {innsendingsfeilmelding && <Feilmelding children={innsendingsfeilmelding} />}
        </KnyttDiv>
    );
};
