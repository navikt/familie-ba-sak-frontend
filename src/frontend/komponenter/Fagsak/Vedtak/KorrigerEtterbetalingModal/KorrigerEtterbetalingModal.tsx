import * as React from 'react';

import styled from 'styled-components';

import { SkjemaGruppe } from 'nav-frontend-skjema';

import { Cancel } from '@navikt/ds-icons';
import { Alert, Heading, Modal } from '@navikt/ds-react';
import {
    FamilieInput,
    FamilieKnapp,
    FamilieReactSelect,
    FamilieTextarea,
    type OptionType,
} from '@navikt/familie-form-elements';
import { Valideringsstatus } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';

import IkonKnapp, { IkonPosisjon } from '../../../Felleskomponenter/IkonKnapp/IkonKnapp';
import { useKorrigerEtterbetalingSkjemaContext } from './KorrigerEtterbetalingModalSkjemaContext';

interface IKorrigerEtterbetalingModal {
    erLesevisning: boolean;
    visModal: boolean;
    setVisModal: () => void;
}

const Knapperad = styled.div`
    width: 100%;
`;

const modalKnappStyle = (float: 'left' | 'right'): React.CSSProperties => {
    return {
        float,
        margin: '2rem 0px 2rem ' + float === 'left' ? '1rem' : '0px',
    };
};

export const KorrigerEtterbetalingModal: React.FC<IKorrigerEtterbetalingModal> = ({
    erLesevisning,
    visModal,
    setVisModal,
}) => {
    const {
        skjema,
        aarsakOptions,
        valideringErOk,
        lagreKorrigering,
        angreKorrigering,
        visAngreKorrigering,
        settVisfeilmeldinger,
        settRestFeil,
        restFeil,
        nullstillSkjema,
    } = useKorrigerEtterbetalingSkjemaContext();

    const lukkModal = () => {
        nullstillSkjema();
        settVisfeilmeldinger(false);
        settRestFeil(undefined);
        setVisModal();
    };
    return (
        <Modal open={visModal} onClose={lukkModal}>
            <Modal.Content style={{ minWidth: '30rem' }}>
                <Heading spacing size="medium">
                    Korriger etterbetaling
                </Heading>
                <SkjemaGruppe>
                    <FamilieReactSelect
                        label={'Årsak for korrigering'}
                        id={'korrigering-aarsak'}
                        options={aarsakOptions}
                        value={skjema.felter.aarsak.verdi}
                        onChange={option =>
                            skjema.felter.aarsak.validerOgSettFelt(option as OptionType)
                        }
                        feil={
                            skjema.felter.aarsak.valideringsstatus === Valideringsstatus.FEIL &&
                            skjema.visFeilmeldinger
                                ? skjema.felter.aarsak.feilmelding?.toString()
                                : ''
                        }
                        isDisabled={erLesevisning}
                    />
                    <FamilieInput
                        label={'Nytt etterbetalingsbeløp'}
                        id={'korrigering-belop'}
                        type={'number'}
                        bredde={'S'}
                        value={skjema.felter.etterbetalingsbeløp.verdi}
                        onChange={changeEvent =>
                            skjema.felter.etterbetalingsbeløp.validerOgSettFelt(
                                changeEvent.target.value
                            )
                        }
                        feil={
                            skjema.felter.etterbetalingsbeløp.valideringsstatus ===
                                Valideringsstatus.FEIL && skjema.visFeilmeldinger
                                ? skjema.felter.etterbetalingsbeløp.feilmelding?.toString()
                                : ''
                        }
                        disabled={erLesevisning}
                    />
                    <FamilieTextarea
                        label={'Begrunnelse (valgfri)'}
                        id={'korrigering-begrunnelse'}
                        erLesevisning={false}
                        value={skjema.felter.begrunnelse.verdi}
                        onChange={changeEvent =>
                            skjema.felter.begrunnelse.validerOgSettFelt(changeEvent.target.value)
                        }
                        maxLength={erLesevisning ? 0 : 1000}
                        style={{ minHeight: '5rem' }}
                        disabled={erLesevisning}
                    />
                    {!erLesevisning && (
                        <>
                            <Alert
                                variant="info"
                                size="small"
                                style={{ marginBottom: '1rem' }}
                                inline
                            >
                                Husk å sende korrigeringsmelding til NØS
                            </Alert>
                            {restFeil && (
                                <Alert variant="error" size="small" inline>
                                    {restFeil}
                                </Alert>
                            )}
                        </>
                    )}

                    <Knapperad>
                        {visAngreKorrigering && (
                            <IkonKnapp
                                style={modalKnappStyle('left')}
                                id={'angre-korrigering'}
                                erLesevisning={erLesevisning}
                                label={'Angre korrigering'}
                                ikon={<Cancel />}
                                onClick={angreKorrigering}
                                ikonPosisjon={IkonPosisjon.VENSTRE}
                                mini={true}
                            />
                        )}
                        <FamilieKnapp
                            style={modalKnappStyle('right')}
                            erLesevisning={erLesevisning}
                            onClick={lagreKorrigering}
                            mini={true}
                            type={valideringErOk() ? 'hoved' : 'standard'}
                            spinner={skjema.submitRessurs.status === RessursStatus.HENTER}
                            disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                        >
                            Korriger beløp
                        </FamilieKnapp>
                        <FamilieKnapp
                            style={modalKnappStyle('right')}
                            erLesevisning={erLesevisning}
                            onClick={lukkModal}
                            mini={true}
                            type={'flat'}
                        >
                            Avbryt
                        </FamilieKnapp>
                        <FamilieKnapp
                            style={modalKnappStyle('left')}
                            erLesevisning={!erLesevisning}
                            onClick={lukkModal}
                            mini={true}
                        >
                            Lukk
                        </FamilieKnapp>
                    </Knapperad>
                </SkjemaGruppe>
            </Modal.Content>
        </Modal>
    );
};
