import React from 'react';

import styled from 'styled-components';

import { FamilieCheckbox } from '@navikt/familie-form-elements';

import { useDokumentutsending } from '../../../../context/DokumentutsendingContext';
import Slett from '../../../../ikoner/Slett';
import { IBarnMedOpplysninger } from '../../../../typer/søknad';
import { formaterPersonIdent, hentAlderSomString } from '../../../../utils/formatter';
import IkonKnapp from '../../../Felleskomponenter/IkonKnapp/IkonKnapp';

const CheckboxOgSlettknapp = styled.div`
    display: flex;
    text-align: center;
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
    const { deltBostedSkjema } = useDokumentutsending();

    const navnOgIdentTekst = `${barn.navn ?? 'Navn ukjent'} (${hentAlderSomString(
        barn.fødselsdato
    )}) | ${formaterPersonIdent(barn.ident)}`;

    return (
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
                    deltBostedSkjema.felter.barnaMedOpplysninger.validerOgSettFelt(
                        deltBostedSkjema.felter.barnaMedOpplysninger.verdi.map(
                            (barnMedOpplysninger: IBarnMedOpplysninger) =>
                                barnMedOpplysninger.ident === barn.ident
                                    ? {
                                          ...barnMedOpplysninger,
                                          merket: !barnMedOpplysninger.merket,
                                      }
                                    : barnMedOpplysninger
                        )
                    );
                }}
            />
            {barn.manueltRegistrert && (
                <FjernBarnKnapp
                    erLesevisning={false}
                    id={`fjern__${barn.ident}`}
                    mini={true}
                    ikon={<Slett />}
                    knappPosisjon={'venstre'}
                    onClick={() => {
                        deltBostedSkjema.felter.barnaMedOpplysninger.validerOgSettFelt([
                            ...deltBostedSkjema.felter.barnaMedOpplysninger.verdi.filter(
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
    );
};

export default BarnCheckbox;
