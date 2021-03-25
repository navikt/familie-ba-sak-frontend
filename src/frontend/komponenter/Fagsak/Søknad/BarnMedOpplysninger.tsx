import * as React from 'react';

import styled from 'styled-components';

import { FamilieCheckbox } from '@navikt/familie-form-elements';

import { useBehandling } from '../../../context/BehandlingContext';
import { useSøknad } from '../../../context/SøknadContext';
import Slett from '../../../ikoner/Slett';
import { IBarnMedOpplysninger } from '../../../typer/søknad';
import { formaterPersonIdent, hentAlderSomString } from '../../../utils/formatter';
import IkonKnapp from '../../Felleskomponenter/IkonKnapp/IkonKnapp';

interface IProps {
    barn: IBarnMedOpplysninger;
}

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

const BarnMedOpplysninger: React.FunctionComponent<IProps> = ({ barn }) => {
    const { skjema } = useSøknad();
    const { erLesevisning } = useBehandling();

    const navnOgIdentTekst = `${barn.navn ?? 'Navn ukjent'} (${hentAlderSomString(
        barn.fødselsdato
    )}) | ${formaterPersonIdent(barn.ident)}`;

    return (
        <CheckboxOgSlettknapp>
            <StyledFamilieCheckbox
                erLesevisning={erLesevisning()}
                label={
                    <LabelContent>
                        <LabelTekst title={navnOgIdentTekst}>{navnOgIdentTekst}</LabelTekst>
                    </LabelContent>
                }
                checked={barn.inkludertISøknaden}
                onChange={() => {
                    skjema.felter.barnaMedOpplysninger.validerOgSettFelt(
                        skjema.felter.barnaMedOpplysninger.verdi.map(
                            (barnMedOpplysninger: IBarnMedOpplysninger) =>
                                barnMedOpplysninger.ident === barn.ident
                                    ? {
                                          ...barnMedOpplysninger,
                                          inkludertISøknaden: !barnMedOpplysninger.inkludertISøknaden,
                                      }
                                    : barnMedOpplysninger
                        )
                    );
                }}
            />
            {barn.manueltRegistrert && (
                <FjernBarnKnapp
                    erLesevisning={erLesevisning()}
                    id={`fjern__${barn.ident}`}
                    mini={true}
                    ikon={<Slett />}
                    knappPosisjon={'venstre'}
                    onClick={() => {
                        skjema.felter.barnaMedOpplysninger.validerOgSettFelt([
                            ...skjema.felter.barnaMedOpplysninger.verdi.filter(
                                barnMedOpplysninger => barnMedOpplysninger.ident !== barn.ident
                            ),
                        ]);
                    }}
                    label={'Fjern barn'}
                />
            )}
        </CheckboxOgSlettknapp>
    );
};
export default BarnMedOpplysninger;
