import React from 'react';

import styled from 'styled-components';

import { PlusCircleIcon, TrashIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
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

const Container = styled.div`
    margin-left: 3rem;
`;

const DatovelgerOgSlettknapp = styled.div<{ feil: boolean }>`
    display: flex;
    align-items: flex-end;
    margin-bottom: ${({ feil }) => (feil ? '0' : '1rem')};

    .knapp {
        height: 2rem;
    }
`;

const FjernAvtaleKnapp = styled(Button)`
    margin-left: 1rem;
`;

const LeggTilAvtaleKnapp = styled(Button)`
    margin-bottom: 1rem;
`;

const DeltBostedAvtaler: React.FC<IProps> = ({
    barn,
    avtalerOmDeltBostedPerBarnFelt,
    visFeilmeldinger,
}) => {
    const avtalerOmDeltBosted: IsoDatoString[] =
        avtalerOmDeltBostedPerBarnFelt.verdi[barn.ident] ?? [];

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
        <Container>
            {avtalerOmDeltBosted.map((avtaleDato, index) => {
                const feilmelding = hentFeilmelding(avtaleDato);

                return (
                    <div key={`${barn.fødselsdato}`}>
                        <DatovelgerOgSlettknapp feil={feilmelding !== undefined}>
                            <DatovelgerForGammelSkjemaløsning
                                label={'Dato for avtale om delt bosted'}
                                minDatoAvgrensning={
                                    barn.fødselsdato ? new Date(barn.fødselsdato) : undefined
                                }
                                value={avtaleDato}
                                visFeilmeldinger={feilmelding !== undefined}
                                feilmelding={feilmelding}
                                onDateChange={(dato?: IsoDatoString) => {
                                    avtalerOmDeltBostedPerBarnFelt.validerOgSettFelt({
                                        ...avtalerOmDeltBostedPerBarnFelt.verdi,
                                        [barn.ident]: avtalerOmDeltBosted.reduce(
                                            (
                                                acc: string[],
                                                forrigeAvtaleDato: string,
                                                reduceIndex: number
                                            ) => {
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
                                <FjernAvtaleKnapp
                                    variant={'tertiary'}
                                    id={`fjern_avtale__${barn.ident}`}
                                    size={'small'}
                                    onClick={() => {
                                        avtalerOmDeltBostedPerBarnFelt.validerOgSettFelt({
                                            ...avtalerOmDeltBostedPerBarnFelt.verdi,
                                            [barn.ident]: avtalerOmDeltBosted.reduce(
                                                (
                                                    acc: string[],
                                                    forrigeAvtaleDato: string,
                                                    reduceIndex: number
                                                ) => {
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
                                </FjernAvtaleKnapp>
                            )}
                        </DatovelgerOgSlettknapp>
                    </div>
                );
            })}

            {barn.merket && (
                <LeggTilAvtaleKnapp
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
                </LeggTilAvtaleKnapp>
            )}
        </Container>
    );
};

export default DeltBostedAvtaler;
