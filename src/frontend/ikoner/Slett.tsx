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
        >
            <title id={'Slett'}>Slett ikon</title>
            <defs>
                <path
                    id="a"
                    d="m10.344-3.3333e-8c0.184 0 0.33333 0.14933 0.33333 0.33333v1.6667h4.6667c0.184 0 0.33333 0.14933 0.33333 0.33333s-0.14933 0.33333-0.33333 0.33333h-2v13c0 0.184-0.14933 0.33333-0.33333 0.33333h-10.667c-0.184 0-0.33333-0.14933-0.33333-0.33333v-13h-1.3333c-0.18467 0-0.33333-0.14933-0.33333-0.33333s0.14933-0.33333 0.33333-0.33333h4v-1.6667c0-0.184 0.14933-0.33333 0.33333-0.33333zm2.3333 2.6667h-10v12.667h10v-12.667zm-7.6667 1.6667c0.184 0 0.33333 0.14933 0.33333 0.33333v8c0 0.184-0.14933 0.33333-0.33333 0.33333s-0.33333-0.14933-0.33333-0.33333v-8c0-0.184 0.14933-0.33333 0.33333-0.33333zm2.6667 0c0.184 0 0.33333 0.14933 0.33333 0.33333v8c0 0.184-0.14933 0.33333-0.33333 0.33333s-0.33333-0.14933-0.33333-0.33333v-8c0-0.184 0.14933-0.33333 0.33333-0.33333zm2.6667 0c0.184 0 0.33333 0.14933 0.33333 0.33333v8c0 0.184-0.14933 0.33333-0.33333 0.33333s-0.33333-0.14933-0.33333-0.33333v-8c0-0.184 0.14933-0.33333 0.33333-0.33333zm-0.33333-3.6667h-4.6667v1.3333h4.6667v-1.3333z"
                />
            </defs>
            <g fill="none" fillRule="evenodd">
                <g transform="translate(-94 -102)">
                    <g transform="translate(94 102)">
                        <mask id="b" fill="white">
                            <use xlinkHref="#a" />
                        </mask>
                        <use fill="#3E3832" fillRule="nonzero" xlinkHref="#a" />
                        <rect
                            width="16"
                            height="16"
                            fill="#0067C5"
                            fillRule="evenodd"
                            mask="url(#b)"
                        />
                    </g>
                </g>
            </g>
        </svg>
    );
};

export default Slett;
