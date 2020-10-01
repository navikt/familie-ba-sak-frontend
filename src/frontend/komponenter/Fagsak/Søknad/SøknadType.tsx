import * as React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import PanelBase from 'nav-frontend-paneler';
import { useBehandling } from '../../../context/BehandlingContext';
import { BehandlingUnderkategori, underkategorier } from '../../../typer/behandling';
import { ISøknadDTO } from '../../../typer/søknad';
import { Radio } from 'nav-frontend-skjema';
import { FamilieRadioGruppe } from '@navikt/familie-form-elements/dist';

interface IProps {
    settSøknadOgValider: (søknad: ISøknadDTO) => void;
    søknad: ISøknadDTO;
}

const SøknadType: React.FunctionComponent<IProps> = ({ settSøknadOgValider, søknad }) => {
    const { erLesevisning } = useBehandling();
    const lesevisning = erLesevisning();

    const radioOnChange = (underKategori: BehandlingUnderkategori) => {
        settSøknadOgValider({
            ...søknad,
            underkategori: underKategori,
        });
    };

    return (
        <PanelBase>
            <Systemtittel children={'Hva har bruker søkt om?'} />
            <br />
            <FamilieRadioGruppe
                erLesevisning={lesevisning}
                verdi={underkategorier[søknad.underkategori].navn}
            >
                <Radio
                    label={underkategorier[BehandlingUnderkategori.ORDINÆR].navn}
                    name={underkategorier[BehandlingUnderkategori.ORDINÆR].id}
                    checked={søknad.underkategori === BehandlingUnderkategori.ORDINÆR}
                    onChange={() => radioOnChange(BehandlingUnderkategori.ORDINÆR)}
                />
                <Radio
                    label={underkategorier[BehandlingUnderkategori.UTVIDET].navn}
                    name={underkategorier[BehandlingUnderkategori.UTVIDET].id}
                    checked={søknad.underkategori === BehandlingUnderkategori.UTVIDET}
                    onChange={() => radioOnChange(BehandlingUnderkategori.UTVIDET)}
                />
            </FamilieRadioGruppe>
        </PanelBase>
    );
};

export default SøknadType;
