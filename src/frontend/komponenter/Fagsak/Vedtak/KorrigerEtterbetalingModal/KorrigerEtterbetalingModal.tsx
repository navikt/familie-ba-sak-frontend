import * as React from 'react';

import styled from 'styled-components';

import { SkjemaGruppe } from 'nav-frontend-skjema';

import { Cancel } from '@navikt/ds-icons';
import { Heading, Modal } from '@navikt/ds-react';
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

const familieKnappStyle: React.CSSProperties = {
    float: 'right',
    margin: '1rem 0px 2rem 1rem',
};

const ikonKnappStyle: React.CSSProperties = {
    float: 'left',
    margin: '1rem 0px 2rem 0px',
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
    } = useKorrigerEtterbetalingSkjemaContext();
    return (
        <Modal open={visModal} onClose={setVisModal}>
            <Modal.Content style={{ minWidth: '30rem' }}>
                <Heading spacing size="medium">
                    Korriger etterbetaling
                </Heading>
                <SkjemaGruppe>
                    <FamilieReactSelect
                        label={'Årsak for korrigering'}
                        id={'korrigering-aarsak'}
                        erLesevisning={erLesevisning}
                        options={aarsakOptions}
                        onChange={option =>
                            skjema.felter.aarsak.validerOgSettFelt(option as OptionType)
                        }
                        feil={
                            skjema.felter.aarsak.valideringsstatus === Valideringsstatus.FEIL &&
                            skjema.visFeilmeldinger
                                ? skjema.felter.aarsak.feilmelding?.toString()
                                : ''
                        }
                    />
                    <FamilieInput
                        label={'Nytt etterbetalingsbeløp'}
                        id={'korrigering-belop'}
                        erLesevisning={erLesevisning}
                        type={'number'}
                        bredde={'S'}
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
                    />
                    <FamilieTextarea
                        label={'Begrunnelse (valgfri)'}
                        id={'korrigering-begrunnelse'}
                        erLesevisning={erLesevisning}
                        value={skjema.felter.begrunnelse.verdi}
                        onChange={changeEvent =>
                            skjema.felter.begrunnelse.validerOgSettFelt(changeEvent.target.value)
                        }
                        maxLength={1000}
                        style={{ minHeight: '5rem' }}
                    />
                    <Knapperad>
                        {visAngreKorrigering && (
                            <IkonKnapp
                                style={ikonKnappStyle}
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
                            style={familieKnappStyle}
                            erLesevisning={false}
                            onClick={lagreKorrigering}
                            mini={true}
                            type={valideringErOk() ? 'hoved' : 'standard'}
                            spinner={skjema.submitRessurs.status === RessursStatus.HENTER}
                            disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                        >
                            Korriger beløp
                        </FamilieKnapp>
                        <FamilieKnapp
                            style={familieKnappStyle}
                            erLesevisning={false}
                            onClick={setVisModal}
                            mini={true}
                            type={'flat'}
                        >
                            Avbryt
                        </FamilieKnapp>
                    </Knapperad>
                </SkjemaGruppe>
            </Modal.Content>
        </Modal>
    );
};
