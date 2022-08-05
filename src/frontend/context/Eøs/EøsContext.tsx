import constate from 'constate';

import { Status } from '../../ikoner/StatusIkon';
import type { IBehandling } from '../../typer/behandling';
import type { EøsPeriodeStatus, IRestEøsPeriode } from '../../typer/eøsPerioder';
import type { IGrunnlagPerson } from '../../typer/person';
import familieDayjs from '../../utils/familieDayjs';
import { sorterFødselsdato } from '../../utils/formatter';
import { useKompetanse } from '../Kompetanse/KompetanseContext';
import { useUtenlandskPeriodeBeløp } from '../UtenlandskPeriodeBeløp/UtenlandskPeriodeBeløpContext';
import { useValutakurs } from '../Valutakurs/ValutakursContext';

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
        sorterFødselsdato(personA.fødselsdato, personB.fødselsdato)
    )[0];
    const yngsteBarnPeriodeB = barnIPeriodeB.sort((personA, personB) =>
        sorterFødselsdato(personA.fødselsdato, personB.fødselsdato)
    )[0];

    return sorterFødselsdato(yngsteBarnPeriodeA.fødselsdato, yngsteBarnPeriodeB.fødselsdato);
};

export const sorterEøsPerioder = (
    periodeA: IRestEøsPeriode,
    periodeB: IRestEøsPeriode,
    personer: IGrunnlagPerson[]
) => {
    const beggePerioderLøpende = (periodeA.tom === periodeB.tom) === undefined;
    if (periodeA.tom === undefined && !beggePerioderLøpende) return -1;
    if (periodeB.tom === undefined && !beggePerioderLøpende) return 1;

    const fomErSammeMåned = familieDayjs(periodeA.fom).isSame(periodeB.fom, 'month');
    if (fomErSammeMåned) {
        return sorterPåBarnsFødselsdato(periodeA.barnIdenter, periodeB.barnIdenter, personer);
    } else {
        return familieDayjs(periodeA.fom).isBefore(periodeB.fom) ? 1 : -1;
    }
};

export const konverterDesimalverdiTilSkjemaVisning = (verdi: string | undefined) =>
    verdi ? verdi.toString().replace('.', ',') : undefined;

export const konverterSkjemaverdiTilDesimal = (verdi: string | undefined) =>
    verdi ? verdi.toString().replace(/\s+/g, '').replace(',', '.') : undefined;

interface IProps {
    åpenBehandling: IBehandling;
}

const [EøsProvider, useEøs] = constate(({ åpenBehandling }: IProps) => {
    const { kompetanser, erKompetanserGyldige, hentKompetanserMedFeil } = useKompetanse({
        åpenBehandling,
    });

    const {
        utbetaltAnnetLandBeløp,
        erUtbetaltAnnetLandBeløpGyldige,
        hentUtbetaltAnnetLandBeløpMedFeil,
    } = useUtenlandskPeriodeBeløp({
        åpenBehandling,
    });

    const { valutakurser, erValutakurserGyldige, hentValutakurserMedFeil } = useValutakurs({
        åpenBehandling,
    });

    const erEøsInformasjonGyldig = () => {
        return (
            erKompetanserGyldige() && erUtbetaltAnnetLandBeløpGyldige() && erValutakurserGyldige()
        );
    };

    return {
        erEøsInformasjonGyldig,
        kompetanser,
        hentKompetanserMedFeil,
        utbetaltAnnetLandBeløp,
        erUtbetaltAnnetLandBeløpGyldige,
        hentUtbetaltAnnetLandBeløpMedFeil,
        valutakurser,
        erValutakurserGyldige,
        hentValutakurserMedFeil,
    };
});

export { EøsProvider, useEøs };
