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
import Statuslinje from './Statuslinje';
import { Resultat } from '../../../typer/vilkår';
import styled from 'styled-components';

interface IOpplysningspliktProps {
    fagsak: IFagsak;
    åpenBehandling: IBehandling;
}

const SkjemaContainer = styled.div`
    display: flex;
    margin: 2rem 0;
`;

const StyledFamilieRadioGruppe = styled(FamilieRadioGruppe)`
    margin-bottom: 1rem;
`;

const Opplysningsplikt: React.FunctionComponent<IOpplysningspliktProps> = ({
    fagsak,
    åpenBehandling,
}) => {
    const history = useHistory();
    const { erLesevisning } = useBehandling();
    const lesevisning = erLesevisning();
    const [opplysningsplikt, settOpplysningsplikt] = useState<IOpplysningsplikt>({
        status: åpenBehandling.opplysningsplikt?.status,
        begrunnelse: åpenBehandling.opplysningsplikt?.begrunnelse ?? '',
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

    const opplysningspliktResultat = () => {
        switch (åpenBehandling.opplysningsplikt?.status) {
            case OpplysningspliktStatus.MOTTATT:
            case OpplysningspliktStatus.IKKE_MOTTATT_FORTSETT: {
                return Resultat.JA;
            }
            case OpplysningspliktStatus.IKKE_MOTTATT_AVSLAG: {
                return Resultat.NEI;
            }
            default:
                return Resultat.KANSKJE;
        }
    };

    return (
        <Skjemasteg
            className={'opplysningsplikt'}
            senderInn={false}
            tittel="Opplysningsplikt"
            forrigeOnClick={forrigeOnClick}
            nesteOnClick={nesteOnClick}
            nesteKnappTittel={lesevisning ? 'Neste' : 'Bekreft og fortsett'}
        >
            <SkjemaContainer>
                <Statuslinje resultat={opplysningspliktResultat()} />
                <div className={'opplysningsplikt__skjema'}>
                    <StyledFamilieRadioGruppe
                        erLesevisning={lesevisning}
                        legend={
                            <>
                                Ta stilling til om opplysningsplikten er oppfylt{' '}
                                <span>(§17 OG 18)</span>
                            </>
                        }
                    >
                        <Radio
                            label={'Mottatt dokumentasjon'}
                            name="opplysningsplikt"
                            onChange={() => radioOnChange(OpplysningspliktStatus.MOTTATT)}
                            checked={opplysningsplikt.status === OpplysningspliktStatus.MOTTATT}
                        />
                        <Radio
                            label={'Ikke mottatt dokumentasjon'}
                            name="opplysningsplikt"
                            onChange={() =>
                                radioOnChange(OpplysningspliktStatus.IKKE_MOTTATT_AVSLAG)
                            }
                            checked={
                                opplysningsplikt.status ===
                                OpplysningspliktStatus.IKKE_MOTTATT_AVSLAG
                            }
                        />
                        <Radio
                            label={'Fortsett med manglende dokumentasjon'}
                            name="opplysningsplikt"
                            onChange={() =>
                                radioOnChange(OpplysningspliktStatus.IKKE_MOTTATT_FORTSETT)
                            }
                            checked={
                                opplysningsplikt.status ===
                                OpplysningspliktStatus.IKKE_MOTTATT_FORTSETT
                            }
                        />
                    </StyledFamilieRadioGruppe>

                    <FamilieTextarea
                        erLesevisning={lesevisning}
                        label={'Begrunnelse (valgfri)'}
                        value={opplysningsplikt.begrunnelse}
                        maxLength={1500}
                        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                            begrunnelseOnChange(event);
                        }}
                    />
                </div>
            </SkjemaContainer>
        </Skjemasteg>
    );
};

export default Opplysningsplikt;
