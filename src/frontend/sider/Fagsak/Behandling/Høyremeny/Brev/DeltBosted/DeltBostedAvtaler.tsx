import DatovelgerForGammelSkjemaløsning from '@komponenter/Datovelger/DatovelgerForGammelSkjemaløsning';
import { PlusCircleIcon, TrashIcon } from '@navikt/aksel-icons';
import { Box, Button, HStack } from '@navikt/ds-react';
import type { IBarnMedOpplysninger } from '@typer/søknad';
import { erIsoStringGyldig, type IsoDatoString } from '@utils/dato';
import { useFormContext, useWatch } from 'react-hook-form';

import { type BrevModulFormValues, BrevmodulFeltnavn } from '../useBrevModul';

interface IProps {
    barn: IBarnMedOpplysninger;
}

const DeltBostedAvtaler = ({ barn }: IProps) => {
    const {
        control,
        getValues,
        setValue,
        formState: { isSubmitted },
    } = useFormContext<BrevModulFormValues>();

    const avtalerOmDeltBostedPerBarn = useWatch({ control, name: BrevmodulFeltnavn.AVTALER_OM_DELT_BOSTED_PER_BARN });
    const avtalerOmDeltBosted: IsoDatoString[] = avtalerOmDeltBostedPerBarn[barn.ident] ?? [];

    const oppdaterAvtalerForBarn = (nyeAvtaler: string[]) => {
        setValue(
            BrevmodulFeltnavn.AVTALER_OM_DELT_BOSTED_PER_BARN,
            { ...getValues(BrevmodulFeltnavn.AVTALER_OM_DELT_BOSTED_PER_BARN), [barn.ident]: nyeAvtaler },
            { shouldValidate: isSubmitted }
        );
    };

    const hentFeilmelding = (avtaleDato?: IsoDatoString) => {
        if (!isSubmitted) return undefined;

        if (avtaleDato === '') {
            return 'Du må fylle inn dato for avtale';
        } else if (!erIsoStringGyldig(avtaleDato)) {
            return 'Du må fylle inn en gyldig dato for avtale';
        } else {
            return undefined;
        }
    };

    return (
        <HStack marginInline={'space-32 space-0'} gap={'space-16'}>
            {avtalerOmDeltBosted.map((avtaleDato, index) => {
                const feilmelding = hentFeilmelding(avtaleDato);

                return (
                    <div key={`${barn.fødselsdato}`}>
                        <HStack gap={'space-16'} align={'end'}>
                            <DatovelgerForGammelSkjemaløsning
                                label={'Dato for avtale om delt bosted'}
                                minDatoAvgrensning={barn.fødselsdato ? new Date(barn.fødselsdato) : undefined}
                                value={avtaleDato}
                                visFeilmeldinger={feilmelding !== undefined}
                                feilmelding={feilmelding}
                                onDateChange={(dato?: IsoDatoString) => {
                                    oppdaterAvtalerForBarn(
                                        avtalerOmDeltBosted.map((forrigeAvtaleDato, reduceIndex) =>
                                            index === reduceIndex ? (dato ?? '') : forrigeAvtaleDato
                                        )
                                    );
                                }}
                            />
                            {index !== 0 && (
                                <Button
                                    type={'button'}
                                    variant={'tertiary'}
                                    id={`fjern_avtale__${barn.ident}`}
                                    size={'small'}
                                    onClick={() => {
                                        oppdaterAvtalerForBarn(
                                            avtalerOmDeltBosted.filter((_, reduceIndex) => reduceIndex !== index)
                                        );
                                    }}
                                    icon={<TrashIcon />}
                                >
                                    {'Fjern'}
                                </Button>
                            )}
                        </HStack>
                    </div>
                );
            })}

            {barn.merket && (
                <Box marginBlock={'space-0 space-16'}>
                    <Button
                        type={'button'}
                        variant={'tertiary'}
                        id={`legg_til_avtale__${barn.ident}`}
                        size={'small'}
                        onClick={() => oppdaterAvtalerForBarn([...avtalerOmDeltBosted, ''])}
                        icon={<PlusCircleIcon />}
                    >
                        {'Legg til dato for avtale'}
                    </Button>
                </Box>
            )}
        </HStack>
    );
};

export default DeltBostedAvtaler;
