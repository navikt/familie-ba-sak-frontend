import { useBruker } from '@hooks/useBruker';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { useFagsak } from '@hooks/useFagsak';
import { erFagsakAvTypeEnsligMindreårig, erFagsakAvTypeInstitusjon, erFagsakAvTypeSkjermetBarn } from '@typer/fagsak';
import type { IForelderBarnRelasjonMaskert } from '@typer/person';
import { adressebeskyttelsestyper, ForelderBarnRelasjonRolle } from '@typer/person';
import type { IBarnMedOpplysninger } from '@typer/søknad';
import { isoStringTilDate } from '@utils/dato';
import { differenceInMilliseconds } from 'date-fns';
import { useController, useFormContext } from 'react-hook-form';

import { InformationSquareIcon } from '@navikt/aksel-icons';
import { BodyShort, CheckboxGroup, Heading, HStack, InfoCard, Label, VStack } from '@navikt/ds-react';

import { BarnMedOpplysninger } from './BarnMedOpplysninger';
import { RegistrerSøknadFelt, type RegistrerSøknadFormValues, useSøknadContext } from './SøknadContext';
import StatusIkon, { Status } from '../../../../../ikoner/StatusIkon';

export const BARN_CHECKBOX_GROUP_ID = 'registrer-søknad-barn';

export const Barna = () => {
    const { barnMedLøpendeUtbetaling } = useSøknadContext();

    const fagsak = useFagsak();
    const bruker = useBruker();
    const erLesevisning = useErLesevisning();

    const gjelderInstitusjon = erFagsakAvTypeInstitusjon(fagsak);
    const gjelderEnsligMindreårig = erFagsakAvTypeEnsligMindreårig(fagsak);
    const gjelderSkjermetBarn = erFagsakAvTypeSkjermetBarn(fagsak);

    const { control } = useFormContext<RegistrerSøknadFormValues>();

    const {
        field: { value: barnaMedOpplysninger, onChange },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: RegistrerSøknadFelt.BARNA_MED_OPPLYSNINGER,
        control,
        rules: {
            validate: barna =>
                barna.some((barn: IBarnMedOpplysninger) => barn.merket) || barnMedLøpendeUtbetaling.size > 0
                    ? undefined
                    : 'Ingen av barna er valgt.',
        },
    });

    const sorterteBarnMedOpplysninger = [...barnaMedOpplysninger].sort(
        (a: IBarnMedOpplysninger, b: IBarnMedOpplysninger) => {
            if (!a.fødselsdato) {
                return 1;
            }

            if (!b.fødselsdato) {
                return -1;
            }

            return !a.ident
                ? 1
                : differenceInMilliseconds(isoStringTilDate(b.fødselsdato), isoStringTilDate(a.fødselsdato));
        }
    );

    const maskerteRelasjoner = bruker.forelderBarnRelasjonMaskert.filter(
        (forelderBarnRelasjonMaskert: IForelderBarnRelasjonMaskert) =>
            forelderBarnRelasjonMaskert.relasjonRolle === ForelderBarnRelasjonRolle.BARN
    );

    const oppdaterBarnMedMerketStatus = (barnaSomErSjekketAv: string[]) => {
        onChange(
            barnaMedOpplysninger.map((barnMedOpplysninger: IBarnMedOpplysninger) => ({
                ...barnMedOpplysninger,
                merket: barnaSomErSjekketAv.includes(barnMedOpplysninger.ident),
            }))
        );
    };

    return (
        <VStack marginBlock={'space-16'}>
            <Heading size={'medium'} level={'2'} children={'Opplysninger om barn'} />
            {maskerteRelasjoner.map((forelderBarnRelasjonMaskert: IForelderBarnRelasjonMaskert, index: number) => {
                return (
                    <HStack
                        gap="space-8"
                        margin="space-8"
                        key={`${index}_${forelderBarnRelasjonMaskert.relasjonRolle}`}
                    >
                        <StatusIkon status={Status.FEIL} />
                        <BodyShort>{`Bruker har barn med diskresjonskode ${
                            adressebeskyttelsestyper[forelderBarnRelasjonMaskert.adressebeskyttelseGradering] ??
                            'ukjent'
                        }`}</BodyShort>
                    </HStack>
                );
            })}
            <br />
            <CheckboxGroup
                id={BARN_CHECKBOX_GROUP_ID}
                readOnly={isSubmitting}
                error={error?.message}
                legend={
                    !erLesevisning && !gjelderInstitusjon && !gjelderEnsligMindreårig && !gjelderSkjermetBarn ? (
                        <Label>Velg hvilke barn det er søkt om</Label>
                    ) : (
                        <Label>Barn det er søkt om</Label>
                    )
                }
                value={barnaMedOpplysninger
                    .filter((barnMedOpplysninger: IBarnMedOpplysninger) => barnMedOpplysninger.merket)
                    .map((barnMedOpplysninger: IBarnMedOpplysninger) => barnMedOpplysninger.ident)}
                onChange={(merkedeBarn: string[]) => oppdaterBarnMedMerketStatus(merkedeBarn)}
            >
                {sorterteBarnMedOpplysninger.map((barnMedOpplysninger: IBarnMedOpplysninger) => (
                    <BarnMedOpplysninger key={barnMedOpplysninger.ident} barn={barnMedOpplysninger} />
                ))}

                {sorterteBarnMedOpplysninger.length === 0 && maskerteRelasjoner.length === 0 && (
                    <VStack marginBlock={'space-0 space-20'}>
                        <InfoCard data-color="info">
                            <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                                Folkeregisteret har ikke registrerte barn på denne søkeren
                            </InfoCard.Message>
                        </InfoCard>
                    </VStack>
                )}
            </CheckboxGroup>
        </VStack>
    );
};
