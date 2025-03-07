export function sendTilUmami(eventNavn: string, obj: object) {
    if (typeof window !== 'undefined' && window.umami) {
        console.log('Tracker til umami', obj);
        window.umami.track(eventNavn, obj);
    }
}
