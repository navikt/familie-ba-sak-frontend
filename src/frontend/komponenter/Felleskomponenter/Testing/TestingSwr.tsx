import React from 'react';

import useSWR from 'swr';

export const TestingSwr = () => {
    const fetcher = url => fetch(url).then(r => r.json());

    const { data } = useSWR('/random-number?swr', fetcher);
    return <>data: {data && data.number}</>;
};
