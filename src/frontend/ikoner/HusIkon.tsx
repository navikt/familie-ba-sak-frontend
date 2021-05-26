import React from 'react';

interface IHusIkon {
    className?: string;
    heigth?: number;
    width?: number;
}

const HusIkon: React.FunctionComponent<IHusIkon> = ({ className, heigth = 24, width = 24 }) => {
    return (
        <svg
            aria-labelledby={'hus-ikon'}
            className={className}
            height={heigth}
            width={width}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title id={'hus-ikon'}>Oppfylt</title>
            <g fill="none" fillRule="nonzero">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 0L22 10V24H13V18H11V24H2V10L12 0ZM12 2.829L4 10.828V22H9V16H15V22H20V10.829L12 2.829Z"
                    fill="#262626"
                />
            </g>
        </svg>
    );
};

export default HusIkon;
