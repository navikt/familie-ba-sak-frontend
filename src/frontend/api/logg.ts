import { axiosRequest } from './axios';
import { Ressurs } from '../typer/ressurs';
import { ILogg } from '../typer/logg';

export const hentLoggForBehandling = (behandlingId: number): Promise<Ressurs<ILogg[]>> => {
    return axiosRequest<ILogg[]>({
        method: 'GET',
        url: `/familie-ba-sak/api/logg/${behandlingId}`,
    });
};
