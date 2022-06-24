import type {
    Brevmal,
    Informasjonsbrev,
} from '../komponenter/Felleskomponenter/Hendelsesoversikt/BrevModul/typer';
import type { BehandlingKategori } from './behandlingstema';
import type { Målform } from './søknad';

export interface IManueltBrevRequestPåBehandling {
    mottakerIdent: string;
    multiselectVerdier: string[];
    barnIBrev: string[];
    brevmal: Brevmal;
    datoAvtale?: string;
    barnasFødselsdager?: string[];
    behandlingKategori?: BehandlingKategori | undefined;
    antallUkerSvarfrist?: number;
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
}
