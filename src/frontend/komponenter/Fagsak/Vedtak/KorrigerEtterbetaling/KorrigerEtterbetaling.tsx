import * as React from 'react';

import styled, { css } from 'styled-components';

import { Cancel, Notes } from '@navikt/ds-icons';
import { Alert, Button, Fieldset, Heading, Modal } from '@navikt/ds-react';
import { Dropdown } from '@navikt/ds-react-internal';
import { FamilieInput, FamilieSelect, FamilieTextarea } from '@navikt/familie-form-elements';
import { Valideringsstatus } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';

import { useKorrigerEtterbetalingSkjemaContext } from '../../../../context/KorrigertEtterbetaling/KorrigerEtterbetalingModalSkjemaContext';
import type { IRestKorrigertEtterbetaling } from '../../../../typer/vedtak';

interface IKorrigerEtterbetaling {
    korrigertEtterbetaling?: IRestKorrigertEtterbetaling;
    behandlingId: number;
    erLesevisning: boolean;
}

const Knapperad = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const AngreKnapp = styled(Button)`
    margin: 0.5rem 0rem;
`;

const KnappVenstre = styled(Button)`
    margin-right: 1rem;
`;

const baseSkjemaelementStyle = css`
    margin-bottom: 1.5rem;
`;

const StyledFamilieSelect = styled(FamilieSelect)`
    ${baseSkjemaelementStyle}
`;

const StyledFamilieInput = styled(FamilieInput)`
    ${baseSkjemaelementStyle};
    :not(&.lesevisning) {
        width: 7.5rem;
    }
`;

const StyledFamilieTextarea = styled(FamilieTextarea)`
    ${baseSkjemaelementStyle}
`;

const StyledSkjema = styled(Fieldset)`
    margin-bottom: 2.5rem;
`;

const StyledModalContent = styled(Modal.Content)`
    width: 35rem;
`;

const StyledModalHeader = styled(Heading)`
    margin-bottom: 2rem;
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

    const hentLabelForÅrsak = (årsakValue: string) =>
        årsaker.find(årsak => årsak.value === årsakValue)?.label;

    return (
        <>
            <Dropdown.Menu.List.Item
                onClick={() => {
                    settVisModal(true);
                }}
            >
                <Notes />
                {korrigertEtterbetaling ? (
                    <>Vis korrigert etterbetaling</>
                ) : (
                    <>Korriger etterbetaling</>
                )}
            </Dropdown.Menu.List.Item>
            <Modal open={visModal} onClose={lukkModal}>
                <StyledModalContent>
                    <StyledModalHeader size="medium" level={'2'}>
                        Korriger etterbetaling
                    </StyledModalHeader>
                    <StyledSkjema legend="Korriger etterbetaling" hideLegend>
                        <div>
                            <StyledFamilieSelect
                                label={'Årsak'}
                                id={'korrigering-aarsak'}
                                value={skjema.felter.årsak.verdi}
                                lesevisningVerdi={
                                    skjema.felter.årsak.verdi === ''
                                        ? 'Ingen årsak valgt.'
                                        : hentLabelForÅrsak(skjema.felter.årsak.verdi)
                                }
                                onChange={option =>
                                    skjema.felter.årsak.validerOgSettFelt(option.target.value)
                                }
                                error={
                                    skjema.felter.årsak.valideringsstatus ===
                                        Valideringsstatus.FEIL && skjema.visFeilmeldinger
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
                                    skjema.felter.beløp.valideringsstatus ===
                                        Valideringsstatus.FEIL && skjema.visFeilmeldinger
                                        ? skjema.felter.beløp.feilmelding?.toString()
                                        : ''
                                }
                                erLesevisning={erLesevisning}
                                className={erLesevisning ? 'lesevisning' : ''}
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
                    </StyledSkjema>
                    <Knapperad>
                        {!erLesevisning && (
                            <>
                                <div>
                                    <KnappVenstre
                                        onClick={lagreKorrigering}
                                        variant={valideringErOk() ? 'primary' : 'secondary'}
                                        loading={
                                            skjema.submitRessurs.status === RessursStatus.HENTER
                                        }
                                        disabled={
                                            skjema.submitRessurs.status === RessursStatus.HENTER
                                        }
                                    >
                                        {korrigertEtterbetaling ? 'Oppdater' : 'Korriger beløp'}
                                    </KnappVenstre>
                                    <Button onClick={lukkModal} variant={'tertiary'}>
                                        Avbryt
                                    </Button>
                                </div>
                                <div>
                                    {visAngreKorrigering && (
                                        <AngreKnapp
                                            id={'angre-korrigering'}
                                            size={'small'}
                                            onClick={angreKorrigering}
                                            variant={'tertiary'}
                                            loading={angrerKorrigering}
                                            disabled={angrerKorrigering}
                                            icon={<Cancel />}
                                        >
                                            Angre korrigering
                                        </AngreKnapp>
                                    )}
                                </div>
                            </>
                        )}
                        {erLesevisning && <Button onClick={lukkModal}>Lukk</Button>}
                    </Knapperad>
                </StyledModalContent>
            </Modal>
        </>
    );
};

export default KorrigerEtterbetaling;
