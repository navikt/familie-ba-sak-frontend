import type { BehandlingKategori } from './behandlingstema';
import type { Målform } from './søknad';
import type {
    Brevmal,
    Informasjonsbrev,
} from '../sider/Fagsak/Behandling/Høyremeny/Hendelsesoversikt/BrevModul/typer';
import type { SkjemaBrevmottaker } from '../sider/Fagsak/Fagsaklinje/Behandlingsmeny/LeggTilEllerFjernBrevmottakere/useBrevmottakerSkjema';
import type { IsoDatoString } from '../utils/dato';

interface IManueltBrevRequest {
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
    mottakerlandSed?: string[];
    fritekstAvsnitt?: string;
}

export interface IManueltBrevRequestPåFagsak extends IManueltBrevRequest {
    antallUkerSvarfrist?: never;
    barnasFødselsdager?: never;
    behandlingKategori?: never;
    brevmal: Brevmal | Informasjonsbrev;
    manuelleBrevmottakere: SkjemaBrevmottaker[];
    mottakerMålform: Målform;
    mottakerlandSed?: never;
    fritekstAvsnitt?: string;
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
