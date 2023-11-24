import type { BehandlingKategori } from './behandlingstema';
import type { Målform } from './søknad';
import type { SkjemaBrevmottaker } from '../komponenter/Fagsak/Personlinje/Behandlingsmeny/LeggTilEllerFjernBrevmottakere/useBrevmottakerSkjema';
import type {
    Brevmal,
    Informasjonsbrev,
} from '../komponenter/Felleskomponenter/Hendelsesoversikt/BrevModul/typer';
import type { IsoDatoString } from '../utils/dato';

interface IManueltBrevRequest {
    mottakerIdent: string;
    multiselectVerdier: string[];
    barnIBrev: string[];
    datoAvtale?: IsoDatoString;
}

export interface IManueltBrevRequestPåBehandling extends IManueltBrevRequest {
    antallUkerSvarfrist?: number;
    barnasFødselsdager?: string[];
    behandlingKategori?: BehandlingKategori | undefined;
    brevmal: Brevmal;
    manuelleBrevmottakere?: never;
    mottakerMålform?: Målform;
    mottakerNavn?: string;
    mottakerlandSed?: string[];
}

export interface IManueltBrevRequestPåFagsak extends IManueltBrevRequest {
    antallUkerSvarfrist?: never;
    barnasFødselsdager?: never;
    behandlingKategori?: never;
    brevmal: Brevmal | Informasjonsbrev;
    manuelleBrevmottakere: SkjemaBrevmottaker[];
    mottakerMålform: Målform;
    mottakerNavn: string;
    mottakerlandSed?: never;
}

export enum Distribusjonskanal {
    PRINT = 'PRINT',
    SDP = 'SDP',
    DITT_NAV = 'DITT_NAV',
    LOKAL_PRINT = 'LOKAL_PRINT',
    INGEN_DISTRIBUSJON = 'INGEN_DISTRIBUSJON',
    TRYGDERETTEN = 'TRYGDERETTEN',
    DPVT = 'DPVT',
    UKJENT = 'UKJENT',
}
