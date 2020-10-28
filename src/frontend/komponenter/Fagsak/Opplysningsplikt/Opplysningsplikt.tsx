import React, { ChangeEvent } from 'react';
import { useHistory } from 'react-router';
import { IFagsak } from '../../../typer/fagsak';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import { IBehandling } from '../../../typer/behandling';
import { FamilieRadioGruppe, FamilieTextarea } from '@navikt/familie-form-elements';
import { useBehandling } from '../../../context/BehandlingContext';
import { Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import { OpplysningspliktStatus } from '../../../typer/opplysningsplikt';
import { byggTomRessurs, Ressurs, RessursStatus } from '@navikt/familie-typer';
import { useFagsakRessurser } from '../../../context/FagsakContext';
import Statuslinje from './Statuslinje';
import { Resultat } from '../../../typer/vilkår';
import styled from 'styled-components';
import { Undertekst } from 'nav-frontend-typografi';
import { useSkjema } from '../../../typer/skjema';
import { feil, IFelt, nyttFelt, ok } from '../../../typer/felt';

interface IOpplysningspliktProps {
    fagsak: IFagsak;
    åpenBehandling: IBehandling;
}

const SkjemaContainer = styled.div`
    display: flex;
    margin: 2rem 0;
`;

const StyledSkjemaGruppe = styled(SkjemaGruppe)`
    padding-left: 1rem;
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
    const { skjema, oppdaterFeltISkjema, hentFeltProps, onSubmit } = useSkjema<IFagsak>({
        felter: {
            status: nyttFelt<OpplysningspliktStatus>(
                åpenBehandling.opplysningsplikt?.status ?? OpplysningspliktStatus.IKKE_SATT,
                (felt: IFelt<OpplysningspliktStatus>) =>
                    felt.verdi !== OpplysningspliktStatus.IKKE_SATT
                        ? ok(felt)
                        : feil(felt, 'Du må velge en status')
            ),
            begrunnelse: nyttFelt<string>(åpenBehandling.opplysningsplikt?.begrunnelse ?? ''),
        },
        skjemanavn: 'opplysningsplikt',
        submitRessurs: byggTomRessurs(),
        visFeilmeldinger: false,
    });
    const { settFagsak } = useFagsakRessurser();

    const nesteOnClick = () => {
        if (!lesevisning) {
            onSubmit(
                {
                    method: 'PUT',
                    data: {
                        status: skjema.felter['status'].verdi,
                        begrunnelse: skjema.felter['begrunnelse'].verdi,
                    },
                    url: `/familie-ba-sak/api/opplysningsplikt/${fagsak.id}/${åpenBehandling?.behandlingId}`,
                },
                (response: Ressurs<IFagsak>) => {
                    settFagsak(response);
                    history.push(
                        `/fagsak/${fagsak.id}/${åpenBehandling?.behandlingId}/vilkaarsvurdering`
                    );
                }
            );
        }
    };

    const forrigeOnClick = () => {
        history.push(`/fagsak/${fagsak.id}/${åpenBehandling?.behandlingId}/registrer-soknad`);
    };

    const begrunnelseOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        oppdaterFeltISkjema('begrunnelse', event.target.value);
    };

    const radioOnChange = (status: OpplysningspliktStatus) => {
        oppdaterFeltISkjema('status', status);
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
            senderInn={skjema.submitRessurs.status === RessursStatus.HENTER}
            tittel="Opplysningsplikt"
            forrigeOnClick={forrigeOnClick}
            nesteOnClick={nesteOnClick}
            nesteKnappTittel={lesevisning ? 'Neste' : 'Bekreft og fortsett'}
        >
            <SkjemaContainer>
                <Statuslinje resultat={opplysningspliktResultat()} />
                <StyledSkjemaGruppe
                    className={'opplysningsplikt__skjema'}
                    feil={
                        skjema.submitRessurs.status === RessursStatus.FEILET
                            ? skjema.submitRessurs.frontendFeilmelding
                            : undefined
                    }
                    utenFeilPropagering={true}
                >
                    <StyledFamilieRadioGruppe
                        {...hentFeltProps('status')}
                        erLesevisning={lesevisning}
                        legend={
                            <>
                                Ta stilling til om opplysningsplikten er oppfylt{' '}
                                <Undertekst tag={'span'}>(§17 OG 18)</Undertekst>
                            </>
                        }
                    >
                        <Radio
                            label={'Mottatt dokumentasjon'}
                            name="opplysningsplikt"
                            onChange={() => radioOnChange(OpplysningspliktStatus.MOTTATT)}
                            checked={
                                skjema.felter['status'].verdi === OpplysningspliktStatus.MOTTATT
                            }
                        />
                        <Radio
                            label={'Ikke mottatt dokumentasjon'}
                            name="opplysningsplikt"
                            onChange={() =>
                                radioOnChange(OpplysningspliktStatus.IKKE_MOTTATT_AVSLAG)
                            }
                            checked={
                                skjema.felter['status'].verdi ===
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
                                skjema.felter['status'].verdi ===
                                OpplysningspliktStatus.IKKE_MOTTATT_FORTSETT
                            }
                        />
                    </StyledFamilieRadioGruppe>

                    <FamilieTextarea
                        erLesevisning={lesevisning}
                        label={'Begrunnelse (valgfri)'}
                        {...hentFeltProps('begrunnelse')}
                        maxLength={1500}
                        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                            begrunnelseOnChange(event);
                        }}
                    />
                </StyledSkjemaGruppe>
            </SkjemaContainer>
        </Skjemasteg>
    );
};

export default Opplysningsplikt;
