import React from 'react';

import { Dropdown } from '@navikt/ds-react';

import { HenleggBehandlingModal } from './HenleggBehandlingModal';
import { useAppContext } from '../../../../../context/AppContext';
import { ModalType } from '../../../../../context/ModalContext';
import useDokument from '../../../../../hooks/useDokument';
import { useModal } from '../../../../../hooks/useModal';
import PdfVisningModal from '../../../../../komponenter/PdfVisningModal/PdfVisningModal';
import { erPåHenleggbartSteg } from '../../../../../typer/behandling';
import { ToggleNavn } from '../../../../../typer/toggles';
import { useBehandlingContext } from '../../../Behandling/context/BehandlingContext';

export function HenleggBehandlingNy() {
    const { toggles } = useAppContext();
    const { behandling, vurderErLesevisning } = useBehandlingContext();
    const { åpneModal } = useModal(ModalType.HENLEGG_BEHANDLING);

    const {
        visDokumentModal,
        hentetDokument,
        settVisDokumentModal,
        hentForhåndsvisning,
        nullstillDokument,
    } = useDokument();

    const harTilgangTilTekniskVedlikeholdHenleggelse =
        toggles[ToggleNavn.tekniskVedlikeholdHenleggelse];

    const kanHenlegge =
        harTilgangTilTekniskVedlikeholdHenleggelse ||
        (!vurderErLesevisning() && erPåHenleggbartSteg(behandling.steg));

    if (!kanHenlegge) {
        return null;
    }

    return (
        <>
            <Dropdown.Menu.List.Item onClick={() => åpneModal()}>
                Henlegg behandling
            </Dropdown.Menu.List.Item>
            <HenleggBehandlingModal
                hentetDokument={hentetDokument}
                nullstillDokument={nullstillDokument}
                hentForhåndsvisning={hentForhåndsvisning}
            />
            {visDokumentModal && (
                <PdfVisningModal
                    onRequestClose={() => settVisDokumentModal(false)}
                    pdfdata={hentetDokument}
                />
            )}
        </>
    );
}
