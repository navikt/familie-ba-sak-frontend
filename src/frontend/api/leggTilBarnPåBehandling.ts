import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';
import { byggFeiletRessurs, type Ressurs, RessursStatus } from '@navikt/familie-typer';

import type { IBehandling } from '../typer/behandling';
import { adressebeskyttelsestyper, type IRestTilgang } from '../typer/person';
import { RessursResolver } from '../utils/ressursResolver';

export interface HarSaksbehandlerTilgangPayload {
    brukerIdent: string;
}

export interface LeggTilBarnPåBehandlingPayload {
    barnIdent: string;
}

const harSaksbehandlerTilgang = async (request: FamilieRequest, brukerIdent: string) => {
    const ressurs = RessursResolver.resolveToPromise(
        await request<HarSaksbehandlerTilgangPayload, IRestTilgang>({
            data: { brukerIdent: brukerIdent },
            method: 'POST',
            url: '/familie-ba-sak/api/tilgang',
        })
    );
    return ressurs.data.saksbehandlerHarTilgang;
};

export const leggTilBarnPåBehandling = async (request: FamilieRequest, barnIdent: string, behandlingId: number) => {
    // TODO: dobbeltsjekk om denne venter på responsen fra kallet før den kjører videre
    const saksbehandlerHarTilgang = await harSaksbehandlerTilgang(request, barnIdent);

    if (!saksbehandlerHarTilgang) {
        settSubmitRessurs(
            byggFeiletRessurs(
                `Barnet kan ikke legges til på grunn av diskresjonskode ${
                    adressebeskyttelsestyper[ressurs.data.adressebeskyttelsegradering] ?? 'ukjent'
                }`
            )
        );
    }

    // TODO: gjør noe her så ikke kallet kjører videre hvis ikke saksbehandleren har tilgang
    const ressurs = await request<LeggTilBarnPåBehandlingPayload, IBehandling>({
        data: { barnIdent: barnIdent },
        method: 'POST',
        url: `/familie-ba-sak/api/behandlinger/${behandlingId}/legg-til-barn`,
    }).then((respons: Ressurs<IBehandling>) => {
        if (
            respons.status === RessursStatus.FEILET ||
            respons.status === RessursStatus.FUNKSJONELL_FEIL ||
            respons.status === RessursStatus.IKKE_TILGANG
        ) {
            // TODO: dette henger igjen fra useSkjema. Kan vi bare fjerne det? Ev. håndtere det på den annen måte
            settSubmitRessurs(byggFeiletRessurs(respons.frontendFeilmelding));
        } else {
            settÅpenBehandling(respons);
            lukkModal();
        }
    });

    return RessursResolver.resolveToPromise(ressurs);
};
