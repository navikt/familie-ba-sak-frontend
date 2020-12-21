import * as React from 'react';

interface IDokumentIkon {
    className?: string;
    height?: number;
    width?: number;
}

export const DokumentIkon: React.FC<IDokumentIkon> = ({ className, width = 48, height = 48 }) => {
    return (
        <svg
            aria-labelledby={'dokument'}
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            height={height}
            width={width}
            viewBox="0 0 24 24"
        >
            <title id={'dokument'}>Dokument ikon</title>
            <g
                stroke="#0067c5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                fill="none"
            >
                <path d="M20.5 23.5h-17v-23h11l6 6zM14.5.5v6h6M7.5 7.5h4.5M7.5 10.5h9M7.5 13.5h9M7.5 16.5h9M7.5 19.5h9" />
            </g>
        </svg>
    );
};
