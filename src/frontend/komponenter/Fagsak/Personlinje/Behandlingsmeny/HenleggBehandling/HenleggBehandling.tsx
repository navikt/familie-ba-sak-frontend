import { FamilieSelect, FamilieTextarea } from '@navikt/familie-form-elements';
import KnappBase, { Flatknapp, Knapp } from 'nav-frontend-knapper';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import React, { useState } from 'react';
import UIModalWrapper from '../../../../Felleskomponenter/Modal/UIModalWrapper';
import {
    BehandlingSteg,
    henleggelseÅrsak,
    HenleggelseÅrsak,
    IBehandling,
} from '../../../../../typer/behandling';
import useHenleggBehandling from './useHenleggBehandling';
import { RessursStatus } from '@navikt/familie-typer';
import { useHistory } from 'react-router';
import { IFagsak } from '../../../../../typer/fagsak';
import { Normaltekst } from 'nav-frontend-typografi';
import Oppfylt from '../../../../../ikoner/Oppfylt';
import styled from 'styled-components';
import { useBehandling } from '../../../../../context/BehandlingContext';
import SkjultLegend from '../../../../Felleskomponenter/SkjultLegend';
import Lenke from 'nav-frontend-lenker';
import useForhåndsvisning from './useForhåndsvisning';

interface IProps {
    onListElementClick: () => void;
    fagsak: IFagsak;
    behandling: IBehandling;
}

interface HenleggelseÅrsakSelect extends HTMLSelectElement {
    value: HenleggelseÅrsak | '';
}

const StyledVeivalgTekst = styled(Normaltekst)`
    position: relative;
    top: -32px;
`;

const StyledVeivalgIkon = styled(Oppfylt)`
    position: relative;
    top: 7px;
    margin-right: 10px;
`;

const StyledLenke = styled(Lenke)`
    margin-right: auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
`;

const HenleggBehandling: React.FC<IProps> = ({ onListElementClick, fagsak, behandling }) => {
    const history = useHistory();
    const [visModal, settVisModal] = useState(false);
    const { erLesevisning } = useBehandling();
    const { hentForhåndsvisning } = useForhåndsvisning();
    const { åpenBehandling } = useBehandling();

    const behandlingId =
        åpenBehandling.status === RessursStatus.SUKSESS && åpenBehandling.data.behandlingId;

    const {
        hentFeltProps,
        onBekreft,
        oppdaterFeltISkjema,
        settInitialState,
        settVisVeivalgModal,
        skjema,
        visVeivalgModal,
        hentSkjemaData,
    } = useHenleggBehandling(() => {
        settVisModal(false);
    });

    return (
        <>
            <KnappBase
                mini={true}
                onClick={() => {
                    onListElementClick();
                    settVisModal(true);
                }}
                disabled={
                    erLesevisning() &&
                    ![
                        BehandlingSteg.REGISTRERE_SØKNAD,
                        BehandlingSteg.REGISTRERE_PERSONGRUNNLAG,
                        BehandlingSteg.VILKÅRSVURDERING,
                        BehandlingSteg.SEND_TIL_BESLUTTER,
                    ].includes(behandling.steg)
                }
            >
                Henlegg behandling
            </KnappBase>

            <UIModalWrapper
                modal={{
                    actions: [
                        <StyledLenke
                            href="#"
                            onClick={() => {
                                hentForhåndsvisning({
                                    method: 'POST',
                                    data: hentSkjemaData(),
                                    url: `/familie-ba-sak/api/dokument/forhaandsvis-brev/${behandlingId}`,
                                });
                            }}
                            hidden={skjema.felter.årsak.verdi !== HenleggelseÅrsak.SØKNAD_TRUKKET}
                        >
                            Forhåndsvis
                        </StyledLenke>,
                        <Flatknapp
                            key={'avbryt'}
                            mini={true}
                            onClick={() => {
                                settInitialState();
                                settVisModal(false);
                            }}
                            children={'Avbryt'}
                        />,
                        <Knapp
                            key={'bekreft'}
                            type={'hoved'}
                            mini={true}
                            onClick={() => onBekreft(behandling.behandlingId)}
                            children={
                                skjema.felter.årsak.verdi === HenleggelseÅrsak.SØKNAD_TRUKKET
                                    ? 'Bekreft og send brev'
                                    : 'Bekreft'
                            }
                        />,
                    ],
                    onClose: () => {
                        settInitialState();
                        settVisModal(false);
                    },
                    lukkKnapp: true,
                    tittel: 'Henlegg behandling',
                    visModal,
                }}
            >
                <SkjemaGruppe
                    feil={
                        skjema.submitRessurs.status === RessursStatus.FEILET
                            ? skjema.submitRessurs.frontendFeilmelding
                            : undefined
                    }
                    legend={SkjultLegend({ children: 'Henlegg behandling' })}
                >
                    <FamilieSelect
                        {...hentFeltProps('årsak')}
                        label={'Velg årsak'}
                        onChange={(event: React.ChangeEvent<HenleggelseÅrsakSelect>): void => {
                            oppdaterFeltISkjema('årsak', event.target.value);
                        }}
                    >
                        <option disabled={true} value={''}>
                            Velg
                        </option>
                        {Object.values(HenleggelseÅrsak).map(årsak => {
                            return (
                                <option
                                    key={årsak}
                                    aria-selected={skjema.felter.årsak.verdi === årsak}
                                    value={årsak}
                                >
                                    {henleggelseÅrsak[årsak]}
                                </option>
                            );
                        })}
                    </FamilieSelect>

                    <FamilieTextarea
                        {...hentFeltProps('begrunnelse')}
                        label={'Begrunnelse'}
                        erLesevisning={false}
                        maxLength={4000}
                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                            oppdaterFeltISkjema('begrunnelse', event.target.value);
                        }}
                    />
                </SkjemaGruppe>
            </UIModalWrapper>

            <UIModalWrapper
                modal={{
                    actions: [
                        <Knapp
                            key={'Gå til saksoversikten'}
                            mini={true}
                            onClick={() => {
                                history.push(`/fagsak/${fagsak.id}/saksoversikt`);
                            }}
                            children={'Gå til saksoversikten'}
                        />,
                        <Knapp
                            key={'Gå til oppgavebenken'}
                            mini={true}
                            onClick={() => {
                                history.push('/oppgaver');
                            }}
                            children={'Gå til oppgavebenken'}
                        />,
                    ],
                    onClose: () => {
                        settVisVeivalgModal(false);
                    },
                    lukkKnapp: true,
                    tittel: '',
                    visModal: visVeivalgModal,
                }}
            >
                <StyledVeivalgTekst>
                    <StyledVeivalgIkon />
                    Behandlingen er henlagt
                </StyledVeivalgTekst>
            </UIModalWrapper>
        </>
    );
};

export default HenleggBehandling;
