import React, { useState } from 'react';

import { Button, Dropdown, Fieldset, Modal, Select, Textarea } from '@navikt/ds-react';
import { byggTomRessurs, RessursStatus } from '@navikt/familie-typer';

import useEndreBehandlendeEnhet from './useEndreBehandlendeEnhet';
import { useApp } from '../../../../../context/AppContext';
import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import { BehandlingSteg, hentStegNummer } from '../../../../../typer/behandling';
import type { IArbeidsfordelingsenhet } from '../../../../../typer/enhet';
import { behandendeEnheter } from '../../../../../typer/enhet';
import { hentFrontendFeilmelding } from '../../../../../utils/ressursUtils';

const EndreBehandlendeEnhet: React.FC = () => {
    const { behandling, vurderErLesevisning, erBehandleneEnhetMidlertidig } = useBehandling();
    const [visModal, settVisModal] = useState(erBehandleneEnhetMidlertidig);
    const { innloggetSaksbehandler } = useApp();

    const {
        begrunnelse,
        settBegrunnelse,
        endreEnhet,
        enhetId,
        fjernState,
        settEnhetId,
        settSubmitRessurs,
        submitRessurs,
    } = useEndreBehandlendeEnhet(() => settVisModal(false));

    const lukkBehandlendeEnhetModal = () => {
        fjernState();
        settVisModal(false);
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
        <>
            <Dropdown.Menu.List.Item onClick={() => settVisModal(true)}>
                Endre behandlende enhet
            </Dropdown.Menu.List.Item>
            {visModal && (
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
                        <Fieldset
                            error={hentFrontendFeilmelding(submitRessurs)}
                            legend="Endre enhet"
                            hideLegend
                        >
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
                                                behandling.arbeidsfordelingPåBehandling
                                                    .behandlendeEnhetId === enhet.enhetId
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
            )}
        </>
    );
};

export default EndreBehandlendeEnhet;
