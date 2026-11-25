import type { NextFunction, Request, Response } from 'express';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { attachToken } from './proxy.js';

const { getOnBehalfOfAccessToken, logger } = vi.hoisted(() => ({
    getOnBehalfOfAccessToken: vi.fn(),
    logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

vi.mock('@navikt/familie-backend', () => ({ getOnBehalfOfAccessToken }));
vi.mock('./config.js', () => ({ oboConfig: {}, proxyUrl: 'http://backend', redirectRecords: {} }));
vi.mock('./logger.js', () => ({ logger }));

const lagRespons = (headersSent = false) => {
    const res = { headersSent, status: vi.fn(), send: vi.fn() } as unknown as Response;
    (res.status as ReturnType<typeof vi.fn>).mockReturnValue(res);
    return res;
};

describe('attachToken', () => {
    const authConfig = {} as Parameters<typeof attachToken>[0];
    let req: Request;
    let next: NextFunction;

    beforeEach(() => {
        vi.clearAllMocks();
        req = { headers: {}, path: '/feature/er-toggler-enabled' } as unknown as Request;
        next = vi.fn();
    });

    test('legger på Authorization-header og kaller next når OBO-token hentes', async () => {
        getOnBehalfOfAccessToken.mockResolvedValue('obo-token');
        const res = lagRespons();

        await attachToken(authConfig)(req, res, next);

        expect(req.headers.Authorization).toBe('Bearer obo-token');
        expect(next).toHaveBeenCalledOnce();
        expect(res.status).not.toHaveBeenCalled();
    });

    test('svarer 401 uten å kalle next når OBO-token ikke kan hentes', async () => {
        getOnBehalfOfAccessToken.mockRejectedValue(
            Object.assign(new Error('server responded with an error'), { error: 'invalid_grant' })
        );
        const res = lagRespons();

        await attachToken(authConfig)(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith('Unauthorized');
        expect(next).not.toHaveBeenCalled();
        expect(req.headers.Authorization).toBeUndefined();
    });

    test('svarer ikke på nytt når ensureAuthenticated allerede har sendt 401', async () => {
        getOnBehalfOfAccessToken.mockRejectedValue(new Error('invalid_grant'));
        const res = lagRespons(true);

        await attachToken(authConfig)(req, res, next);

        expect(res.status).not.toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
    });
});
