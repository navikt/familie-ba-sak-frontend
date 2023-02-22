import { useEffect, useState } from 'react';

import constate from 'constate';

import { useHttp } from '@navikt/familie-http';
import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import type { Avhengigheter } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';
import type { Ressurs } from '@navikt/familie-typer';

import useSakOgBehandlingParams from '../hooks/useSakOgBehandlingParams';
import type { IBehandling } from '../typer/behandling';
import { Behandlingstype, BehandlingÅrsak } from '../typer/behandling';
import type { ISimuleringDTO, ISimuleringPeriode, ITilbakekreving } from '../typer/simulering';
import { Tilbakekrevingsvalg } from '../typer/simulering';
import {
    erFør,
    kalenderDato,
    kalenderDatoTilDate,
    kalenderDiff,
    TIDENES_MORGEN,
} from '../utils/kalender';

interface IProps {
    åpenBehandling: IBehandling;
}

const [SimuleringProvider, useSimulering] = constate(({ åpenBehandling }: IProps) => {
    const { request } = useHttp();
    const { fagsakId } = useSakOgBehandlingParams();
    const vedtak = åpenBehandling.vedtak;
    const [simuleringsresultat, settSimuleringresultat] = useState<Ressurs<ISimuleringDTO>>({
        status: RessursStatus.HENTER,
    });
    const [harÅpenTilbakekrevingRessurs, settHarÅpentTilbakekrevingRessurs] = useState<
        Ressurs<boolean>
    >({
        status: RessursStatus.HENTER,
    });
    const maksLengdeTekst = 1500;
    const beløpsgrenseForMigreringMedFeilutbetaling = 100;
    const mars2023 = '2023-03-01';

    useEffect(() => {
        request<IBehandling, ISimuleringDTO>({
            method: 'GET',
            url: `/familie-ba-sak/api/behandlinger/${åpenBehandling.behandlingId}/simulering`,
            påvirkerSystemLaster: true,
        }).then(response =>
            response.status === RessursStatus.SUKSESS
                ? settSimuleringresultat({
                      ...response,
                      data: {
                          ...response.data,
                          perioder: response.data.perioder.map(periode =>
                              settPeriodeTilIkkeUtbetaltOmForfallsdatoIkkePassert(
                                  periode,
                                  response.data.tidSimuleringHentet
                              )
                          ),
                      },
                  })
                : settSimuleringresultat(response)
        );
    }, [åpenBehandling]);

    useEffect(() => {
        if (erFeilutbetaling) {
            request<undefined, boolean>({
                method: 'GET',
                url: `/familie-ba-sak/api/fagsaker/${fagsakId}/har-apen-tilbakekreving`,
                påvirkerSystemLaster: true,
            }).then(response => {
                settHarÅpentTilbakekrevingRessurs(response);
            });
        }
    }, [fagsakId, simuleringsresultat]);

    const harÅpenTilbakekreving: boolean =
        harÅpenTilbakekrevingRessurs.status === RessursStatus.SUKSESS &&
        harÅpenTilbakekrevingRessurs.data;

    const simResultat =
        simuleringsresultat.status === RessursStatus.SUKSESS ? simuleringsresultat.data : undefined;
    const erFeilutbetaling = simResultat && simResultat.feilutbetaling > 0;
    const erEtterutbetaling = simResultat && simResultat.etterbetaling > 0;

    const erMigreringFraInfotrygd = åpenBehandling.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD;

    const skalStoppeISimulering = () => {
        if (åpenBehandling.årsak === BehandlingÅrsak.HELMANUELL_MIGRERING && simResultat) {
            const tidligereUtbetaltPerioderEtterbetalingOver220 = simResultat.perioder
                .filter(periode => erFør(kalenderDato(periode.fom), kalenderDato(mars2023)))
                .filter(periode => periode.etterbetaling && periode.etterbetaling > 220);
            return erFeilutbetaling || tidligereUtbetaltPerioderEtterbetalingOver220.length > 0;
        }
        return erFeilutbetaling || erEtterutbetaling;
    };
    const erMigreringMedStoppISimulering = erMigreringFraInfotrygd && skalStoppeISimulering();

    const erNegativeMånedsbeløpPåMaksEnKrone = (simPerioder: ISimuleringPeriode[]) =>
        simPerioder
            .filter(periode => erFør(kalenderDato(periode.fom), kalenderDato(mars2023)))
            .map(periode => periode.resultat || 0)
            .every(beløp => beløp <= 0 && beløp >= -1);

    const erMigreringMedFeilutbetalingInnenforBeløpsgrenser =
        erMigreringFraInfotrygd &&
        erFeilutbetaling &&
        simResultat?.feilutbetaling < beløpsgrenseForMigreringMedFeilutbetaling &&
        erNegativeMånedsbeløpPåMaksEnKrone(simResultat?.perioder);

    const tilbakekrevingsvalg = useFelt<Tilbakekrevingsvalg | undefined>({
        verdi: åpenBehandling.tilbakekreving?.valg,
        avhengigheter: {
            erMigreringMedStoppISimulering,
            erFeilutbetaling,
            harÅpenTilbakekreving,
        },
        skalFeltetVises: avhengigheter =>
            avhengigheter?.erFeilutbetaling && !avhengigheter?.harÅpenTilbakekreving,
        valideringsfunksjon: (felt, avhengigheter) =>
            !avhengigheter?.erMigreringMedStoppISimulering && felt.verdi === undefined
                ? feil(
                      felt,
                      'Resultatet medfører en feilutbetaling. Du må velge om det skal opprettes tilbakekrevingsbehandling.'
                  )
                : ok(felt),
    });
    const fritekstVarsel = useFelt<string>({
        verdi: åpenBehandling.tilbakekreving?.varsel ?? '',
        avhengigheter: {
            erMigreringMedStoppISimulering,
            tilbakekreving: tilbakekrevingsvalg,
            erFeilutbetaling,
            maksLengdeTekst,
        },
        valideringsfunksjon: (felt, avhengigheter) =>
            avhengigheter?.erFeilutbetaling &&
            avhengigheter?.tilbakekreving?.verdi ===
                Tilbakekrevingsvalg.OPPRETT_TILBAKEKREVING_MED_VARSEL &&
            felt.verdi === ''
                ? feil(felt, 'Du må skrive en fritekst for varselet til tilbakekrevingen.')
                : avhengigheter && felt.verdi.length > avhengigheter.maksLengdeTekst
                ? feil(
                      felt,
                      `Du har nådd maks antall tegn i varselbrevet: 1 500. Prøv å forkorte/forenkle teksten.`
                  )
                : ok(felt),
        skalFeltetVises: (avhengigheter: Avhengigheter) =>
            !avhengigheter?.erMigreringMedStoppISimulering &&
            avhengigheter?.erFeilutbetaling &&
            avhengigheter?.tilbakekreving?.verdi ===
                Tilbakekrevingsvalg.OPPRETT_TILBAKEKREVING_MED_VARSEL,
    });
    const begrunnelse = useFelt<string>({
        verdi: åpenBehandling.tilbakekreving?.begrunnelse ?? '',
        avhengigheter: {
            erMigreringMedStoppISimulering,
            erFeilutbetaling,
            maksLengdeTekst: maksLengdeTekst,
            harÅpenTilbakekreving,
        },
        skalFeltetVises: avhengigheter =>
            !avhengigheter?.erMigreringMedStoppISimulering &&
            avhengigheter?.erFeilutbetaling &&
            !avhengigheter?.harÅpenTilbakekreving,
        valideringsfunksjon: (felt, avhengigheter) =>
            felt.verdi === ''
                ? feil(felt, 'Du må skrive en begrunnelse for valget om tilbakekreving.')
                : avhengigheter && felt.verdi.length > avhengigheter.maksLengdeTekst
                ? feil(
                      felt,
                      `Du har nådd maks antall tegn i begrunnelsen: 1 500. Prøv å forkorte/forenkle teksten.`
                  )
                : ok(felt),
    });

    const {
        skjema: tilbakekrevingSkjema,
        hentFeilTilOppsummering,
        onSubmit,
    } = useSkjema<
        {
            tilbakekrevingsvalg: Tilbakekrevingsvalg | undefined;
            fritekstVarsel: string;
            begrunnelse: string;
        },
        IBehandling
    >({
        felter: { tilbakekrevingsvalg, fritekstVarsel, begrunnelse },
        skjemanavn: 'Opprett tilbakekreving',
    });

    const hentSkjemadata = (): ITilbakekreving | undefined => {
        return tilbakekrevingSkjema.felter.tilbakekrevingsvalg.verdi && vedtak
            ? {
                  vedtakId: vedtak?.id,
                  valg: tilbakekrevingSkjema.felter.tilbakekrevingsvalg.verdi,
                  begrunnelse: tilbakekrevingSkjema.felter.begrunnelse.verdi,
                  varsel: tilbakekrevingSkjema.felter.fritekstVarsel.erSynlig
                      ? tilbakekrevingSkjema.felter.fritekstVarsel.verdi
                      : undefined,
              }
            : undefined;
    };

    function settPeriodeTilIkkeUtbetaltOmForfallsdatoIkkePassert(
        periode: ISimuleringPeriode,
        tidSimuleringHentet: string | undefined
    ): ISimuleringPeriode {
        if (
            periode.resultat === 0 &&
            kalenderDiff(
                kalenderDatoTilDate(
                    periode.forfallsdato ? kalenderDato(periode.forfallsdato) : TIDENES_MORGEN
                ),
                kalenderDatoTilDate(
                    tidSimuleringHentet ? kalenderDato(tidSimuleringHentet) : TIDENES_MORGEN
                )
            ) > 0
        ) {
            return {
                ...periode,
                tidligereUtbetalt: 0,
                resultat: periode.nyttBeløp,
            };
        }
        return periode;
    }

    return {
        simuleringsresultat,
        tilbakekrevingSkjema,
        onSubmit,
        hentFeilTilOppsummering,
        erFeilutbetaling,
        hentSkjemadata,
        maksLengdeTekst,
        harÅpenTilbakekrevingRessurs,
        erMigreringMedStoppISimulering,
        erMigreringMedFeilutbetalingInnenforBeløpsgrenser,
    };
});

export { SimuleringProvider, useSimulering };
