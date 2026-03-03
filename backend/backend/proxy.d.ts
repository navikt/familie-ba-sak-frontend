import type { NextFunction, Request, Response } from 'express';
import type { Client } from '@navikt/familie-backend';
export declare const doProxy: any;
export declare const doRedirectProxy: () => (req: Request, res: Response) => void;
export declare const attachToken: (authClient: Client) => (req: Request, _res: Response, next: NextFunction) => Promise<void>;
