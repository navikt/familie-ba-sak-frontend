import React, { useState } from 'react';

import { useHistory } from 'react-router';
import styled from 'styled-components';

import KnappBase, { Flatknapp, Knapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';

import { FamilieSelect, FamilieTextarea } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../../../../context/AppContext';
import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import useDokument from '../../../../../hooks/useDokument';
import Oppfylt from '../../../../../ikoner/Oppfylt';
import {
    BehandlingSteg,
    henleggÅrsak,
    HenleggÅrsak,
    IBehandling,
} from '../../../../../typer/behandling';
import { ToggleNavn } from '../../../../../typer/toggles';
import { hentFrontendFeilmelding } from '../../../../../utils/ressursUtils';
import UIModalWrapper from '../../../../Felleskomponenter/Modal/UIModalWrapper';
import PdfVisningModal from '../../../../Felleskomponenter/PdfVisningModal/PdfVisningModal';
import SkjultLegend from '../../../../Felleskomponenter/SkjultLegend';
import useHenleggBehandling from './useHenleggBehandling';

interface IProps {
    onListElementClick: () => void;
    fagsakId: number;
    behandling: IBehandling;
}

interface HenleggÅrsakSelect extends HTMLSelectElement {
    value: HenleggÅrsak | '';
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

const HenleggBehandling: React.FC<IProps> = ({ onListElementClick, fagsakId, behandling }) => {
    const history = useHistory();
    const [visModal, settVisModal] = useState(false);
    const {
        hentForhåndsvisning,
        nullstillDokument,
        visDokumentModal,
        hentetDokument,
        settVisDokumentModal,
    } = useDokument();
    const { åpenBehandling, erLesevisning } = useBehandling();
    const { toggles } = useApp();

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

    const erPåHenleggbartSteg = [
        BehandlingSteg.REGISTRERE_SØKNAD,
        BehandlingSteg.REGISTRERE_PERSONGRUNNLAG,
        BehandlingSteg.VILKÅRSVURDERING,
        BehandlingSteg.BEHANDLINGSRESULTAT,
        BehandlingSteg.VURDER_TILBAKEKREVING,
        BehandlingSteg.SEND_TIL_BESLUTTER,
    ].includes(behandling.steg);

    const harTilgangTilTekniskVedlikeholdHenleggelse =
        toggles[ToggleNavn.tekniskVedlikeholdHenleggelse];

    return (
        <>
            <KnappBase
                mini={true}
                onClick={() => {
                    onListElementClick();
                    settVisModal(true);
                }}
                disabled={
                    (erLesevisning() || !erPåHenleggbartSteg) &&
                    !harTilgangTilTekniskVedlikeholdHenleggelse
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
                            visLenke={skjema.felter.årsak.verdi === HenleggÅrsak.SØKNAD_TRUKKET}
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
                            spinner={skjema.submitRessurs.status === RessursStatus.HENTER}
                            disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                            children={
                                skjema.felter.årsak.verdi === HenleggÅrsak.SØKNAD_TRUKKET
                                    ? 'Bekreft og send brev'
                                    : 'Bekreft'
                            }
                        />,
                    ],
                    onClose: () => {
                        nullstillSkjema();
                        nullstillDokument();
                        settVisModal(false);
                    },
                    lukkKnapp: true,
                    tittel: 'Henlegg behandling',
                    visModal,
                }}
            >
                <SkjemaGruppe
                    feil={
                        hentFrontendFeilmelding(skjema.submitRessurs) ||
                        hentFrontendFeilmelding(hentetDokument)
                    }
                    legend={SkjultLegend({ children: 'Henlegg behandling' })}
                >
                    <FamilieSelect
                        {...skjema.felter.årsak.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                        label={'Velg årsak'}
                        value={skjema.felter.årsak.verdi}
                        onChange={(event: React.ChangeEvent<HenleggÅrsakSelect>): void => {
                            skjema.felter.årsak.onChange(event.target.value);
                        }}
                    >
                        <option disabled={true} value={''}>
                            Velg
                        </option>
                        {Object.values(HenleggÅrsak)
                            .filter(årsak => årsak !== HenleggÅrsak.FØDSELSHENDELSE_UGYLDIG_UTFALL)
                            .filter(
                                årsak =>
                                    (årsak !== HenleggÅrsak.TEKNISK_VEDLIKEHOLD &&
                                        erPåHenleggbartSteg) ||
                                    (årsak === HenleggÅrsak.TEKNISK_VEDLIKEHOLD &&
                                        harTilgangTilTekniskVedlikeholdHenleggelse)
                            )
                            .map(årsak => {
                                return (
                                    <option
                                        key={årsak}
                                        aria-selected={skjema.felter.årsak.verdi === årsak}
                                        value={årsak}
                                    >
                                        {henleggÅrsak[årsak]}
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
                                history.push(`/fagsak/${fagsakId}/saksoversikt`);
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
                    {årsak === HenleggÅrsak.SØKNAD_TRUKKET
                        ? 'Behandlingen er henlagt og brev til bruker er sendt'
                        : 'Behandlingen er henlagt'}
                </StyledVeivalgTekst>
            </UIModalWrapper>
            <PdfVisningModal
                åpen={visDokumentModal}
                onRequestClose={() => settVisDokumentModal(false)}
                pdfdata={hentetDokument}
            />
        </>
    );
};

export default HenleggBehandling;
