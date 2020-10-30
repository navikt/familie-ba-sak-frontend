import { FamilieSelect, FamilieTextarea } from '@navikt/familie-form-elements';
import { byggTomRessurs, hentDataFraRessurs, RessursStatus } from '@navikt/familie-typer';
import KnappBase, { Knapp } from 'nav-frontend-knapper';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import React, { useState } from 'react';
import { useBehandling } from '../../../../../context/BehandlingContext';
import { behandendeEnheter, IArbeidsfordelingsenhet } from '../../../../../typer/enhet';
import UIModalWrapper from '../../../../Felleskomponenter/Modal/UIModalWrapper';
import useEndreBehandlendeEnhet from './useEndreBehandlendeEnhet';
import SkjultLegend from '../../../../Felleskomponenter/SkjultLegend';

interface IProps {
    onListElementClick: () => void;
}

const EndreBehandlendeEnhet: React.FC<IProps> = ({ onListElementClick }) => {
    const [visModal, settVisModal] = useState(false);

    const { åpenBehandling, erLesevisning } = useBehandling();
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
                    visModal,
                }}
            >
                <SkjemaGruppe
                    feil={
                        submitRessurs.status === RessursStatus.FEILET
                            ? submitRessurs.frontendFeilmelding
                            : undefined
                    }
                >
                    <SkjultLegend>Endre enhet</SkjultLegend>
                    <FamilieSelect
                        erLesevisning={erLesevisning()}
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
                        erLesevisning={erLesevisning()}
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
