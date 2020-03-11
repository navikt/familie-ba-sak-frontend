import { IPerson } from '../typer/person';
import { axiosRequest } from './axios';

export const hentPerson = (personIdent: string) => {
    return axiosRequest<IPerson>({
        method: 'GET',
        url: '/familie-ba-sak/api/person',
        headers: {
            personIdent,
        },
    });
};
