import { IOppgave } from '../typer/oppgave';
import { Ressurs } from '../typer/ressurs';
import { axiosRequest } from './axios';

export const apiHentOppgaver = (
    behandlingstema: string,
    oppgavetype: string,
    enhet: string,
    saksbehandler: string
): Promise<Ressurs<IOppgave[]>> => {
    return axiosRequest<IOppgave[]>({
        method: 'GET',
        url: `/familie-ba-sak/api/oppgaver?behandlingstema=${behandlingstema}&oppgavetype=${oppgavetype}&enhet=${enhet}&saksbehandler=${saksbehandler}`,
    });
};
