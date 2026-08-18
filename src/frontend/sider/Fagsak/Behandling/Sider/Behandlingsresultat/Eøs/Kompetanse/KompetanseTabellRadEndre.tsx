import { useErLesevisning } from '@hooks/useErLesevisning';
import { TrashIcon } from '@navikt/aksel-icons';
import { Box, Button, Fieldset, HStack, InlineMessage, VStack } from '@navikt/ds-react';
import type { OptionType } from '@typer/common';
import type { IRestKompetanse, KompetanseAktivitet } from '@typer/eøsPerioder';
import { AnnenForelderAktivitet, EøsPeriodeStatus, KompetanseResultat, SøkersAktivitet } from '@typer/eøsPerioder';
import { useFormContext, useWatch } from 'react-hook-form';

import { KompetanseAktivitetFelt } from './KompetanseAktivitetFelt';
import { KompetanseBarnFelt } from './KompetanseBarnFelt';
import { KompetanseLandFelt } from './KompetanseLandFelt';
import { KompetansePeriodeFelt } from './KompetansePeriodeFelt';
import { KompetanseResultatFelt } from './KompetanseResultatFelt';
import { KompetanseFelt, type KompetanseFormValues } from './useKompetansePeriodeSkjema';

interface Props {
    kompetanse: IRestKompetanse;
    tilgjengeligeBarn: OptionType[];
    initiellFom: string;
    onAvbryt: () => void;
    slettKompetanse: () => void;
    sletterKompetanse: boolean;
}

const IKKE_PÅKREVD_FOR_ANNEN_FORELDERS_LAND: KompetanseAktivitet[] = [
    AnnenForelderAktivitet.IKKE_AKTUELT,
    AnnenForelderAktivitet.INAKTIV,
];

export function KompetanseTabellRadEndre({
    kompetanse,
    tilgjengeligeBarn,
    initiellFom,
    onAvbryt,
    slettKompetanse,
    sletterKompetanse,
}: Props) {
    const erLesevisning = useErLesevisning();
    const erRedigeringDeaktivert = erLesevisning || !!kompetanse.inneholderBarnSomSkalSkjermes;

    const erAnnenForelderOmfattetAvNorskLovgivning = kompetanse.erAnnenForelderOmfattetAvNorskLovgivning;

    const {
        control,
        formState: { isSubmitting, errors },
    } = useFormContext<KompetanseFormValues>();

    const annenForeldersAktivitet = useWatch({ control, name: KompetanseFelt.ANNEN_FORELDERS_AKTIVITET });
    const resultat = useWatch({ control, name: KompetanseFelt.RESULTAT });
    const barnetsBostedsland = useWatch({ control, name: KompetanseFelt.BARNETS_BOSTEDSLAND });
    const søkersAktivitetsland = useWatch({ control, name: KompetanseFelt.SØKERS_AKTIVITETSLAND });
    const annenForeldersAktivitetsland = useWatch({ control, name: KompetanseFelt.ANNEN_FORELDERS_AKTIVITETSLAND });

    const søkerAktiviteter = Object.values(
        erAnnenForelderOmfattetAvNorskLovgivning ? AnnenForelderAktivitet : SøkersAktivitet
    ).filter(aktivitet => aktivitet !== AnnenForelderAktivitet.IKKE_AKTUELT);

    const annenForelderAktiviteter = Object.values(
        erAnnenForelderOmfattetAvNorskLovgivning ? SøkersAktivitet : AnnenForelderAktivitet
    );

    const toPrimærland = resultat === KompetanseResultat.TO_PRIMÆRLAND;

    const nasjonalRettDifferanseberegningMedUlikeAktivitetsland =
        resultat === KompetanseResultat.NASJONAL_RETT_DIFFERANSEBEREGNING &&
        barnetsBostedsland === 'NO' &&
        søkersAktivitetsland != null &&
        søkersAktivitetsland != 'NO' &&
        annenForeldersAktivitetsland != null &&
        annenForeldersAktivitetsland != 'NO' &&
        søkersAktivitetsland !== annenForeldersAktivitetsland;

    const periodeFeilmeldingId = `kompetanse-periode_${kompetanse.barnIdenter.map(barn => `${barn}-`)}_${kompetanse.fom}`;

    return (
        <Fieldset error={errors.root?.message} legend="Kompetanseskjema" hideLegend>
            <VStack gap={'space-16'} maxWidth={'40rem'} paddingInline={'space-4 space-4'}>
                <KompetanseBarnFelt tilgjengeligeBarn={tilgjengeligeBarn} lesevisning={erRedigeringDeaktivert} />
                <KompetansePeriodeFelt
                    initiellFom={initiellFom}
                    periodeFeilmeldingId={periodeFeilmeldingId}
                    lesevisning={erRedigeringDeaktivert}
                />
                {erAnnenForelderOmfattetAvNorskLovgivning && (
                    <InlineMessage status="info">
                        Annen forelder er omfattet av norsk lovgivning og søker har selvstendig rett i perioden
                    </InlineMessage>
                )}
                <KompetanseAktivitetFelt
                    navn={KompetanseFelt.SØKERS_AKTIVITET}
                    label={'Søkers aktivitet'}
                    aktiviteter={søkerAktiviteter}
                    lesevisning={erRedigeringDeaktivert}
                    avhengigLandFelt={KompetanseFelt.SØKERS_AKTIVITETSLAND}
                />
                <KompetanseAktivitetFelt
                    navn={KompetanseFelt.ANNEN_FORELDERS_AKTIVITET}
                    label={'Annen forelders aktivitet'}
                    aktiviteter={annenForelderAktiviteter}
                    lesevisning={erRedigeringDeaktivert}
                    className={'unset-margin-bottom'}
                    avhengigLandFelt={KompetanseFelt.ANNEN_FORELDERS_AKTIVITETSLAND}
                />
                {annenForeldersAktivitet === AnnenForelderAktivitet.IKKE_AKTUELT && (
                    <InlineMessage status="info" size="small">
                        Søker har enten aleneomsorg for egne barn eller forsørger andre barn
                    </InlineMessage>
                )}
                <KompetanseLandFelt
                    navn={KompetanseFelt.SØKERS_AKTIVITETSLAND}
                    label={'Søkers aktivitetsland'}
                    lesevisning={erRedigeringDeaktivert}
                    erPåkrevd={values => values.søkersAktivitet !== SøkersAktivitet.INAKTIV}
                />
                <KompetanseLandFelt
                    navn={KompetanseFelt.ANNEN_FORELDERS_AKTIVITETSLAND}
                    label={'Annen forelders aktivitetsland'}
                    lesevisning={erRedigeringDeaktivert}
                    erPåkrevd={values =>
                        values.annenForeldersAktivitet == null ||
                        !IKKE_PÅKREVD_FOR_ANNEN_FORELDERS_LAND.includes(values.annenForeldersAktivitet)
                    }
                />
                <KompetanseLandFelt
                    navn={KompetanseFelt.BARNETS_BOSTEDSLAND}
                    label={'Barnets bostedsland'}
                    lesevisning={erRedigeringDeaktivert}
                />
                <KompetanseResultatFelt lesevisning={erRedigeringDeaktivert} />
                {toPrimærland && (
                    <Box marginBlock={'space-2 space-2'}>
                        <InlineMessage status={'warning'} size={'small'}>
                            Norge og annen forelders aktivitetsland er primærland. Saksbehandler må manuelt vurdere om
                            Norge skal utbetale barnetrygden.
                        </InlineMessage>
                    </Box>
                )}
                {nasjonalRettDifferanseberegningMedUlikeAktivitetsland && (
                    <Box marginBlock={'space-2 space-2'}>
                        <InlineMessage status={'warning'} size={'small'}>
                            To andre EØS-land er primærland. Saksbehandler må manuelt beregne hvilket av EØS-landene som
                            utbetaler den høyeste barnetrygden og som Norge skal differanseberegne mot.
                        </InlineMessage>
                    </Box>
                )}
                {!erRedigeringDeaktivert && (
                    <HStack justify={'space-between'} marginBlock={'space-12 space-0'}>
                        <div>
                            <Button type={'submit'} size="small" variant={'primary'} loading={isSubmitting}>
                                Ferdig
                            </Button>
                            <Button
                                type={'button'}
                                style={{ marginLeft: '1rem' }}
                                onClick={onAvbryt}
                                size="small"
                                variant="tertiary"
                            >
                                Avbryt
                            </Button>
                        </div>
                        {kompetanse.status !== EøsPeriodeStatus.IKKE_UTFYLT && (
                            <Button
                                type={'button'}
                                variant={'tertiary'}
                                onClick={slettKompetanse}
                                id={`slett_kompetanse_${kompetanse.barnIdenter.map(barn => `${barn}-`)}_${initiellFom}`}
                                loading={sletterKompetanse}
                                size={'small'}
                                icon={<TrashIcon />}
                            >
                                Fjern
                            </Button>
                        )}
                    </HStack>
                )}
            </VStack>
        </Fieldset>
    );
}
