import React from 'react';

import styled from 'styled-components';

import { PlusCircleIcon, TrashIcon } from '@navikt/aksel-icons';
import { Button, ErrorMessage } from '@navikt/ds-react';
import { ABorderDanger, ABorderAction } from '@navikt/ds-tokens/dist/tokens';
import type { ISODateString } from '@navikt/familie-datovelger';
import { FamilieDatovelger } from '@navikt/familie-datovelger';
import type { Felt } from '@navikt/familie-skjema';

import type { IBarnMedOpplysninger } from '../../../../typer/søknad';
import { datoformatNorsk } from '../../../../utils/formatter';
import { erIsoStringGyldig } from '../../../../utils/kalender';

interface IProps {
    barn: IBarnMedOpplysninger;
    avtalerOmDeltBostedPerBarnFelt: Felt<Record<string, string[]>>;
    visFeilmeldinger: boolean;
}

const Container = styled.div`
    margin-left: 3rem;
`;

export const StyledFamilieDatovelger = styled(FamilieDatovelger)<{ feil?: React.ReactNode }>`
    .nav-datovelger {
        margin-top: 0.5rem;
    }
    .nav-datovelger__input {
        border-color: ${({ feil }) => (feil ? ABorderDanger : ABorderAction)};
        box-shadow: ${({ feil }) => (feil ? '0 0 0 1px #ba3a26' : '0 0 0 0')};
    }

    .nav-datovelger__kalenderknapp {
        border-color: ${({ feil }) => (feil ? ABorderDanger : ABorderAction)};
        box-shadow: ${({ feil }) => (feil ? '0 0 0 1px #ba3a26' : '0 0 0 0')};
    }

    margin-bottom: ${({ feil }) => (feil ? '.125rem' : '0')};
`;

const DatovelgerOgSlettknapp = styled.div<{ feil: boolean }>`
    display: flex;
    align-items: flex-end;
    margin-bottom: ${({ feil }) => (feil ? '0' : '1rem')};

    .knapp {
        height: 2rem;
    }
`;

export const StyledErrorMessage = styled(ErrorMessage)`
    margin-bottom: 1rem;
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
    const avtalerOmDeltBosted: ISODateString[] =
        avtalerOmDeltBostedPerBarnFelt.verdi[barn.ident] ?? [];

    const hentFeilmelding = (avtaleDato?: ISODateString) => {
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
                            <StyledFamilieDatovelger
                                erLesesvisning={false}
                                id={`${barn.fødselsdato}_${avtaleDato}`}
                                label={'Dato for avtale om delt bosted'}
                                placeholder={datoformatNorsk.DATO}
                                limitations={{
                                    minDate: barn.fødselsdato,
                                }}
                                feil={feilmelding !== undefined}
                                onChange={(dato?: ISODateString) => {
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
                                value={avtaleDato}
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

                        {feilmelding && <StyledErrorMessage>{feilmelding}</StyledErrorMessage>}
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
