import React from 'react';

import { Document, Page } from 'react-pdf';
import styled from 'styled-components';

import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Undertittel } from 'nav-frontend-typografi';

import { hentDataFraRessursMedFallback, Ressurs, RessursStatus } from '@navikt/familie-typer';

const Spinner = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    padding-top: 5rem;
`;

const SpinnerItem = styled(NavFrontendSpinner)`
    margin-top: 2rem;
    height: 7rem;
    width: 7rem;
`;

const DokumentFeilStripe = styled(AlertStripeFeil)`
    top: 5rem;
    position: relative;
    margin: 0 1rem;
`;

const Dokumentside = styled.div`
    display: flex;
    flex-direction: column;
`;

export const PdfDokument: React.FC<{ pdfdata: Ressurs<string> }> = ({ pdfdata }) => {
    const [antallSider, settAntallSider] = React.useState<number>(0);

    switch (pdfdata.status) {
        case RessursStatus.HENTER:
            return (
                <Spinner>
                    <Undertittel children={'Innhenter dokument'} />
                    <SpinnerItem />
                </Spinner>
            );
        case RessursStatus.SUKSESS:
            return (
                <Document
                    file={hentDataFraRessursMedFallback(pdfdata, undefined)}
                    error={<DokumentFeilStripe children={'Ukjent feil ved henting av dokument.'} />}
                    noData={<DokumentFeilStripe children={'Dokumentet er tomt.'} />}
                    loading={<SpinnerItem />}
                    onLoadSuccess={({ numPages }) => settAntallSider(numPages)}
                >
                    <Dokumentside>
                        {antallSider > 0 &&
                            [...Array(antallSider)].map((_: number, index: number) => {
                                return (
                                    <div key={index + 1}>
                                        <Page pageNumber={index + 1} />
                                        <hr />
                                    </div>
                                );
                            })}
                    </Dokumentside>
                </Document>
            );
        case RessursStatus.FEILET:
            return <DokumentFeilStripe children={pdfdata.frontendFeilmelding} />;
        default:
            return null;
    }
};
