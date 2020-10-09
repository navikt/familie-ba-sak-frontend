import { IdentGruppe, IOppgaveIdent } from '../typer/oppgave';

export const hentFnrFraOppgaveIdenter = (identer: IOppgaveIdent[] | undefined) => {
    const ident = identer?.find(
        (ident: IOppgaveIdent) => ident.gruppe === IdentGruppe.FOLKEREGISTERIDENT
    );
    return ident?.ident;
};
