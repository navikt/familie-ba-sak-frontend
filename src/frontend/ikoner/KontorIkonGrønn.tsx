import * as React from 'react';

interface IKontorIkonGrønn {
    className?: string;
    height?: number;
    width?: number;
}

const KontorIkonGrønn: React.FunctionComponent<IKontorIkonGrønn> = ({
    className,
    height = 24,
    width = 24,
}) => {
    return (
        <svg
            aria-labelledby={'Kontorikon grønn'}
            className={className}
            height={height}
            width={width}
            viewBox="0 0 28 28"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title id={'KontorIkonGrønn'}>Kontorikon grønn</title>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14 0C6.2685 0 0 6.2685 0 14C0 21.7315 6.26806 28 14 28C21.7319 28 28 21.7319 28 14C28 6.2685 21.7315 0 14 0Z"
                fill="#007C2E"
            />
            <g clipPath="url(#clip0_4544_213513)">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.9954 6.35836H10.7038V20.9417H17.9954V6.35836ZM19.4538 11.4625V4.90002H9.24544V11.4625H5.59961V22.4H23.0996V11.4625H19.4538ZM19.4538 12.9209V20.9417H21.6413V12.9209H19.4538ZM7.05794 12.9209H9.24544V20.9417H7.05794V12.9209ZM12.1621 10.7334V8.54586H13.6204V10.7334H12.1621ZM12.1621 12.9209V15.1084H13.6204V12.9209H12.1621ZM15.0788 10.7334V8.54586H16.5371V10.7334H15.0788ZM15.0788 12.9209V15.1084H16.5371V12.9209H15.0788Z"
                    fill="white"
                />
            </g>
            <defs>
                <clipPath id="clip0_4544_213513">
                    <rect
                        width="17.5"
                        height="17.5"
                        fill="white"
                        transform="translate(5.59961 4.90002)"
                    />
                </clipPath>
            </defs>
        </svg>
    );
};

export default KontorIkonGrønn;
