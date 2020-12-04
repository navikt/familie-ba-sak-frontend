import React, { useEffect } from 'react';

import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import Modal from 'nav-frontend-modal';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Undertittel } from 'nav-frontend-typografi';

import { hentDataFraRessursMedFallback, Ressurs, RessursStatus } from '@navikt/familie-typer';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

interface IPdfVisningModalProps {
    onRequestClose: () => void;
    onRequestOpen?: () => void;
    pdfdata: Ressurs<string>;
    åpen: boolean;
}

const PdfVisningModal: React.FC<IPdfVisningModalProps> = ({
    onRequestClose,
    onRequestOpen,
    pdfdata,
    åpen,
}) => {
    useEffect(() => {
        if (åpen) {
            setTimeout(() => {
                onRequestOpen && onRequestOpen();
            }, 200);
        }
    }, [åpen]);

    return (
        <Modal
            className={'pdfvisning-modal'}
            isOpen={åpen}
            onRequestClose={onRequestClose}
            contentLabel={'pdfvisning'}
        >
            <Dokument pdfdata={pdfdata} />
        </Modal>
    );
};

export const Dokument: React.FC<{ pdfdata: Ressurs<string> }> = ({ pdfdata }) => {
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

export default PdfVisningModal;
