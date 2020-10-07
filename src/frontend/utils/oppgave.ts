import { IdentGruppe, IOppgaveIdent } from '../typer/oppgave';

export const fnr = (identer: IOppgaveIdent[] | undefined) => {
    const ident = identer?.find((ident: IOppgaveIdent) => ident.gruppe === IdentGruppe.NPID);
    // if (ident === undefined) {
    //     throw new Error('Oppgaven inneholder ikke en folkeregisterident.');
    // }
    return ident?.ident;
};
