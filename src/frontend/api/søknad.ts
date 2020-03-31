import { ISøknadDTO, IBarnMedOpplysninger } from '../typer/søknad';
import { ISaksbehandler } from '../typer/saksbehandler';
import { Ressurs } from '../typer/ressurs';
import { IFagsak } from '../typer/fagsak';
import { IBehandling } from '../typer/behandling';

export const registrerSøknad = (
    søknad: ISøknadDTO,
    aktivBehandling: IBehandling | undefined,
    innloggetSaksbehandler?: ISaksbehandler
): Promise<Ressurs<IFagsak>> => {
    return ,
        innloggetSaksbehandler
    );
};
