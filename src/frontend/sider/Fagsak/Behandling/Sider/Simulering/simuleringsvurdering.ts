import { Behandlingstype, BehandlingÅrsak, type IBehandling } from '@typer/behandling';
import { PersonType } from '@typer/person';
import type { ISimuleringDTO } from '@typer/simulering';
import { isoStringTilDate } from '@utils/dato';
import { isBefore } from 'date-fns';

const MARS_2023 = '2023-03-01';
const MAKSGRENSE_FOR_AVVIK_I_BELØP_VED_MIGRERING = 100;

export interface Simuleringsvurdering {
    erFeilutbetaling: boolean;
    erMigreringFraInfotrygdMedAvvik: boolean;
    behandlingErMigreringMedAvvikInnenforBeløpsgrenser: boolean;
    behandlingErMigreringMedAvvikUtenforBeløpsgrenser: boolean;
    behandlingErMigreringMedManuellePosteringer: boolean;
    behandlingErMigreringFraInfotrygdMedKun0Utbetalinger: boolean;
    behandlingErEndreMigreringsdato: boolean;
}

export function utledSimuleringsvurdering(simulering: ISimuleringDTO, behandling: IBehandling): Simuleringsvurdering {
    const perioderFørMars2023 = simulering.perioder.filter(periode =>
        isBefore(isoStringTilDate(periode.fom), isoStringTilDate(MARS_2023))
    );
    const perioderesultaterFørMars2023 = perioderFørMars2023.map(periode => periode.resultat ?? 0);
    const totalEtterbetalingFørMars2023 = perioderFørMars2023.reduce(
        (sum, periode) => sum + (periode.etterbetaling ?? 0),
        0
    );

    const erFeilutbetaling = simulering.feilutbetaling > 0;
    const erEtterutbetaling = totalEtterbetalingFørMars2023 > 0;

    const erMigreringFraInfotrygd = behandling.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD;
    const erMigreringFraInfotrygdMedAvvik = erMigreringFraInfotrygd && (erFeilutbetaling || erEtterutbetaling);

    const behandlingErMigreringMedAvvikInnenforBeløpsgrenser =
        erMigreringFraInfotrygdMedAvvik &&
        harMaks1KroneIAvvikPerBarn(perioderesultaterFørMars2023, behandling) &&
        harTotaltAvvikUnderBeløpsgrense(perioderesultaterFørMars2023);

    return {
        erFeilutbetaling,
        erMigreringFraInfotrygdMedAvvik,
        behandlingErMigreringMedAvvikInnenforBeløpsgrenser,
        behandlingErMigreringMedAvvikUtenforBeløpsgrenser:
            erMigreringFraInfotrygdMedAvvik && !behandlingErMigreringMedAvvikInnenforBeløpsgrenser,
        behandlingErMigreringMedManuellePosteringer:
            erMigreringFraInfotrygd &&
            simulering.perioder.some(periode => periode.manuellPostering !== undefined && periode.manuellPostering > 0),
        behandlingErMigreringFraInfotrygdMedKun0Utbetalinger:
            erMigreringFraInfotrygd &&
            !behandling.personerMedAndelerTilkjentYtelse.some(
                personMedAndelerTilkjentYtelse => personMedAndelerTilkjentYtelse.beløp !== 0
            ),
        behandlingErEndreMigreringsdato: behandling.årsak === BehandlingÅrsak.ENDRE_MIGRERINGSDATO,
    };
}

function harMaks1KroneIAvvikPerBarn(perioderesultater: number[], behandling: IBehandling): boolean {
    const antallBarn = behandling.personer.filter(person => person.type === PersonType.BARN).length;
    return perioderesultater.every(beløp => Math.abs(beløp) <= antallBarn);
}

function harTotaltAvvikUnderBeløpsgrense(perioderesultater: number[]): boolean {
    const totaltAvvik = Math.abs(perioderesultater.reduce((sum, beløp) => sum + beløp, 0));
    return totaltAvvik <= MAKSGRENSE_FOR_AVVIK_I_BELØP_VED_MIGRERING;
}
