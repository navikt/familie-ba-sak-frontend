import React from 'react';

import { useHttp } from '@navikt/familie-http';
import { useFelt, useSkjema } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import { byggTomRessurs, RessursStatus } from '@navikt/familie-typer';

import {
    erAnnenForeldersAktivitetGyldig,
    erAnnenForeldersAktivitetslandGyldig,
    erBarnetsBostedslandGyldig,
    erKompetanseResultatGyldig,
    erSøkersAktivitetGyldig,
    erSøkersAktivitetslandGyldig,
} from './valideringKompetanse';
import { useBehandling } from '../../../../../../../context/behandlingContext/BehandlingContext';
import type { IBehandling } from '../../../../../../../typer/behandling';
import type { OptionType } from '../../../../../../../typer/common';
import type {
    EøsPeriodeStatus,
    IKompetanse,
    IRestKompetanse,
    KompetanseAktivitet,
    KompetanseResultat,
} from '../../../../../../../typer/eøsPerioder';
import type { IIsoMånedPeriode } from '../../../../../../../utils/dato';
import { nyIsoMånedPeriode } from '../../../../../../../utils/dato';
import { erBarnGyldig, erEøsPeriodeGyldig } from '../../../../../../../utils/eøsValidators';

export const kompetanseFeilmeldingId = (kompetanse: IRestKompetanse): string =>
    `kompetanse_${kompetanse.barnIdenter.map(barn => `${barn}-`)}_${kompetanse.fom}`;

interface IProps {
    kompetanse: IRestKompetanse;
    barnIKompetanse: OptionType[];
}

const useKompetansePeriodeSkjema = ({ barnIKompetanse, kompetanse }: IProps) => {
    const [erKompetanseEkspandert, settErKompetanseEkspandert] = React.useState<boolean>(false);
    const { behandling, settÅpenBehandling } = useBehandling();
    const { request } = useHttp();

    const initelFom = useFelt<string>({ verdi: kompetanse.fom });
    const annenForeldersAktivitet = useFelt<KompetanseAktivitet | undefined>({
        verdi: kompetanse.annenForeldersAktivitet,
        valideringsfunksjon: erAnnenForeldersAktivitetGyldig,
    });

    const søkersAktivitet = useFelt<KompetanseAktivitet | undefined>({
        verdi: kompetanse.søkersAktivitet,
        valideringsfunksjon: erSøkersAktivitetGyldig,
    });
    const {
        skjema,
        valideringErOk,
        kanSendeSkjema,
        onSubmit,
        nullstillSkjema,
        settSubmitRessurs,
        settVisfeilmeldinger,
    } = useSkjema<IKompetanse, IBehandling>({
        felter: {
            periodeId: useFelt<string>({
                verdi: kompetanseFeilmeldingId(kompetanse),
            }),
            id: useFelt<number>({ verdi: kompetanse.id }),
            status: useFelt<EøsPeriodeStatus>({ verdi: kompetanse.status }),
            initielFom: initelFom,
            barnIdenter: useFelt<OptionType[]>({
                verdi: barnIKompetanse,
                valideringsfunksjon: erBarnGyldig,
            }),
            periode: useFelt<IIsoMånedPeriode>({
                verdi: nyIsoMånedPeriode(kompetanse.fom, kompetanse.tom),
                avhengigheter: { initelFom },
                valideringsfunksjon: erEøsPeriodeGyldig,
            }),
            søkersAktivitet: søkersAktivitet,
            søkersAktivitetsland: useFelt<string | undefined>({
                verdi: kompetanse.søkersAktivitetsland,
                avhengigheter: { søkersAktivitet },
                valideringsfunksjon: erSøkersAktivitetslandGyldig,
            }),
            annenForeldersAktivitet: annenForeldersAktivitet,
            annenForeldersAktivitetsland: useFelt<string | undefined>({
                verdi: kompetanse.annenForeldersAktivitetsland,
                avhengigheter: { annenForeldersAktivitet },
                valideringsfunksjon: erAnnenForeldersAktivitetslandGyldig,
            }),
            barnetsBostedsland: useFelt<string | undefined>({
                verdi: kompetanse.barnetsBostedsland,
                valideringsfunksjon: erBarnetsBostedslandGyldig,
            }),
            resultat: useFelt<KompetanseResultat | undefined>({
                verdi: kompetanse.resultat,
                valideringsfunksjon: erKompetanseResultatGyldig,
            }),
        },
        skjemanavn: kompetanseFeilmeldingId(kompetanse),
    });

    const sendInnSkjema = () => {
        if (kanSendeSkjema()) {
            settSubmitRessurs(byggTomRessurs());
            settVisfeilmeldinger(false);
            onSubmit(
                {
                    method: 'PUT',
                    data: {
                        id: kompetanse.id,
                        fom: skjema.felter.periode.verdi.fom || '', // undefined fom vil bli stoppet i valideringen
                        tom: skjema.felter.periode.verdi.tom,
                        barnIdenter: skjema.felter.barnIdenter.verdi.map(barn => barn.value),
                        søkersAktivitet: skjema.felter.søkersAktivitet.verdi,
                        søkersAktivitetsland: skjema.felter.søkersAktivitetsland.verdi,
                        annenForeldersAktivitet: skjema.felter.annenForeldersAktivitet.verdi,
                        annenForeldersAktivitetsland:
                            skjema.felter.annenForeldersAktivitetsland.verdi,
                        barnetsBostedsland: skjema.felter.barnetsBostedsland.verdi,
                        resultat: skjema.felter.resultat.verdi,
                        erAnnenForelderOmfattetAvNorskLovgivning:
                            kompetanse.erAnnenForelderOmfattetAvNorskLovgivning,
                    },
                    url: `/familie-ba-sak/api/kompetanse/${behandling.behandlingId}`,
                },
                (response: Ressurs<IBehandling>) => {
                    if (response.status === RessursStatus.SUKSESS) {
                        nullstillSkjema();
                        settErKompetanseEkspandert(false);
                        settÅpenBehandling(response);
                    }
                }
            );
        }
    };

    const slettKompetanse = () => {
        settSubmitRessurs(byggTomRessurs());
        settVisfeilmeldinger(false);
        request<void, IBehandling>({
            method: 'DELETE',
            url: `/familie-ba-sak/api/kompetanse/${behandling.behandlingId}/${kompetanse.id}`,
        }).then((response: Ressurs<IBehandling>) => {
            if (response.status === RessursStatus.SUKSESS) {
                nullstillSkjema();
                settErKompetanseEkspandert(false);
                settÅpenBehandling(response);
            } else {
                settSubmitRessurs(response);
                settVisfeilmeldinger(true);
            }
        });
    };

    const erKompetanseSkjemaEndret = () => {
        const barnFjernetISkjema = kompetanse.barnIdenter.filter(
            barn => !skjema.felter.barnIdenter.verdi.some(ident => ident.value === barn)
        );
        const erTomEndret =
            !(skjema.felter.periode.verdi.tom === undefined && kompetanse.tom === null) &&
            skjema.felter.periode?.verdi.tom !== kompetanse.tom;
        return (
            barnFjernetISkjema.length > 0 ||
            skjema.felter.periode?.verdi.fom !== kompetanse.fom ||
            erTomEndret ||
            skjema.felter.søkersAktivitet?.verdi !== kompetanse.søkersAktivitet ||
            skjema.felter.annenForeldersAktivitet?.verdi !== kompetanse.annenForeldersAktivitet ||
            skjema.felter.annenForeldersAktivitetsland?.verdi !==
                kompetanse.annenForeldersAktivitetsland ||
            skjema.felter.barnetsBostedsland?.verdi !== kompetanse.barnetsBostedsland ||
            skjema.felter.søkersAktivitetsland?.verdi !== kompetanse.søkersAktivitetsland
        );
    };

    return {
        erKompetanseEkspandert,
        settErKompetanseEkspandert,
        skjema,
        valideringErOk,
        sendInnSkjema,
        slettKompetanse,
        nullstillSkjema,
        kanSendeSkjema,
        erKompetanseSkjemaEndret,
    };
};

export { useKompetansePeriodeSkjema };
