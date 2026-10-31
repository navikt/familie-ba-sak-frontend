import type { NextFunction, Request, Response } from 'express';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { attachToken } from './proxy.js';

const { getOnBehalfOfAccessToken } = vi.hoisted(() => ({ getOnBehalfOfAccessToken: vi.fn() }));

vi.mock('@navikt/familie-backend', () => ({ getOnBehalfOfAccessToken }));
vi.mock('./config.js', () => ({ oboConfig: {}, proxyUrl: 'http://backend', redirectRecords: {} }));
vi.mock('./logger.js', () => ({ logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() } }));

const lagRespons = (headersSent = false) => {
    const res = { headersSent, status: vi.fn(), json: vi.fn() } as unknown as Response;
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

    test('svarer 403 IKKE_TILGANG uten å kalle next når Entra svarer invalid_grant', async () => {
        getOnBehalfOfAccessToken.mockRejectedValue(Object.assign(new Error('server responded with an error'), { error: 'invalid_grant' }));
        const res = lagRespons();

        await attachToken(authConfig)(req, res, next);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ status: 'IKKE_TILGANG' }));
        expect(next).not.toHaveBeenCalled();
        expect(req.headers.Authorization).toBeUndefined();
    });

    test('svarer 500 FEILET uten å kalle next ved annen feil', async () => {
        getOnBehalfOfAccessToken.mockRejectedValue(new Error('ECONNRESET'));
        const res = lagRespons();

        await attachToken(authConfig)(req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ status: 'FEILET' }));
        expect(next).not.toHaveBeenCalled();
    });

    test('svarer ikke på nytt når ensureAuthenticated allerede har sendt 401', async () => {
        getOnBehalfOfAccessToken.mockRejectedValue(Object.assign(new Error(''), { error: 'invalid_grant' }));
        const res = lagRespons(true);

        await attachToken(authConfig)(req, res, next);

        expect(res.status).not.toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
    });
});
