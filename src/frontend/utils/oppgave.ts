import { IdentGruppe, IOppgaveIdent } from '../typer/oppgave';
import { IOppgave } from '../typer/oppgave';

export const fnr = (oppg: IOppgave) => {
    return oppg.identer?.find(
        (ident: IOppgaveIdent) => ident.gruppe === IdentGruppe.FOLKEREGISTERIDENT
    )?.ident;
};
