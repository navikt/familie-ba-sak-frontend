import { PlusCircleIcon, TrashIcon } from '@navikt/aksel-icons';
import { Box, Button, HStack } from '@navikt/ds-react';
import type { Felt } from '@navikt/familie-skjema';

import DatovelgerForGammelSkjemaløsning from '../../../../komponenter/Datovelger/DatovelgerForGammelSkjemaløsning';
import type { IBarnMedOpplysninger } from '../../../../typer/søknad';
import type { IsoDatoString } from '../../../../utils/dato';
import { erIsoStringGyldig } from '../../../../utils/dato';

interface IProps {
    barn: IBarnMedOpplysninger;
    avtalerOmDeltBostedPerBarnFelt: Felt<Record<string, string[]>>;
    visFeilmeldinger: boolean;
}

const DeltBostedAvtaler = ({ barn, avtalerOmDeltBostedPerBarnFelt, visFeilmeldinger }: IProps) => {
    const avtalerOmDeltBosted: IsoDatoString[] = avtalerOmDeltBostedPerBarnFelt.verdi[barn.ident] ?? [];

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
                                    avtalerOmDeltBostedPerBarnFelt.validerOgSettFelt({
                                        ...avtalerOmDeltBostedPerBarnFelt.verdi,
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
                                    variant={'tertiary'}
                                    id={`fjern_avtale__${barn.ident}`}
                                    size={'small'}
                                    onClick={() => {
                                        avtalerOmDeltBostedPerBarnFelt.validerOgSettFelt({
                                            ...avtalerOmDeltBostedPerBarnFelt.verdi,
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
                        variant={'tertiary'}
                        id={`legg_til_avtale__${barn.ident}`}
                        size={'small'}
                        onClick={() =>
                            avtalerOmDeltBostedPerBarnFelt.validerOgSettFelt({
                                ...avtalerOmDeltBostedPerBarnFelt.verdi,
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
