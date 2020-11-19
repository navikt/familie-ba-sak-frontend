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

export enum EventKategori {
    OPPGAVE = 'OPPGAVE',
    JOURNALFØRING = 'JOURNALFØRING',
    FAGSAK = 'FAGSAK',
    BEHANDLING = 'BEHANDLING',
}

export const useAmplitude = () => {
    // eslint-disable-next-line
    const loggEvent = (eventName: string, eventProperties: any) => {
        amplitudeInstance.logEvent(eventName, eventProperties);
    };

    const loggSidevisning = (kategori: EventKategori, sidevisning: string) => {
        loggEvent('sidevisning', {
            sidevisning,
            team_id,
            applikasjon,
            kategori,
        });
    };

    const loggSidevisningBehandling = (sidevisning: string) => {
        loggEvent('sidevisning', {
            sidevisning,
            team_id,
            applikasjon,
            kategori: EventKategori.BEHANDLING,
        });
    };

    return {
        loggEvent,
        loggSidevisning,
        loggSidevisningBehandling,
    };
};
