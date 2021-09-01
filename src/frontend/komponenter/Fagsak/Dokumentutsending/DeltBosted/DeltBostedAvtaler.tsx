import React from 'react';

import styled from 'styled-components';

import navFarger from 'nav-frontend-core';
import { Feilmelding } from 'nav-frontend-typografi';

import { FamilieDatovelger, ISODateString } from '@navikt/familie-form-elements';

import { useDokumentutsending } from '../../../../context/DokumentutsendingContext';
import Pluss from '../../../../ikoner/Pluss';
import Slett from '../../../../ikoner/Slett';
import { IBarnMedOpplysninger } from '../../../../typer/søknad';
import { datoformatNorsk } from '../../../../utils/formatter';
import { erIsoStringGyldig } from '../../../../utils/kalender';
import IkonKnapp from '../../../Felleskomponenter/IkonKnapp/IkonKnapp';

interface IProps {
    barn: IBarnMedOpplysninger;
}

const Container = styled.div`
    margin-left: 3rem;
`;

const StyledFamilieDatovelger = styled(FamilieDatovelger)<{ feil: boolean }>`
    .nav-datovelger__input {
        border-color: ${({ feil }) => (feil ? navFarger.redError : navFarger.navBla)};
    }

    .nav-datovelger__kalenderknapp {
        border-color: ${({ feil }) => (feil ? navFarger.redError : navFarger.navBla)};
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

const StyledFeilmelding = styled(Feilmelding)`
    margin-bottom: 1rem;
`;

const FjernAvtaleKnapp = styled(IkonKnapp)`
    margin-left: 1rem;
`;

const LeggTilAvtaleKnapp = styled(IkonKnapp)`
    margin: 1rem 0;
`;

const DeltBostedAvtaler: React.FC<IProps> = ({ barn }) => {
    const { deltBostedSkjema } = useDokumentutsending();

    const avtalerOmDeltBosted: ISODateString[] =
        deltBostedSkjema.felter.avtalerOmDeltBostedPerBarn.verdi[barn.ident] ?? [];

    const hentFeilmelding = (avtaleDato?: ISODateString) => {
        if (!deltBostedSkjema.visFeilmeldinger) return undefined;

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
                                    deltBostedSkjema.felter.avtalerOmDeltBostedPerBarn.validerOgSettFelt(
                                        {
                                            ...deltBostedSkjema.felter.avtalerOmDeltBostedPerBarn
                                                .verdi,
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
                                        }
                                    );
                                }}
                                valgtDato={avtaleDato}
                            />
                            {index !== 0 && (
                                <FjernAvtaleKnapp
                                    erLesevisning={false}
                                    id={`fjern_avtale__${barn.ident}`}
                                    mini={true}
                                    ikon={<Slett />}
                                    knappPosisjon={'venstre'}
                                    onClick={() => {
                                        deltBostedSkjema.felter.avtalerOmDeltBostedPerBarn.validerOgSettFelt(
                                            {
                                                ...deltBostedSkjema.felter
                                                    .avtalerOmDeltBostedPerBarn.verdi,
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
                                            }
                                        );
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
                    knappPosisjon={'venstre'}
                    onClick={() =>
                        deltBostedSkjema.felter.avtalerOmDeltBostedPerBarn.validerOgSettFelt({
                            ...deltBostedSkjema.felter.avtalerOmDeltBostedPerBarn.verdi,
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
