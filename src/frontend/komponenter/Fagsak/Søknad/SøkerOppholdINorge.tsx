import * as React from 'react';
import { ISøknadDTO } from '../../../typer/søknad';
import PanelBase from 'nav-frontend-paneler';
import { Undertittel } from 'nav-frontend-typografi';
import FamilieCheckbox from '../../Felleskomponenter/InputMedLesevisning/FamilieCheckbox';
import FamilieTextarea from '../../Felleskomponenter/InputMedLesevisning/FamilieTextarea';
import FamilieInput from '../../Felleskomponenter/InputMedLesevisning/FamilieInput';
import MinimumOpplysningAlternativ from '../../Felleskomponenter/InputMedLesevisning/IngenOpplysningerValgt';

interface IProps {
    settSøknad: (søknad: ISøknadDTO) => void;
    søknad: ISøknadDTO;
}

const SøkerOppholdINorge: React.FunctionComponent<IProps> = ({ settSøknad, søknad }) => {
    return (
        <PanelBase className={'søknad__opphold'}>
            <Undertittel children={'2.3 Hva har bruker søkt om?'} />
            <MinimumOpplysningAlternativ
                minimumOpplysning={[
                    søknad.søkerMedOpplysninger.oppholderSegINorge,
                    søknad.søkerMedOpplysninger.harOppholdtSegINorgeSiste12Måneder,
                ]}
            />
            <FamilieCheckbox
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

            <FamilieCheckbox
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

            {!søknad.søkerMedOpplysninger.harOppholdtSegINorgeSiste12Måneder && (
                <div className={'søknad__panel--innrykk'}>
                    <FamilieInput
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

                    <FamilieCheckbox
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

                    <FamilieTextarea
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
