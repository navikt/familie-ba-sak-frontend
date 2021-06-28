import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import NavFrontendSpinner from 'nav-frontend-spinner';

import { useHttp } from '@navikt/familie-http';
import { RessursStatus, Ressurs, byggTomRessurs } from '@navikt/familie-typer';

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
    const [dokumentRessurs, settDokumentRessurs] = useState<Ressurs<string>>(byggTomRessurs());
    const { request } = useHttp();

    useEffect(() => {
        request<void, string>({
            method: 'GET',
            url: `/familie-ba-sak/api/journalpost/${journalpostId}/hent/${dokumentInfoId}`,
            påvirkerSystemLaster: false,
        }).then(dokumentRessurs => settDokumentRessurs(dokumentRessurs));
    }, [dokumentInfoId, journalpostId]);

    if (
        dokumentRessurs.status === RessursStatus.FEILET ||
        dokumentRessurs.status === RessursStatus.FUNKSJONELL_FEIL ||
        dokumentRessurs.status === RessursStatus.IKKE_TILGANG
    ) {
        return <DokumentDataAlert children={dokumentRessurs.frontendFeilmelding} />;
    }

    if (dokumentRessurs.status === RessursStatus.HENTER) {
        return (
            <SpinnerWrapper>
                Laster dokument <NavFrontendSpinner />
            </SpinnerWrapper>
        );
    }

    if (dokumentRessurs.status === RessursStatus.SUKSESS) {
        return (
            <DokumentDiv>
                <iframe
                    title={'dokument'}
                    src={`data:application/pdf;base64,${dokumentRessurs.data}`}
                    width={'100%'}
                    height={'100%'}
                />
            </DokumentDiv>
        );
    } else {
        return <></>;
    }
};

export default Dokument;
