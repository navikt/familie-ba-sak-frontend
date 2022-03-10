import React from 'react';

import styled from 'styled-components';

import { FamilieCheckbox } from '@navikt/familie-form-elements';

import { useDokumentutsending } from '../../../../context/DokumentutsendingContext';
import Slett from '../../../../ikoner/Slett';
import type { IBarnMedOpplysninger } from '../../../../typer/søknad';
import { formaterIdent, hentAlderSomString } from '../../../../utils/formatter';
import IkonKnapp, { IkonPosisjon } from '../../../Felleskomponenter/IkonKnapp/IkonKnapp';
import DeltBostedAvtaler from './DeltBostedAvtaler';

const CheckboxOgSlettknapp = styled.div`
    display: flex;
    align-items: flex-start;

    .knapp {
        height: 2rem;
    }
`;

const StyledFamilieCheckbox = styled(FamilieCheckbox)`
    margin-left: 1rem;

    > label {
        width: 100%;
    }
`;

const LabelContent = styled.div`
    display: flex;
    white-space: nowrap;
`;

const LabelTekst = styled.p`
    margin: 0;
    text-overflow: ellipsis;
    overflow: hidden;
`;

const FjernBarnKnapp = styled(IkonKnapp)`
    margin-left: 1rem;
`;

interface IProps {
    barn: IBarnMedOpplysninger;
}

const BarnCheckbox: React.FC<IProps> = ({ barn }) => {
    const { skjema, settVisfeilmeldinger } = useDokumentutsending();

    const navnOgIdentTekst = `${barn.navn ?? 'Navn ukjent'} (${hentAlderSomString(
        barn.fødselsdato
    )}) | ${formaterIdent(barn.ident)}`;

    return (
        <div>
            <CheckboxOgSlettknapp>
                <StyledFamilieCheckbox
                    erLesevisning={false}
                    label={
                        <LabelContent>
                            <LabelTekst title={navnOgIdentTekst}>{navnOgIdentTekst}</LabelTekst>
                        </LabelContent>
                    }
                    checked={barn.merket}
                    onChange={() => {
                        const nyMerketStatus = !skjema.felter.barnaMedOpplysninger.verdi.find(
                            barnMedOpplysninger => barnMedOpplysninger.ident === barn.ident
                        )?.merket;

                        skjema.felter.barnaMedOpplysninger.validerOgSettFelt(
                            skjema.felter.barnaMedOpplysninger.verdi.map(
                                (barnMedOpplysninger: IBarnMedOpplysninger) =>
                                    barnMedOpplysninger.ident === barn.ident
                                        ? {
                                              ...barnMedOpplysninger,
                                              merket: nyMerketStatus,
                                          }
                                        : barnMedOpplysninger
                            )
                        );
                        settVisfeilmeldinger(false);

                        if (nyMerketStatus) {
                            skjema.felter.avtalerOmDeltBostedPerBarn.validerOgSettFelt({
                                ...skjema.felter.avtalerOmDeltBostedPerBarn.verdi,
                                [barn.ident]: [''],
                            });
                        } else {
                            skjema.felter.avtalerOmDeltBostedPerBarn.validerOgSettFelt({
                                ...skjema.felter.avtalerOmDeltBostedPerBarn.verdi,
                                [barn.ident]: [],
                            });
                        }
                    }}
                />
                {barn.manueltRegistrert && (
                    <FjernBarnKnapp
                        erLesevisning={false}
                        id={`fjern__${barn.ident}`}
                        mini={true}
                        ikon={<Slett />}
                        ikonPosisjon={IkonPosisjon.VENSTRE}
                        onClick={() => {
                            skjema.felter.barnaMedOpplysninger.validerOgSettFelt([
                                ...skjema.felter.barnaMedOpplysninger.verdi.filter(
                                    barnMedOpplysninger =>
                                        barnMedOpplysninger.ident !== barn.ident ||
                                        barnMedOpplysninger.navn !== barn.navn ||
                                        barnMedOpplysninger.fødselsdato !== barn.fødselsdato
                                ),
                            ]);
                        }}
                        label={'Fjern barn'}
                    />
                )}
            </CheckboxOgSlettknapp>

            <DeltBostedAvtaler barn={barn} />
        </div>
    );
};

export default BarnCheckbox;
