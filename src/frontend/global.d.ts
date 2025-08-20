export {};

declare global {
    interface Window {
        umami: { track: (eventName: string, eventData?: string | object) => void };
    }
}

declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}
