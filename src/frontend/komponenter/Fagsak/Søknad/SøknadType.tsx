import * as React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import PanelBase from 'nav-frontend-paneler';
import { useBehandling } from '../../../context/BehandlingContext';
import { behandlingUnderkategori, BehandlingUnderkategori } from '../../../typer/behandling';
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
                verdi={behandlingUnderkategori[søknad.underkategori].navn}
            >
                <Radio
                    label={behandlingUnderkategori[BehandlingUnderkategori.ORDINÆR].navn}
                    name={behandlingUnderkategori[BehandlingUnderkategori.ORDINÆR].id}
                    checked={søknad.underkategori === BehandlingUnderkategori.ORDINÆR}
                    onChange={() => radioOnChange(BehandlingUnderkategori.ORDINÆR)}
                />
                <Radio
                    label={behandlingUnderkategori[BehandlingUnderkategori.UTVIDET].navn}
                    name={behandlingUnderkategori[BehandlingUnderkategori.UTVIDET].id}
                    checked={søknad.underkategori === BehandlingUnderkategori.UTVIDET}
                    onChange={() => radioOnChange(BehandlingUnderkategori.UTVIDET)}
                />
            </FamilieRadioGruppe>
        </PanelBase>
    );
};

export default SøknadType;
