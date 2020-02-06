import Backend from '@navikt/familie-backend';
import { Request, Response as ExpressResponse } from 'express';
import { namespace } from '../config';

/**
 * Funksjon som kaller slack sitt postMessage api.
 * Bruker node-fetch da axios ikke bryr seg om proxy agent som sendes inn.
 */
export const slackNotify = (
    backend: Backend,
    req: Request,
    res: ExpressResponse,
    kanal: string
) => {
    if (!req.session) {
        throw Error('Ingen sesjon på requesten');
    }

    const displayName = req.session.displayName ? req.session.displayName : 'System';
    const formatertMelding: string = `*${displayName}, ${namespace}*\n ${req.body.melding}`;

    backend.logInfo(req, `Poster slack melding til #${kanal}: ${formatertMelding}`);
    /*fetch('https://slack.com/api/chat.postMessage', {
        agent:
            process.env.NODE_ENV !== 'development'
                ? new HttpsProxyAgent({
                      host: 'webproxy.nais',
                      https: true,
                      port: 8088,
                      rejectUnauthorized: false,
                  })
                : undefined,
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
        .then((response: Response) => {
            res.status(200).send('OK');
        })
        .catch((error: any) => {
            backend.logError(req, `Sending av melding til slack feilet: ${error.message}`);
            res.status(error.code).send(error);
        });*/
    res.status(200).send('OK');
};
