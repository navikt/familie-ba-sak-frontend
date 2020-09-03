import * as React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
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
            <Undertittel children={'Hva har bruker søkt om?'} />
            <br />
            <FamilieRadioGruppe
                erLesevisning={lesevisning}
                verdi={behandlingUnderkategori[søknad.underkategori].navn}
            >
                <Radio
                    label={'Ordinær barnetrygd'}
                    name={'ordinær-barnetrygd'}
                    checked={søknad.underkategori === BehandlingUnderkategori.ORDINÆR}
                    onChange={() => radioOnChange(BehandlingUnderkategori.ORDINÆR)}
                />
                <Radio
                    label={'Utvidet barnetrygd'}
                    name={'utvidet-barnetrygd'}
                    checked={søknad.underkategori === BehandlingUnderkategori.UTVIDET}
                    onChange={() => radioOnChange(BehandlingUnderkategori.UTVIDET)}
                />
            </FamilieRadioGruppe>
        </PanelBase>
    );
};

export default SøknadType;
