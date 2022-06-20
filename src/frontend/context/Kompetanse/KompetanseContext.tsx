import { useState, useEffect } from 'react';

import { useHttp } from '@navikt/familie-http';
import { type FeltState, Valideringsstatus } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';

import type { IBehandling } from '../../typer/behandling';
import type { IKompetanse, IRestKompetanse } from '../../typer/eøsPerioder';
import { ToggleNavn } from '../../typer/toggles';
import { erEøsPeriodeGyldig } from '../../utils/eøsValidators';
import { nyYearMonthPeriode } from '../../utils/kalender';
import { lagInitiellFelt } from '../../utils/validators';
import { useApp } from '../AppContext';
import { sorterEøsPerioder } from '../Eøs/EøsContext';
import {
    erAnnenForeldersAktivitetGyldig,
    erAnnenForeldersAktivitetslandGyldig,
    erBarnetsBostedslandGyldig,
    erBarnGyldig,
    erKompetanseResultatGyldig,
    erSøkersAktivitetGyldig,
    validerKompetanse,
} from './valideringKompetanse';

export enum KompetanseSubmit {
    PUT,
    POST,
    DELETE,
    NONE,
}

interface IProps {
    åpenBehandling: IBehandling;
}

const useKompetanse = ({ åpenBehandling }: IProps) => {
    const { toggles } = useApp();
    const { request } = useHttp();
    const [kompetanser, settKompetanser] = useState<FeltState<IKompetanse>[]>([]);
    const [kompetanseSubmit, settKompetanseSubmit] = useState(KompetanseSubmit.NONE);

    const kjørValidering = (kompetanser: FeltState<IKompetanse>[]): FeltState<IKompetanse>[] => {
        return kompetanser.map((kompetanse: FeltState<IKompetanse>) =>
            validerKompetanse(kompetanse)
        );
    };

    useEffect(() => {
        if (toggles[ToggleNavn.brukEøs] && åpenBehandling.kompetanser.length > 0) {
            settKompetanser(
                kjørValidering(
                    mapFraRestKompetanseTilUi(
                        åpenBehandling.kompetanser.sort((periodeA, periodeB) =>
                            sorterEøsPerioder(periodeA, periodeB, åpenBehandling.personer)
                        )
                    )
                )
            );
        }
    }, [åpenBehandling]);

    const erKompetanserGyldige = (): boolean => {
        return (
            kompetanser.filter(kompetanse => kompetanse.valideringsstatus !== Valideringsstatus.OK)
                .length === 0
        );
    };

    const mapFraRestKompetanseTilUi = (
        restKompetanser: IRestKompetanse[]
    ): FeltState<IKompetanse>[] => {
        return restKompetanser.map(restKompetanse =>
            lagInitiellFelt<IKompetanse>(
                {
                    id: restKompetanse.id,
                    status: restKompetanse.status,
                    initielFom: restKompetanse.fom,
                    periode: lagInitiellFelt(
                        nyYearMonthPeriode(restKompetanse.fom, restKompetanse.tom),
                        erEøsPeriodeGyldig
                    ),
                    barnIdenter: lagInitiellFelt(restKompetanse.barnIdenter, erBarnGyldig),
                    søkersAktivitet: lagInitiellFelt(
                        restKompetanse.søkersAktivitet,
                        erSøkersAktivitetGyldig
                    ),
                    annenForeldersAktivitet: lagInitiellFelt(
                        restKompetanse.annenForeldersAktivitet,
                        erAnnenForeldersAktivitetGyldig
                    ),
                    annenForeldersAktivitetsland: lagInitiellFelt(
                        restKompetanse.annenForeldersAktivitetsland,
                        erAnnenForeldersAktivitetslandGyldig
                    ),
                    barnetsBostedsland: lagInitiellFelt(
                        restKompetanse.barnetsBostedsland,
                        erBarnetsBostedslandGyldig
                    ),
                    resultat: lagInitiellFelt(restKompetanse.resultat, erKompetanseResultatGyldig),
                },
                validerKompetanse
            )
        );
    };

    const hentKompetanserMedFeil = (): FeltState<IKompetanse>[] => {
        return kompetanser.filter(
            kompetanse => kompetanse.valideringsstatus !== Valideringsstatus.OK
        );
    };

    const putKompetanse = (
        redigerbartKompetanse: FeltState<IKompetanse>
    ): Promise<Ressurs<IBehandling>> => {
        settKompetanseSubmit(KompetanseSubmit.PUT);

        return request<IRestKompetanse, IBehandling>({
            method: 'PUT',
            url: `/familie-ba-sak/api/kompetanse/${åpenBehandling?.behandlingId}`,
            data: {
                id: redigerbartKompetanse.verdi.id,
                status: redigerbartKompetanse.verdi.status,
                fom: redigerbartKompetanse.verdi.periode.verdi.fom || '', // undefined fom vil bli stoppet i valideringen
                tom: redigerbartKompetanse.verdi.periode.verdi.tom,
                barnIdenter: redigerbartKompetanse.verdi.barnIdenter.verdi,
                søkersAktivitet: redigerbartKompetanse.verdi.søkersAktivitet.verdi,
                annenForeldersAktivitet: redigerbartKompetanse.verdi.annenForeldersAktivitet.verdi,
                annenForeldersAktivitetsland:
                    redigerbartKompetanse.verdi.annenForeldersAktivitetsland.verdi,
                barnetsBostedsland: redigerbartKompetanse.verdi.barnetsBostedsland.verdi,
                resultat: redigerbartKompetanse.verdi.resultat.verdi,
            },
        });
    };

    const deleteKompetanse = (kompetanseId: number): Promise<Ressurs<IBehandling>> => {
        settKompetanseSubmit(KompetanseSubmit.DELETE);

        return request<string, IBehandling>({
            method: 'DELETE',
            url: `/familie-ba-sak/api/kompetanse/${åpenBehandling?.behandlingId}/${kompetanseId}`,
        });
    };

    return {
        kompetanser,
        kompetanseSubmit,
        settKompetanseSubmit,
        putKompetanse,
        deleteKompetanse,
        erKompetanserGyldige,
        hentKompetanserMedFeil,
    };
};

export { useKompetanse };
