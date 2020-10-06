import { FamilieSelect, FamilieTextarea } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';
import KnappBase, { Knapp } from 'nav-frontend-knapper';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import React, { useState } from 'react';
import { useBehandling } from '../../../../../context/BehandlingContext';
import { behandendeEnheter, IArbeidsfordelingsenhet } from '../../../../../typer/enhet';
import UIModalWrapper from '../../../../Felleskomponenter/Modal/UIModalWrapper';
import useEndreBehandlendeEnhet from './useEndreBehandlendeEnhet';

interface IProps {
    onClick: () => void;
}

const EndreBehandlendeEnhet: React.FC<IProps> = ({ onClick }) => {
    const [visModal, settVisModal] = useState(false);

    const { åpenBehandling, erLesevisning } = useBehandling();
    const {
        begrunnelse,
        settBegrunnelse,
        endreEnhet,
        enhetId,
        fjernState,
        settEnhetId,
        submitRessurs,
    } = useEndreBehandlendeEnhet(() => settVisModal(false));

    const valgtArbeidsfordelingsenhet = behandendeEnheter.find(
        (enhet: IArbeidsfordelingsenhet) => enhet.enhetId === enhetId
    );

    const lukkBehandlendeEnhet = () => {
        fjernState();
        settVisModal(false);
    };

    return (
        <>
            <UIModalWrapper
                modal={{
                    actions: [
                        <Knapp
                            key={'avbryt'}
                            mini={true}
                            onClick={lukkBehandlendeEnhet}
                            children={'Avbryt'}
                        />,
                        <Knapp
                            key={'bekreft'}
                            type={'hoved'}
                            mini={true}
                            onClick={() => {
                                if (åpenBehandling.status === RessursStatus.SUKSESS) {
                                    endreEnhet(åpenBehandling.data.behandlingId);
                                }
                            }}
                            children={'Bekreft'}
                            spinner={submitRessurs.status === RessursStatus.HENTER}
                        />,
                    ],
                    onClose: lukkBehandlendeEnhet,
                    lukkKnapp: true,
                    tittel: 'Endre behandlende enhet for valgt behandling',
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
                    <FamilieSelect
                        bredde={'xl'}
                        erLesevisning={erLesevisning()}
                        lesevisningVerdi={valgtArbeidsfordelingsenhet?.enhetNavn}
                        name="enhet"
                        placeholder={'Enhet'}
                        value={enhetId}
                        onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
                            settEnhetId(event.target.value);
                        }}
                    >
                        {behandendeEnheter.map((enhet: IArbeidsfordelingsenhet) => {
                            return (
                                <option
                                    aria-selected={enhetId === enhet.enhetId}
                                    key={enhet.enhetId}
                                    value={enhet.enhetId}
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
                        }}
                    />
                </SkjemaGruppe>
            </UIModalWrapper>

            <KnappBase
                mini={true}
                onClick={() => {
                    settVisModal(true);
                    onClick();
                }}
            >
                Endre behandlende enhet
            </KnappBase>
        </>
    );
};

export default EndreBehandlendeEnhet;
