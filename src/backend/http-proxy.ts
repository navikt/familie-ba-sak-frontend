import createHttpsProxyAgent from 'https-proxy-agent';

import { envVar } from '@navikt/familie-backend';
import { logInfo } from '@navikt/familie-logging';

const agent = () => {
    const proxyUri = envVar('HTTP_PROXY', false);
    if (proxyUri) {
        logInfo(`Proxying requests via ${proxyUri}`);
        const hostPort = proxyUri.replace('https://', '').replace('http://', '').split(':', 2);

        /**
         * Stygg cast for å fikse kompileringsfeil: https://github.com/TooTallNate/node-https-proxy-agent/issues/108
         */
        return createHttpsProxyAgent({
            host: hostPort[0],
            port: parseInt(hostPort[1], 10),
            // eslint-disable-next-line
        }) as any;
    } else {
        logInfo(`Environment variable HTTP_PROXY is not set, not proxying requests`);
        return undefined;
    }
};

export default { agent: agent() };
