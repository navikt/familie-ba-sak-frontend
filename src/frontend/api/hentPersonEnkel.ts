import { apiClient } from '@api/client/apiClient';
import type { IPersonInfo } from '@typer/person';
import { lagManglerTilgangBegrunnelse } from '@typer/tilgang';

interface Payload {
    ident: string;
}

export async function hentPersonEnkel(payload: Payload): Promise<IPersonInfo> {
    const person = await apiClient.post<Payload, IPersonInfo>({
        url: '/familie-ba-sak/api/person/enkel',
        data: payload,
    });
    if (person.harTilgang === false) {
        throw new Error(
            `Du har ikke tilgang til denne personen. ${lagManglerTilgangBegrunnelse(person.avvisningskode, person.adressebeskyttelseGradering)}.`
        );
    }
    return person;
}
