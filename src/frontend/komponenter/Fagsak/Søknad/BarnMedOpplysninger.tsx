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
    const { settBarn, søknad, settSøknadOgValider } = useSøknad();
    const { erLesevisning } = useBehandling();
    const lesevisning = erLesevisning();

    const finnBarnIndex = (ident: string) =>
        søknad.barnaMedOpplysninger.findIndex(
            barn => barn.manueltRegistrert && barn.ident === ident
        );

    const navnOgIdentTekst = `${barn.navn ?? 'Navn ukjent'} (${hentAlderSomString(
        barn.fødselsdato
    )}) | ${formaterPersonIdent(barn.ident)}`;

    return (
        <StyledFamilieCheckbox
            erLesevisning={lesevisning}
            id={`barn-${barn.ident}`}
            label={
                <LabelContent>
                    <LabelTekst title={navnOgIdentTekst}>{navnOgIdentTekst}</LabelTekst>

                    {barn.manueltRegistrert && (
                        <FjernBarnKnapp
                            erLesevisning={erLesevisning()}
                            id={`fjern__${barn.ident}`}
                            mini={true}
                            ikon={<Slett />}
                            knappPosisjon={'venstre'}
                            onClick={() => {
                                søknad.barnaMedOpplysninger.splice(finnBarnIndex(barn.ident), 1);
                                settSøknadOgValider(søknad);
                            }}
                            label={'Fjern barn'}
                        />
                    )}
                </LabelContent>
            }
            checked={barn.inkludertISøknaden}
            onChange={() => {
                settBarn({
                    ...barn,
                    inkludertISøknaden: !barn.inkludertISøknaden,
                });
            }}
        />
    );
};
export default BarnMedOpplysninger;
