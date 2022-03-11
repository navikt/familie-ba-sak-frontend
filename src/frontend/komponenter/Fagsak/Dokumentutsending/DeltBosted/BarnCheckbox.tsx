import React from 'react';

import styled from 'styled-components';

import { FamilieCheckbox } from '@navikt/familie-form-elements';
import type { Felt } from '@navikt/familie-skjema';

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
    settVisFeilmeldinger: (visFeilmeldinger: boolean) => void;
    barnaMedOpplysningerFelt: Felt<IBarnMedOpplysninger[]>;
    avtalerOmDeltBostedPerBarnFelt: Felt<Record<string, string[]>>;
    visFeilmeldinger: boolean;
}

const BarnCheckbox: React.FC<IProps> = ({
    barn,
    settVisFeilmeldinger,
    barnaMedOpplysningerFelt,
    avtalerOmDeltBostedPerBarnFelt,
    visFeilmeldinger,
}) => {
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
                        const nyMerketStatus = !barnaMedOpplysningerFelt.verdi.find(
                            barnMedOpplysninger => barnMedOpplysninger.ident === barn.ident
                        )?.merket;

                        barnaMedOpplysningerFelt.validerOgSettFelt(
                            barnaMedOpplysningerFelt.verdi.map(
                                (barnMedOpplysninger: IBarnMedOpplysninger) =>
                                    barnMedOpplysninger.ident === barn.ident
                                        ? {
                                              ...barnMedOpplysninger,
                                              merket: nyMerketStatus,
                                          }
                                        : barnMedOpplysninger
                            )
                        );
                        settVisFeilmeldinger(false);

                        if (nyMerketStatus) {
                            avtalerOmDeltBostedPerBarnFelt.validerOgSettFelt({
                                ...avtalerOmDeltBostedPerBarnFelt.verdi,
                                [barn.ident]: [''],
                            });
                        } else {
                            avtalerOmDeltBostedPerBarnFelt.validerOgSettFelt({
                                ...avtalerOmDeltBostedPerBarnFelt.verdi,
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
                            barnaMedOpplysningerFelt.validerOgSettFelt([
                                ...barnaMedOpplysningerFelt.verdi.filter(
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

            <DeltBostedAvtaler
                barn={barn}
                avtalerOmDeltBostedPerBarnFelt={avtalerOmDeltBostedPerBarnFelt}
                visFeilmeldinger={visFeilmeldinger}
            />
        </div>
    );
};

export default BarnCheckbox;
