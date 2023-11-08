import type { BehandlingKategori } from './behandlingstema';
import type { Målform } from './søknad';
import type { IRestBrevmottaker } from '../komponenter/Fagsak/Personlinje/Behandlingsmeny/LeggTilEllerFjernBrevmottakere/useLeggTilFjernBrevmottaker';
import type {
    Brevmal,
    Informasjonsbrev,
} from '../komponenter/Felleskomponenter/Hendelsesoversikt/BrevModul/typer';
import type { IsoDatoString } from '../utils/dato';

export interface IManueltBrevRequestPåBehandling {
    mottakerIdent: string;
    multiselectVerdier: string[];
    barnIBrev: string[];
    brevmal: Brevmal;
    datoAvtale?: IsoDatoString;
    barnasFødselsdager?: string[];
    behandlingKategori?: BehandlingKategori | undefined;
    antallUkerSvarfrist?: number;
    mottakerMålform?: Målform;
    mottakerNavn?: string;
    mottakerlandSed?: string[];
}

export interface IManueltBrevRequestPåFagsak {
    mottakerIdent: string;
    multiselectVerdier: string[];
    barnIBrev: string[];
    mottakerMålform: Målform;
    mottakerNavn: string;
    brevmal: Brevmal | Informasjonsbrev;
    datoAvtale?: string;
    behandlingKategori?: undefined;
    antallUkerSvarfrist?: undefined;
    manuelleInfoBrevmottakere?: IRestBrevmottaker[];
}
