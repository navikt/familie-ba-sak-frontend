import { logWarn } from '@navikt/familie-logging';

export default function overstyrEmitWarning() {
    const originalEmitWarning = process.emitWarning.bind(process);

    const feilmeldingerViØnskerÅSkriveOm = [
        'did not find expected authorization request details in session',
        'invalid_grant',
    ];

    // Overstyrer process.emitWarning for å filtrere ut spesifikke advarsler
    process.emitWarning = ((warning: string | Error, ...args: never[]): void => {
        if (warning instanceof Error && feilmeldingerViØnskerÅSkriveOm.some(msg => warning.message.includes(msg))) {
            // Sørger for at vi logger advarsler uten at de blir prefixet med "Error: " av Node.
            logWarn(warning.message);
            return;
        }

        if (typeof warning === 'string' && feilmeldingerViØnskerÅSkriveOm.some(msg => warning.includes(msg))) {
            // Sørger for at vi logger advarsler uten at de blir prefixet med "Error: " av Node.
            logWarn(warning);
            return;
        }

        // Kaller original versjon av emitWarning for alle andre advarsler
        return originalEmitWarning(warning, ...args);
    }) as typeof process.emitWarning;
}
