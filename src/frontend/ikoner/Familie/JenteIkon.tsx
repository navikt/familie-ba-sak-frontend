import * as React from 'react';

interface IJenteIkon {
    className?: string;
    heigth?: number;
    width?: number;
}

const JenteIkon: React.StatelessComponent<IJenteIkon> = ({ className, heigth, width }) => {
    return (
        <svg
            aria-labelledby={'jente'}
            className={className}
            height={heigth}
            width={width}
            viewBox="0 0 165.4 162.59"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title id={'jente'}>Jente</title>
            <g fill="#c86151" fillRule="evenodd">
                <path d="M82.7,3.3a78,78,0,1,0,78,78A78,78,0,0,0,82.7,3.3ZM109.19,93A4.36,4.36,0,0,1,105.48,91L97.86,78.9l5.36,29.57H93.36V130.8a4.57,4.57,0,1,1-9.14,0V108.47h-3V130.8a4.58,4.58,0,0,1-9.15,0V108.47H62.3L67.66,78.9,60,91a4.38,4.38,0,1,1-7-5.19L65.63,66.08c2.5-3.5,3.91-4.37,10-4.37H89.89c6.1,0,7.5.87,10,4.37L112.5,85.77a4.33,4.33,0,0,1,1.08,2.86A4.38,4.38,0,0,1,109.19,93Zm-6-43.12a10.62,10.62,0,0,1-4.35-5.58,16.22,16.22,0,0,1-32.39,0,10.61,10.61,0,0,1-15,6A10.61,10.61,0,0,1,66.78,40.27a16.24,16.24,0,0,1,31.84,0,10.62,10.62,0,0,1,15.31,10.07A10.65,10.65,0,0,1,103.24,49.9Z" />
            </g>
        </svg>
    );
};

export default JenteIkon;
