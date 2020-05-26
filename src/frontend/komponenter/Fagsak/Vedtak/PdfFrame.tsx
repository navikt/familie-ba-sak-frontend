import React from 'react';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import NavFrontendSpinner from 'nav-frontend-spinner';

interface IPdfFrameProps {
    file: string;
}

const PdfFrame: React.FunctionComponent<IPdfFrameProps> = ({ file }) => {
    const [antallSider, setAntallSider] = React.useState<number>(0);

    const onDocumentLoadSuccess = (pdfInfo: { numPages: React.SetStateAction<number> }) => {
        setAntallSider(pdfInfo.numPages);
    };

    return (
        <div className="pdf-frame">
            <Document
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
                error={'Kunne ikke laste inn PDF-fil.'}
                noData={<NavFrontendSpinner />}
                loading={<NavFrontendSpinner />}
                className={'pdf-frame__document'}
            >
                <br />
                {Array.from(new Array(antallSider), (_el, index) => (
                    <div key={index + 1}>
                        <Page key={`page_${index + 1}`} pageNumber={index + 1} scale={1.5} />
                        <br />
                    </div>
                ))}
            </Document>
        </div>
    );
};

export default PdfFrame;
