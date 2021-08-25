import {
    Brevmal,
    Informasjonsbrev,
} from '../komponenter/Felleskomponenter/Hendelsesoversikt/BrevModul/typer';
import { Målform } from './søknad';

export interface IManueltBrevRequestPåBehandling {
    mottakerIdent: string;
    multiselectVerdier: string[];
    brevmal: Brevmal;
}

export interface IManueltBrevRequestPåFagsak {
    mottakerIdent: string;
    multiselectVerdier: string[];
    barnIBrev: string[];
    mottakerMålform: Målform;
    mottakerNavn: string;
    brevmal: Brevmal | Informasjonsbrev;
}
