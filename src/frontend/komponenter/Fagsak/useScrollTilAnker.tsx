import { useEffect, useRef } from 'react';

import { useLocation } from 'react-router';

export function useScrollTilAnker() {
    const location = useLocation();
    const lastHash = useRef('');

    function scrollTilHash() {
        if (location.hash) {
            lastHash.current = location.hash.slice(1); // Alt utenom #
        }

        if (lastHash.current && document.getElementById(lastHash.current)) {
            return setTimeout(() => {
                document
                    .getElementById(lastHash.current)
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                lastHash.current = '';
            }, 100);
        }
    }

    // Når location endrer seg uten en hard refresh
    useEffect(() => {
        const timeout = scrollTilHash();

        // Clear timeout om komponenten denne effekten brukes i unmountes før timeouten kjøres
        return () => clearTimeout(timeout);
    }, [location]);

    // Når vi kjører en hard refresh
    useEffect(() => {
        let timeout = setTimeout(() => {
            const scrollTimeout = scrollTilHash();

            if (scrollTimeout) {
                timeout = scrollTimeout;
            }
        }, 500); // For å gi UIet tid til å rendres før vi finner og scroller til elementet

        // Clear timeout om komponenten denne effekten brukes i unmountes før timeouten kjøres
        return () => clearTimeout(timeout);
    }, []);
}
