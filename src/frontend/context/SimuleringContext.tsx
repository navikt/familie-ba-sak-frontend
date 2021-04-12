import { useEffect, useState } from 'react';

import constate from 'constate';
import dayjs from 'dayjs';

import { useHttp } from '@navikt/familie-http';
import { useSkjema, useFelt, feil, ok, Avhengigheter } from '@navikt/familie-skjema';
import { RessursStatus, Ressurs } from '@navikt/familie-typer';

import { aktivVedtakPåBehandling } from '../api/fagsak';
import { IBehandling } from '../typer/behandling';
import { IFagsak } from '../typer/fagsak';
import { ISimuleringPeriode, ISimuleringDTO, TilbakekrevingAlternativ } from '../typer/simulering';
import { ToggleNavn } from '../typer/toggles';
import familieDayjs from '../utils/familieDayjs';
import { useApp } from './AppContext';

interface IProps {
    åpenBehandling: IBehandling;
}

const [SimuleringProvider, useSimulering] = constate(({ åpenBehandling }: IProps) => {
    const { request } = useHttp();
    const aktivtVedtak = aktivVedtakPåBehandling(åpenBehandling);
    const [simuleringsresultat, settSimuleringresultat] = useState<Ressurs<ISimuleringDTO>>({
        status: RessursStatus.HENTER,
    });
    const { toggles } = useApp();

    useEffect(() => {
        request<IBehandling, ISimuleringDTO>({
            method: 'GET',
            url: `/familie-ba-sak/api/simulering/${aktivtVedtak?.id}`,
            påvirkerSystemLaster: true,
        }).then(response => {
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

        let aktuellPeriode = førstePeriode;
        for (let i = 0; i < dayjs(sistePeriode).diff(dayjs(førstePeriode), 'M'); i++) {
            aktuellPeriode = familieDayjs(aktuellPeriode).add(1, 'M').format();
            if (!fomDatoer.includes(aktuellPeriode)) {
                perioder.push({
                    fom: aktuellPeriode,
                    tom: '',
                });
            }
        }
        perioder.sort((a, b) => (dayjs(a.fom).isAfter(dayjs(b.fom)) ? 1 : -1));
        return perioder;
    };

    const hentÅrISimuleringen = (perioder: ISimuleringPeriode[]): number[] =>
        [...new Set(perioder.map(periode => dayjs(periode.fom).year()))].sort();

    const tilbakekrevingErToggletPå = toggles[ToggleNavn.tilbakekreving];

    const erFeilutbetaling =
        simuleringsresultat.status === RessursStatus.SUKSESS &&
        simuleringsresultat.data.feilutbetaling > 0;

    const tilbakekreving = useFelt<TilbakekrevingAlternativ | undefined>({
        verdi: undefined,
        avhengigheter: { tilbakekrevingErToggletPå, erFeilutbetaling },
        skalFeltetVises: avhengigheter =>
            avhengigheter?.tilbakekrevingErToggletPå && avhengigheter?.erFeilutbetaling,
        valideringsfunksjon: felt =>
            felt.verdi === undefined
                ? feil(
                      felt,
                      'Resultatet medfører en feilutbetaling. Du må velge om det skal opprettes tilbakekrevingsbehandling.'
                  )
                : ok(felt),
    });
    const fritekstVarsel = useFelt<string>({
        verdi: '',
        avhengigheter: { tilbakekrevingErToggletPå, tilbakekreving, erFeilutbetaling },
        valideringsfunksjon: (felt, avhengigheter) =>
            avhengigheter?.erFeilutbetaling &&
            avhengigheter?.tilbakekreving?.verdi === TilbakekrevingAlternativ.OPPRETT_SEND_VARSEL &&
            felt.verdi === ''
                ? feil(felt, 'Du må skrive en fritekst for varselet til tilbakekrevingen.')
                : ok(felt),
        skalFeltetVises: (avhengigheter: Avhengigheter) =>
            avhengigheter?.tilbakekrevingErToggletPå &&
            avhengigheter?.erFeilutbetaling &&
            avhengigheter?.tilbakekreving?.verdi === TilbakekrevingAlternativ.OPPRETT_SEND_VARSEL,
    });
    const begrunnelse = useFelt<string>({
        verdi: '',
        avhengigheter: { erFeilutbetaling, tilbakekrevingErToggletPå },
        skalFeltetVises: avhengigheter =>
            avhengigheter?.tilbakekrevingErToggletPå && avhengigheter?.erFeilutbetaling,
        valideringsfunksjon: felt =>
            felt.verdi === ''
                ? feil(felt, 'Du må skrive en begrunnelse for valget om tilbakekreving.')
                : ok(felt),
    });

    const { skjema, hentFeilTilOppsummering, onSubmit } = useSkjema<
        {
            tilbakekreving: TilbakekrevingAlternativ | undefined;
            fritekstVarsel: string;
            begrunnelse: string;
        },
        IFagsak
    >({
        felter: { tilbakekreving, fritekstVarsel, begrunnelse },
        skjemanavn: 'Du må skrive en bgrunnelse for tilbakekreving',
    });

    return {
        simuleringsresultat,
        hentPerioderMedTommePerioder: hentPeriodelisteMedTommePerioder,
        hentÅrISimuleringen,
        skjema,
        onSubmit,
        hentFeilTilOppsummering,
        tilbakekrevingErToggletPå,
        erFeilutbetaling,
    };
});

export { SimuleringProvider, useSimulering };
