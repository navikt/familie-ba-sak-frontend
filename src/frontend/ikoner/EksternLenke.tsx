import * as React from 'react';

interface IEksternLenke {
    className?: string;
    height?: number;
    width?: number;
}

export const EksternLenke: React.FC<IEksternLenke> = ({ className, width = 16, height = 16 }) => {
    //<!-- Created with Method Draw - http://github.com/duopixel/Method-Draw/ -->
    return (
        <svg
            aria-labelledby={'eksternLenke'}
            width={width}
            height={height}
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
        >
            <g>
                <line
                    strokeWidth="4"
                    stroke="#0067c5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    id="svg_4"
                    y2="5.25002"
                    x2="59.37499"
                    y1="37.70315"
                    x1="27.37499"
                    fillOpacity="null"
                    strokeOpacity="null"
                    fill="none"
                />
                <line
                    stroke="#0067c5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    id="svg_6"
                    y2="5.55695"
                    x2="60.06217"
                    y1="5.55695"
                    x1="41.93738"
                    fillOpacity="null"
                    strokeOpacity="null"
                    strokeWidth="4"
                    fill="none"
                />
                <line
                    stroke="#0067c5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    id="svg_7"
                    y2="22.18176"
                    x2="58.93719"
                    y1="6.43194"
                    x1="59.06218"
                    fillOpacity="null"
                    strokeOpacity="null"
                    strokeWidth="4"
                    fill="none"
                />
                <line
                    stroke="#0067c5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    id="svg_8"
                    y2="62.81214"
                    x2="2.31285"
                    y1="15.0627"
                    x1="2.31285"
                    fillOpacity="null"
                    strokeOpacity="null"
                    strokeWidth="4"
                    fill="none"
                />
                <line
                    stroke="#0067c5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    id="svg_9"
                    y2="16.06269"
                    x2="35.68746"
                    y1="16.06269"
                    x1="1.93785"
                    fillOpacity="null"
                    strokeOpacity="null"
                    strokeWidth="4"
                    fill="none"
                />
                <line
                    stroke="#0067c5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    id="svg_10"
                    y2="61.81215"
                    x2="50.68728"
                    y1="61.81215"
                    x1="1.43786"
                    fillOpacity="null"
                    strokeOpacity="null"
                    strokeWidth="4"
                    fill="none"
                />
                <line
                    stroke="#0067c5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    id="svg_11"
                    y2="62.68714"
                    x2="49.68729"
                    y1="30.31252"
                    x1="49.68729"
                    fillOpacity="null"
                    strokeOpacity="null"
                    strokeWidth="4"
                    fill="none"
                />
            </g>
        </svg>
    );
};
