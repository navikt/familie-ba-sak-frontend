import { useState } from 'react';

import constate from 'constate';

import { useHttp } from '@navikt/familie-http';
import { FeltState, Valideringsstatus } from '@navikt/familie-skjema';
import { byggHenterRessurs, byggTomRessurs, Ressurs, RessursStatus } from '@navikt/familie-typer';

import { IBehandling } from '../../typer/behandling';
import { IKompetanse, IRestKompetanse } from '../../typer/kompetanse';
import { nyYearMonthPeriode } from '../../utils/kalender';
import { lagInitiellFelt } from '../../utils/validators';
import {
    erAnnenForeldersAktivitetGyldig,
    erBarnetsBostedslandGyldig,
    erBarnGyldig,
    erKompetansePeriodeGyldig,
    erPrimærlandGyldig,
    erSekundærlandGyldig,
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

const [KompetanseProvider, useKompetanse] = constate(({ åpenBehandling }: IProps) => {
    const { request } = useHttp();
    const [kompetanserRessurs, settKompetanserRessurs] = useState<Ressurs<IRestKompetanse[]>>(
        byggTomRessurs()
    );
    const [kompetanser, settKompetanser] = useState<FeltState<IKompetanse>[]>([]);
    const [kompetanseSubmit, settKompetanseSubmit] = useState(KompetanseSubmit.NONE);

    const kjørValidering = (kompetanser: FeltState<IKompetanse>[]): FeltState<IKompetanse>[] => {
        return kompetanser.map((kompetanse: FeltState<IKompetanse>) =>
            validerKompetanse(kompetanse)
        );
    };

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
                    behandlingId: restKompetanse.behandlingId,
                    status: restKompetanse.status,
                    initielFom: restKompetanse.fom,
                    periode: lagInitiellFelt(
                        nyYearMonthPeriode(restKompetanse.fom, restKompetanse.tom),
                        erKompetansePeriodeGyldig
                    ),
                    barn: lagInitiellFelt(restKompetanse.barn, erBarnGyldig),
                    søkersAktivitet: lagInitiellFelt(
                        restKompetanse.søkersAktivitet,
                        erSøkersAktivitetGyldig
                    ),
                    annenForeldersAktivitet: lagInitiellFelt(
                        restKompetanse.annenForeldersAktivitet,
                        erAnnenForeldersAktivitetGyldig
                    ),
                    barnetsBostedsland: lagInitiellFelt(
                        restKompetanse.barnetsBostedsland,
                        erBarnetsBostedslandGyldig
                    ),
                    primærland: lagInitiellFelt(restKompetanse.primærland, erPrimærlandGyldig),
                    sekundærland: lagInitiellFelt(
                        restKompetanse.sekundærland,
                        erSekundærlandGyldig
                    ),
                },
                validerKompetanse
            )
        );
    };

    const behandleHentetKompetanser = (response: Ressurs<IRestKompetanse[]>) => {
        settKompetanserRessurs(response);
        if (response.status === RessursStatus.SUKSESS) {
            settKompetanser(kjørValidering(mapFraRestKompetanseTilUi(response.data)));
        }
    };

    const hentKomeptanser = () => {
        settKompetanserRessurs(byggHenterRessurs());
        request<string, IRestKompetanse[]>({
            method: 'GET',
            url: `/familie-ba-sak/api/kompetanse/${åpenBehandling.behandlingId}`,
        }).then(response => behandleHentetKompetanser(response));
    };

    const hentKompetanserMedFeil = (): FeltState<IKompetanse>[] => {
        return kompetanser.filter(
            kompetanse => kompetanse.valideringsstatus !== Valideringsstatus.OK
        );
    };

    const putKompetanse = (
        redigerbartKompetanse: FeltState<IKompetanse>
    ): Promise<Ressurs<IRestKompetanse[]>> => {
        settKompetanseSubmit(KompetanseSubmit.PUT);

        return request<IRestKompetanse, IRestKompetanse[]>({
            method: 'PUT',
            url: `/familie-ba-sak/api/kompetanse/${åpenBehandling?.behandlingId}/${redigerbartKompetanse.verdi.id}`,
            data: {
                id: redigerbartKompetanse.verdi.id,
                behandlingId: redigerbartKompetanse.verdi.behandlingId,
                status: redigerbartKompetanse.verdi.status,
                fom: redigerbartKompetanse.verdi.periode.verdi.fom || '', // undefined fom vil bli stoppet i valideringen
                tom: redigerbartKompetanse.verdi.periode.verdi.tom,
                barn: redigerbartKompetanse.verdi.barn.verdi,
                søkersAktivitet: redigerbartKompetanse.verdi.søkersAktivitet.verdi,
                annenForeldersAktivitet: redigerbartKompetanse.verdi.annenForeldersAktivitet.verdi,
                barnetsBostedsland: redigerbartKompetanse.verdi.barnetsBostedsland.verdi,
                primærland: redigerbartKompetanse.verdi.primærland.verdi,
                sekundærland: redigerbartKompetanse.verdi.sekundærland.verdi,
            },
        });
    };

    const deleteKompetanse = (kompetanseId: number): Promise<Ressurs<IRestKompetanse[]>> => {
        settKompetanseSubmit(KompetanseSubmit.DELETE);

        return request<string, IRestKompetanse[]>({
            method: 'DELETE',
            url: `/familie-ba-sak/api/kompetanse/${åpenBehandling?.behandlingId}/${kompetanseId}`,
        });
    };

    return {
        kompetanser,
        kompetanserRessurs,
        hentKomeptanser,
        behandleHentetKompetanser,
        kompetanseSubmit,
        settKompetanseSubmit,
        putKompetanse,
        deleteKompetanse,
        erKompetanserGyldige,
        hentKompetanserMedFeil,
    };
});

export { KompetanseProvider, useKompetanse };
