import { useEffect, useRef } from 'react';

import { useLocation } from 'react-router';

function ScrollTilAnker() {
    const location = useLocation();
    const lastHash = useRef('');

    function scrollTilHash() {
        if (location.hash) {
            lastHash.current = location.hash.slice(1); // Alt utenom #
        }

        if (lastHash.current && document.getElementById(lastHash.current)) {
            setTimeout(() => {
                document
                    .getElementById(lastHash.current)
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                lastHash.current = '';
            }, 100);
        }
    }

    // Når location endrer seg uten en hard refresh
    useEffect(() => {
        scrollTilHash();
    }, [location]);

    // Når vi kjører en hard refresh
    useEffect(() => {
        setTimeout(() => {
            scrollTilHash();
        }, 500); // For å gi UIet tid til å rendres før vi finner og scroller til elementet
    }, []);

    return null;
}

export default ScrollTilAnker;
