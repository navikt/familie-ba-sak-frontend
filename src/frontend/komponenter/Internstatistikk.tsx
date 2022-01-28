import React from 'react';

import styled from 'styled-components';

import 'nav-frontend-tabell-style';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

import { RessursStatus } from '@navikt/familie-typer';

import { useFagsakRessurser } from '../context/FagsakContext';
import { behandlingÅrsak } from '../typer/behandling';

const Container = styled.div`
    margin: 5rem;
`;

const Internstatistikk: React.FC = () => {
    const { internstatistikk, hentInternstatistikk } = useFagsakRessurser();
    if (internstatistikk.status === RessursStatus.IKKE_HENTET) {
        hentInternstatistikk();
    }
    return (
        <Container>
            {internstatistikk.status === RessursStatus.SUKSESS && (
                <>
                    <Undertittel children={'Internstatistikk BA-SAK'} />
                    <Normaltekst>
                        {`Antall fagsaker totalt: ${internstatistikk.data.antallFagsakerTotalt}`}
                    </Normaltekst>

                    <Normaltekst>
                        {`Antall løpende saker: ${internstatistikk.data.antallFagsakerLøpende}`}
                    </Normaltekst>

                    <Normaltekst>
                        {`Antall behandlinger som ikke er ferdigstilt: ${internstatistikk.data.antallBehandlingerIkkeFerdigstilt}`}
                    </Normaltekst>

                    <br />
                    <hr />
                    <Undertittel>Antall behandlinger per årsak</Undertittel>
                    <table className="tabell tabell--stripet">
                        <thead>
                            <tr>
                                <th>Behandlingsårsak</th>
                                <th>Antall</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(internstatistikk.data.antallBehandlingerPerÅrsak).map(
                                ([behandlingsårsak, antall]) => {
                                    return (
                                        <tr>
                                            <td>
                                                {
                                                    behandlingÅrsak[
                                                        behandlingsårsak as
                                                            | BehandlingÅrsak
                                                            | TilbakekrevingsbehandlingÅrsak
                                                    ]
                                                }
                                            </td>
                                            <td>{antall}</td>
                                        </tr>
                                    );
                                }
                            )}
                        </tbody>
                    </table>
                </>
            )}
        </Container>
    );
};

export default Internstatistikk;
