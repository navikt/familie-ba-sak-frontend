import { Request, Response as ExpressResponse } from 'express';
import fetch, { Response } from 'node-fetch';
import { namespace } from '../config';
import { logRequest, LOG_LEVEL } from '@navikt/familie-backend';
import httpProxy from '../http-proxy';

const token = process.env.SLACK_TOKEN;

/**
 * Funksjon som kaller slack sitt postMessage api.
 * Bruker node-fetch da axios ikke bryr seg om proxy agent som sendes inn.
 */
export const slackNotify = (req: Request, res: ExpressResponse, kanal: string): void => {
    const displayName = req.session?.user.displayName ? req.session.user.displayName : 'System';
    const formatertMelding = `*${displayName}, ${namespace}*\n ${req.body.melding}`;

    logRequest(req, `Poster slack melding til #${kanal}: ${formatertMelding}`, LOG_LEVEL.INFO);
    fetch('https://slack.com/api/chat.postMessage', {
        agent:
            process.env.ENV !== 'local' && process.env.ENV !== 'e2e' ? httpProxy.agent : undefined,
        body: JSON.stringify({
            channel: `#${kanal}`,
            text: formatertMelding,
        }),
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json; charset=utf-8',
        },
        method: 'POST',
    })
        .then((_: Response) => {
            res.status(200).send('OK');
        })
        // eslint-disable-next-line
        .catch((error: any) => {
            logRequest(
                req,
                `Sending av melding til slack feilet: ${error.message}`,
                LOG_LEVEL.ERROR
            );
            res.status(error.code).send(error);
        });
};
