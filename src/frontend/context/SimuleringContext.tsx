import { useEffect, useState } from 'react';

import constate from 'constate';
import dayjs from 'dayjs';

import { useHttp } from '@navikt/familie-http';
import { RessursStatus, Ressurs } from '@navikt/familie-typer';

import { aktivVedtakPåBehandling } from '../api/fagsak';
import { IBehandling } from '../typer/behandling';
import { ISimuleringPeriode, ISimuleringDTO } from '../typer/simulering';
import familieDayjs from '../utils/familieDayjs';

interface IProps {
    åpenBehandling: IBehandling;
}

const [SimuleringProvider, useSimulering] = constate(({ åpenBehandling }: IProps) => {
    const { request } = useHttp();
    const aktivtVedtak = aktivVedtakPåBehandling(åpenBehandling);
    const [simuleringResultat, settSimuleringResultat] = useState<Ressurs<ISimuleringDTO>>({
        status: RessursStatus.HENTER,
    });

    useEffect(() => {
        request<IBehandling, ISimuleringDTO>({
            method: 'GET',
            url: `/familie-ba-sak/api/simulering/${aktivtVedtak?.id}`,
        }).then(response => {
            settSimuleringResultat(response);
        });
    }, [aktivtVedtak]);

    const hentPeriodelisteMedTommePerioder = (
        perioder: ISimuleringPeriode[]
    ): ISimuleringPeriode[] => {
        const fomDatoer = perioder
            .map(periode => periode.fom)
            .sort((a, b) => (dayjs(a).isAfter(dayjs(b)) ? 1 : -1));
        const førstePeriode = fomDatoer[0];
        const sistePeriode = fomDatoer[-1];

        let aktuelPeriode = førstePeriode;
        for (let i = 0; i < dayjs(sistePeriode).diff(dayjs(førstePeriode), 'M'); i++) {
            aktuelPeriode = familieDayjs(aktuelPeriode).add(1, 'M').format();
            if (!fomDatoer.includes(aktuelPeriode)) {
                perioder.push({
                    fom: aktuelPeriode,
                    tom: '',
                });
            }
        }
        perioder.sort((a, b) => (dayjs(a.fom).isAfter(dayjs(b.fom)) ? 1 : -1));
        return perioder;
    };

    const hentÅrISimuleringen = (perioder: ISimuleringPeriode[]): number[] =>
        [...new Set(perioder.map(periode => dayjs(periode.fom).year()))].sort();

    return {
        simuleringResultat,
        hentPerioderMedTommePerioder: hentPeriodelisteMedTommePerioder,
        hentÅrISimuleringen,
    };
});

export { SimuleringProvider, useSimulering };
