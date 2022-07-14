import * as React from 'react';

interface IPluss {
    className?: string;
    height?: number;
    width?: number;
}

const Pluss: React.FunctionComponent<IPluss> = ({ className, height = 24, width = 24 }) => {
    return (
        <svg
            aria-labelledby={'Pluss'}
            className={className}
            height={height}
            width={width}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title id={'Pluss'}>Pluss ikon</title>
            <path d="m7.6667-3.3333e-8c4.2273 0 7.6667 3.4393 7.6667 7.6667 0 4.2273-3.4393 7.6667-7.6667 7.6667-4.2273 0-7.6667-3.4393-7.6667-7.6667 0-4.2273 3.4393-7.6667 7.6667-7.6667zm-3e-8 0.66667c-3.86 0-7 3.14-7 7 0 3.86 3.14 7 7 7 3.86 0 7-3.14 7-7 0-3.86-3.14-7-7-7zm3e-8 2.6667c0.184 0 0.33333 0.14933 0.33333 0.33333v3.6667h3.6667c0.184 0 0.33333 0.14933 0.33333 0.33333 0 0.184-0.14933 0.33333-0.33333 0.33333h-3.6667v3.6667c0 0.184-0.14933 0.33333-0.33333 0.33333-0.184 0-0.33333-0.14933-0.33333-0.33333v-3.6667h-3.6667c-0.184 0-0.33333-0.14933-0.33333-0.33333 0-0.184 0.14933-0.33333 0.33333-0.33333h3.6667v-3.6667c0-0.184 0.14933-0.33333 0.33333-0.33333z" />
        </svg>
    );
};

export default Pluss;
