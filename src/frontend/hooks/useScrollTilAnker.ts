import { useEffect } from 'react';

import { useLocation } from 'react-router';

const MAX_OBSERVASJONSTID = 3000;

export function useScrollTilAnker() {
    const { hash, key } = useLocation();

    useEffect(() => {
        if (!hash || !key) {
            return;
        }

        const targetId = hash.slice(1); // Fjerner '#

        function scrollToElement() {
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return true; // Returnerer true hvis elementet ble funnet
            }
            return false;
        }

        // 1. Forsøk å scrolle umiddelbart (funker hvis elementet allerede er i DOMen)
        if (scrollToElement()) {
            return;
        }

        // 2. Hvis elementet ikke finnes enda (f.eks. venter på et API-kall),
        // setter vi opp en observer som lytter etter endringer i DOMen.
        const observer = new MutationObserver(() => {
            if (scrollToElement()) {
                observer.disconnect(); // Stopp lyttingen når vi har funnet elementet
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });

        // 3. Fallback: Stopp observeren etter 3 sekunder så den ikke kjører evig
        // i tilfelle id-en faktisk ikke finnes på siden.
        const timeoutId = setTimeout(() => {
            observer.disconnect();
        }, MAX_OBSERVASJONSTID);

        // Rydd opp når komponenten unmountes eller hashen/keyen endres
        return () => {
            observer.disconnect();
            clearTimeout(timeoutId);
        };
    }, [hash, key]);
}
