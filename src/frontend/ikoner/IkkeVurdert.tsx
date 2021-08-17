import * as React from 'react';

interface IIkkeVurdert {
    className?: string;
    heigth?: number;
    width?: number;
}

const IkkeVurdert: React.FunctionComponent<IIkkeVurdert> = ({ className, heigth, width }) => {
    return (
        <svg
            aria-labelledby={'IkkeVurdert'}
            className={className}
            height={heigth}
            width={width}
            viewBox="0 0 24 25"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title id={'IkkeVurdert'}>Ikke vurdert</title>
            <path
                d="M12.2047 0.996094L11.9908 0.99818C8.77684 1.05452 5.75173 2.35342 3.47376 4.65598C1.1791 6.97523 -0.0532777 10.0112 0.0020279 13.2058C0.116813 19.8172 5.2978 24.9961 11.7967 24.9961L12.0086 24.994C18.735 24.8782 24.1142 19.4009 23.9984 12.7874C23.8836 6.17606 18.7026 0.996094 12.2047 0.996094Z"
                fill="#FFA733"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13 6.79982C13 6.24753 12.5523 5.7998 12 5.7998C11.4477 5.7998 11 6.24753 11 6.79982V13.7999C11 14.3522 11.4477 14.7999 12 14.7999C12.5523 14.7999 13 14.3522 13 13.7999V6.79982ZM12.0002 19.8007H12.0272C12.8536 19.7857 13.5151 19.1032 13.5001 18.2753C13.4851 17.4563 12.8176 16.8008 12.0002 16.8008C11.9957 16.8008 11.9912 16.8012 11.9867 16.8016C11.9822 16.802 11.9777 16.8023 11.9732 16.8023C11.1452 16.8158 10.4853 17.4998 10.5003 18.3278C10.5137 19.1467 11.1827 19.8007 12.0002 19.8007Z"
                fill="#3E3832"
            />
        </svg>
    );
};

export default IkkeVurdert;
