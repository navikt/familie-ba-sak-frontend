import * as React from 'react';

interface IEmailIkon {
    filled?: boolean;
    className?: string;
    height?: number;
    width?: number;
}

export const EmailIkon: React.FC<IEmailIkon> = ({ className, filled = false, width = 48, height = 48 }) => {
    return filled ? (
        <svg
            aria-labelledby={'email'}
            version="1.1"
            id="Filled_Version"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width={width}
            height={height}
            viewBox="0 0 24 24"
            enableBackground="new 0 0 24 24"
        >
            <g fill="#0067c5" stroke="none">
                <path
                    d="M22.709,4.976l-10.394,8.413C12.224,13.463,12.111,13.5,12,13.5s-0.223-0.037-0.314-0.111L1.293,4.976
		C1.111,5.276,1,5.624,1,6v11c0,1.103,0.898,2,2,2h18c1.104,0,2-0.897,2-2V6C23,5.624,22.89,5.276,22.709,4.976z"
                />
                <path d="M21.988,4.271C21.695,4.104,21.361,4,21,4H3C2.64,4,2.306,4.104,2.013,4.271L12,12.357L21.988,4.271z" />
            </g>
        </svg>
    ) : (
        <svg
            aria-labelledby={'email'}
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 24 24"
            className={className}
        >
            <title id={'email'}>Email ikon</title>
            <g stroke="#0067c5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" fill="none">
                <path d="M22.5 17.012c0 .828-.672 1.5-1.5 1.5h-18c-.828 0-1.5-.672-1.5-1.5v-11c0-.829.672-1.5 1.5-1.5h18c.828 0 1.5.671 1.5 1.5v11zM22 5.012l-10 8-10-8" />
            </g>
        </svg>
    );
};
