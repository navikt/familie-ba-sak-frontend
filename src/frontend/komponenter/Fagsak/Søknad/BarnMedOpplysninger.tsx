import * as React from 'react';
import moment from 'moment';
import { useSøknad } from '../../../context/SøknadContext';
import { IBarnMedOpplysninger } from '../../../typer/søknad';
import CheckboxLesbar from '../../Felleskomponenter/InputMedLesevisning/CheckboxLesbar';
import TextareaLesbar from '../../Felleskomponenter/InputMedLesevisning/TextareaLesbar';

interface IProps {
    barn: IBarnMedOpplysninger;
}

const BarnMedOpplysninger: React.FunctionComponent<IProps> = ({ barn }) => {
    const { settBarn } = useSøknad();
    const alder = barn.fødselsdato
        ? moment().diff(moment(barn.fødselsdato, 'YYYY-MM-DD'), 'years')
        : 'ukjent';

    return (
        <div className={'søknad__panel--gruppebarn'}>
            <CheckboxLesbar
                id={`barn-${barn.ident}`}
                label={`${barn.navn ?? 'ukjent'} (${alder} år) ${barn.ident}`}
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
                    <CheckboxLesbar
                        label={'5.1 Barnet bor ikke fast sammen med søker'}
                        checked={!barn.borMedSøker}
                        onChange={() => {
                            settBarn({
                                ...barn,
                                borMedSøker: !barn.borMedSøker,
                            });
                        }}
                    />

                    <CheckboxLesbar
                        label={'5.5.1 Barnet oppholder seg i utlandet'}
                        checked={!barn.oppholderSegINorge}
                        onChange={() => {
                            settBarn({
                                ...barn,
                                oppholderSegINorge: !barn.oppholderSegINorge,
                            });
                        }}
                    />

                    <CheckboxLesbar
                        label={
                            '5.5.2 Barnet har ikke oppholdt seg sammenhengende i Norge de siste 12 månedene'
                        }
                        checked={!barn.harOppholdtSegINorgeSiste12Måneder}
                        onChange={() => {
                            settBarn({
                                ...barn,
                                harOppholdtSegINorgeSiste12Måneder: !barn.harOppholdtSegINorgeSiste12Måneder,
                            });
                        }}
                    />

                    <TextareaLesbar
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
