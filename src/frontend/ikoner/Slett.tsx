import * as React from 'react';

interface ISlett {
    className?: string;
    heigth?: number;
    width?: number;
}

const Slett: React.FunctionComponent<ISlett> = ({ className, heigth = 24, width = 24 }) => {
    return (
        <svg
            aria-labelledby={'Slett'}
            className={className}
            height={heigth}
            width={width}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            stroke="none"
            strokeWidth="1"
            fill="#0067C5"
        >
            <title id={'Slett'}>Slett ikon</title>
            <defs>
                <path
                    id="a"
                    d="m15.516-5e-8c0.276 0 0.5 0.224 0.5 0.5v2.5h7c0.276 0 0.5 0.224 0.5 0.5 0 0.276-0.224 0.5-0.5 0.5h-3v19.5c0 0.276-0.224 0.5-0.5 0.5h-16c-0.276 0-0.5-0.224-0.5-0.5v-19.5h-2c-0.277 0-0.5-0.224-0.5-0.5 0-0.276 0.224-0.5 0.5-0.5h6v-2.5c0-0.276 0.224-0.5 0.5-0.5zm3.5 4h-15v19h15v-19zm-11.5 2.5c0.276 0 0.5 0.224 0.5 0.5v12c0 0.276-0.224 0.5-0.5 0.5s-0.5-0.224-0.5-0.5v-12c0-0.276 0.224-0.5 0.5-0.5zm4 0c0.276 0 0.5 0.224 0.5 0.5v12c0 0.276-0.224 0.5-0.5 0.5s-0.5-0.224-0.5-0.5v-12c0-0.276 0.224-0.5 0.5-0.5zm4 0c0.276 0 0.5 0.224 0.5 0.5v12c0 0.276-0.224 0.5-0.5 0.5s-0.5-0.224-0.5-0.5v-12c0-0.276 0.224-0.5 0.5-0.5zm-0.5-5.5h-7v2h7v-2z"
                />
            </defs>
            <g fill="none" fillRule="evenodd">
                <g transform="translate(-49 -35)">
                    <g transform="translate(49 35)">
                        <mask id="b" fill="white">
                            <use xlinkHref="#a" />
                        </mask>
                        <use fill="#3E3832" fillRule="nonzero" xlinkHref="#a" />
                        <rect width="24" height="24" fill="#0067C5" mask="url(#b)" />
                    </g>
                </g>
            </g>
        </svg>
    );
};

export default Slett;
