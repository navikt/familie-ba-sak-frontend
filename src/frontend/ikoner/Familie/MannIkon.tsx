import * as React from 'react';

interface IMannIkon {
    className?: string;
    heigth?: number;
    width?: number;
}

const MannIkon: React.StatelessComponent<IMannIkon> = ({ className, heigth, width }) => {
    return (
        <svg
            aria-labelledby={'mann'}
            className={className}
            height={heigth}
            width={width}
            viewBox="0 0 165.4 162.59"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title id={'mann'}>Mann</title>
            <g fill="#3b84c5" fillRule="evenodd">
                <path d="M84.5,44.16v0l5.86,0c8.15.46,16.94,6.47,16.94,14.73V87a4.25,4.25,0,0,1-8.46,0V65.16h0a1.8,1.8,0,0,0-1.79-1.8A1.77,1.77,0,0,0,95.28,65s0,.08,0,.13v69.39a5.38,5.38,0,0,1-10.75,0v-44a1.78,1.78,0,0,0-3.56,0v44a5.38,5.38,0,1,1-10.75,0V65.16s0-.08,0-.13a1.79,1.79,0,0,0-3.57.12h0V87a4.24,4.24,0,0,1-8.45,0V59c0-8.26,8.79-14.27,16.94-14.73l5.87,0v0H84.5Zm-11.24-12a9.44,9.44,0,1,1,9.44,9.44A9.44,9.44,0,0,1,73.26,32.12ZM4.7,80.94v.71a78,78,0,1,0,0-.71Z" />
            </g>
        </svg>
    );
};

export default MannIkon;
