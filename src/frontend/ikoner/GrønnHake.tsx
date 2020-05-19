import * as React from 'react';

interface IGrønnHake {
    className?: string;
    heigth?: number;
    width?: number;
}

const GrønnHake: React.FunctionComponent<IGrønnHake> = ({ className, heigth = 24, width = 24 }) => {
    return (
        <svg
            aria-labelledby={'oppfylt'}
            className={className}
            height={heigth}
            width={width}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title id={'GrønnHake'}>Grønn hake</title>
            <g fill="none" fillRule="evenodd">
                <g transform="translate(-1511 -163)" fill="#1C6937">
                    <g transform="translate(1472 118)">
                        <g transform="translate(39 45)">
                            <g fillRule="nonzero">
                                <path d="m6.7513 14.914 12.907-14.291c0.78363-0.86962 2.0158-0.82394 2.7504 0.10749 0.73488 0.93188 0.6928 2.394-0.092388 3.2656l-14.285 15.818c-0.36367 0.40002-0.83787 0.61707-1.3248 0.61707-0.51145 0-1.0031-0.23649-1.3766-0.6751l-4.7605-5.6481c-0.7593-0.90088-0.7593-2.3634 0-3.2643 0.7593-0.90088 1.992-0.90088 2.7513 0l3.4306 4.0703z" />
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
};

export default GrønnHake;
