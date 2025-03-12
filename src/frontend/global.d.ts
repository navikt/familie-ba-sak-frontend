export {};

declare global {
    interface Window {
        umami: { track: (eventName: string, eventData?: string | object) => void };
    }
}
