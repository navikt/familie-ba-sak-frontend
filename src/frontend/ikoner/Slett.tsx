import * as React from 'react';

interface ISlett {
    className?: string;
    height?: number;
    width?: number;
}

const Slett: React.FunctionComponent<ISlett> = ({ className, height = 24, width = 24 }) => {
    return (
        <svg
            aria-labelledby={'Slett'}
            className={className}
            height={height}
            width={width}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            stroke="none"
            strokeWidth="1"
        >
            <title id={'Søppelkasse'}>Slett ikon</title>
            <path d="m15.516-5e-8c0.276 0 0.5 0.224 0.5 0.5v2.5h7c0.276 0 0.5 0.224 0.5 0.5 0 0.276-0.224 0.5-0.5 0.5h-3v19.5c0 0.276-0.224 0.5-0.5 0.5h-16c-0.276 0-0.5-0.224-0.5-0.5v-19.5h-2c-0.277 0-0.5-0.224-0.5-0.5 0-0.276 0.224-0.5 0.5-0.5h6v-2.5c0-0.276 0.224-0.5 0.5-0.5zm3.5 4h-15v19h15v-19zm-11.5 2.5c0.276 0 0.5 0.224 0.5 0.5v12c0 0.276-0.224 0.5-0.5 0.5s-0.5-0.224-0.5-0.5v-12c0-0.276 0.224-0.5 0.5-0.5zm4 0c0.276 0 0.5 0.224 0.5 0.5v12c0 0.276-0.224 0.5-0.5 0.5s-0.5-0.224-0.5-0.5v-12c0-0.276 0.224-0.5 0.5-0.5zm4 0c0.276 0 0.5 0.224 0.5 0.5v12c0 0.276-0.224 0.5-0.5 0.5s-0.5-0.224-0.5-0.5v-12c0-0.276 0.224-0.5 0.5-0.5zm-0.5-5.5h-7v2h7v-2z" />
        </svg>
    );
};

export default Slett;
