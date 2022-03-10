import type { IOppgaveIdent } from '../typer/oppgave';
import { IdentGruppe } from '../typer/oppgave';

/**
- Oppgaver tilknyttet barnetrygd opererer kun med folkeregisterident.
- Unntaket er journalføringsoppgaver, dette er de eneste typen som potensielt ikke har ident.
- Alle saksbehandlere har tilgang på en identløs journalføringsoppgave.
- Oppgaver med aktør ID har alltid en tilsvarende folkeregisterident. Feltet aktoerId kan også ignoreres.
*/
export const hentFnrFraOppgaveIdenter = (identer: IOppgaveIdent[] | undefined) => {
    const ident = identer?.find(
        (ident: IOppgaveIdent) => ident.gruppe === IdentGruppe.FOLKEREGISTERIDENT
    );
    return ident?.ident;
};
