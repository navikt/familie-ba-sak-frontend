import React from 'react';

import styled from 'styled-components';

import { TrashIcon } from '@navikt/aksel-icons';
import { Button, Checkbox } from '@navikt/ds-react';
import type { Felt } from '@navikt/familie-skjema';

import DeltBostedAvtaler from './DeltBostedAvtaler';
import type { IBarnMedOpplysninger } from '../../../../typer/søknad';
import { lagBarnLabel } from '../../../../utils/formatter';

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
    barnMedDeltBostedFelt: Felt<IBarnMedOpplysninger[]>;
    avtalerOmDeltBostedPerBarnFelt: Felt<Record<string, string[]>>;
    visFeilmeldinger: boolean;
}

const BarnCheckbox: React.FC<IProps> = ({
    barn,
    barnMedDeltBostedFelt,
    avtalerOmDeltBostedPerBarnFelt,
    visFeilmeldinger,
}) => {
    const navnOgIdentTekst = lagBarnLabel(barn);

    return (
        <div>
            <CheckboxOgSlettknapp>
                <StyledCheckbox value={barn.ident}>
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
                        icon={<TrashIcon />}
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
