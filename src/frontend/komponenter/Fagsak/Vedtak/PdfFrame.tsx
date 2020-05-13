import React from 'react';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import NavFrontendSpinner from 'nav-frontend-spinner';

interface IPdfFrameProps {
    pdfData: string;
}

const PdfFrame: React.FunctionComponent<IPdfFrameProps> = ({ pdfData }) => {
    const [antallSider, setAntallSider] = React.useState<number>(0);

    const onDocumentLoadSuccess = (pdfInfo: { numPages: React.SetStateAction<number> }) => {
        setAntallSider(pdfInfo.numPages);
    };

    return (
        <div className="pdf">
            <Document
                file={pdfData}
                onLoadSuccess={onDocumentLoadSuccess}
                error={'Kunne ikke laste inn PDF-fil.'}
                noData={<NavFrontendSpinner />}
                loading={<NavFrontendSpinner />}
            >
                <br />
                {Array.from(new Array(antallSider), (_el, index) => (
                    <>
                        <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                        <br />
                    </>
                ))}
            </Document>
        </div>
    );
};

export default PdfFrame;
