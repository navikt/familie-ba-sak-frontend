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
            <g fill="none" fillRule="evenodd">
                <g id="a" transform="translate(-53 -132)">
                    <g transform="translate(53 132)">
                        <path
                            d="m10.171-0.0035385-0.17826 0.0018462c-2.6783 0.049847-5.1993 1.1991-7.0976 3.2364-1.9122 2.052-2.9392 4.7383-2.8931 7.5648 0.095654 5.8497 4.4131 10.432 9.8289 10.432l0.17653-0.0018462c5.6053-0.10246 10.088-4.9487 9.9915-10.8-0.095654-5.8497-4.4131-10.433-9.8281-10.433z"
                            fill="#FFA733"
                            fillRule="nonzero"
                        />
                        <g transform="translate(8.75 4.4231)" fill="#3E3832">
                            <path d="m1.2726 12.384h-0.022499c-0.68121 0-1.2387-0.57851-1.2499-1.303-0.012499-0.73242 0.53747-1.3375 1.2274-1.3494 0.0074996 0 0.014999-0.0013268 0.022499-0.0013268 0.68121 0 1.2374 0.57983 1.2499 1.3043 0.012499 0.73242-0.53872 1.3361-1.2274 1.3494z" />
                            <path
                                d="m1.25 0c0.46024 0 0.83333 0.39606 0.83333 0.88462v6.1923c0 0.48856-0.3731 0.88462-0.83333 0.88462-0.46024 0-0.83333-0.39606-0.83333-0.88462v-6.1923c0-0.48856 0.3731-0.88462 0.83333-0.88462z"
                                fillRule="nonzero"
                            />
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
};

export default Advarsel;
