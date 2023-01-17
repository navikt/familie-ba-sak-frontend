import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { SkjemaGruppe } from 'nav-frontend-skjema';

import { BodyShort, Button, Heading, Modal, Link } from '@navikt/ds-react';
import { Dropdown } from '@navikt/ds-react-internal';
import { FamilieSelect, FamilieTextarea } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../../../../context/AppContext';
import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import useDokument from '../../../../../hooks/useDokument';
import type { IBehandling } from '../../../../../typer/behandling';
import { BehandlingSteg, henleggÅrsak, HenleggÅrsak } from '../../../../../typer/behandling';
import { ToggleNavn } from '../../../../../typer/toggles';
import { hentFrontendFeilmelding } from '../../../../../utils/ressursUtils';
import UIModalWrapper from '../../../../Felleskomponenter/Modal/UIModalWrapper';
import PdfVisningModal from '../../../../Felleskomponenter/PdfVisningModal/PdfVisningModal';
import SkjultLegend from '../../../../Felleskomponenter/SkjultLegend';
import useHenleggBehandling from './useHenleggBehandling';

interface IProps {
    fagsakId: number;
    behandling: IBehandling;
}

interface HenleggÅrsakSelect extends HTMLSelectElement {
    value: HenleggÅrsak | '';
}

const StyledBodyShort = styled(BodyShort)`
    margin: 2rem 2rem 2rem 0;
`;

const KnappHøyre = styled(Button)`
    margin-left: 1rem;
`;

const Knapperad = styled.div`
    display: flex;
    justify-content: end;
`;

const StyledLenke = styled(Link)<{ 'data-vislenke': boolean }>`
    margin-right: auto;
    display: ${({ 'data-vislenke': visLenke }) => (visLenke ? 'flex' : 'none')};
    align-items: center;
`;

const HenleggBehandling: React.FC<IProps> = ({ fagsakId, behandling }) => {
    const navigate = useNavigate();
    const [visModal, settVisModal] = useState(false);
    const {
        hentForhåndsvisning,
        nullstillDokument,
        visDokumentModal,
        hentetDokument,
        settVisDokumentModal,
    } = useDokument();
    const { åpenBehandling, vurderErLesevisning } = useBehandling();
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

    const kanHenlegge =
        harTilgangTilTekniskVedlikeholdHenleggelse ||
        (!vurderErLesevisning() && erPåHenleggbartSteg);

    if (!kanHenlegge) {
        return null;
    }

    return (
        <>
            <Dropdown.Menu.List.Item
                onClick={() => {
                    settVisModal(true);
                }}
            >
                Henlegg behandling
            </Dropdown.Menu.List.Item>

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
                            data-vislenke={
                                skjema.felter.årsak.verdi === HenleggÅrsak.SØKNAD_TRUKKET
                            }
                        >
                            Forhåndsvis
                        </StyledLenke>,
                        <Button
                            key={'avbryt'}
                            variant="tertiary"
                            size="small"
                            onClick={() => {
                                nullstillSkjema();
                                settVisModal(false);
                            }}
                            children={'Avbryt'}
                        />,
                        <Button
                            key={'bekreft'}
                            variant="primary"
                            size="small"
                            onClick={() => onBekreft(behandling.behandlingId)}
                            loading={skjema.submitRessurs.status === RessursStatus.HENTER}
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

            <Modal
                open={visVeivalgModal}
                onClose={() => {
                    settVisVeivalgModal(false);
                }}
                shouldCloseOnOverlayClick={false}
            >
                <Modal.Content>
                    <Heading size={'medium'} level={'2'}>
                        Behandling henlagt
                    </Heading>
                    <StyledBodyShort>
                        {årsak === HenleggÅrsak.SØKNAD_TRUKKET
                            ? 'Behandlingen er henlagt og brev til bruker er sendt'
                            : 'Behandlingen er henlagt'}
                    </StyledBodyShort>
                    <Knapperad>
                        <Button
                            key={'Gå til oppgavebenken'}
                            variant="secondary"
                            size="medium"
                            onClick={() => {
                                navigate('/oppgaver');
                            }}
                            children={'Se oppgavebenk'}
                        />
                        <KnappHøyre
                            key={'Gå til saksoversikten'}
                            variant="secondary"
                            size="medium"
                            onClick={() => {
                                navigate(`/fagsak/${fagsakId}/saksoversikt`);
                            }}
                            children={'Se saksoversikt'}
                        />
                    </Knapperad>
                </Modal.Content>
            </Modal>
            <PdfVisningModal
                åpen={visDokumentModal}
                onRequestClose={() => settVisDokumentModal(false)}
                pdfdata={hentetDokument}
            />
        </>
    );
};

export default HenleggBehandling;
