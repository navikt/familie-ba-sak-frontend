import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { TestingSwr } from './TestingSwr';
import { TestingTanstack } from './TestingTanstack';

export type INumber = {
    number: number;
};

const queryClient = new QueryClient();

export const TestingContainer = () => {
    return (
        <>
            <h1>Testing SWR</h1>
            <TestingSwr />

            <h1>Testing tanstack</h1>
            <QueryClientProvider client={queryClient}>
                <TestingTanstack />
            </QueryClientProvider>
        </>
    );
};
