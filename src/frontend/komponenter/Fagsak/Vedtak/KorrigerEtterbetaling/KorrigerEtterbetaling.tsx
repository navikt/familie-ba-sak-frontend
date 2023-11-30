import * as React from 'react';

import styled, { css } from 'styled-components';

import { ArrowUndoIcon, DocPencilIcon } from '@navikt/aksel-icons';
import { Alert, Button, Fieldset, Modal, Select, Textarea, TextField } from '@navikt/ds-react';
import { Dropdown } from '@navikt/ds-react';
import { Valideringsstatus } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';

import { useKorrigerEtterbetalingSkjemaContext } from '../../../../context/KorrigertEtterbetaling/KorrigerEtterbetalingModalSkjemaContext';
import type { IRestKorrigertEtterbetaling } from '../../../../typer/vedtak';

interface IKorrigerEtterbetaling {
    korrigertEtterbetaling?: IRestKorrigertEtterbetaling;
    behandlingId: number;
    erLesevisning: boolean;
}

const AngreKnapp = styled(Button)`
    margin: 0.5rem 0;
`;

const baseSkjemaelementStyle = css`
    margin-bottom: 1.5rem;
`;

const StyledSelect = styled(Select)`
    ${baseSkjemaelementStyle}
`;

const StyledTextField = styled(TextField)`
    ${baseSkjemaelementStyle};
    width: 7.5rem;
`;

const StyledTextarea = styled(Textarea)`
    ${baseSkjemaelementStyle}
`;

const KorrigerEtterbetaling: React.FC<IKorrigerEtterbetaling> = ({
    korrigertEtterbetaling,
    behandlingId,
    erLesevisning,
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
        onSuccess: () => settVisModal(false),
        korrigertEtterbetaling,
        behandlingId,
    });

    const [visModal, settVisModal] = React.useState<boolean>(false);

    const lukkModal = () => {
        nullstillSkjema();
        settVisfeilmeldinger(false);
        settRestFeil(undefined);
        settVisModal(false);
    };

    return (
        <>
            <Dropdown.Menu.List.Item
                onClick={() => {
                    settVisModal(true);
                }}
            >
                <DocPencilIcon fontSize={'1.4rem'} />
                {korrigertEtterbetaling ? (
                    <>Vis korrigert etterbetaling</>
                ) : (
                    <>Korriger etterbetaling</>
                )}
            </Dropdown.Menu.List.Item>
            {visModal && (
                <Modal
                    open
                    onClose={lukkModal}
                    header={{ heading: 'Korriger etterbetaling', size: 'medium' }}
                    width={'35rem'}
                    portal
                >
                    <Modal.Body>
                        <Fieldset error={false} legend="Korriger etterbetaling" hideLegend>
                            <div>
                                <StyledSelect
                                    label={'Årsak'}
                                    id={'korrigering-aarsak'}
                                    value={skjema.felter.årsak.verdi}
                                    readOnly={erLesevisning}
                                    onChange={option =>
                                        skjema.felter.årsak.validerOgSettFelt(option.target.value)
                                    }
                                    error={
                                        skjema.felter.årsak.valideringsstatus ===
                                            Valideringsstatus.FEIL && skjema.visFeilmeldinger
                                            ? skjema.felter.årsak.feilmelding?.toString()
                                            : ''
                                    }
                                >
                                    {årsaker.map(årsak => (
                                        <option value={årsak.value} key={årsak.value}>
                                            {årsak.label}
                                        </option>
                                    ))}
                                </StyledSelect>
                                <StyledTextField
                                    label={'Nytt beløp'}
                                    id={'korrigering-belop'}
                                    type={'number'}
                                    value={skjema.felter.beløp.verdi}
                                    onChange={changeEvent =>
                                        skjema.felter.beløp.validerOgSettFelt(
                                            changeEvent.target.value
                                        )
                                    }
                                    error={
                                        skjema.felter.beløp.valideringsstatus ===
                                            Valideringsstatus.FEIL && skjema.visFeilmeldinger
                                            ? skjema.felter.beløp.feilmelding?.toString()
                                            : ''
                                    }
                                    readOnly={erLesevisning}
                                    className={erLesevisning ? 'lesevisning' : ''}
                                />
                                <StyledTextarea
                                    label={'Begrunnelse (valgfri)'}
                                    id={'korrigering-begrunnelse'}
                                    value={skjema.felter.begrunnelse.verdi}
                                    onChange={changeEvent =>
                                        skjema.felter.begrunnelse.validerOgSettFelt(
                                            changeEvent.target.value
                                        )
                                    }
                                    maxLength={erLesevisning ? 0 : 1000}
                                    readOnly={erLesevisning}
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
                                        <Alert
                                            variant="error"
                                            style={{ marginBottom: '1.5rem' }}
                                            inline
                                        >
                                            {restFeil}
                                        </Alert>
                                    )}
                                </>
                            )}
                        </Fieldset>
                    </Modal.Body>
                    <Modal.Footer>
                        {!erLesevisning && (
                            <>
                                <Button
                                    onClick={lagreKorrigering}
                                    variant={valideringErOk() ? 'primary' : 'secondary'}
                                    loading={skjema.submitRessurs.status === RessursStatus.HENTER}
                                    disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                                >
                                    {korrigertEtterbetaling ? 'Oppdater' : 'Korriger beløp'}
                                </Button>
                                <Button onClick={lukkModal} variant={'tertiary'}>
                                    Avbryt
                                </Button>
                                {visAngreKorrigering && (
                                    <AngreKnapp
                                        id={'angre-korrigering'}
                                        size={'small'}
                                        onClick={angreKorrigering}
                                        variant={'tertiary'}
                                        loading={angrerKorrigering}
                                        disabled={angrerKorrigering}
                                        icon={<ArrowUndoIcon />}
                                    >
                                        Angre korrigering
                                    </AngreKnapp>
                                )}
                            </>
                        )}
                        {erLesevisning && <Button onClick={lukkModal}>Lukk</Button>}
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
};

export default KorrigerEtterbetaling;
