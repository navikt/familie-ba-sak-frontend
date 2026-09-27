import axios from 'axios';

// Preprod-endepunktet svarer med en ren streng og ikke Ressurs, og kan derfor ikke gå via apiClient.
export async function tømPersonopplysningerCacheITestmiljø() {
    const { data } = await axios.post<string>('/familie-ba-sak/api/preprod/clear-personopplysninger-cache');
    return data;
}
