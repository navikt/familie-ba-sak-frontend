import { useEffect } from 'react';

import { erProd } from '../utils/miljø';

export const useStartUmami = () => {
    useEffect(() => {
        const websiteId = erProd() ? 'e0e5e641-6d90-46ef-823c-e11ef40472cc' : 'a95c215b-4c37-450f-8ec6-b1355d53a36b';
        const hostUrl = erProd() ? 'https://umami.nav.no' : 'https://reops-event-proxy.ekstern.dev.nav.no';

        const script = document.createElement('script');
        script.src = 'https://cdn.nav.no/team-researchops/sporing/sporing.js';
        script.defer = true;
        script.setAttribute('data-host-url', hostUrl);
        script.setAttribute('data-website-id', websiteId);

        document.body.appendChild(script);

        return () => {
            try {
                document.body.removeChild(script);
            } catch {
                /* empty */
            }
        };
    }, []);
};
