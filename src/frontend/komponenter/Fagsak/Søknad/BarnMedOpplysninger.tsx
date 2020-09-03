import { FamilieCheckbox } from '@navikt/familie-form-elements';
import moment from 'moment';
import * as React from 'react';
import { useBehandling } from '../../../context/BehandlingContext';
import { useSøknad } from '../../../context/SøknadContext';
import { IBarnMedOpplysninger } from '../../../typer/søknad';
import { formaterPersonIdent } from '../../../utils/formatter';

interface IProps {
    barn: IBarnMedOpplysninger;
}

const BarnMedOpplysninger: React.FunctionComponent<IProps> = ({ barn }) => {
    const { settBarn } = useSøknad();
    const { erLesevisning } = useBehandling();
    const lesevisning = erLesevisning();
    const alder = barn.fødselsdato
        ? moment().diff(moment(barn.fødselsdato, 'YYYY-MM-DD'), 'years') + ' år'
        : 'Alder ukjent';

    return (
        <div className={'søknad__panel--gruppebarn'}>
            <FamilieCheckbox
                erLesevisning={lesevisning}
                id={`barn-${barn.ident}`}
                label={`${barn.navn ?? 'Navn ukjent'} (${alder}) | ${formaterPersonIdent(
                    barn.ident
                )}`}
                checked={barn.inkludertISøknaden}
                onChange={() => {
                    settBarn({
                        ...barn,
                        inkludertISøknaden: !barn.inkludertISøknaden,
                    });
                }}
            />
        </div>
    );
};

export default BarnMedOpplysninger;
