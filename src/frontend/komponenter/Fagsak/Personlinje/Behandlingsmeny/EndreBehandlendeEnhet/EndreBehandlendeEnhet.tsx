import React, { useState } from 'react';

import KnappBase, { Knapp } from 'nav-frontend-knapper';
import { SkjemaGruppe } from 'nav-frontend-skjema';

import { FamilieSelect, FamilieTextarea } from '@navikt/familie-form-elements';
import { byggTomRessurs, hentDataFraRessurs, RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../../../../context/AppContext';
import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import { BehandlingSteg, hentStegNummer } from '../../../../../typer/behandling';
import type { IArbeidsfordelingsenhet } from '../../../../../typer/enhet';
import { behandendeEnheter } from '../../../../../typer/enhet';
import { hentFrontendFeilmelding } from '../../../../../utils/ressursUtils';
import UIModalWrapper from '../../../../Felleskomponenter/Modal/UIModalWrapper';
import SkjultLegend from '../../../../Felleskomponenter/SkjultLegend';
import useEndreBehandlendeEnhet from './useEndreBehandlendeEnhet';

interface IProps {
    onListElementClick: () => void;
}

const EndreBehandlendeEnhet: React.FC<IProps> = ({ onListElementClick }) => {
    const { åpenBehandling, erLesevisning, erBehandleneEnhetMidlertidig, erBehandlingAvsluttet } =
        useBehandling();
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
            return erLesevisning(false, true);
        }
    };

    return (
        <>
            <KnappBase
                mini={true}
                onClick={() => {
                    settVisModal(true);
                    onListElementClick();
                }}
            >
                Endre behandlende enhet
            </KnappBase>

            <UIModalWrapper
                modal={{
                    actions: [
                        <Knapp
                            key={'avbryt'}
                            mini={true}
                            onClick={lukkBehandlendeEnhetModal}
                            children={'Avbryt'}
                        />,
                        <Knapp
                            key={'bekreft'}
                            type={'hoved'}
                            mini={true}
                            disabled={submitRessurs.status === RessursStatus.HENTER}
                            onClick={() => {
                                if (åpenBehandling.status === RessursStatus.SUKSESS) {
                                    endreEnhet(åpenBehandling.data.behandlingId);
                                }
                            }}
                            children={'Bekreft'}
                            spinner={submitRessurs.status === RessursStatus.HENTER}
                        />,
                    ],
                    onClose: lukkBehandlendeEnhetModal,
                    lukkKnapp: true,
                    tittel: 'Endre enhet for denne behandlingen',
                    visModal: visModal && !erBehandlingAvsluttet,
                }}
            >
                <SkjemaGruppe feil={hentFrontendFeilmelding(submitRessurs)}>
                    <SkjultLegend>Endre enhet</SkjultLegend>
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
                </SkjemaGruppe>
            </UIModalWrapper>
        </>
    );
};

export default EndreBehandlendeEnhet;
