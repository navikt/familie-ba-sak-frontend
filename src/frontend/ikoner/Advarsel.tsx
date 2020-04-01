import * as React from 'react';

interface IAdvarsel {
    className?: string;
    heigth?: number;
    width?: number;
}

const Advarsel: React.FunctionComponent<IAdvarsel> = ({ className, heigth, width }) => {
    return (
        <svg
            aria-labelledby={'advarsel'}
            className={className}
            height={heigth}
            width={width}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title id={'advarsel'}>Advarsel ikon</title>
            <g fill="none" fill-rule="evenodd">
                <g transform="translate(-1945 -1086)">
                    <g transform="translate(1945 1086)">
                        <path
                            d="m10.171-0.0033846-0.17826 0.0017659c-2.6783 0.04768-5.1993 1.147-7.0976 3.0957-1.9122 1.9628-2.9392 4.5323-2.8931 7.2359 0.095654 5.5953 4.4131 9.9784 9.8289 9.9784l0.17653-0.0017659c5.6053-0.098009 10.088-4.7336 9.9915-10.331-0.095654-5.5953-4.4131-9.9793-9.8281-9.9793z"
                            fill="#FFA733"
                            fill-rule="nonzero"
                        />
                        <g transform="translate(8.75 4.2308)" fill="#3E3832" fill-rule="evenodd">
                            <path d="m1.2726 11.846h-0.022499c-0.68121 0-1.2387-0.55335-1.2499-1.2463-0.012499-0.70058 0.53747-1.2793 1.2274-1.2907 0.0074996 0 0.014999-0.0012692 0.022499-0.0012692 0.68121 0 1.2374 0.55462 1.2499 1.2476 0.012499 0.70058-0.53872 1.278-1.2274 1.2907z" />
                            <path
                                d="m1.25 0c0.46024 0 0.83333 0.37884 0.83333 0.84615v5.9231c0 0.46732-0.3731 0.84615-0.83333 0.84615-0.46024 0-0.83333-0.37884-0.83333-0.84615v-5.9231c0-0.46732 0.3731-0.84615 0.83333-0.84615z"
                                fill-rule="nonzero"
                            />
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
};

export default Advarsel;
