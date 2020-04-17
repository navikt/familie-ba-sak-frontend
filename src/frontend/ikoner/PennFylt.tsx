import * as React from 'react';

interface IPennFylt {
    className?: string;
    heigth?: number;
    width?: number;
}

const PennFylt: React.FunctionComponent<IPennFylt> = ({ className, heigth = 24, width = 24 }) => {
    return (
        <svg
            aria-labelledby={'PennFylt'}
            className={className}
            height={heigth}
            width={width}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title id={'pennFylt'}>Penn fylt</title>
            <g fill="none" fillRule="evenodd">
                <g transform="translate(-457 -97)" fill="#0067C5">
                    <g transform="translate(457 97)">
                        <path d="m0.86 13.444 1.696 1.6953-1.8473 0.56867c-0.12667 0.038667-0.25067 0-0.334-0.082667-0.087333-0.088-0.11933-0.216-0.083333-0.334l0.56867-1.8473zm0.706-2.2947 0.80867 0.80933c0.062667 0.061333 0.148 0.097333 0.236 0.097333h1.3333v1.3333c0 0.088667 0.034667 0.17333 0.097333 0.236l0.808 0.80867-1.5727 0.48333-2.1947-2.194 0.484-1.574zm9.8773-6.122 1.5 1.5-7.5287 7.5287-0.80467-0.80467v-1.3907l6.8333-6.8333zm-1.9713-1.9713 1.5 1.5-6.8333 6.8333h-1.3907l-0.80467-0.80467 7.5287-7.5287zm0.99964-0.9998 3.4724 3.4704-0.52876 0.52906-3.4724-3.4704 0.52876-0.52906zm2.471-1.7795c0.44667 0 0.86533 0.172 1.1793 0.486l1.114 1.1147c0.31333 0.314 0.48667 0.73267 0.48667 1.1787 0 0.44667-0.17267 0.86467-0.48667 1.1787l-0.82133 0.82133-3.472-3.472 0.82133-0.82133c0.314-0.31333 0.73267-0.486 1.1787-0.486z" />
                    </g>
                </g>
            </g>
        </svg>
    );
};

export default PennFylt;
