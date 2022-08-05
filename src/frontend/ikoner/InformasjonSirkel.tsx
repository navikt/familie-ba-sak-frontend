import * as React from 'react';

interface IInformasjonSirkel {
    className?: string;
    height?: number;
    width?: number;
}

const InformasjonSirkel: React.FunctionComponent<IInformasjonSirkel> = ({
    className,
    height = 24,
    width = 24,
}) => {
    return (
        <svg
            aria-labelledby={'Info'}
            className={className}
            height={height}
            width={width}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title>Informasjon sirkel</title>
            <g fill="none" fillRule="evenodd">
                <g transform="translate(-694 -488)">
                    <g transform="translate(694 488)">
                        <path
                            d="m12 0c-6.6177 0-12 5.3823-12 12 0 6.6177 5.3823 12 12 12 6.6167 0 12-5.3823 12-12 0-6.6177-5.3833-12-12-12z"
                            fill="#337C9B"
                        />
                        <g transform="translate(8.3478 4.2174)" fill="#fff">
                            <path
                                id="a"
                                d="m3.6522 0.78261c0.86243 0 1.5652 0.70122 1.5652 1.5652 0 0.86557-0.70278 1.5652-1.5652 1.5652-0.86557 0-1.5652-0.69965-1.5652-1.5652 0-0.864 0.69965-1.5652 1.5652-1.5652z"
                            />
                            <path
                                d="m6.6278 12.793c0.56379 0 1.0435 0.43113 1.0435 0.9913s-0.47969 0.9913-1.0435 0.9913h-5.5843c-0.56461 0-1.0435-0.43098-1.0435-0.9913s0.47887-0.9913 1.0435-0.9913h1.5993v-5.0149h-0.98581c-0.56461 0-1.0435-0.43098-1.0435-0.9913 0-0.56032 0.47887-0.9913 1.0435-0.9913h2.0293c0.56379 0 1.0435 0.43113 1.0435 0.9913v6.0062h1.898z"
                                fillRule="nonzero"
                            />
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
};

export default InformasjonSirkel;
