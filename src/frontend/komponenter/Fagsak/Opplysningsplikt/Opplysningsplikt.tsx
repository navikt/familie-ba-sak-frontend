import React from 'react';
import { useHistory } from 'react-router';
import { IFagsak } from '../../../typer/fagsak';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import { IBehandling } from '../../../typer/behandling';
import { FamilieRadioGruppe, FamilieTextarea } from '@navikt/familie-form-elements';
import { useBehandling } from '../../../context/BehandlingContext';
import { Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import {
    OpplysningspliktStatus,
    opplysningspliktVisningtekst,
} from '../../../typer/opplysningsplikt';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';
import { useFagsakRessurser } from '../../../context/FagsakContext';
import Statuslinje from './Statuslinje';
import { Resultat } from '../../../typer/vilkår';
import styled from 'styled-components';
import { Undertekst } from 'nav-frontend-typografi';
import { useSkjema } from '../../../familie-skjema/skjema';
import { FeltState } from '../../../familie-skjema/typer';
import { useFelt } from '../../../familie-skjema/felt';
import { feil, ok } from '../../../familie-skjema/validators';

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

const Paragraf = styled(Undertekst)`
    margin-left: 0.75rem;
`;

const Opplysningsplikt: React.FunctionComponent<IOpplysningspliktProps> = ({
    fagsak,
    åpenBehandling,
}) => {
    const history = useHistory();
    const { erLesevisning } = useBehandling();
    const lesevisning = erLesevisning();

    const { skjema, onSubmit } = useSkjema<
        {
            status: OpplysningspliktStatus;
            begrunnelse: string;
        },
        IFagsak
    >({
        felter: {
            status: useFelt({
                verdi: åpenBehandling.opplysningsplikt?.status ?? OpplysningspliktStatus.IKKE_SATT,
                valideringsfunksjon: (felt: FeltState<OpplysningspliktStatus>) =>
                    felt.verdi !== OpplysningspliktStatus.IKKE_SATT
                        ? ok(felt)
                        : feil(felt, 'Du må velge en status'),
            }),
            begrunnelse: useFelt({
                verdi: åpenBehandling.opplysningsplikt?.begrunnelse ?? '',
            }),
        },
        skjemanavn: 'opplysningsplikt',
    });
    const { settFagsak } = useFagsakRessurser();

    const skjulBegrunnelse = lesevisning && !skjema.felter['begrunnelse'].verdi;

    const nesteOnClick = () => {
        if (!lesevisning) {
            onSubmit(
                {
                    method: 'PUT',
                    data: {
                        status: skjema.felter.status.verdi,
                        begrunnelse: skjema.felter.begrunnelse.verdi,
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

    const radioOnChange = (status: OpplysningspliktStatus) => {
        skjema.felter.status.onChange(status);
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
            senderInn={skjema.submitRessurs.status === RessursStatus.HENTER}
            tittel="Opplysningsplikt"
            forrigeOnClick={forrigeOnClick}
            nesteOnClick={nesteOnClick}
            nesteKnappTittel={lesevisning ? 'Neste' : 'Bekreft og fortsett'}
        >
            <SkjemaContainer>
                <Statuslinje resultat={opplysningspliktResultat()} />
                <SkjemaGruppe
                    feil={
                        skjema.submitRessurs.status === RessursStatus.FEILET
                            ? skjema.submitRessurs.frontendFeilmelding
                            : undefined
                    }
                    utenFeilPropagering={true}
                >
                    <StyledFamilieRadioGruppe
                        {...skjema.felter.status.hentNavRadiogruppeProps(skjema.visFeilmeldinger)}
                        erLesevisning={lesevisning}
                        verdi={
                            opplysningspliktVisningtekst[
                                skjema.felter.status.verdi as OpplysningspliktStatus
                            ]
                        }
                        legend={
                            <>
                                Ta stilling til om opplysningsplikten er oppfylt
                                <Paragraf tag={'span'}>§§ 17 OG 18</Paragraf>
                            </>
                        }
                    >
                        <Radio
                            label={opplysningspliktVisningtekst[OpplysningspliktStatus.MOTTATT]}
                            name="opplysningsplikt"
                            onChange={() => radioOnChange(OpplysningspliktStatus.MOTTATT)}
                            checked={skjema.felter.status.verdi === OpplysningspliktStatus.MOTTATT}
                        />
                        <Radio
                            label={
                                opplysningspliktVisningtekst[
                                    OpplysningspliktStatus.IKKE_MOTTATT_AVSLAG
                                ]
                            }
                            name="opplysningsplikt"
                            onChange={() =>
                                radioOnChange(OpplysningspliktStatus.IKKE_MOTTATT_AVSLAG)
                            }
                            checked={
                                skjema.felter.status.verdi ===
                                OpplysningspliktStatus.IKKE_MOTTATT_AVSLAG
                            }
                        />
                        <Radio
                            label={
                                opplysningspliktVisningtekst[
                                    OpplysningspliktStatus.IKKE_MOTTATT_FORTSETT
                                ]
                            }
                            name="opplysningsplikt"
                            onChange={() =>
                                radioOnChange(OpplysningspliktStatus.IKKE_MOTTATT_FORTSETT)
                            }
                            checked={
                                skjema.felter.status.verdi ===
                                OpplysningspliktStatus.IKKE_MOTTATT_FORTSETT
                            }
                        />
                    </StyledFamilieRadioGruppe>

                    {!skjulBegrunnelse && (
                        <FamilieTextarea
                            {...skjema.felter.begrunnelse.hentNavInputProps(
                                skjema.visFeilmeldinger
                            )}
                            value={skjema.felter.begrunnelse.verdi}
                            erLesevisning={lesevisning}
                            label={'Begrunnelse (valgfri)'}
                            maxLength={1500}
                        />
                    )}
                </SkjemaGruppe>
            </SkjemaContainer>
        </Skjemasteg>
    );
};

export default Opplysningsplikt;
