import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import type { IManueltBrevRequestPåFagsak } from '../../../../typer/dokument';
import type { IPersonInfo } from '../../../../typer/person';
import type { Målform } from '../../../../typer/søknad';
import type { Informasjonsbrev } from '../../../Felleskomponenter/Hendelsesoversikt/BrevModul/typer';
import type { SkjemaBrevmottaker } from '../../Personlinje/Behandlingsmeny/LeggTilEllerFjernBrevmottakere/useBrevmottakerSkjema';

interface IHentEnkeltInformasjonsbrevRequestInput {
    bruker: Ressurs<IPersonInfo>;
    målform: Målform;
    brevmal: Informasjonsbrev;
    manuelleBrevmottakerePåFagsak: SkjemaBrevmottaker[];
}

export const hentEnkeltInformasjonsbrevRequest = ({
    bruker,
    målform,
    brevmal,
    manuelleBrevmottakerePåFagsak,
}: IHentEnkeltInformasjonsbrevRequestInput): IManueltBrevRequestPåFagsak => {
    if (bruker.status === RessursStatus.SUKSESS) {
        return {
            mottakerIdent: bruker.data.personIdent,
            multiselectVerdier: [],
            barnIBrev: [],
            mottakerMålform: målform,
            mottakerNavn: bruker.data.navn,
            brevmal: brevmal,
            manuelleBrevmottakere: manuelleBrevmottakerePåFagsak,
        };
    } else {
        throw Error('Bruker ikke hentet inn og vi kan ikke sende inn skjema');
    }
};
