export function sendTilUmami(eventNavn: string, obj: object) {
    if (typeof window !== 'undefined' && window.umami) {
        window.umami.track(eventNavn, obj);
    }
}
