import React from 'react';
import Modal from 'nav-frontend-modal';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import 'react-pdf/dist/Page/AnnotationLayer.css';

interface IVedtaksbrevModalProps {
    åpen: boolean;
    onRequestClose: () => void;
    vedtaksbrev: Ressurs<string>;
}

const VedtaksbrevModal: React.FC<IVedtaksbrevModalProps> = ({
    onRequestClose,
    åpen,
    vedtaksbrev,
}) => {
    const [antallSider, settAntallSider] = React.useState<number>(0);

    return (
        <Modal
            className={'vedtaksbrev-modal'}
            isOpen={åpen}
            contentLabel={'Vedtaksbrev'}
            onRequestClose={onRequestClose}
        >
            <Document
                className={'vedtaksbrev-modal__dokument'}
                file={vedtaksbrev.status === RessursStatus.SUKSESS ? vedtaksbrev.data : undefined}
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
                            console.log(index);
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

export default VedtaksbrevModal;
