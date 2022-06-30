import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import type { IManueltBrevRequestPåFagsak } from '../../../../typer/dokument';
import type { IPersonInfo } from '../../../../typer/person';
import type { Målform } from '../../../../typer/søknad';
import type { Informasjonsbrev } from '../../../Felleskomponenter/Hendelsesoversikt/BrevModul/typer';

interface IHentEnkeltInformasjonsbrevRequestInput {
    bruker: Ressurs<IPersonInfo>;
    målform: Målform;
    brevmal: Informasjonsbrev;
}

export const hentEnkeltInformasjonsbrevRequest = ({
    bruker,
    målform,
    brevmal,
}: IHentEnkeltInformasjonsbrevRequestInput): IManueltBrevRequestPåFagsak => {
    if (bruker.status === RessursStatus.SUKSESS) {
        return {
            mottakerIdent: bruker.data.personIdent,
            multiselectVerdier: [],
            barnIBrev: [],
            mottakerMålform: målform,
            mottakerNavn: bruker.data.navn,
            brevmal: brevmal,
        };
    } else {
        throw Error('Bruker ikke hentet inn og vi kan ikke sende inn skjema');
    }
};
