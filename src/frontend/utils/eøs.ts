import { isBefore, isSameMonth } from 'date-fns';

import { sorterPåDato } from './formatter';
import { Status } from '../ikoner/StatusIkon';
import type { EøsPeriodeStatus, IRestEøsPeriode } from '../typer/eøsPerioder';
import type { IGrunnlagPerson } from '../typer/person';

export const mapEøsPeriodeStatusTilStatus: Record<EøsPeriodeStatus, Status> = {
    IKKE_UTFYLT: Status.ADVARSEL,
    UFULLSTENDIG: Status.FEIL,
    OK: Status.OK,
};

const mapBarnIdenterTilPerson = (barnIdenter: string[], personer: IGrunnlagPerson[]) => {
    return barnIdenter.map<IGrunnlagPerson>(barnIdent => {
        const person = personer.find(person => person.personIdent === barnIdent);
        if (person === undefined)
            throw Error(
                'Barn ikke funnet. Skal ikke kunne være mulig, siden sjekken er gjort annen plass i koden'
            );
        return person;
    });
};

const sorterPåBarnsFødselsdato = (
    barnIdenterPeriodeA: string[],
    barnIdenterPeriodeB: string[],
    personer: IGrunnlagPerson[]
) => {
    const barnIPeriodeA: IGrunnlagPerson[] = mapBarnIdenterTilPerson(barnIdenterPeriodeA, personer);
    const barnIPeriodeB: IGrunnlagPerson[] = mapBarnIdenterTilPerson(barnIdenterPeriodeB, personer);
    const yngsteBarnPeriodeA = barnIPeriodeA.sort((personA, personB) =>
        sorterPåDato(personA.fødselsdato, personB.fødselsdato)
    )[0];
    const yngsteBarnPeriodeB = barnIPeriodeB.sort((personA, personB) =>
        sorterPåDato(personA.fødselsdato, personB.fødselsdato)
    )[0];

    return sorterPåDato(yngsteBarnPeriodeA.fødselsdato, yngsteBarnPeriodeB.fødselsdato);
};

export const sorterEøsPerioder = (
    periodeA: IRestEøsPeriode,
    periodeB: IRestEøsPeriode,
    personer: IGrunnlagPerson[]
) => {
    if (periodeA.tom === undefined && periodeB.tom !== undefined) return -1;
    if (periodeB.tom === undefined && periodeA.tom !== undefined) return 1;

    const datoA = new Date(periodeA.fom);
    const datoB = new Date(periodeB.fom);

    const fomErSammeMåned = isSameMonth(datoA, datoB);
    if (fomErSammeMåned) {
        return sorterPåBarnsFødselsdato(periodeA.barnIdenter, periodeB.barnIdenter, personer);
    } else {
        return isBefore(datoA, datoB) ? 1 : -1;
    }
};

export const konverterDesimalverdiTilSkjemaVisning = (verdi: string | undefined) =>
    verdi ? verdi.toString().replace('.', ',') : undefined;

export const konverterSkjemaverdiTilDesimal = (verdi: string | undefined) =>
    verdi ? verdi.toString().replace(/\s+/g, '').replace(',', '.') : undefined;
