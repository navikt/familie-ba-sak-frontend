import * as React from 'react';

interface ICheckTmp {
    className?: string;
    heigth?: number;
    width?: number;
}

const CheckTmp: React.FunctionComponent<ICheckTmp> = ({ className, heigth, width }) => {
    return (
        <svg
            aria-labelledby={'checktmp'}
            className={className}
            height={heigth}
            width={width}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title id={'checktmp'}>Oppfylt</title>
            <g fill="none" fillRule="nonzero">
                <path
                    fill="#3E3832"
                    d="M9.64 14.441l6.46-5.839a.997.997 0 0 1 1.376.044.923.923 0 0 1-.046 1.334l-7.15 6.464a.993.993 0 0 1-.662.252.992.992 0 0 1-.69-.276l-2.382-2.308a.923.923 0 0 1 0-1.334.997.997 0 0 1 1.377 0l1.717 1.663z"
                />
            </g>
        </svg>
    );
};

export default CheckTmp;
