import React from 'react';

import styled from 'styled-components';

import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';

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
                    <Undertittel children={'Internstatistikk BA-SAK'} />
                    <Element children={internstatistikk.data.antallFagsakerTotalt} />
                    <Normaltekst children={'Antall fagsaker totalt'} />

                    <Element children={internstatistikk.data.antallFagsakerLøpende} />
                    <Normaltekst children={'Antall løpende saker'} />

                    <Element children={internstatistikk.data.antallBehandlingerIkkeFerdigstilt} />
                    <Normaltekst children={'Antall behandlinger som ikke er ferdigstilt'} />
                </>
            )}
        </Container>
    );
};

export default Internstatistikk;
