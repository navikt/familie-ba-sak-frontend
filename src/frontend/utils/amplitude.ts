import amplitude from 'amplitude-js';

const amplitudeInstance = amplitude.getInstance();
const team_id = 'familie';
const applikasjon = 'ba-sak-frontend';

amplitudeInstance.init('default', '', {
    apiEndpoint: 'amplitude.nav.no/collect-auto',
    saveEvents: false,
    includeUtm: true,
    includeReferrer: true,
    platform: window.location.toString(),
});

export const useAmplitude = () => {
    // eslint-disable-next-line
    const loggEvent = (eventName: string, eventProperties: any) => {
        amplitudeInstance.logEvent(eventName, eventProperties);
    };

    const loggSidevisning = (sidevisning: string) => {
        loggEvent('sidevisning', {
            sidevisning,
            team_id,
            applikasjon,
        });
    };

    return {
        loggEvent,
        loggSidevisning,
    };
};
