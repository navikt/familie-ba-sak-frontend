import React from 'react';

import { useQuery } from '@tanstack/react-query';

export const TestingTanstack = () => {
    // Queries
    const { data } = useQuery({
        queryKey: ['random-number-component'],
        queryFn: async () => {
            const response = await fetch('/random-number?tanstack');
            return await response.json();
        },
    });

    return <>data: {data && data.number}</>;
};
