import React from 'react';

import styled from 'styled-components';

import { Normaltekst, Sidetittel, Undertittel } from 'nav-frontend-typografi';

import { RessursStatus } from '@navikt/familie-typer';

import { useFagsakRessurser } from '../context/FagsakContext';

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
                    <Sidetittel children={'Internstatistikk BA-SAK'} />
                    <Undertittel children={internstatistikk.data.antallFagsakerTotalt} />
                    <Normaltekst children={'Antall fagsaker totalt'} />

                    <Undertittel children={internstatistikk.data.antallFagsakerLøpende} />
                    <Normaltekst children={'Antall løpende saker'} />

                    <Undertittel
                        children={internstatistikk.data.antallBehandlingerIkkeFerdigstilt}
                    />
                    <Normaltekst children={'Antall behandlinger som ikke er ferdigstilt'} />
                </>
            )}
        </Container>
    );
};

export default Internstatistikk;
