import * as React from 'react';
import moment from 'moment';
import { useSøknad } from '../../../context/SøknadContext';
import { IBarnMedOpplysninger } from '../../../typer/søknad';
import FamilieCheckbox from '../../Felleskomponenter/InputMedLesevisning/FamilieCheckbox';
import FamilieTextarea from '../../Felleskomponenter/InputMedLesevisning/FamilieTextarea';
import { formaterPersonIdent } from '../../../utils/formatter';

interface IProps {
    barn: IBarnMedOpplysninger;
}

const BarnMedOpplysninger: React.FunctionComponent<IProps> = ({ barn }) => {
    const { settBarn } = useSøknad();
    const alder = barn.fødselsdato
        ? moment().diff(moment(barn.fødselsdato, 'YYYY-MM-DD'), 'years') + ' år'
        : 'Alder ukjent';

    return (
        <div className={'søknad__panel--gruppebarn'}>
            <FamilieCheckbox
                id={`barn-${barn.ident}`}
                label={`${barn.navn ?? 'Navn ukjent'} (${alder}) ${formaterPersonIdent(
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
            {barn.inkludertISøknaden && (
                <div className={'søknad__panel--innrykk'}>
                    <FamilieCheckbox
                        label={'Barnet bor ikke fast sammen med søker'}
                        checked={!barn.borMedSøker}
                        onChange={() => {
                            settBarn({
                                ...barn,
                                borMedSøker: !barn.borMedSøker,
                            });
                        }}
                    />

                    <FamilieCheckbox
                        label={'Barnet oppholder seg i utlandet'}
                        checked={!barn.oppholderSegINorge}
                        onChange={() => {
                            settBarn({
                                ...barn,
                                oppholderSegINorge: !barn.oppholderSegINorge,
                            });
                        }}
                    />

                    <FamilieCheckbox
                        label={
                            'Barnet har ikke oppholdt seg sammenhengende i Norge de siste 12 månedene'
                        }
                        checked={!barn.harOppholdtSegINorgeSiste12Måneder}
                        onChange={() => {
                            settBarn({
                                ...barn,
                                harOppholdtSegINorgeSiste12Måneder: !barn.harOppholdtSegINorgeSiste12Måneder,
                            });
                        }}
                    />

                    <FamilieTextarea
                        label={'Tilleggsopplysninger'}
                        placeholder={'Skriv her'}
                        value={barn.tilleggsopplysninger ?? ''}
                        onChange={(event: React.FocusEvent<HTMLTextAreaElement>) =>
                            settBarn({ ...barn, tilleggsopplysninger: event.target.value })
                        }
                    />
                </div>
            )}
        </div>
    );
};

export default BarnMedOpplysninger;
