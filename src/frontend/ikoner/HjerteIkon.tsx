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
                    d="M17 1C20.866 1 24 4.28325 24 8.33333C24 10.3862 23.1949 12.242 21.8974 13.5731L22 13.5714L12 23L2 13.5714L2.10265 13.5731C0.805143 12.242 0 10.3862 0 8.33333C0 4.28325 3.13401 1 7 1C8.95901 1 10.7301 1.84305 12.0006 3.20174C13.2699 1.84305 15.041 1 17 1ZM17 3C15.7404 3 14.5547 3.49785 13.6411 4.38457L13.4621 4.56706L12.0013 6.13066L10.5398 4.56778C9.60348 3.56649 8.34359 3 7 3C4.25992 3 2 5.36754 2 8.33333C2 9.71606 2.49358 11.0069 3.35721 11.9856L3.53484 12.1771L4.637 13.308L12 20.25L19.362 13.308L20.4652 12.1771C21.3776 11.241 21.9282 9.97808 21.9935 8.60859L22 8.33333C22 5.36754 19.7401 3 17 3Z"
                    fill="#262626"
                />
            </g>
        </svg>
    );
};

export default HjerteIkon;
