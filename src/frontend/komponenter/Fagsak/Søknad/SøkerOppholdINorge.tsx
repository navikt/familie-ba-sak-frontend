import { FamilieCheckbox } from '@navikt/familie-form-elements';
import { ISODateString } from 'nav-datovelger';
import PanelBase from 'nav-frontend-paneler';
import { Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { useBehandling } from '../../../context/BehandlingContext';
import { ISøknadDTO } from '../../../typer/søknad';
import { datoformatNorsk } from '../../../utils/formatter';
import FamilieDatovelger from '../../Felleskomponenter/InputMedLesevisning/FamilieDatovelger';
import FamilieTextarea from '../../Felleskomponenter/InputMedLesevisning/FamilieTextarea';
import MinimumOpplysningAlternativ from '../../Felleskomponenter/InputMedLesevisning/IngenOpplysningerValgt';

interface IProps {
    settSøknadOgValider: (søknad: ISøknadDTO) => void;
    søknad: ISøknadDTO;
}

const SøkerOppholdINorge: React.FunctionComponent<IProps> = ({ settSøknadOgValider, søknad }) => {
    const { erLesevisning } = useBehandling();
    return (
        <PanelBase className={'søknad__opphold'}>
            <Undertittel children={'Opplysninger om søker'} />
            <MinimumOpplysningAlternativ
                minimumOpplysning={[
                    !søknad.søkerMedOpplysninger.oppholderSegINorge,
                    !søknad.søkerMedOpplysninger.harOppholdtSegINorgeSiste12Måneder,
                ]}
            />
            <FamilieCheckbox
                erLesevisning={erLesevisning()}
                label={'Søker oppholder seg ikke i Norge'}
                checked={!søknad.søkerMedOpplysninger.oppholderSegINorge}
                onChange={() => {
                    settSøknadOgValider({
                        ...søknad,
                        søkerMedOpplysninger: {
                            ...søknad.søkerMedOpplysninger,
                            oppholderSegINorge: !søknad.søkerMedOpplysninger.oppholderSegINorge,
                        },
                    });
                }}
            />

            <FamilieCheckbox
                erLesevisning={erLesevisning()}
                label={'Søker har ikke oppholdt seg sammenhengende i Norge de siste 12 månedene'}
                checked={!søknad.søkerMedOpplysninger.harOppholdtSegINorgeSiste12Måneder}
                onChange={() => {
                    settSøknadOgValider({
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
                    <FamilieDatovelger
                        id={'søker-kom-til-norge'}
                        label={'Når kom søker til Norge?'}
                        valgtDato={søknad.søkerMedOpplysninger.komTilNorge}
                        placeholder={datoformatNorsk.DATO}
                        onChange={(dato?: ISODateString) => {
                            settSøknadOgValider({
                                ...søknad,
                                søkerMedOpplysninger: {
                                    ...søknad.søkerMedOpplysninger,
                                    komTilNorge: dato,
                                },
                            });
                        }}
                    />

                    <FamilieCheckbox
                        erLesevisning={erLesevisning()}
                        label={'Søker skal ikke oppholde seg i Norge de neste 12 månedene'}
                        checked={!søknad.søkerMedOpplysninger.skalOppholdeSegINorgeNeste12Måneder}
                        onChange={() => {
                            settSøknadOgValider({
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
                        label={'Tilleggsopplysninger'}
                        value={søknad.søkerMedOpplysninger.tilleggsopplysninger ?? ''}
                        placeholder={'Skriv her'}
                        maxLength={500}
                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                            settSøknadOgValider({
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
