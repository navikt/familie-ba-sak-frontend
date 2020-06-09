import tunnel from 'tunnel';
import { envVar } from '@navikt/familie-backend';
import { info } from '@navikt/familie-backend';

const agent = () => {
    const proxyUri = envVar('HTTP_PROXY', false);
    if (proxyUri) {
        info(`Proxying requests via ${proxyUri} for slack`);
        const hostPort = proxyUri.replace('https://', '').replace('http://', '').split(':', 2);
        return tunnel.httpsOverHttp({
            proxy: {
                host: hostPort[0],
                port: parseInt(hostPort[1], 10),
            },
        });
    } else {
        info(`Environment variable HTTP_PROXY is not set, not proxying requests`);
        return undefined;
    }
};

export default { agent: agent() };
