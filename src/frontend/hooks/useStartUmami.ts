import { useEffect } from 'react';

export const useStartUmami = () => {
    useEffect(() => {
        const websiteId =
            process.env.NODE_ENV === 'production'
                ? 'e0e5e641-6d90-46ef-823c-e11ef40472cc'
                : 'a95c215b-4c37-450f-8ec6-b1355d53a36b';

        const script = document.createElement('script');
        script.src = 'https://cdn.nav.no/team-researchops/sporing/sporing.js';
        script.defer = true;
        script.setAttribute('data-host-url', 'https://umami.nav.no');
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
