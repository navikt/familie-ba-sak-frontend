import React, { useState } from 'react';

import { useNavigate } from 'react-router';
import styled from 'styled-components';

import { BodyShort, Button, Fieldset, Link, Modal, Select, Textarea } from '@navikt/ds-react';
import { Dropdown } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import useHenleggBehandling from './useHenleggBehandling';
import { useApp } from '../../../../../context/AppContext';
import useDokument from '../../../../../hooks/useDokument';
import PdfVisningModal from '../../../../../komponenter/PdfVisningModal/PdfVisningModal';
import { BehandlingSteg, henleggÅrsak, HenleggÅrsak } from '../../../../../typer/behandling';
import { ToggleNavn } from '../../../../../typer/toggles';
import { hentFrontendFeilmelding } from '../../../../../utils/ressursUtils';
import { useBehandlingContext } from '../../../Behandling/context/BehandlingContext';

interface IProps {
    fagsakId: number;
}

interface HenleggÅrsakSelect extends HTMLSelectElement {
    value: HenleggÅrsak | '';
}

const StyledBodyShort = styled(BodyShort)`
    margin: 2rem 2rem 2rem 0;
`;

const StyledLenke = styled(Link)`
    margin-right: auto;
`;

const HenleggBehandling: React.FC<IProps> = ({ fagsakId }) => {
    const { behandling, vurderErLesevisning } = useBehandlingContext();

    const navigate = useNavigate();
    const [visModal, settVisModal] = useState(false);
    const {
        hentForhåndsvisning,
        nullstillDokument,
        visDokumentModal,
        hentetDokument,
        settVisDokumentModal,
    } = useDokument();
    const { toggles } = useApp();

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
            {visModal && (
                <Modal
                    open
                    width={'35rem'}
                    onClose={() => {
                        nullstillSkjema();
                        nullstillDokument();
                        settVisModal(false);
                    }}
                    header={{ heading: 'Henlegg behandling', size: 'medium' }}
                    portal={true}
                >
                    <Modal.Body>
                        <Fieldset
                            error={
                                hentFrontendFeilmelding(skjema.submitRessurs) ||
                                hentFrontendFeilmelding(hentetDokument)
                            }
                            legend={'Henlegg behandling'}
                            hideLegend
                        >
                            <Select
                                {...skjema.felter.årsak.hentNavBaseSkjemaProps(
                                    skjema.visFeilmeldinger
                                )}
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
                                    .filter(
                                        årsak =>
                                            årsak !== HenleggÅrsak.FØDSELSHENDELSE_UGYLDIG_UTFALL
                                    )
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
                            </Select>

                            <Textarea
                                {...skjema.felter.begrunnelse.hentNavInputProps(
                                    skjema.visFeilmeldinger
                                )}
                                label={'Begrunnelse'}
                                maxLength={4000}
                            />
                        </Fieldset>
                    </Modal.Body>
                    <Modal.Footer>
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
                        />
                        <Button
                            key={'avbryt'}
                            variant="tertiary"
                            size="small"
                            onClick={() => {
                                nullstillSkjema();
                                settVisModal(false);
                            }}
                        >
                            Avbryt
                        </Button>
                        {skjema.felter.årsak.verdi === HenleggÅrsak.SØKNAD_TRUKKET && (
                            <StyledLenke
                                key={'forhåndsvis'}
                                href="#"
                                onClick={() => {
                                    hentForhåndsvisning({
                                        method: 'POST',
                                        data: hentSkjemaData(),
                                        url: `/familie-ba-sak/api/dokument/forhaandsvis-brev/${behandling.behandlingId}`,
                                    });
                                }}
                            >
                                Forhåndsvis
                            </StyledLenke>
                        )}
                    </Modal.Footer>
                </Modal>
            )}

            {visVeivalgModal && (
                <Modal
                    open
                    width={'35rem'}
                    header={{
                        heading: 'Behandling henlagt',
                        size: 'medium',
                    }}
                    onClose={() => {
                        settVisVeivalgModal(false);
                    }}
                    portal
                >
                    <Modal.Body>
                        <StyledBodyShort>
                            {årsak === HenleggÅrsak.SØKNAD_TRUKKET
                                ? 'Behandlingen er henlagt og brev til bruker er sendt'
                                : 'Behandlingen er henlagt'}
                        </StyledBodyShort>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            key={'Gå til saksoversikten'}
                            variant="secondary"
                            size="medium"
                            onClick={() => {
                                navigate(`/fagsak/${fagsakId}/saksoversikt`);
                            }}
                            children={'Se saksoversikt'}
                        />
                        <Button
                            key={'Gå til oppgavebenken'}
                            variant="secondary"
                            size="medium"
                            onClick={() => {
                                navigate('/oppgaver');
                            }}
                            children={'Se oppgavebenk'}
                        />
                    </Modal.Footer>
                </Modal>
            )}
            {visDokumentModal && (
                <PdfVisningModal
                    onRequestClose={() => settVisDokumentModal(false)}
                    pdfdata={hentetDokument}
                />
            )}
        </>
    );
};

export default HenleggBehandling;
