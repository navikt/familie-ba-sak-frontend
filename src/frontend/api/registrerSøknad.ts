import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';
import type { BehandlingUnderkategori } from '@typer/behandlingstema';
import type { IBarnMedOpplysningerBackend, Målform } from '@typer/søknad';

interface PathParams {
    behandlingId: number;
}

export interface Payload {
    søknad: {
        underkategori: BehandlingUnderkategori;
        søkerMedOpplysninger: {
            ident: string;
            målform: Målform;
        };
        barnaMedOpplysninger: IBarnMedOpplysningerBackend[];
        endringAvOpplysningerBegrunnelse: string;
        erAutomatiskRegistrert: boolean;
    };
    bekreftEndringerViaFrontend: boolean;
}

export async function registrerSøknad(pathParams: PathParams, payload: Payload): Promise<IBehandling> {
    const { behandlingId } = pathParams;
    return apiClient.post<Payload, IBehandling>({
        data: payload,
        url: `/familie-ba-sak/api/behandlinger/${behandlingId}/steg/registrer-søknad`,
    });
}
