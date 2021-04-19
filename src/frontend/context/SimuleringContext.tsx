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
    const [simuleringsresultat, settSimuleringresultat] = useState<Ressurs<ISimuleringDTO>>({
        status: RessursStatus.HENTER,
    });

    useEffect(() => {
        request<IBehandling, ISimuleringDTO>({
            method: 'GET',
            url: `/familie-ba-sak/api/simulering/${aktivtVedtak?.id}`,
        }).then(response => {
            console.log('setter resultat');
            settSimuleringresultat(response);
        });
    }, [aktivtVedtak]);

    const hentPeriodelisteMedTommePerioder = (
        perioder: ISimuleringPeriode[]
    ): ISimuleringPeriode[] => {
        const fomDatoer = perioder
            .map(periode => periode.fom)
            .sort((a, b) => (dayjs(a).isAfter(dayjs(b)) ? 1 : -1));
        const førstePeriode = fomDatoer[0];
        const sistePeriode = fomDatoer[fomDatoer.length - 1];
        console.log('---henter---');
        console.log('fomDatoer: ' + fomDatoer);
        let aktuellPeriode = førstePeriode;
        for (let i = 0; i < dayjs(sistePeriode).diff(dayjs(førstePeriode), 'M'); i++) {
            aktuellPeriode = familieDayjs(aktuellPeriode).add(1, 'M').format();
            if (!fomDatoer.includes(aktuellPeriode)) {
                console.log('Fant ikke aktuellPeriode: ' + aktuellPeriode);
                perioder.push({
                    fom: aktuellPeriode,
                    tom: '',
                });
            } else {
                console.log('Fant: ' + aktuellPeriode);
            }
        }
        /*
        Foreslått løsning:

        console.log('----henter----');
        const sortertePerioder = perioder
            .map(periode => familieDayjs(periode.fom))
            .sort((a, b) => (a.isAfter(b) ? 1 : -1));
        const førstePeriode = sortertePerioder[0];
        const sistePeriode = sortertePerioder[sortertePerioder.length - 1];

        let aktuellPeriode = førstePeriode;
        for (let i = 0; i < sistePeriode.diff(førstePeriode, 'M'); i++) {
            aktuellPeriode = aktuellPeriode.add(1, 'M');
            // eslint-disable-next-line
            const periodeISimulering = sortertePerioder.filter(
                // eslint-disable-next-line
                dato =>
                    // eslint-disable-next-line
                    aktuellPeriode.month() === dato.month() && aktuellPeriode.year() === dato.year()
            );
            console.log(
                aktuellPeriode.month() +
                    '/' +
                    aktuellPeriode.year() +
                    ' ' +
                    periodeISimulering.length
            );
            if (periodeISimulering.length === 0) {
                //console.log('tom ', periodeISimulering);
                perioder.push({
                    fom: aktuellPeriode.format(),
                    tom: '',
                });
            } else {
                //console.log('ikke tom ', periodeISimulering);
            }
        }
        
         */

        perioder.sort((a, b) => (dayjs(a.fom).isAfter(dayjs(b.fom)) ? 1 : -1));
        return perioder;
    };

    const hentÅrISimuleringen = (perioder: ISimuleringPeriode[]): number[] =>
        [...new Set(perioder.map(periode => dayjs(periode.fom).year()))].sort();

    return {
        simuleringsresultat,
        hentPerioderMedTommePerioder: hentPeriodelisteMedTommePerioder,
        hentÅrISimuleringen,
    };
});

export { SimuleringProvider, useSimulering };
