import * as React from 'react';

import styled, { css } from 'styled-components';

import { SkjemaGruppe } from 'nav-frontend-skjema';

import { Cancel } from '@navikt/ds-icons';
import { Alert, Button, Heading, Modal } from '@navikt/ds-react';
import { FamilieInput, FamilieSelect, FamilieTextarea } from '@navikt/familie-form-elements';
import { Valideringsstatus } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';

import { useKorrigerEtterbetalingSkjemaContext } from '../../../../context/KorrigertEtterbetaling/KorrigerEtterbetalingModalSkjemaContext';
import type { IRestKorrigertEtterbetaling } from '../../../../typer/vedtak';

interface IKorrigerEtterbetalingModal {
    korrigertEtterbetaling?: IRestKorrigertEtterbetaling;
    behandlingId: number;
    erLesevisning: boolean;
    visModal: boolean;
    onClose: () => void;
}

const Knapperad = styled.div`
    width: 100%;
    position: relative;
    display: inline-block;
`;

const AngreKnapp = styled(Button)`
    margin: 0.5rem 1rem 0.5rem 0rem;
`;

const KnappHøyre = styled(Button)`
    float: right;
    margin-left: 1rem;
`;

const baseSkjemaelementStyle = css`
    margin-bottom: 1.5rem;
`;

const StyledFamilieSelect = styled(FamilieSelect)`
    ${baseSkjemaelementStyle}
`;

const StyledFamilieInput = styled(FamilieInput)`
    ${baseSkjemaelementStyle};
    width: 25%;
`;

const StyledFamilieTextarea = styled(FamilieTextarea)`
    ${baseSkjemaelementStyle}
`;

const StyledSkjema = styled(SkjemaGruppe)`
    margin-bottom: 2.5rem;
`;

const StyledModalContent = styled(Modal.Content)`
    padding: 2.5rem;
    width: 35rem;
`;

const StyledModalHeader = styled(Heading)`
    margin-bottom: 2rem;
`;

const LukkKnapp = styled(Button)`
    margin: 0 auto;
    display: block;
`;

const KorrigerEtterbetalingModal: React.FC<IKorrigerEtterbetalingModal> = ({
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
            <StyledModalContent>
                <StyledModalHeader size="medium">Korriger etterbetaling</StyledModalHeader>
                <StyledSkjema feil={false}>
                    <div>
                        <StyledFamilieSelect
                            label={'Årsak'}
                            id={'korrigering-aarsak'}
                            value={skjema.felter.årsak.verdi}
                            onChange={option =>
                                skjema.felter.årsak.validerOgSettFelt(option.target.value)
                            }
                            error={
                                skjema.felter.årsak.valideringsstatus === Valideringsstatus.FEIL &&
                                skjema.visFeilmeldinger
                                    ? skjema.felter.årsak.feilmelding?.toString()
                                    : ''
                            }
                            erLesevisning={erLesevisning}
                        >
                            {årsaker.map(årsak => (
                                <option value={årsak.value} key={årsak.value}>
                                    {årsak.label}
                                </option>
                            ))}
                        </StyledFamilieSelect>
                        <StyledFamilieInput
                            label={'Nytt beløp'}
                            id={'korrigering-belop'}
                            type={'number'}
                            value={skjema.felter.beløp.verdi}
                            onChange={changeEvent =>
                                skjema.felter.beløp.validerOgSettFelt(changeEvent.target.value)
                            }
                            error={
                                skjema.felter.beløp.valideringsstatus === Valideringsstatus.FEIL &&
                                skjema.visFeilmeldinger
                                    ? skjema.felter.beløp.feilmelding?.toString()
                                    : ''
                            }
                            erLesevisning={erLesevisning}
                        />
                        <StyledFamilieTextarea
                            label={'Begrunnelse (valgfri)'}
                            id={'korrigering-begrunnelse'}
                            value={skjema.felter.begrunnelse.verdi}
                            onChange={changeEvent =>
                                skjema.felter.begrunnelse.validerOgSettFelt(
                                    changeEvent.target.value
                                )
                            }
                            maxLength={erLesevisning ? 0 : 1000}
                            erLesevisning={erLesevisning}
                        />
                    </div>
                    {!erLesevisning && (
                        <>
                            <Alert
                                variant="info"
                                style={restFeil ? { marginBottom: '1.5rem' } : {}}
                                inline
                            >
                                Husk å sende korrigeringsmelding til NØS
                            </Alert>
                            {restFeil && (
                                <Alert variant="error" style={{ marginBottom: '1.5rem' }} inline>
                                    {restFeil}
                                </Alert>
                            )}
                        </>
                    )}
                </StyledSkjema>
                {!erLesevisning && (
                    <Knapperad>
                        {visAngreKorrigering && (
                            <AngreKnapp
                                id={'angre-korrigering'}
                                size={'small'}
                                onClick={angreKorrigering}
                                variant={'tertiary'}
                                loading={angrerKorrigering}
                                disabled={angrerKorrigering}
                            >
                                <Cancel /> Angre korrigering
                            </AngreKnapp>
                        )}
                        <KnappHøyre
                            onClick={lagreKorrigering}
                            variant={valideringErOk() ? 'primary' : 'secondary'}
                            loading={skjema.submitRessurs.status === RessursStatus.HENTER}
                            disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                        >
                            {korrigertEtterbetaling ? 'Oppdater' : 'Korriger beløp'}
                        </KnappHøyre>
                        <KnappHøyre onClick={lukkModal} variant={'tertiary'}>
                            Avbryt
                        </KnappHøyre>
                    </Knapperad>
                )}
                {erLesevisning && <LukkKnapp onClick={lukkModal}>Lukk</LukkKnapp>}
            </StyledModalContent>
        </Modal>
    );
};

export default KorrigerEtterbetalingModal;
