import { hentDataFraRessursMedFallback, Ressurs, RessursStatus } from '@navikt/familie-typer';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Undertittel } from 'nav-frontend-typografi';
import React from 'react';
import { Document, Page } from 'react-pdf/dist/entry.webpack';

export const PdfDokument: React.FC<{ pdfdata: Ressurs<string> }> = ({ pdfdata }) => {
    const [antallSider, settAntallSider] = React.useState<number>(0);

    switch (pdfdata.status) {
        case RessursStatus.HENTER:
            return (
                <div className={'pdfvisning-modal__spinner'}>
                    <Undertittel children={'Innhenter dokument'} />
                    <NavFrontendSpinner className={'pdfvisning-modal__spinner--item'} />
                </div>
            );
        case RessursStatus.SUKSESS:
            return (
                <Document
                    className={'pdfvisning-modal__dokument'}
                    file={hentDataFraRessursMedFallback(pdfdata, undefined)}
                    error={
                        <AlertStripeFeil
                            className={'pdfvisning-modal__document--feil'}
                            children={'Ukjent feil ved henting av dokument.'}
                        />
                    }
                    noData={
                        <AlertStripeFeil
                            className={'pdfvisning-modal__document--feil'}
                            children={'Dokumentet er tomt.'}
                        />
                    }
                    loading={<NavFrontendSpinner className={'skjemamodal__spinner--item'} />}
                    onLoadSuccess={({ numPages }) => settAntallSider(numPages)}
                >
                    <div className={'pdfvisning-modal__document--pages'}>
                        {antallSider > 0 &&
                            [...Array(antallSider)].map((_: number, index: number) => {
                                return (
                                    <div key={index + 1}>
                                        <Page pageNumber={index + 1} />
                                        <hr />
                                    </div>
                                );
                            })}
                    </div>
                </Document>
            );
        case RessursStatus.FEILET:
            return (
                <AlertStripeFeil
                    className={'pdfvisning-modal__document--feil'}
                    children={pdfdata.frontendFeilmelding}
                />
            );
        default:
            return null;
    }
};
