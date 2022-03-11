import React from 'react';

import styled from 'styled-components';

import navFarger from 'nav-frontend-core';
import { Feilmelding } from 'nav-frontend-typografi';

import type { ISODateString } from '@navikt/familie-form-elements';
import { FamilieDatovelger } from '@navikt/familie-form-elements';
import type { Felt } from '@navikt/familie-skjema';

import Pluss from '../../../../ikoner/Pluss';
import Slett from '../../../../ikoner/Slett';
import type { IBarnMedOpplysninger } from '../../../../typer/søknad';
import { datoformatNorsk } from '../../../../utils/formatter';
import { erIsoStringGyldig } from '../../../../utils/kalender';
import IkonKnapp, { IkonPosisjon } from '../../../Felleskomponenter/IkonKnapp/IkonKnapp';

interface IProps {
    barn: IBarnMedOpplysninger;
    avtalerOmDeltBostedPerBarnFelt: Felt<Record<string, string[]>>;
    visFeilmeldinger: boolean;
}

const Container = styled.div`
    margin-left: 3rem;
`;

export const StyledFamilieDatovelger = styled(FamilieDatovelger)<{ feil: boolean }>`
    .nav-datovelger__input {
        border-color: ${({ feil }) => (feil ? navFarger.redError : navFarger.navBla)};
        box-shadow: ${({ feil }) => (feil ? '0 0 0 1px #ba3a26' : '0 0 0 0')};
    }

    .nav-datovelger__kalenderknapp {
        border-color: ${({ feil }) => (feil ? navFarger.redError : navFarger.navBla)};
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

export const StyledFeilmelding = styled(Feilmelding)`
    margin-bottom: 1rem;
`;

const FjernAvtaleKnapp = styled(IkonKnapp)`
    margin-left: 1rem;
`;

const LeggTilAvtaleKnapp = styled(IkonKnapp)`
    margin: 1rem 0;
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
                                valgtDato={avtaleDato}
                            />
                            {index !== 0 && (
                                <FjernAvtaleKnapp
                                    erLesevisning={false}
                                    id={`fjern_avtale__${barn.ident}`}
                                    mini={true}
                                    ikon={<Slett />}
                                    ikonPosisjon={IkonPosisjon.VENSTRE}
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
                                    label={'Fjern'}
                                />
                            )}
                        </DatovelgerOgSlettknapp>

                        {feilmelding && <StyledFeilmelding>{feilmelding}</StyledFeilmelding>}
                    </div>
                );
            })}

            {barn.merket && (
                <LeggTilAvtaleKnapp
                    erLesevisning={false}
                    id={`legg_til_avtale__${barn.ident}`}
                    mini={true}
                    ikon={<Pluss />}
                    ikonPosisjon={IkonPosisjon.VENSTRE}
                    onClick={() =>
                        avtalerOmDeltBostedPerBarnFelt.validerOgSettFelt({
                            ...avtalerOmDeltBostedPerBarnFelt.verdi,
                            [barn.ident]: [...avtalerOmDeltBosted, ''],
                        })
                    }
                    label={'Legg til dato for avtale'}
                />
            )}
        </Container>
    );
};

export default DeltBostedAvtaler;
