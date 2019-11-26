import * as React from 'react';

interface IEktefelleIkon {
    className?: string;
    heigth?: number;
    width?: number;
}

const EktefelleIkon: React.StatelessComponent<IEktefelleIkon> = ({ className, heigth, width }) => {
    return (
        <svg
            aria-labelledby={'ektefelle'}
            className={className}
            height={heigth}
            width={width}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title id={'ektefelle'}>Ektefelle</title>
            <path
                fill="#3E3832"
                fillRule="evenodd"
                d="M11.314 8.162a1 1 0 0 1 1.384.291A6.472 6.472 0 0 1 13.75 12c0 3.416-2.648 6.218-6 6.475V20h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 1 1 0-2h1v-1.682c-2.861-.679-5-3.251-5-6.318a6.476 6.476 0 0 1 3.545-5.79 1 1 0 1 1 .911 1.78A4.486 4.486 0 0 0 2.75 12c0 2.481 2.02 4.5 4.5 4.5 2.481 0 4.5-2.019 4.5-4.5a4.48 4.48 0 0 0-.727-2.454.999.999 0 0 1 .291-1.384zM23.082.446c.099.148.168.353.169.554v3.5a1 1 0 1 1-2 0V3.414l-2.758 2.759A6.456 6.456 0 0 1 19.751 10a6.461 6.461 0 0 1-4.136 6.057 1 1 0 0 1-.728-1.864A4.471 4.471 0 0 0 17.75 10a4.483 4.483 0 0 0-1.306-3.166c-.004-.005-.01-.008-.015-.012-.005-.004-.007-.01-.012-.014A4.481 4.481 0 0 0 13.25 5.5c-2.48 0-4.5 2.019-4.5 4.5 0 .876.252 1.724.727 2.453a.999.999 0 0 1-.291 1.384 1.002 1.002 0 0 1-1.385-.292A6.473 6.473 0 0 1 6.75 10c0-3.584 2.916-6.5 6.5-6.5 1.432 0 2.753.471 3.828 1.259L19.836 2H18.75a1 1 0 1 1 0-2h3.5c.19 0 .397.063.555.169.11.073.204.167.277.277z"
            />
        </svg>
    );
};

export default EktefelleIkon;
