import React from 'react';

import { Button, Fieldset, Modal, Select, Textarea } from '@navikt/ds-react';
import { byggTomRessurs, RessursStatus } from '@navikt/familie-typer';

import useEndreBehandlendeEnhet from './useEndreBehandlendeEnhet';
import { useAppContext } from '../../../../../context/AppContext';
import { BehandlingSteg, hentStegNummer } from '../../../../../typer/behandling';
import type { IArbeidsfordelingsenhet } from '../../../../../typer/enhet';
import { behandendeEnheter } from '../../../../../typer/enhet';
import { hentFrontendFeilmelding } from '../../../../../utils/ressursUtils';
import { useBehandlingContext } from '../../../Behandling/context/BehandlingContext';

interface Props {
    lukkModal: () => void;
}

export function EndreBehandlendeEnhetModal({ lukkModal }: Props) {
    const { behandling, vurderErLesevisning } = useBehandlingContext();
    const { innloggetSaksbehandler } = useAppContext();

    const {
        begrunnelse,
        settBegrunnelse,
        endreEnhet,
        enhetId,
        fjernState,
        settEnhetId,
        settSubmitRessurs,
        submitRessurs,
    } = useEndreBehandlendeEnhet(() => lukkModal());

    const lukkBehandlendeEnhetModal = () => {
        fjernState();
        lukkModal();
    };

    const erLesevisningPåBehandling = () => {
        const steg = behandling?.steg;
        if (
            steg &&
            hentStegNummer(steg) === hentStegNummer(BehandlingSteg.BESLUTTE_VEDTAK) &&
            innloggetSaksbehandler?.navIdent !== behandling?.totrinnskontroll?.saksbehandlerId
        ) {
            return false;
        } else {
            return vurderErLesevisning(false, true);
        }
    };

    return (
        <Modal
            open
            onClose={lukkBehandlendeEnhetModal}
            width={'35rem'}
            header={{
                heading: 'Endre enhet for denne behandlingen',
                size: 'small',
            }}
            portal
        >
            <Modal.Body>
                <Fieldset error={hentFrontendFeilmelding(submitRessurs)} legend="Endre enhet" hideLegend>
                    <Select
                        readOnly={erLesevisningPåBehandling()}
                        name="enhet"
                        value={enhetId}
                        label={'Velg ny enhet'}
                        onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
                            settEnhetId(event.target.value);
                            settSubmitRessurs(byggTomRessurs());
                        }}
                    >
                        {behandendeEnheter.map((enhet: IArbeidsfordelingsenhet) => {
                            return (
                                <option
                                    aria-selected={enhetId === enhet.enhetId}
                                    key={enhet.enhetId}
                                    value={enhet.enhetId}
                                    disabled={
                                        behandling.arbeidsfordelingPåBehandling.behandlendeEnhetId === enhet.enhetId
                                    }
                                >
                                    {`${enhet.enhetId} ${enhet.enhetNavn}`}
                                </option>
                            );
                        })}
                    </Select>

                    <Textarea
                        disabled={submitRessurs.status === RessursStatus.HENTER}
                        readOnly={erLesevisningPåBehandling()}
                        label={'Begrunnelse'}
                        value={begrunnelse}
                        maxLength={4000}
                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                            settBegrunnelse(event.target.value);
                            settSubmitRessurs(byggTomRessurs());
                        }}
                    />
                </Fieldset>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    key={'bekreft'}
                    variant="primary"
                    size="small"
                    disabled={submitRessurs.status === RessursStatus.HENTER}
                    onClick={() => {
                        endreEnhet(behandling.behandlingId);
                    }}
                    children={'Bekreft'}
                    loading={submitRessurs.status === RessursStatus.HENTER}
                />
                <Button
                    key={'avbryt'}
                    size="small"
                    variant="secondary"
                    onClick={lukkBehandlendeEnhetModal}
                    children={'Avbryt'}
                />
            </Modal.Footer>
        </Modal>
    );
}
