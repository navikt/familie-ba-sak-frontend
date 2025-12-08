import type { SkjemaBrevmottaker } from '../../../../komponenter/Saklinje/Meny/LeggTilEllerFjernBrevmottakere/useBrevmottakerSkjema';
import type { IManueltBrevRequestPåFagsak } from '../../../../typer/dokument';
import type { Målform } from '../../../../typer/søknad';
import type { Informasjonsbrev } from '../../Behandling/Høyremeny/Hendelsesoversikt/BrevModul/typer';

interface IHentEnkeltInformasjonsbrevRequestInput {
    målform: Målform;
    brevmal: Informasjonsbrev;
    manuelleBrevmottakerePåFagsak: SkjemaBrevmottaker[];
}

export const hentEnkeltInformasjonsbrevRequest = ({
    målform,
    brevmal,
    manuelleBrevmottakerePåFagsak,
}: IHentEnkeltInformasjonsbrevRequestInput): IManueltBrevRequestPåFagsak => {
    return {
        multiselectVerdier: [],
        barnIBrev: [],
        mottakerMålform: målform,
        brevmal: brevmal,
        manuelleBrevmottakere: manuelleBrevmottakerePåFagsak,
    };
};
