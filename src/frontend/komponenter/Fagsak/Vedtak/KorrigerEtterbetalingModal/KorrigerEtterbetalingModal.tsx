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

import type { IKorrigertEtterbetaling } from '../../../../typer/vedtak';
import IkonKnapp, { IkonPosisjon } from '../../../Felleskomponenter/IkonKnapp/IkonKnapp';
import { useKorrigerEtterbetalingSkjemaContext } from './KorrigerEtterbetalingModalSkjemaContext';

interface IKorrigerEtterbetalingModal {
    korrigertEtterbetaling?: IKorrigertEtterbetaling;
    behandlingId: number;
    erLesevisning: boolean;
    visModal: boolean;
    onClose: () => void;
}

const Knapperad = styled.div`
    width: 100%;
`;

const modalKnappStyle = (float: 'left' | 'right'): React.CSSProperties => {
    const margin =
        '2rem ' +
        (float === 'left' ? '1rem' : '0px') +
        ' 2rem ' +
        (float === 'right' ? '1rem' : '0px');
    return {
        float,
        margin,
    };
};

export const KorrigerEtterbetalingModal: React.FC<IKorrigerEtterbetalingModal> = ({
    korrigertEtterbetaling,
    behandlingId,
    erLesevisning,
    visModal,
    onClose,
}) => {
    const {
        skjema,
        årsaker,
        valideringErOk,
        lagreKorrigering,
        angreKorrigering,
        visAngreKorrigering,
        angrerKorrigering,
        settVisfeilmeldinger,
        settRestFeil,
        restFeil,
        nullstillSkjema,
    } = useKorrigerEtterbetalingSkjemaContext({
        onSuccess: onClose,
        korrigertEtterbetaling,
        behandlingId,
    });

    const lukkModal = () => {
        nullstillSkjema();
        settVisfeilmeldinger(false);
        settRestFeil(undefined);
        onClose();
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
                        options={årsaker}
                        value={skjema.felter.årsak.verdi}
                        onChange={option =>
                            skjema.felter.årsak.validerOgSettFelt(option as OptionType)
                        }
                        feil={
                            skjema.felter.årsak.valideringsstatus === Valideringsstatus.FEIL &&
                            skjema.visFeilmeldinger
                                ? skjema.felter.årsak.feilmelding?.toString()
                                : ''
                        }
                        isDisabled={erLesevisning}
                    />
                    <FamilieInput
                        label={'Nytt etterbetalingsbeløp'}
                        id={'korrigering-belop'}
                        type={'number'}
                        bredde={'S'}
                        value={skjema.felter.beløp.verdi}
                        onChange={changeEvent =>
                            skjema.felter.beløp.validerOgSettFelt(changeEvent.target.value)
                        }
                        feil={
                            skjema.felter.beløp.valideringsstatus === Valideringsstatus.FEIL &&
                            skjema.visFeilmeldinger
                                ? skjema.felter.beløp.feilmelding?.toString()
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
                                spinner={angrerKorrigering}
                                disabled={angrerKorrigering}
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
                            {korrigertEtterbetaling ? 'Oppdater' : 'Korriger beløp'}
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
