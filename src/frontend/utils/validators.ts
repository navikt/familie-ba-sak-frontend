import moment from 'moment';
import { IIdentFelt } from '../komponenter/Fagsak/Opprett/OpprettBehandlingProvider';
import { IBarnBeregning } from '../typer/behandle';
import { feil, IFelt, ok, Valideringsstatus } from '../typer/felt';
import { datoformat } from './formatter';

// tslint:disable-next-line: no-var-requires
const validator = require('@navikt/fnrvalidator');

const harFyltInnIdent = (felt: IIdentFelt): IIdentFelt => {
    return /^\d{11}$/.test(felt.verdi.replace(' ', ''))
        ? ok(felt)
        : feil(felt, 'Identen har ikke 11 tall');
};

const validerIdent = (felt: IIdentFelt): IIdentFelt => {
    return validator.idnr(felt.verdi).status === 'valid'
        ? ok(felt)
        : feil(felt, 'Identen er ugyldig');
};

export const identValidator = (identFelt: IIdentFelt): IIdentFelt => {
    const validated = harFyltInnIdent(identFelt);
    if (validated.valideringsstatus !== Valideringsstatus.OK) {
        return validated;
    }

    return validerIdent(identFelt);
};

export const erGyldigMånedDato = (felt: IFelt<IBarnBeregning>): IFelt<IBarnBeregning> => {
    return /^\d{2}\.\d{2}$/.test(felt.verdi.stønadFom) &&
        moment(felt.verdi.stønadFom, datoformat.MÅNED).isValid()
        ? ok(felt)
        : feil(felt, 'Ugyldig dato');
};

export const erGyldigBegrunnelse = (felt: IFelt<string>): IFelt<string> => {
    if (felt.verdi === '') {
        return feil(felt, 'Begrunnelse er påkrevd. Vennligst fyll ut en begrunnelse til vedtaket.');
    }
    return ok(felt);
};
