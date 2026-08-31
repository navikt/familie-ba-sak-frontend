import { useOnFormSubmitSuccessful } from '@hooks/useOnFormSubmitSuccessful';
import { useOppdaterKompetanse } from '@hooks/useOppdaterKompetanse';
import { useSlettKompetanse } from '@hooks/useSlettKompetanse';
import { byggSuksessRessurs } from '@navikt/familie-typer';
import type { OptionType } from '@typer/common';
import type { IRestKompetanse, KompetanseAktivitet, KompetanseResultat } from '@typer/eøsPerioder';
import { type IIsoMånedPeriode, nyIsoMånedPeriode } from '@utils/dato';
import { useForm } from 'react-hook-form';

import { useBehandlingContext } from '../../../../context/BehandlingContext';

export enum KompetanseFelt {
    BARN = 'barnIdenter',
    PERIODE = 'periode',
    SØKERS_AKTIVITET = 'søkersAktivitet',
    SØKERS_AKTIVITETSLAND = 'søkersAktivitetsland',
    ANNEN_FORELDERS_AKTIVITET = 'annenForeldersAktivitet',
    ANNEN_FORELDERS_AKTIVITETSLAND = 'annenForeldersAktivitetsland',
    BARNETS_BOSTEDSLAND = 'barnetsBostedsland',
    RESULTAT = 'resultat',
}

export interface KompetanseFormValues {
    [KompetanseFelt.BARN]: OptionType[];
    [KompetanseFelt.PERIODE]: IIsoMånedPeriode;
    [KompetanseFelt.SØKERS_AKTIVITET]: KompetanseAktivitet | undefined;
    [KompetanseFelt.SØKERS_AKTIVITETSLAND]: string | undefined;
    [KompetanseFelt.ANNEN_FORELDERS_AKTIVITET]: KompetanseAktivitet | undefined;
    [KompetanseFelt.ANNEN_FORELDERS_AKTIVITETSLAND]: string | undefined;
    [KompetanseFelt.BARNETS_BOSTEDSLAND]: string | undefined;
    [KompetanseFelt.RESULTAT]: KompetanseResultat | undefined;
}

export const kompetanseFeilmeldingId = (kompetanse: IRestKompetanse): string =>
    `kompetanse_${kompetanse.barnIdenter.map(barn => `${barn}-`)}_${kompetanse.fom}`;

interface Props {
    kompetanse: IRestKompetanse;
    barnIKompetanse: OptionType[];
    lukkSkjema: () => void;
}

export const useKompetansePeriodeSkjema = ({ kompetanse, barnIKompetanse, lukkSkjema }: Props) => {
    const { behandling, settÅpenBehandling } = useBehandlingContext();

    const { mutateAsync: oppdaterKompetanse } = useOppdaterKompetanse();
    const { mutateAsync: slettKompetanseMutate, isPending: sletterKompetanse } = useSlettKompetanse();

    const form = useForm<KompetanseFormValues>({
        values: {
            [KompetanseFelt.BARN]: barnIKompetanse,
            [KompetanseFelt.PERIODE]: nyIsoMånedPeriode(kompetanse.fom, kompetanse.tom),
            [KompetanseFelt.SØKERS_AKTIVITET]: kompetanse.søkersAktivitet,
            [KompetanseFelt.SØKERS_AKTIVITETSLAND]: kompetanse.søkersAktivitetsland,
            [KompetanseFelt.ANNEN_FORELDERS_AKTIVITET]: kompetanse.annenForeldersAktivitet,
            [KompetanseFelt.ANNEN_FORELDERS_AKTIVITETSLAND]: kompetanse.annenForeldersAktivitetsland,
            [KompetanseFelt.BARNETS_BOSTEDSLAND]: kompetanse.barnetsBostedsland,
            [KompetanseFelt.RESULTAT]: kompetanse.resultat,
        },
    });

    const { control, setError, reset } = form;

    useOnFormSubmitSuccessful(control, () => reset());

    const onSubmit = async (values: KompetanseFormValues) => {
        try {
            const oppdatertBehandling = await oppdaterKompetanse({
                behandlingId: behandling.behandlingId,
                id: kompetanse.id,
                fom: values.periode.fom ?? '',
                tom: values.periode.tom,
                barnIdenter: values.barnIdenter.map(barn => barn.value),
                søkersAktivitet: values.søkersAktivitet,
                søkersAktivitetsland: values.søkersAktivitetsland,
                annenForeldersAktivitet: values.annenForeldersAktivitet,
                annenForeldersAktivitetsland: values.annenForeldersAktivitetsland,
                barnetsBostedsland: values.barnetsBostedsland,
                resultat: values.resultat,
                erAnnenForelderOmfattetAvNorskLovgivning: kompetanse.erAnnenForelderOmfattetAvNorskLovgivning,
            });
            settÅpenBehandling(byggSuksessRessurs(oppdatertBehandling));
            lukkSkjema();
        } catch (error) {
            setError('root', {
                message: error instanceof Error ? error.message : 'Teknisk feil ved lagring av kompetanse.',
            });
        }
    };

    const slettKompetanse = async () => {
        try {
            const oppdatertBehandling = await slettKompetanseMutate({
                behandlingId: behandling.behandlingId,
                kompetanseId: kompetanse.id,
            });
            settÅpenBehandling(byggSuksessRessurs(oppdatertBehandling));
            lukkSkjema();
        } catch (error) {
            setError('root', {
                message: error instanceof Error ? error.message : 'Teknisk feil ved sletting av kompetanse.',
            });
        }
    };

    return {
        form,
        onSubmit,
        slettKompetanse,
        sletterKompetanse,
        initiellFom: kompetanse.fom,
    };
};
