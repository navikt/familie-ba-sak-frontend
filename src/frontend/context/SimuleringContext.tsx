import { useEffect, useState } from 'react';

import constate from 'constate';

import { useHttp } from '@navikt/familie-http';
import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import type { Avhengigheter } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';
import type { Ressurs } from '@navikt/familie-typer';

import useSakOgBehandlingParams from '../hooks/useSakOgBehandlingParams';
import type { IBehandling } from '../typer/behandling';
import { Behandlingstype } from '../typer/behandling';
import { PersonType } from '../typer/person';
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
    const maksgrenseForAvvikIBeløpVedMigrering = 100;
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
    const simPerioderFørMars2023 =
        simResultat?.perioder.filter(periode =>
            erFør(kalenderDato(periode.fom), kalenderDato(mars2023))
        ) || [];
    const perioderesultaterFørMars2023 = simPerioderFørMars2023.map(
        periode => periode.resultat || 0
    );
    const totalEtterbetalingFørMars2023 = simPerioderFørMars2023.reduce(
        (acc, periode) => acc + (periode.etterbetaling || 0),
        0
    );

    const erFeilutbetaling = simResultat && simResultat.feilutbetaling > 0;
    const erEtterutbetaling = totalEtterbetalingFørMars2023 > 0;

    const erMigreringFraInfotrygd = åpenBehandling.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD;

    const erAvvikISimuleringForBehandling = erFeilutbetaling || erEtterutbetaling;

    const erMigreringFraInfotrygdMedAvvik =
        erMigreringFraInfotrygd && erAvvikISimuleringForBehandling;

    const harManuellePosteringer = simResultat?.perioder.some(
        periode => periode.manuellPostering && periode.manuellPostering > 0
    );

    const harMaks1KroneIAvvikPerBarn = (perioderesultater: number[]) => {
        const antallBarn = åpenBehandling.personer.filter(
            person => person.type === PersonType.BARN
        ).length;
        return perioderesultater.every(beløp => Math.abs(beløp) <= antallBarn);
    };

    const harTotaltAvvikUnderBeløpsgrense = (perioderesultater: number[]) => {
        const totaltAvvik = Math.abs(perioderesultater.reduce((acc, val) => acc + val, 0));
        return totaltAvvik <= maksgrenseForAvvikIBeløpVedMigrering;
    };

    const behandlingErMigreringMedAvvikInnenforBeløpsgrenser =
        erMigreringFraInfotrygdMedAvvik &&
        harMaks1KroneIAvvikPerBarn(perioderesultaterFørMars2023) &&
        harTotaltAvvikUnderBeløpsgrense(perioderesultaterFørMars2023);

    const behandlingErMigreringMedAvvikUtenforBeløpsgrenser =
        erMigreringFraInfotrygdMedAvvik && !behandlingErMigreringMedAvvikInnenforBeløpsgrenser;

    const behandlingErMigreringMedManuellePosteringer =
        erMigreringFraInfotrygd && harManuellePosteringer;

    const tilbakekrevingsvalg = useFelt<Tilbakekrevingsvalg | undefined>({
        verdi: åpenBehandling.tilbakekreving?.valg,
        avhengigheter: {
            erMigreringFraInfotrygdMedAvvik,
            erFeilutbetaling,
            harÅpenTilbakekreving,
        },
        skalFeltetVises: avhengigheter =>
            avhengigheter?.erFeilutbetaling && !avhengigheter?.harÅpenTilbakekreving,
        valideringsfunksjon: felt =>
            felt.verdi === undefined
                ? feil(
                      felt,
                      'Resultatet medfører en feilutbetaling. Du må velge om det skal opprettes tilbakekrevingsbehandling.'
                  )
                : ok(felt),
    });
    const fritekstVarsel = useFelt<string>({
        verdi: åpenBehandling.tilbakekreving?.varsel ?? '',
        avhengigheter: {
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
            avhengigheter?.erFeilutbetaling &&
            avhengigheter?.tilbakekreving?.verdi ===
                Tilbakekrevingsvalg.OPPRETT_TILBAKEKREVING_MED_VARSEL,
    });
    const begrunnelse = useFelt<string>({
        verdi: åpenBehandling.tilbakekreving?.begrunnelse ?? '',
        avhengigheter: {
            erFeilutbetaling,
            maksLengdeTekst: maksLengdeTekst,
            harÅpenTilbakekreving,
        },
        skalFeltetVises: avhengigheter =>
            avhengigheter?.erFeilutbetaling && !avhengigheter?.harÅpenTilbakekreving,
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
        erMigreringFraInfotrygdMedAvvik,
        behandlingErMigreringMedAvvikInnenforBeløpsgrenser,
        behandlingErMigreringMedAvvikUtenforBeløpsgrenser,
        behandlingErMigreringMedManuellePosteringer,
    };
});

export { SimuleringProvider, useSimulering };
