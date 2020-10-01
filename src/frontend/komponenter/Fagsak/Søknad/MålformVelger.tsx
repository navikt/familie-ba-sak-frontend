import * as React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import PanelBase from 'nav-frontend-paneler';
import { useBehandling } from '../../../context/BehandlingContext';
import { ISøknadDTO, Målform, målform } from '../../../typer/søknad';
import { Radio } from 'nav-frontend-skjema';
import { FamilieRadioGruppe } from '@navikt/familie-form-elements/dist';

interface IProps {
    settSøknadOgValider: (søknad: ISøknadDTO) => void;
    søknad: ISøknadDTO;
}

const MålformVelger: React.FunctionComponent<IProps> = ({ settSøknadOgValider, søknad }) => {
    const { erLesevisning } = useBehandling();
    const lesevisning = erLesevisning();

    const radioOnChange = (målform: Målform) => {
        settSøknadOgValider({
            ...søknad,
            søkerMedOpplysninger: {
                ...søknad.søkerMedOpplysninger,
                målform: målform,
            },
        });
    };

    return (
        <PanelBase key={'målform'}>
            <Systemtittel children={'Målform'} />
            <br />
            <FamilieRadioGruppe
                erLesevisning={lesevisning}
                verdi={
                    søknad.søkerMedOpplysninger.målform
                        ? målform[søknad.søkerMedOpplysninger.målform].navn
                        : undefined
                }
            >
                <Radio
                    label={målform[Målform.NB].navn}
                    name={Målform[Målform.NB]}
                    checked={søknad.søkerMedOpplysninger.målform === Målform.NB}
                    onChange={() => radioOnChange(Målform.NB)}
                />
                <Radio
                    label={målform[Målform.NN].navn}
                    name={Målform[Målform.NN]}
                    checked={søknad.søkerMedOpplysninger.målform === Målform.NN}
                    onChange={() => radioOnChange(Målform.NN)}
                />
            </FamilieRadioGruppe>
        </PanelBase>
    );
};

export default MålformVelger;
