import { v4 as uuidv4 } from 'uuid';

export const randomUUID = (): string => {
    return uuidv4();
};

export const tilFeilside = (): void => {
    window.location.assign(window.location.protocol + '//' + window.location.host + '/error');
};
