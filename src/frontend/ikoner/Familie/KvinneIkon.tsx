import * as React from 'react';

interface IKvinneIkon {
    className?: string;
    heigth?: number;
    width?: number;
}

const KvinneIkon: React.StatelessComponent<IKvinneIkon> = ({ className, heigth, width }) => {
    return (
        <svg
            aria-labelledby={'kvinne'}
            className={className}
            height={heigth}
            width={width}
            viewBox="0 0 165.4 162.59"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title id={'kvinne'}>Kvinne</title>
            <g fill="#c86151" fillRule="evenodd">
                <path d="M53.74,90.4a4.58,4.58,0,0,1-3-5.75S60.86,52.73,61,52.5c2.74-8.58,9.67-8.56,16.05-8.57H88.37c6.37,0,13.3,0,16,8.57.12.23,10.21,32.15,10.21,32.15a4.5,4.5,0,0,1-8.37,3.29L99,64.31a2.2,2.2,0,0,0-2.74-1.47,2.17,2.17,0,0,0-1.5,2.4c0,.05,10.76,35.28,12.41,40.67H95.31v29a5.41,5.41,0,1,1-10.82,0v-29H80.91v29a5.41,5.41,0,0,1-10.82,0v-29H58.26c1.65-5.4,12.44-40.63,12.41-40.67a2.18,2.18,0,0,0-4.24-.94L59.15,87.94A4.6,4.6,0,0,1,55,90.59,4.41,4.41,0,0,1,53.74,90.4ZM73.19,31.8a9.51,9.51,0,1,1,9.5,9.51A9.5,9.5,0,0,1,73.19,31.8ZM4.2,81.3A78.5,78.5,0,1,0,82.7,2.8,78.51,78.51,0,0,0,4.2,81.3Z" />
            </g>
        </svg>
    );
};

export default KvinneIkon;
