import * as React from 'react';
import { ISøknadDTO } from '../../../typer/søknad';
import PanelBase from 'nav-frontend-paneler';
import { Undertittel } from 'nav-frontend-typografi';
import { Input, Textarea } from 'nav-frontend-skjema';
import CheckboxFelt from '../../Felleskomponenter/InputMedLesevisning/CheckboxFelt';
import { useFagsakRessurser } from '../../../context/FagsakContext';

interface IProps {
    settSøknad: (søknad: ISøknadDTO) => void;
    søknad: ISøknadDTO;
}

const SøkerOppholdINorge: React.FunctionComponent<IProps> = ({ settSøknad, søknad }) => {
    const { erLesevisning } = useFagsakRessurser();
    return (
        <PanelBase className={'søknad__panel'}>
            <Undertittel children={'2.3 Hva har bruker søkt om?'} />
            <br />
            <CheckboxFelt
                visLeseversjon={erLesevisning()}
                label={'Søker oppholder seg ikke i Norge'}
                checked={!søknad.søkerMedOpplysninger.oppholderSegINorge}
                onChange={() => {
                    settSøknad({
                        ...søknad,
                        søkerMedOpplysninger: {
                            ...søknad.søkerMedOpplysninger,
                            oppholderSegINorge: !søknad.søkerMedOpplysninger.oppholderSegINorge,
                        },
                    });
                }}
            />

            <br />
            <CheckboxFelt
                visLeseversjon={erLesevisning()}
                label={'Søker har ikke oppholdt seg sammenhengende i Norge de siste 12 månedene'}
                checked={!søknad.søkerMedOpplysninger.harOppholdtSegINorgeSiste12Måneder}
                onChange={() => {
                    settSøknad({
                        ...søknad,
                        søkerMedOpplysninger: {
                            ...søknad.søkerMedOpplysninger,
                            harOppholdtSegINorgeSiste12Måneder: !søknad.søkerMedOpplysninger
                                .harOppholdtSegINorgeSiste12Måneder,
                        },
                    });
                }}
            />

            <br />
            {!søknad.søkerMedOpplysninger.harOppholdtSegINorgeSiste12Måneder && (
                <div className={'søknad__panel--innrykk'}>
                    <Input
                        label={'Når kom søker til Norge?'}
                        bredde={'S'}
                        value={søknad.søkerMedOpplysninger.komTilNorge}
                        placeholder={'MM.YY'}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            settSøknad({
                                ...søknad,
                                søkerMedOpplysninger: {
                                    ...søknad.søkerMedOpplysninger,
                                    komTilNorge: event.target.value,
                                },
                            });
                        }}
                    />

                    <br />
                    <CheckboxFelt
                        visLeseversjon={erLesevisning()}
                        label={'Søker skal ikke oppholde seg i Norge de neste 12 månedene'}
                        checked={!søknad.søkerMedOpplysninger.skalOppholdeSegINorgeNeste12Måneder}
                        onChange={() => {
                            settSøknad({
                                ...søknad,
                                søkerMedOpplysninger: {
                                    ...søknad.søkerMedOpplysninger,
                                    skalOppholdeSegINorgeNeste12Måneder: !søknad
                                        .søkerMedOpplysninger.skalOppholdeSegINorgeNeste12Måneder,
                                },
                            });
                        }}
                    />

                    <br />
                    <Textarea
                        label={'8 Tilleggsopplysninger'}
                        value={søknad.søkerMedOpplysninger.tilleggsopplysninger ?? ''}
                        placeholder={'Skriv her'}
                        maxLength={500}
                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                            settSøknad({
                                ...søknad,
                                søkerMedOpplysninger: {
                                    ...søknad.søkerMedOpplysninger,
                                    tilleggsopplysninger: event.target.value,
                                },
                            });
                        }}
                    />
                </div>
            )}
        </PanelBase>
    );
};

export default SøkerOppholdINorge;
