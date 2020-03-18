import * as React from 'react';
import PanelBase from 'nav-frontend-paneler';
import { ISøknadDTO, IPartMedOpplysninger } from '../../../typer/søknad';
import { Undertittel } from 'nav-frontend-typografi';
import { CheckboksPanelGruppe, Checkbox } from 'nav-frontend-skjema';

interface IProps {
    settSøknad: (søknad: ISøknadDTO) => void;
    søknad: ISøknadDTO;
}

const Barn: React.FunctionComponent<IProps> = ({ settSøknad, søknad }) => {
    const [oppholderSegIUtlandet, settOppholderSegIUtlandet] = React.useState(false);

    return (
        <PanelBase className={'søknad__barn'}>
            <Undertittel children={'5 Opplysninger om barn under 18 år'} />
            <br />
            <PanelBase className={'panel--gra'}>
                <CheckboksPanelGruppe
                    legend={'Velg barna det søkes barnetrygd for'}
                    checkboxes={[
                        ...søknad.barnaMedOpplysninger.map(
                            (barnMedOpplysninger: IPartMedOpplysninger) => {
                                return {
                                    label: barnMedOpplysninger.ident,
                                    value: barnMedOpplysninger.ident,
                                    id: barnMedOpplysninger.ident,
                                    checked: barnMedOpplysninger.checked,
                                };
                            }
                        ),
                    ]}
                    onChange={(event: any) => {
                        settSøknad({
                            ...søknad,
                            barnaMedOpplysninger: [
                                ...søknad.barnaMedOpplysninger.map((it: IPartMedOpplysninger) => {
                                    if (it.ident !== event.target.value) {
                                        return it;
                                    } else {
                                        return {
                                            ...it,
                                            checked: !it.checked,
                                        };
                                    }
                                }),
                            ],
                        });
                    }}
                />
            </PanelBase>

            <br />

            <Undertittel children={'5.5 Opplysninger om barn under 18 år'} />
            <Checkbox
                label={'5.5.1 Noen av barna oppholder seg i utlandet'}
                checked={oppholderSegIUtlandet}
                onChange={() => {
                    settOppholderSegIUtlandet(!oppholderSegIUtlandet);
                }}
            />
            {oppholderSegIUtlandet && <div />}
        </PanelBase>
    );
};

export default Barn;
