import React from 'react';

import styled from 'styled-components';

import { Button, Checkbox } from '@navikt/ds-react';
import type { Felt } from '@navikt/familie-skjema';

import Slett from '../../../../ikoner/Slett';
import type { IBarnMedOpplysninger } from '../../../../typer/søknad';
import { lagBarnLabel } from '../../../../utils/formatter';
import DeltBostedAvtaler from './DeltBostedAvtaler';

const CheckboxOgSlettknapp = styled.div`
    display: flex;
    align-items: flex-start;

    .knapp {
        height: 2rem;
    }
`;

const StyledCheckbox = styled(Checkbox)`
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

const FjernBarnKnapp = styled(Button)`
    margin-left: 1rem;
`;

interface IProps {
    barn: IBarnMedOpplysninger;
    settVisFeilmeldinger: (visFeilmeldinger: boolean) => void;
    barnMedDeltBostedFelt: Felt<IBarnMedOpplysninger[]>;
    avtalerOmDeltBostedPerBarnFelt: Felt<Record<string, string[]>>;
    visFeilmeldinger: boolean;
}

const BarnCheckbox: React.FC<IProps> = ({
    barn,
    settVisFeilmeldinger,
    barnMedDeltBostedFelt,
    avtalerOmDeltBostedPerBarnFelt,
    visFeilmeldinger,
}) => {
    const navnOgIdentTekst = lagBarnLabel(barn);

    return (
        <div>
            <CheckboxOgSlettknapp>
                <StyledCheckbox
                    value={
                        <LabelContent>
                            <LabelTekst title={navnOgIdentTekst}>{navnOgIdentTekst}</LabelTekst>
                        </LabelContent>
                    }
                    checked={barn.merket}
                    onChange={() => {
                        const nyMerketStatus = !barnMedDeltBostedFelt.verdi.find(
                            barnMedOpplysninger => barnMedOpplysninger.ident === barn.ident
                        )?.merket;

                        barnMedDeltBostedFelt.validerOgSettFelt(
                            barnMedDeltBostedFelt.verdi.map(
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
                >
                    <LabelContent>
                        <LabelTekst title={navnOgIdentTekst}>{navnOgIdentTekst}</LabelTekst>
                    </LabelContent>
                </StyledCheckbox>
                {barn.manueltRegistrert && (
                    <FjernBarnKnapp
                        variant={'tertiary'}
                        id={`fjern__${barn.ident}`}
                        size={'small'}
                        onClick={() => {
                            barnMedDeltBostedFelt.validerOgSettFelt([
                                ...barnMedDeltBostedFelt.verdi.filter(
                                    barnMedDeltBosted =>
                                        barnMedDeltBosted.ident !== barn.ident ||
                                        barnMedDeltBosted.navn !== barn.navn ||
                                        barnMedDeltBosted.fødselsdato !== barn.fødselsdato
                                ),
                            ]);
                        }}
                        icon={<Slett />}
                    >
                        {'Fjern barn'}
                    </FjernBarnKnapp>
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
