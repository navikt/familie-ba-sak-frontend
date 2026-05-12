import { beforeAll, afterEach, afterAll } from 'vitest';

import '@testing-library/jest-dom/vitest';

import { server } from './src/frontend/testutils/mocks/node';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
