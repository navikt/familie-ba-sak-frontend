import React, { ChangeEvent, useState } from 'react';
import { useHistory } from 'react-router';
import { IFagsak } from '../../../typer/fagsak';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import { IBehandling } from '../../../typer/behandling';
import { FamilieRadioGruppe, FamilieTextarea } from '@navikt/familie-form-elements';
import { useBehandling } from '../../../context/BehandlingContext';
import { Radio } from 'nav-frontend-skjema';
import { IOpplysningsplikt, OpplysningspliktStatus } from '../../../typer/opplysningsplikt';
import { Ressurs } from '@navikt/familie-typer';
import { AxiosError } from 'axios';
import { useApp } from '../../../context/AppContext';
import { useFagsakRessurser } from '../../../context/FagsakContext';

interface ITilkjentYtelseProps {
    fagsak: IFagsak;
    åpenBehandling: IBehandling;
}

const Opplysningsplikt: React.FunctionComponent<ITilkjentYtelseProps> = ({
    fagsak,
    åpenBehandling,
}) => {
    const history = useHistory();
    const { erLesevisning } = useBehandling();
    const lesevisning = erLesevisning();
    const [opplysningsplikt, settOpplysningsplikt] = useState<IOpplysningsplikt>({
        status: undefined,
        begrunnelse: '',
    });
    const { axiosRequest } = useApp();
    const { settFagsak } = useFagsakRessurser();

    const nesteOnClick = () => {
        if (!lesevisning) {
            axiosRequest<IFagsak, IOpplysningsplikt>({
                method: 'PUT',
                data: opplysningsplikt,
                url: `/familie-ba-sak/api/opplysningsplikt/${fagsak.id}/${åpenBehandling?.behandlingId}`,
            })
                .then((response: Ressurs<IFagsak>) => {
                    settFagsak(response);
                })
                .catch((_error: AxiosError) => {
                    //todo: feilmelding?
                    console.log(_error);
                });
        }

        history.push(`/fagsak/${fagsak.id}/${åpenBehandling?.behandlingId}/vilkaarsvurdering`);
    };

    const forrigeOnClick = () => {
        history.push(`/fagsak/${fagsak.id}/${åpenBehandling?.behandlingId}/registrer-soknad`);
    };

    const begrunnelseOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        settOpplysningsplikt(opplysningsplikt => ({
            ...opplysningsplikt,
            begrunnelse: event.target.value,
        }));
    };

    const radioOnChange = (status: OpplysningspliktStatus) => {
        settOpplysningsplikt(opplysningsplikt => ({
            ...opplysningsplikt,
            status,
        }));
    };

    return (
        <Skjemasteg
            senderInn={false}
            tittel="Opplysningsplikt"
            forrigeOnClick={forrigeOnClick}
            nesteOnClick={nesteOnClick}
            nesteKnappTittel={lesevisning ? 'Neste' : 'Bekreft og fortsett'}
        >
            <FamilieRadioGruppe
                erLesevisning={lesevisning}
                legend={'Ta stilling til om opplysningsplikten er oppfylt'}
            >
                <Radio
                    label={'Mottatt dokumentasjon'}
                    name="opplysningsplikt"
                    onChange={() => radioOnChange(OpplysningspliktStatus.MOTTATT)}
                />
                <Radio
                    label={'Ikke mottatt dokumentasjon'}
                    name="opplysningsplikt"
                    onChange={() => radioOnChange(OpplysningspliktStatus.IKKE_MOTTATT_AVSLAG)}
                />
                <Radio
                    label={'Fortsett med manglende dokumentasjon'}
                    name="opplysningsplikt"
                    onChange={() => radioOnChange(OpplysningspliktStatus.IKKE_MOTTATT_FORTSETT)}
                />
            </FamilieRadioGruppe>

            <FamilieTextarea
                erLesevisning={lesevisning}
                label={'Begrunnelse (valgfri)'}
                value={opplysningsplikt.begrunnelse}
                maxLength={2000}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                    begrunnelseOnChange(event);
                }}
            />
        </Skjemasteg>
    );
};

export default Opplysningsplikt;
