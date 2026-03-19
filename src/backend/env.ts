import { logError } from '@navikt/familie-logging';

export const envVar = (navn: string, påkrevd = true, defaultVerdi?: string): string => {
    const envVariabel = process.env[navn];
    if (!envVariabel && påkrevd && !defaultVerdi) {
        logError(`Mangler påkrevd miljøvariabel: '${navn}'`);
        process.exit(1);
    }
    if (!envVariabel && defaultVerdi) {
        return defaultVerdi;
    } else {
        return envVariabel as string;
    }
};

export const erLokal = (): boolean => ['lokal', 'hybrid', 'lokalt-mot-preprod'].includes(envVar('ENV'));
export const erPreprod = (): boolean => envVar('ENV') === 'preprod';
export const erProd = (): boolean => envVar('ENV') === 'prod';
