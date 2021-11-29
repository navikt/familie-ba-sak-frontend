import { useEffect, useState } from 'react';

import constate from 'constate';

import { useHttp } from '@navikt/familie-http';
import { useSkjema, useFelt, feil, ok, Avhengigheter } from '@navikt/familie-skjema';
import { RessursStatus, Ressurs } from '@navikt/familie-typer';

import useSakOgBehandlingParams from '../hooks/useSakOgBehandlingParams';
import { Behandlingstype, IBehandling } from '../typer/behandling';
import {
    ISimuleringDTO,
    Tilbakekrevingsvalg,
    ITilbakekreving,
    ISimuleringPeriode,
} from '../typer/simulering';
import { kalenderDato, kalenderDatoTilDate, kalenderDiff, TIDENES_MORGEN } from '../utils/kalender';

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

    useEffect(() => {
        request<IBehandling, ISimuleringDTO>({
            method: 'GET',
            url: `/familie-ba-sak/api/behandlinger/${åpenBehandling.behandlingId}/simulering`,
            påvirkerSystemLaster: true,
        }).then(response => {
            if (response.status === RessursStatus.SUKSESS) {
                const tidSimuleringHentet = response.data.tidSimuleringHentet;

                response.data.perioder.map((periode: ISimuleringPeriode) => {
                    return settPeriodeTilIkkeUtbetaltOmForfallsdatoIkkePassert(
                        periode,
                        tidSimuleringHentet
                    );
                });
            }

            settSimuleringresultat(response);
        });
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

    const erFeilutbetaling =
        simuleringsresultat.status === RessursStatus.SUKSESS &&
        simuleringsresultat.data.feilutbetaling > 0;
    const erEtterutbetaling =
        simuleringsresultat.status === RessursStatus.SUKSESS &&
        simuleringsresultat.data.etterbetaling > 0;

    const erMigreringFraInfotrygd = åpenBehandling.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD;
    const erMigreringMedEtterEllerFeilutbetaling =
        erMigreringFraInfotrygd && (erFeilutbetaling || erEtterutbetaling);

    const tilbakekrevingsvalg = useFelt<Tilbakekrevingsvalg | undefined>({
        verdi: åpenBehandling.tilbakekreving?.valg,
        avhengigheter: {
            erMigreringMedEtterEllerFeilutbetaling,
            erFeilutbetaling,
            harÅpenTilbakekreving,
        },
        skalFeltetVises: avhengigheter =>
            avhengigheter?.erFeilutbetaling && !avhengigheter?.harÅpenTilbakekreving,
        valideringsfunksjon: (felt, avhengigheter) =>
            !avhengigheter?.erMigreringMedEtterEllerFeilutbetaling && felt.verdi === undefined
                ? feil(
                      felt,
                      'Resultatet medfører en feilutbetaling. Du må velge om det skal opprettes tilbakekrevingsbehandling.'
                  )
                : ok(felt),
    });
    const fritekstVarsel = useFelt<string>({
        verdi: åpenBehandling.tilbakekreving?.varsel ?? '',
        avhengigheter: {
            erMigreringMedEtterEllerFeilutbetaling,
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
            !avhengigheter?.erMigreringMedEtterEllerFeilutbetaling &&
            avhengigheter?.erFeilutbetaling &&
            avhengigheter?.tilbakekreving?.verdi ===
                Tilbakekrevingsvalg.OPPRETT_TILBAKEKREVING_MED_VARSEL,
    });
    const begrunnelse = useFelt<string>({
        verdi: åpenBehandling.tilbakekreving?.begrunnelse ?? '',
        avhengigheter: {
            erMigreringMedEtterEllerFeilutbetaling,
            erFeilutbetaling,
            maksLengdeTekst: maksLengdeTekst,
            harÅpenTilbakekreving,
        },
        skalFeltetVises: avhengigheter =>
            !avhengigheter.erMigreringMedEtterEllerFeilutbetaling &&
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
    ) {
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
            periode.tidligereUtbetalt = 0;
            periode.resultat = periode.nyttBeløp;
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
        erMigreringMedEtterEllerFeilutbetaling,
    };
});

export { SimuleringProvider, useSimulering };
