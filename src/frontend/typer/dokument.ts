import type {
    Brevmal,
    Informasjonsbrev,
} from '../komponenter/Felleskomponenter/Hendelsesoversikt/BrevModul/typer';
import type { BehandlingKategori } from './behandlingstema';
import type { Målform } from './søknad';

export interface IManueltBrevRequestPåBehandling {
    multiselectVerdier: string[];
    barnIBrev: string[];
    brevmal: Brevmal;
    datoAvtale?: string;
    barnasFødselsdager?: string[];
    behandlingKategori?: BehandlingKategori | undefined;
    antallUkerSvarfrist?: number;
    mottakerMålform?: Målform;
    mottakerlandSed?: string;
}

export interface IManueltBrevRequestPåFagsak {
    multiselectVerdier: string[];
    barnIBrev: string[];
    mottakerMålform: Målform;
    brevmal: Brevmal | Informasjonsbrev;
    datoAvtale?: string;
    behandlingKategori?: undefined;
    antallUkerSvarfrist?: undefined;
}
