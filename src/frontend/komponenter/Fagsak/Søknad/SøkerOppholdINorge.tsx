import * as React from 'react';
import { ISøknadDTO, søknadstyper, TypeSøker } from '../../../typer/søknad';
import PanelBase from 'nav-frontend-paneler';
import { Undertittel } from 'nav-frontend-typografi';
import Sakstype from '../../Felleskomponenter/Sakstype/Sakstype';
import { BehandlingKategori, BehandlingUnderkategori } from '../../../typer/behandling';
import { RadioPanelGruppe, Checkbox, Input, Textarea } from 'nav-frontend-skjema';
import { IPar } from '../../../typer/common';

interface IProps {
    settSøknad: (søknad: ISøknadDTO) => void;
    søknad: ISøknadDTO;
}

const SøkerOppholdINorge: React.FunctionComponent<IProps> = ({ settSøknad, søknad }) => {
    return (
        <PanelBase className={'søknad__panel'}>
            <Undertittel children={'2.3 Hva har bruker søkt om?'} />
            <br />
            <Checkbox
                label={'Søker oppholder seg ikke i Norge'}
                checked={!søknad.søkerMedOpplysninger.opphold.oppholderSegINorge}
                onChange={() => {
                    settSøknad({
                        ...søknad,
                        søkerMedOpplysninger: {
                            ...søknad.søkerMedOpplysninger,
                            opphold: {
                                ...søknad.søkerMedOpplysninger.opphold,
                                oppholderSegINorge: !søknad.søkerMedOpplysninger.opphold
                                    .oppholderSegINorge,
                            },
                        },
                    });
                }}
            />

            <br />
            <Checkbox
                label={'Søker har ikke oppholdt seg sammenhengende i Norge de siste 12 månedene'}
                checked={!søknad.søkerMedOpplysninger.opphold.harOppholdtSegINorgeSiste12Måneder}
                onChange={() => {
                    settSøknad({
                        ...søknad,
                        søkerMedOpplysninger: {
                            ...søknad.søkerMedOpplysninger,
                            opphold: {
                                ...søknad.søkerMedOpplysninger.opphold,
                                harOppholdtSegINorgeSiste12Måneder: !søknad.søkerMedOpplysninger
                                    .opphold.harOppholdtSegINorgeSiste12Måneder,
                            },
                        },
                    });
                }}
            />

            <br />
            {!søknad.søkerMedOpplysninger.opphold.harOppholdtSegINorgeSiste12Måneder && (
                <div className={'søknad__panel--innrykk'}>
                    <Input
                        label={'Når kom søker til Norge?'}
                        bredde={'S'}
                        value={søknad.søkerMedOpplysninger.opphold.komTilNorge}
                        placeholder={'MM.YY'}
                        onChange={(event: any) => {
                            settSøknad({
                                ...søknad,
                                søkerMedOpplysninger: {
                                    ...søknad.søkerMedOpplysninger,
                                    opphold: {
                                        ...søknad.søkerMedOpplysninger.opphold,
                                        komTilNorge: event.target.value,
                                    },
                                },
                            });
                        }}
                    />

                    <br />
                    <Checkbox
                        label={'Søker skal ikke oppholde seg i Norge de neste 12 månedene'}
                        checked={
                            !søknad.søkerMedOpplysninger.opphold.skalOppholdeSegINorgeNeste12Måneder
                        }
                        onChange={() => {
                            settSøknad({
                                ...søknad,
                                søkerMedOpplysninger: {
                                    ...søknad.søkerMedOpplysninger,
                                    opphold: {
                                        ...søknad.søkerMedOpplysninger.opphold,
                                        skalOppholdeSegINorgeNeste12Måneder: !søknad
                                            .søkerMedOpplysninger.opphold
                                            .skalOppholdeSegINorgeNeste12Måneder,
                                    },
                                },
                            });
                        }}
                    />

                    <br />
                    <Textarea
                        label={'8 Tilleggsopplysninger'}
                        value={søknad.søkerMedOpplysninger.opphold.tilleggsopplysninger ?? ''}
                        placeholder={'Skriv her'}
                        maxLength={500}
                        onChange={(event: any) => {
                            settSøknad({
                                ...søknad,
                                søkerMedOpplysninger: {
                                    ...søknad.søkerMedOpplysninger,
                                    opphold: {
                                        ...søknad.søkerMedOpplysninger.opphold,
                                        tilleggsopplysninger: event.target.value,
                                    },
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
