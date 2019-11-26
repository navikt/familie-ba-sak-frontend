import * as React from 'react';

interface IGuttIkon {
    className?: string;
    heigth?: number;
    width?: number;
}

const GuttIkon: React.StatelessComponent<IGuttIkon> = ({ className, heigth, width }) => {
    return (
        <svg
            aria-labelledby={'gutt'}
            className={className}
            height={heigth}
            width={width}
            viewBox="0 0 165.4 162.59"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title id={'gutt'}>Gutt</title>
            <g fill="#3b84c5" fillRule="evenodd">
                <path d="M82.7,3.3a78,78,0,1,0,78,78A78,78,0,0,0,82.7,3.3Zm-.14,21.92A16.24,16.24,0,1,1,66.32,41.46,16.26,16.26,0,0,1,82.56,25.22Zm26.57,65.45a4.39,4.39,0,0,1-3.71-2.06L97.79,76.54v29.57H93.22v26.7a4.57,4.57,0,1,1-9.14,0v-26.7H81v26.7a4.57,4.57,0,0,1-9.14,0v-26.7h-4.3V76.54L60,88.61a4.39,4.39,0,0,1-8.11-2.33A4.34,4.34,0,0,1,53,83.42l12.61-19.7c2.5-3.5,3.9-4.37,10-4.37H89.83c6.09,0,7.5.87,10,4.37l12.61,19.7a4.37,4.37,0,0,1-3.31,7.25Z" />
            </g>
        </svg>
    );
};

export default GuttIkon;
