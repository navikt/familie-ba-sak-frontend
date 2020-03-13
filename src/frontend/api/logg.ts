import { ILogg } from '../typer/logg';
import { Ressurs } from '../typer/ressurs';
import { axiosRequest } from './axios';

export const hentLoggForBehandling = (behandlingId: number): Promise<Ressurs<ILogg[]>> => {
    return axiosRequest<ILogg[]>({
        method: 'GET',
        url: `/familie-ba-sak/api/logg/${behandlingId}`,
    });
};
