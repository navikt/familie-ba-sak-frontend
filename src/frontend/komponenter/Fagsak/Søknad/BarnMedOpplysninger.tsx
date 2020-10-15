import { FamilieCheckbox } from '@navikt/familie-form-elements';
import * as React from 'react';
import { useBehandling } from '../../../context/BehandlingContext';
import { useSøknad } from '../../../context/SøknadContext';
import { IBarnMedOpplysninger } from '../../../typer/søknad';
import { formaterPersonIdent, hentAlderSomString } from '../../../utils/formatter';
import Slett from '../../../ikoner/Slett';
import IkonKnapp from '../../Felleskomponenter/IkonKnapp/IkonKnapp';

interface IProps {
    barn: IBarnMedOpplysninger;
}

const BarnMedOpplysninger: React.FunctionComponent<IProps> = ({ barn }) => {
    const { settBarn, søknad, settSøknadOgValider } = useSøknad();
    const { erLesevisning } = useBehandling();
    const lesevisning = erLesevisning();

    const finnBarnIndex = (ident: string) =>
        søknad.barnaMedOpplysninger.findIndex(
            barn => barn.manueltRegistrert && barn.ident === ident
        );

    return (
        <div className={'søknad__barna__barn-rad'}>
            <FamilieCheckbox
                erLesevisning={lesevisning}
                id={`barn-${barn.ident}`}
                label={`${barn.navn ?? 'Navn ukjent'} (${hentAlderSomString(
                    barn.fødselsdato
                )}) | ${formaterPersonIdent(barn.ident)}`}
                checked={barn.inkludertISøknaden}
                onChange={() => {
                    settBarn({
                        ...barn,
                        inkludertISøknaden: !barn.inkludertISøknaden,
                    });
                }}
            />

            {barn.manueltRegistrert && (
                <IkonKnapp
                    erLesevisning={erLesevisning()}
                    id={`fjern__${barn.ident}`}
                    className={'søknad__barna__barn-rad__fjern-barn'}
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
        </div>
    );
};

export default BarnMedOpplysninger;
