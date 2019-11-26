import * as React from 'react';

interface IOppfylt {
    className?: string;
    heigth?: number;
    width?: number;
}

const Oppfylt: React.StatelessComponent<IOppfylt> = ({ className, heigth, width }) => {
    return (
        <svg
            aria-labelledby={'oppfylt'}
            className={className}
            height={heigth}
            width={width}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title id={'oppfylt'}>Oppfylt</title>
            <g fill="none" fillRule="nonzero">
                <path
                    fill="#1C6937"
                    d="M12 0C5.383 0 0 5.384 0 12s5.383 12 12 12c6.616 0 12-5.384 12-12S18.616 0 12 0z"
                />
                <path
                    fill="#FFF"
                    d="M9.64 14.441l6.46-5.839a.997.997 0 0 1 1.376.044.923.923 0 0 1-.046 1.334l-7.15 6.464a.993.993 0 0 1-.662.252.992.992 0 0 1-.69-.276l-2.382-2.308a.923.923 0 0 1 0-1.334.997.997 0 0 1 1.377 0l1.717 1.663z"
                />
            </g>
        </svg>
    );
};

export default Oppfylt;
