import * as React from 'react';
import moment from 'moment';
import { useSøknad } from '../../../context/SøknadContext';
import { IBarnMedOpplysninger } from '../../../typer/søknad';
import { Textarea } from 'nav-frontend-skjema';
import CheckboxFelt from '../../Felleskomponenter/InputMedLesevisning/CheckboxFelt';
import { useFagsakRessurser } from '../../../context/FagsakContext';
import TextareaFelt from '../../Felleskomponenter/InputMedLesevisning/TextareaFelt';

interface IProps {
    barn: IBarnMedOpplysninger;
}

const BarnMedOpplysninger: React.FunctionComponent<IProps> = ({ barn }) => {
    const { settBarn } = useSøknad();
    const { erLesevisning } = useFagsakRessurser();
    const alder = barn.fødselsdato
        ? moment().diff(moment(barn.fødselsdato, 'YYYY-MM-DD'), 'years')
        : 'ukjent';

    return (
        <div>
            <CheckboxFelt
                visLeseversjon={erLesevisning()}
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
                    <CheckboxFelt
                        visLeseversjon={erLesevisning()}
                        label={'5.1 Barnet bor ikke fast sammen med søker'}
                        checked={!barn.borMedSøker}
                        onChange={() => {
                            settBarn({
                                ...barn,
                                borMedSøker: !barn.borMedSøker,
                            });
                        }}
                    />

                    <CheckboxFelt
                        visLeseversjon={erLesevisning()}
                        label={'5.5.1 Barnet oppholder seg i utlandet'}
                        checked={!barn.oppholderSegINorge}
                        onChange={() => {
                            settBarn({
                                ...barn,
                                oppholderSegINorge: !barn.oppholderSegINorge,
                            });
                        }}
                    />

                    <CheckboxFelt
                        visLeseversjon={erLesevisning()}
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

                    <TextareaFelt
                        visLeseversjon={erLesevisning()}
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
