import React, { useState } from 'react';

import { Button, Fieldset } from '@navikt/ds-react';
import { Dropdown } from '@navikt/ds-react';
import { FamilieSelect, FamilieTextarea } from '@navikt/familie-form-elements';
import { byggTomRessurs, hentDataFraRessurs, RessursStatus } from '@navikt/familie-typer';

import useEndreBehandlendeEnhet from './useEndreBehandlendeEnhet';
import { useApp } from '../../../../../context/AppContext';
import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import { BehandlingSteg, hentStegNummer } from '../../../../../typer/behandling';
import type { IArbeidsfordelingsenhet } from '../../../../../typer/enhet';
import { behandendeEnheter } from '../../../../../typer/enhet';
import { hentFrontendFeilmelding } from '../../../../../utils/ressursUtils';
import UIModalWrapper from '../../../../Felleskomponenter/Modal/UIModalWrapper';

const EndreBehandlendeEnhet: React.FC = () => {
    const {
        åpenBehandling,
        vurderErLesevisning,
        erBehandleneEnhetMidlertidig,
        erBehandlingAvsluttet,
    } = useBehandling();
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

    const valgtArbeidsfordelingsenhet = behandendeEnheter.find(
        (enhet: IArbeidsfordelingsenhet) => enhet.enhetId === enhetId
    );

    const lukkBehandlendeEnhetModal = () => {
        fjernState();
        settVisModal(false);
    };

    const erLesevisningPåBehandling = () => {
        const åpenBehandlingData = hentDataFraRessurs(åpenBehandling);
        const steg = åpenBehandlingData?.steg;
        if (
            steg &&
            hentStegNummer(steg) === hentStegNummer(BehandlingSteg.BESLUTTE_VEDTAK) &&
            innloggetSaksbehandler?.displayName !==
                åpenBehandlingData?.totrinnskontroll?.saksbehandler
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
            <UIModalWrapper
                modal={{
                    actions: [
                        <Button
                            key={'avbryt'}
                            size="small"
                            variant="secondary"
                            onClick={lukkBehandlendeEnhetModal}
                            children={'Avbryt'}
                        />,
                        <Button
                            key={'bekreft'}
                            variant="primary"
                            size="small"
                            disabled={submitRessurs.status === RessursStatus.HENTER}
                            onClick={() => {
                                if (åpenBehandling.status === RessursStatus.SUKSESS) {
                                    endreEnhet(åpenBehandling.data.behandlingId);
                                }
                            }}
                            children={'Bekreft'}
                            loading={submitRessurs.status === RessursStatus.HENTER}
                        />,
                    ],
                    onClose: lukkBehandlendeEnhetModal,
                    lukkKnapp: true,
                    tittel: 'Endre enhet for denne behandlingen',
                    visModal: visModal && !erBehandlingAvsluttet,
                }}
            >
                <Fieldset
                    error={hentFrontendFeilmelding(submitRessurs)}
                    legend="Endre enhet"
                    hideLegend
                >
                    <FamilieSelect
                        erLesevisning={erLesevisningPåBehandling()}
                        lesevisningVerdi={valgtArbeidsfordelingsenhet?.enhetNavn}
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
                                        hentDataFraRessurs(åpenBehandling)
                                            ?.arbeidsfordelingPåBehandling.behandlendeEnhetId ===
                                        enhet.enhetId
                                    }
                                >
                                    {`${enhet.enhetId} ${enhet.enhetNavn}`}
                                </option>
                            );
                        })}
                    </FamilieSelect>

                    <FamilieTextarea
                        disabled={submitRessurs.status === RessursStatus.HENTER}
                        erLesevisning={erLesevisningPåBehandling()}
                        label={'Begrunnelse'}
                        value={begrunnelse}
                        maxLength={4000}
                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                            settBegrunnelse(event.target.value);
                            settSubmitRessurs(byggTomRessurs());
                        }}
                    />
                </Fieldset>
            </UIModalWrapper>
        </>
    );
};

export default EndreBehandlendeEnhet;
