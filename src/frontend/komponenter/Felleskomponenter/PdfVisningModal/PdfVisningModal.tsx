import React from 'react';
import Modal from 'nav-frontend-modal';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import 'react-pdf/dist/Page/AnnotationLayer.css';

interface IPdfVisningModalProps {
    åpen: boolean;
    onRequestClose: () => void;
    pdfdata: Ressurs<string>;
}

const PdfVisningModal: React.FC<IPdfVisningModalProps> = ({ onRequestClose, åpen, pdfdata }) => {
    const [antallSider, settAntallSider] = React.useState<number>(0);

    return (
        <Modal
            className={'pdfvisning-modal'}
            isOpen={åpen}
            onRequestClose={onRequestClose}
            contentLabel={'pdfvisning'}
        >
            <Document
                className={'pdfvisning-modal__dokument'}
                file={pdfdata.status === RessursStatus.SUKSESS ? pdfdata.data : undefined}
                error={
                    <AlertStripeFeil
                        className={'skjemamodal__document--feil'}
                        children={'Innhenting av PDF feilet, eller PDF er tom. Prøv igjen.'}
                    />
                }
                noData={
                    <AlertStripeFeil
                        className={'skjemamodal__document--feil'}
                        children={'Innhenting av PDF feilet, eller PDF er tom. Prøv igjen.'}
                    />
                }
                loading={<NavFrontendSpinner className={'skjemamodal__spinner--item'} />}
                onLoadSuccess={({ numPages }) => settAntallSider(numPages)}
            >
                <div className={'skjemamodal__document--pages'}>
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
        </Modal>
    );
};

export default PdfVisningModal;
