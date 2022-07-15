import * as React from 'react';

interface IRødError {
    className?: string;
    height?: number;
    width?: number;
}

const RødError: React.FunctionComponent<IRødError> = ({ className, height, width }) => {
    return (
        <svg
            aria-labelledby={'Rød Error'}
            className={className}
            height={height}
            width={width}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title id={'rød-error'}>Rød Error ikon</title>
            <path
                d="m11.999 0c-6.6042 0-11.986 5.3718-11.999 11.976-0.0062609 3.2056 1.2355 6.2212 3.4977 8.4929 2.2623 2.2706 5.2737 3.5248 8.4793 3.5311h0.023c6.6031 0 11.986-5.3729 12-11.978 0.0125-6.6156-5.3603-12.009-12.001-12.022z"
                fill="#A13A28"
            />
            <path
                d="m12 10.651 3.3719-3.3719c0.3725-0.37245 0.9763-0.37245 1.3488 0 0.3724 0.37245 0.3724 0.97631 0 1.3488l-3.3719 3.3719 3.3719 3.3719c0.3724 0.3725 0.3724 0.9763 0 1.3488-0.3725 0.3724-0.9763 0.3724-1.3488 0l-3.3719-3.3719-3.3719 3.3719c-0.37245 0.3724-0.97631 0.3724-1.3488 0-0.37245-0.3725-0.37245-0.9763 0-1.3488l3.3719-3.3719-3.3719-3.3719c-0.37245-0.37245-0.37245-0.97631 0-1.3488s0.97631-0.37245 1.3488 0l3.3719 3.3719z"
                fill="#fff"
            />
        </svg>
    );
};

export default RødError;
