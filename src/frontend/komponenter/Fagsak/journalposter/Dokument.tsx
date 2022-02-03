import React, { useEffect } from 'react';

import styled from 'styled-components';

import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import NavFrontendSpinner from 'nav-frontend-spinner';

import { RessursStatus } from '@navikt/familie-typer';

import useForhåndsvisning from '../../../hooks/useForhåndsvisning';

const SpinnerWrapper = styled.div`
    width: 100%;
    height: 10rem;
    align-items: center;
    justify-content: center;
`;

const DokumentDiv = styled.div`
    width: 100%;
    height: 92vh;
`;

const DokumentDataAlert = styled(AlertStripeFeil)`
    margin-top: 10px;
    width: 100%;
    height: 3rem;
`;

interface IProps {
    dokumentInfoId: string;
    journalpostId: string;
}

export const Dokument: React.FC<IProps> = ({ dokumentInfoId, journalpostId }: IProps) => {
    const { hentForhåndsvisning, hentetForhåndsvisning } = useForhåndsvisning();

    useEffect(() => {
        hentForhåndsvisning({
            method: 'GET',
            url: `/familie-ba-sak/api/journalpost/${journalpostId}/hent/${dokumentInfoId}`,
        });
    }, [dokumentInfoId, journalpostId]);

    switch (hentetForhåndsvisning.status) {
        case RessursStatus.FEILET:
        case RessursStatus.FUNKSJONELL_FEIL:
        case RessursStatus.IKKE_TILGANG:
            return <DokumentDataAlert children={hentetForhåndsvisning.frontendFeilmelding} />;
        case RessursStatus.HENTER:
            return (
                <SpinnerWrapper>
                    Laster dokument <NavFrontendSpinner />
                </SpinnerWrapper>
            );
        case RessursStatus.SUKSESS:
            return (
                <DokumentDiv>
                    <iframe
                        title={'dokument'}
                        src={hentetForhåndsvisning.data}
                        width={'100%'}
                        height={'100%'}
                    />
                </DokumentDiv>
            );
        case RessursStatus.IKKE_HENTET:
            return <></>;
    }
};

export default Dokument;
