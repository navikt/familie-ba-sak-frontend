import { useBehandling } from '@hooks/useBehandling';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { VurderingsstrategiForValutakurser } from '@typer/behandling';
import type { OptionType } from '@typer/common';
import { EøsPeriodeStatus, type IRestValutakurs, Vurderingsform } from '@typer/eøsPerioder';
import { useFormContext } from 'react-hook-form';

import { CogRotationIcon, PersonGavelIcon, TrashIcon } from '@navikt/aksel-icons';
import { Box, Button, Fieldset, Heading, HGrid, HStack, InlineMessage, Label, Link } from '@navikt/ds-react';

import { type ValutakursFormValues } from './useValutakursSkjema';
import { ValutakursBarnFelt } from './ValutakursBarnFelt';
import { ValutakursDatoFelt } from './ValutakursDatoFelt';
import { ValutakursKursFelt } from './ValutakursKursFelt';
import { ValutakursPeriodeFelt } from './ValutakursPeriodeFelt';
import { ValutakursValutaFelt } from './ValutakursValutaFelt';
import { EøsPeriodeSkjemaContainer, Knapperad } from '../EøsKomponenter/EøsSkjemaKomponenter';

interface Props {
    valutakurs: IRestValutakurs;
    tilgjengeligeBarn: OptionType[];
    initiellFom: string;
    erManuellInputAvKurs: boolean;
    vurderingsform: Vurderingsform | undefined;
    inneholderBarnSomSkalSkjermes?: boolean;
    onAvbryt: () => void;
    slettValutakurs: () => void;
    sletterValutakurs: boolean;
}

const ValutakursTabellRadEndre = ({
    valutakurs,
    tilgjengeligeBarn,
    initiellFom,
    erManuellInputAvKurs,
    vurderingsform,
    inneholderBarnSomSkalSkjermes,
    onAvbryt,
    slettValutakurs,
    sletterValutakurs,
}: Props) => {
    const erLesevisning = useErLesevisning();
    const behandling = useBehandling();

    const {
        formState: { isSubmitting, errors },
    } = useFormContext<ValutakursFormValues>();

    const erValutakursVurdertAutomatisk = vurderingsform === Vurderingsform.AUTOMATISK;
    const skaAutomatiskeValutakurserKunneRedigeres =
        behandling.vurderingsstrategiForValutakurser === VurderingsstrategiForValutakurser.MANUELL;

    const erRedigeringDeaktivert =
        erLesevisning ||
        !!inneholderBarnSomSkalSkjermes ||
        (erValutakursVurdertAutomatisk && !skaAutomatiskeValutakurserKunneRedigeres);

    const periodeFeilmeldingId = `valutakurs-periode_${valutakurs.barnIdenter.map(barn => `${barn}`)}_${valutakurs.fom}`;

    return (
        <Fieldset error={errors.root?.message} legend={'Valutakurs skjema'} hideLegend>
            <EøsPeriodeSkjemaContainer $lesevisning={erRedigeringDeaktivert} $status={valutakurs.status} gap="space-24">
                {erValutakursVurdertAutomatisk && (
                    <HStack wrap={false} align={'center'} gap={'space-16'}>
                        <CogRotationIcon title="Automatisk registrert valutakurs" fontSize="1.5rem" />
                        <Label>Automatisk registrert valutakurs</Label>
                    </HStack>
                )}
                {vurderingsform === Vurderingsform.MANUELL && (
                    <HStack wrap={false} align={'center'} gap={'space-16'}>
                        <PersonGavelIcon title="Manuelt registrert valutakurs" fontSize="1.5rem" />
                        <Label>Manuelt registrert valutakurs</Label>
                    </HStack>
                )}
                <ValutakursBarnFelt tilgjengeligeBarn={tilgjengeligeBarn} lesevisning={erRedigeringDeaktivert} />
                <ValutakursPeriodeFelt
                    initiellFom={initiellFom}
                    periodeFeilmeldingId={periodeFeilmeldingId}
                    lesevisning={erRedigeringDeaktivert}
                />
                <Fieldset
                    className={erRedigeringDeaktivert ? 'lesevisning' : ''}
                    legend={'Registrer valutakursdato'}
                    hideLegend={erValutakursVurdertAutomatisk}
                >
                    <HGrid columns={'1fr 2fr 1fr'} gap={'space-12'}>
                        <ValutakursDatoFelt readOnly={erRedigeringDeaktivert} />
                        <ValutakursValutaFelt />
                        <ValutakursKursFelt
                            readOnly={erRedigeringDeaktivert || !erManuellInputAvKurs}
                            erManuellInputAvKurs={erManuellInputAvKurs}
                        />
                    </HGrid>
                    {erManuellInputAvKurs && (
                        <Box marginBlock={'space-32 space-0'}>
                            <InlineMessage status={'warning'} size={'small'}>
                                <Heading size="xsmall">
                                    Manuell innhenting av valutakurs for Islandske kroner (ISK)
                                </Heading>
                                Systemet har ikke valutakurser for valutakursdatoer før 1. februar 2018. Disse må hentes
                                fra{' '}
                                <Link
                                    href="https://navno.sharepoint.com/:x:/r/sites/fag-og-ytelser-familie-barnetrygd/Delte%20dokumenter/E%C3%98S/Valutakalkulator%202022.xlsm?d=w200955f53e1d4323ae72f9d1b15f617c&csf=1&web=1&e=w3OE5N"
                                    target="_blank"
                                >
                                    Valutakalkulator
                                </Link>
                                .
                            </InlineMessage>
                        </Box>
                    )}
                </Fieldset>

                {!erRedigeringDeaktivert && (
                    <Knapperad>
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

                        {valutakurs.status !== EøsPeriodeStatus.IKKE_UTFYLT && (
                            <Button
                                type={'button'}
                                variant={'tertiary'}
                                onClick={slettValutakurs}
                                id={`slett_valutakurs_${valutakurs.barnIdenter.map(barn => `${barn}-`)}_${initiellFom}`}
                                loading={sletterValutakurs}
                                size={'small'}
                                icon={<TrashIcon />}
                            >
                                Fjern
                            </Button>
                        )}
                    </Knapperad>
                )}
            </EøsPeriodeSkjemaContainer>
        </Fieldset>
    );
};

export default ValutakursTabellRadEndre;
