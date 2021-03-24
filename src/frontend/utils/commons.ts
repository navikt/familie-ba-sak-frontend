import { v4 as uuidv4 } from 'uuid';

import { byggFeiletRessurs, Ressurs, RessursStatus } from '@navikt/familie-typer';

import { IPersonInfo } from '../typer/person';

export const randomUUID = (): string => {
    return uuidv4();
};

export const fjernWhitespace = (streng: string) =>
    streng.replace(/\s/g, '').replace(/[ \u0085]/g, '');

export const tilFeilside = (): void => {
    window.location.assign(window.location.protocol + '//' + window.location.host + '/error');
};

export const fjernElementMedNøkkel = (obj: { [key: string]: unknown }, propToDelete: string) => {
    // eslint-disable-next-line
    const { [propToDelete]: _, ...objectWithoutDeletedProp } = obj;
    return objectWithoutDeletedProp;
};

export const sjekkTilgangTilPerson = (personRes: Ressurs<IPersonInfo>): Ressurs<IPersonInfo> => {
    if (personRes.status === RessursStatus.SUKSESS && personRes.data.harTilgang === false) {
        return byggFeiletRessurs('Du har ikke tilgang til denne brukeren.');
    } else {
        return personRes;
    }
};
