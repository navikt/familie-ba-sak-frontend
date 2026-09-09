import DatovelgerForGammelSkjemaløsning from '@komponenter/Datovelger/DatovelgerForGammelSkjemaløsning';
import { PlusCircleIcon, TrashIcon } from '@navikt/aksel-icons';
import { Box, Button, HStack } from '@navikt/ds-react';
import type { IBarnMedOpplysninger } from '@typer/søknad';
import { erIsoStringGyldig, type IsoDatoString } from '@utils/dato';

interface IProps {
    barn: IBarnMedOpplysninger;
    avtalerOmDeltBostedPerBarn: Record<string, string[]>;
    settAvtalerOmDeltBostedPerBarn: (avtaler: Record<string, string[]>) => void;
    visFeilmeldinger: boolean;
}

const DeltBostedAvtaler = ({
    barn,
    avtalerOmDeltBostedPerBarn,
    settAvtalerOmDeltBostedPerBarn,
    visFeilmeldinger,
}: IProps) => {
    const avtalerOmDeltBosted: IsoDatoString[] = avtalerOmDeltBostedPerBarn[barn.ident] ?? [];

    const hentFeilmelding = (avtaleDato?: IsoDatoString) => {
        if (!visFeilmeldinger) return undefined;

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
                                    settAvtalerOmDeltBostedPerBarn({
                                        ...avtalerOmDeltBostedPerBarn,
                                        [barn.ident]: avtalerOmDeltBosted.reduce(
                                            (acc: string[], forrigeAvtaleDato: string, reduceIndex: number) => {
                                                if (index === reduceIndex) {
                                                    return [...acc, dato ?? ''];
                                                } else {
                                                    return [...acc, forrigeAvtaleDato];
                                                }
                                            },
                                            []
                                        ),
                                    });
                                }}
                            />
                            {index !== 0 && (
                                <Button
                                    type={'button'}
                                    variant={'tertiary'}
                                    id={`fjern_avtale__${barn.ident}`}
                                    size={'small'}
                                    onClick={() => {
                                        settAvtalerOmDeltBostedPerBarn({
                                            ...avtalerOmDeltBostedPerBarn,
                                            [barn.ident]: avtalerOmDeltBosted.reduce(
                                                (acc: string[], forrigeAvtaleDato: string, reduceIndex: number) => {
                                                    if (index === reduceIndex) {
                                                        return acc;
                                                    } else {
                                                        return [...acc, forrigeAvtaleDato];
                                                    }
                                                },
                                                []
                                            ),
                                        });
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
                        onClick={() =>
                            settAvtalerOmDeltBostedPerBarn({
                                ...avtalerOmDeltBostedPerBarn,
                                [barn.ident]: [...avtalerOmDeltBosted, ''],
                            })
                        }
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
