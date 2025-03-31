import React, { createContext, useContext, useEffect, useState } from 'react';

import { isAfter, isBefore } from 'date-fns';

import { useHttp, type FamilieRequestConfig } from '@navikt/familie-http';
import type { Avhengigheter, FeiloppsummeringFeil, ISkjema } from '@navikt/familie-skjema';
import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import useSakOgBehandlingParams from '../hooks/useSakOgBehandlingParams';
import type { IBehandling } from '../typer/behandling';
import { Behandlingstype, BehandlingÅrsak } from '../typer/behandling';
import { PersonType } from '../typer/person';
import type { ISimuleringDTO, ISimuleringPeriode, ITilbakekreving } from '../typer/simulering';
import { Tilbakekrevingsvalg } from '../typer/simulering';
import { isoStringTilDate, isoStringTilDateMedFallback, tidenesMorgen } from '../utils/dato';

interface IProps extends React.PropsWithChildren {
    åpenBehandling: IBehandling;
}

interface ITilbakekrevingsskjema {
    tilbakekrevingsvalg: Tilbakekrevingsvalg | undefined;
    fritekstVarsel: string;
    begrunnelse: string;
}

interface ISimuleringContext {
    simuleringsresultat: Ressurs<ISimuleringDTO>;
    tilbakekrevingSkjema: ISkjema<ITilbakekrevingsskjema, IBehandling>;
    onSubmit: <SkjemaData>(
        requestConfig: FamilieRequestConfig<SkjemaData>,
        onSuccess: (ressurs: Ressurs<IBehandling>) => void,
        onError?: (ressurs: Ressurs<IBehandling>) => void
    ) => void;
    hentFeilTilOppsummering: () => FeiloppsummeringFeil[];
    erFeilutbetaling: boolean | undefined;
    erAvregning: boolean | undefined;
    hentSkjemadata: () => ITilbakekreving | undefined;
    maksLengdeTekst: number;
    harÅpenTilbakekrevingRessurs: Ressurs<boolean>;
    erMigreringFraInfotrygdMedAvvik: boolean;
    behandlingErMigreringMedAvvikInnenforBeløpsgrenser: boolean;
    behandlingErMigreringMedAvvikUtenforBeløpsgrenser: boolean;
    behandlingErMigreringMedManuellePosteringer: boolean | undefined;
    behandlingErMigreringFraInfotrygdMedKun0Utbetalinger: boolean;
    behandlingErEndreMigreringsdato: boolean;
}

const SimuleringContext = createContext<ISimuleringContext | undefined>(undefined);

export const SimuleringProvider = ({ åpenBehandling, children }: IProps) => {
    const { request } = useHttp();
    const { fagsakId } = useSakOgBehandlingParams();
    const vedtak = åpenBehandling.vedtak;
    const personerMedAndelerTilkjentYtelse = åpenBehandling.personerMedAndelerTilkjentYtelse;
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
            isBefore(isoStringTilDate(periode.fom), isoStringTilDate(mars2023))
        ) || [];
    const perioderesultaterFørMars2023 = simPerioderFørMars2023.map(
        periode => periode.resultat || 0
    );
    const totalEtterbetalingFørMars2023 = simPerioderFørMars2023.reduce(
        (acc, periode) => acc + (periode.etterbetaling || 0),
        0
    );

    const erAvregning = simResultat && simResultat.avregningsperioder.length > 0;
    const erFeilutbetaling = simResultat && simResultat.feilutbetaling > 0;
    const erEtterutbetaling = totalEtterbetalingFørMars2023 > 0;

    const erMigreringFraInfotrygd = åpenBehandling.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD;

    const erAvvikISimuleringForBehandling = erFeilutbetaling || erEtterutbetaling;

    const erMigreringFraInfotrygdMedAvvik =
        erMigreringFraInfotrygd && erAvvikISimuleringForBehandling;

    const behandlingHarManuellePosteringer = simResultat?.perioder.some(
        periode => periode.manuellPostering && periode.manuellPostering > 0
    );

    const behandlingErMigreringFraInfotrygdMedKun0Utbetalinger =
        erMigreringFraInfotrygd &&
        !personerMedAndelerTilkjentYtelse.some(
            personMedAndelerTilkjentYtelse => personMedAndelerTilkjentYtelse.beløp !== 0
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
        erMigreringFraInfotrygd && behandlingHarManuellePosteringer;

    const behandlingErEndreMigreringsdato =
        åpenBehandling.årsak === BehandlingÅrsak.ENDRE_MIGRERINGSDATO;

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
    } = useSkjema<ITilbakekrevingsskjema, IBehandling>({
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
            isAfter(
                isoStringTilDateMedFallback({
                    isoString: periode.forfallsdato,
                    fallbackDate: tidenesMorgen,
                }),
                isoStringTilDateMedFallback({
                    isoString: tidSimuleringHentet,
                    fallbackDate: tidenesMorgen,
                })
            )
        ) {
            return {
                ...periode,
                tidligereUtbetalt: 0,
                resultat: periode.nyttBeløp,
            };
        }
        return periode;
    }

    return (
        <SimuleringContext.Provider
            value={{
                simuleringsresultat,
                tilbakekrevingSkjema,
                onSubmit,
                hentFeilTilOppsummering,
                erFeilutbetaling,
                erAvregning,
                hentSkjemadata,
                maksLengdeTekst,
                harÅpenTilbakekrevingRessurs,
                erMigreringFraInfotrygdMedAvvik,
                behandlingErMigreringMedAvvikInnenforBeløpsgrenser,
                behandlingErMigreringMedAvvikUtenforBeløpsgrenser,
                behandlingErMigreringMedManuellePosteringer,
                behandlingErMigreringFraInfotrygdMedKun0Utbetalinger,
                behandlingErEndreMigreringsdato,
            }}
        >
            {children}
        </SimuleringContext.Provider>
    );
};

export const useSimuleringContext = () => {
    const context = useContext(SimuleringContext);

    if (context === undefined) {
        throw new Error('useSimuleringContext må brukes innenfor en SimuleringProvider');
    }

    return context;
};
