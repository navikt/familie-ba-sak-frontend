import React, { useState } from 'react';

import { useHistory } from 'react-router';
import styled from 'styled-components';

import KnappBase, { Flatknapp, Knapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';

import { FamilieSelect, FamilieTextarea } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../../context/BehandlingContext';
import Oppfylt from '../../../../../ikoner/Oppfylt';
import {
    BehandlingSteg,
    henleggelseÅrsak,
    HenleggelseÅrsak,
    IBehandling,
} from '../../../../../typer/behandling';
import { IFagsak } from '../../../../../typer/fagsak';
import UIModalWrapper from '../../../../Felleskomponenter/Modal/UIModalWrapper';
import PdfVisningModal from '../../../../Felleskomponenter/PdfVisningModal/PdfVisningModal';
import useForhåndsvisning from '../../../../Felleskomponenter/PdfVisningModal/useForhåndsvisning';
import SkjultLegend from '../../../../Felleskomponenter/SkjultLegend';
import useHenleggBehandling from './useHenleggBehandling';

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

const StyledLenke = styled(Lenke)<{ visLenke: boolean }>`
    margin-right: auto;
    display: ${({ visLenke }) => (visLenke ? 'flex' : 'none')};
    align-items: center;
`;

const HenleggBehandling: React.FC<IProps> = ({ onListElementClick, fagsak, behandling }) => {
    const history = useHistory();
    const [visModal, settVisModal] = useState(false);
    const { erLesevisning } = useBehandling();
    const {
        hentForhåndsvisning,
        nullstillHentetForhåndsvisning,
        visForhåndsvisningModal,
        hentetForhåndsvisning,
        settVisForhåndsviningModal,
    } = useForhåndsvisning();
    const { åpenBehandling } = useBehandling();

    const behandlingId =
        åpenBehandling.status === RessursStatus.SUKSESS && åpenBehandling.data.behandlingId;

    const {
        skjema,
        nullstillSkjema,
        onBekreft,
        settVisVeivalgModal,
        visVeivalgModal,
        hentSkjemaData,
        årsak,
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
                            key={'forhåndsvis'}
                            href="#"
                            onClick={() => {
                                hentForhåndsvisning({
                                    method: 'POST',
                                    data: hentSkjemaData(),
                                    url: `/familie-ba-sak/api/dokument/forhaandsvis-brev/${behandlingId}`,
                                });
                            }}
                            visLenke={skjema.felter.årsak.verdi === HenleggelseÅrsak.SØKNAD_TRUKKET}
                        >
                            Forhåndsvis
                        </StyledLenke>,
                        <Flatknapp
                            key={'avbryt'}
                            mini={true}
                            onClick={() => {
                                nullstillSkjema();
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
                        nullstillSkjema();
                        nullstillHentetForhåndsvisning();
                        settVisModal(false);
                    },
                    lukkKnapp: true,
                    tittel: 'Henlegg behandling',
                    visModal,
                }}
            >
                <SkjemaGruppe
                    feil={
                        (skjema.submitRessurs.status === RessursStatus.FEILET
                            ? skjema.submitRessurs.frontendFeilmelding
                            : undefined) ||
                        (hentetForhåndsvisning.status === RessursStatus.FEILET
                            ? hentetForhåndsvisning.frontendFeilmelding
                            : undefined)
                    }
                    legend={SkjultLegend({ children: 'Henlegg behandling' })}
                >
                    <FamilieSelect
                        {...skjema.felter.årsak.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                        label={'Velg årsak'}
                        value={skjema.felter.årsak.verdi}
                        onChange={(event: React.ChangeEvent<HenleggelseÅrsakSelect>): void => {
                            skjema.felter.årsak.onChange(event.target.value);
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
                        {...skjema.felter.begrunnelse.hentNavInputProps(skjema.visFeilmeldinger)}
                        label={'Begrunnelse'}
                        erLesevisning={false}
                        maxLength={4000}
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
                    {årsak === HenleggelseÅrsak.SØKNAD_TRUKKET
                        ? 'Behandlingen er henlagt og brev til bruker er sendt'
                        : 'Behandlingen er henlagt'}
                </StyledVeivalgTekst>
            </UIModalWrapper>
            <PdfVisningModal
                åpen={visForhåndsvisningModal}
                onRequestClose={() => settVisForhåndsviningModal(false)}
                pdfdata={hentetForhåndsvisning}
            />
        </>
    );
};

export default HenleggBehandling;
