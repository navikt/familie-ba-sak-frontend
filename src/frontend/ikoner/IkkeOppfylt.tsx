import * as React from 'react';

interface IIkkeOppfylt {
    className?: string;
    heigth?: number;
    width?: number;
}

const IkkeOppfylt: React.StatelessComponent<IIkkeOppfylt> = ({ className, heigth, width }) => {
    return (
        <svg
            aria-labelledby={'ikkeOppfylt'}
            className={className}
            height={heigth}
            width={width}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title id={'ikkeOppfylt'}>Ikke oppfylt</title>
            <g fill="none" fillRule="nonzero">
                <path
                    fill="#A13A28"
                    d="M11.999 0C5.395 0 .013 5.372 0 11.976a11.923 11.923 0 0 0 3.498 8.493A11.925 11.925 0 0 0 11.977 24H12c6.603 0 11.986-5.373 12-11.978C24.013 5.406 18.64.012 11.999 0z"
                />
                <path
                    fill="#FFF"
                    d="M12 10.651l3.372-3.372a.954.954 0 1 1 1.349 1.35L13.349 12l3.372 3.372a.954.954 0 1 1-1.35 1.349L12 13.349 8.628 16.72a.954.954 0 1 1-1.349-1.35L10.651 12 7.28 8.628A.954.954 0 1 1 8.63 7.28L12 10.651z"
                />
            </g>
        </svg>
    );
};

export default IkkeOppfylt;
