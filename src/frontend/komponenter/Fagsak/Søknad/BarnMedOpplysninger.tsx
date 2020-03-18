import * as React from 'react';
import { useSøknad } from '../../../context/SøknadContext';
import { IBarnMedOpplysninger } from '../../../typer/søknad';
import { Checkbox, Textarea } from 'nav-frontend-skjema';

interface IProps {
    barn: IBarnMedOpplysninger;
}

const BarnMedOpplysninger: React.FunctionComponent<IProps> = ({ barn }) => {
    const { settBarn } = useSøknad();

    return (
        <div>
            <Checkbox
                label={barn.ident}
                checked={barn.checked}
                onChange={() => {
                    settBarn({
                        ...barn,
                        checked: !barn.checked,
                    });
                }}
            />
            <div className={'søknad__panel--innrykk'}>
                <Checkbox
                    label={'5.1 Barnet bor ikke fast sammen med søker'}
                    checked={!barn.borMedSøker}
                    onChange={() => {
                        settBarn({
                            ...barn,
                            borMedSøker: !barn.borMedSøker,
                        });
                    }}
                />

                <Checkbox
                    label={'5.5.1 Barnet oppholder seg i utlandet'}
                    checked={!barn.oppholderSegINorge}
                    onChange={() => {
                        settBarn({
                            ...barn,
                            oppholderSegINorge: !barn.oppholderSegINorge,
                        });
                    }}
                />

                <Checkbox
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

                <Textarea
                    label={'Tilleggsopplysninger'}
                    placeholder={'Skriv her'}
                    value={barn.tilleggsopplysninger ?? ''}
                    onChange={(event: any) =>
                        settBarn({ ...barn, tilleggsopplysninger: event.target.value })
                    }
                />
            </div>
        </div>
    );
};

export default BarnMedOpplysninger;
