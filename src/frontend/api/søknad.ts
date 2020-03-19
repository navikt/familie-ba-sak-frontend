import { ISøknadDTO, IPartMedOpplysninger } from '../typer/søknad';
import { axiosRequest } from './axios';
import { ISaksbehandler } from '../typer/saksbehandler';
import { Ressurs } from '../typer/ressurs';
import { IFagsak } from '../typer/fagsak';
import { IBehandling } from '../typer/behandling';

export const registrerSøknad = (
    søknad: ISøknadDTO,
    aktivBehandling: IBehandling | undefined,
    innloggetSaksbehandler?: ISaksbehandler
): Promise<Ressurs<IFagsak>> => {
    return axiosRequest(
        {
            method: 'POST',
            data: {
                ...søknad,
                barnaMedOpplysninger: søknad.barnaMedOpplysninger.filter(
                    (it: IPartMedOpplysninger) => it.checked
                ),
            },
            url: `/familie-ba-sak/api/behandlinger/${aktivBehandling?.behandlingId}/registrere-søknad-og-hent-persongrunnlag`,
        },
        innloggetSaksbehandler
    );
};
