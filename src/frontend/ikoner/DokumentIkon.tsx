import * as React from 'react';

interface IDokumentIkon {
    filled?: boolean;
    className?: string;
    height?: number;
    width?: number;
}

export const DokumentIkon: React.FC<IDokumentIkon> = ({
    className,
    filled = false,
    width = 48,
    height = 48,
}) => {
    return filled ? (
        <svg
            aria-labelledby={'dokument'}
            version="1.1"
            id="Filled_Version"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width={width}
            height={height}
            viewBox="0 0 24 24"
            enableBackground="new 0 0 24 24"
            fill="#0067c5"
        >
            <path
                d="M20.854,6.146l-6-6C14.76,0.053,14.632,0,14.5,0h-11C3.224,0,3,0.224,3,0.5v23C3,23.776,3.224,24,3.5,24h17
       c0.276,0,0.5-0.224,0.5-0.5v-17C21,6.367,20.947,6.24,20.854,6.146z M7.5,7H12c0.276,0,0.5,0.224,0.5,0.5S12.276,8,12,8H7.5
       C7.224,8,7,7.776,7,7.5S7.224,7,7.5,7z M16.5,20h-9C7.224,20,7,19.776,7,19.5S7.224,19,7.5,19h9c0.276,0,0.5,0.224,0.5,0.5
       S16.776,20,16.5,20z M16.5,17h-9C7.224,17,7,16.776,7,16.5S7.224,16,7.5,16h9c0.276,0,0.5,0.224,0.5,0.5S16.776,17,16.5,17z
        M16.5,14h-9C7.224,14,7,13.776,7,13.5S7.224,13,7.5,13h9c0.276,0,0.5,0.224,0.5,0.5S16.776,14,16.5,14z M16.5,11h-9
       C7.224,11,7,10.776,7,10.5S7.224,10,7.5,10h9c0.276,0,0.5,0.224,0.5,0.5S16.776,11,16.5,11z M14.5,6.5v-6l6,6H14.5z"
            />
        </svg>
    ) : (
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
