import React from 'react';

interface IHjerteIkon {
    className?: string;
    heigth?: number;
    width?: number;
}

const HjerteIkon: React.FunctionComponent<IHjerteIkon> = ({
    className,
    heigth = 24,
    width = 24,
}) => {
    return (
        <svg
            aria-labelledby={'hjerte-ikon'}
            className={className}
            height={heigth}
            width={width}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title id={'hjerte-ikon'}>Oppfylt</title>
            <g fill="none" fillRule="nonzero">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M19 2H4V22H19V2ZM2 0V24H19C20.1046 24 21 23.1046 21 22V2C21 0.895431 20.1046 0 19 0H2ZM11.5 14C13.5717 13.4081 15 11.5145 15 9.35995V6H8V9.35995C8 11.5145 9.42831 13.4081 11.5 14ZM10 8V9.35995C10 10.4205 10.591 11.373 11.5 11.8556C12.409 11.373 13 10.4205 13 9.35995V8H10ZM16 18V16H7V18H16Z"
                    fill="#262626"
                />
            </g>
        </svg>
    );
};

export default HjerteIkon;
