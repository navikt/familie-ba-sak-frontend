import * as React from 'react';

import styled from 'styled-components';

import { ArrowUndoIcon } from '@navikt/aksel-icons';
import { BodyLong, Button, Fieldset, Modal, Textarea } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { useKorrigerVedtakSkjemaContext } from '../../../../../../context/KorrigerVedtak/KorrigerVedtakSkjemaContext';
import Datovelger from '../../../../../../komponenter/Datovelger/Datovelger';
import type { IRestKorrigertVedtak } from '../../../../../../typer/vedtak';

const AngreKnapp = styled(Button)`
    margin: 0.5rem 0;
`;

interface IProps {
    lukkModal: () => void;
    korrigertVedtak?: IRestKorrigertVedtak;
    behandlingId: number;
    erLesevisning: boolean;
}

const KorrigerVedtakModal = ({
    lukkModal,
    korrigertVedtak,
    behandlingId,
    erLesevisning,
}: IProps) => {
    const { skjema, valideringErOk, lagreKorrigertVedtak, angreKorrigering, restFeil } =
        useKorrigerVedtakSkjemaContext({
            lukkModal,
            korrigertVedtak,
            behandlingId,
        });

    const visAngreKnapp = korrigertVedtak != null;

    return (
        <Modal
            open
            onClose={lukkModal}
            header={{ heading: 'Korriger vedtak', size: 'medium' }}
            width={'35rem'}
            portal
        >
            <Modal.Body>
                <BodyLong>
                    Dersom det har blitt gjort feil tidligere vedtak, kan denne teksten legges til i
                    vedtaksbrevet:
                </BodyLong>
                <ul>
                    <li>
                        Vi har oppdaget en feil i vedtaket vi gjorde [DATO]. Derfor har vi vurdert
                        saken din på nytt.
                    </li>
                </ul>
                <Fieldset
                    legend="Korriger vedtak"
                    hideLegend
                    errorPropagation={false}
                    error={skjema.visFeilmeldinger && restFeil}
                >
                    <Datovelger
                        felt={skjema.felter.vedtaksdato}
                        label={'Vedtaksdato'}
                        readOnly={erLesevisning}
                        visFeilmeldinger={skjema.visFeilmeldinger}
                        kanKunVelgeFortid
                    />
                    <Textarea
                        {...skjema.felter.begrunnelse?.hentNavBaseSkjemaProps(
                            skjema.visFeilmeldinger
                        )}
                        id={'korriger-vedtak-begrunnelse'}
                        label={'Begrunnelse (valgfri)'}
                        description={'Begrunn hva som er gjort feil i tidligere vedtak'}
                        readOnly={erLesevisning}
                        value={skjema.felter.begrunnelse.verdi}
                        onChange={changeEvent =>
                            skjema.felter.begrunnelse.validerOgSettFelt(changeEvent.target.value)
                        }
                    />
                </Fieldset>
            </Modal.Body>
            <Modal.Footer>
                {!erLesevisning && (
                    <>
                        <Button
                            onClick={lagreKorrigertVedtak}
                            variant={valideringErOk() ? 'primary' : 'secondary'}
                            loading={skjema.submitRessurs.status === RessursStatus.HENTER}
                            disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                        >
                            {korrigertVedtak ? 'Oppdater' : 'Legg til'}
                        </Button>
                        <Button onClick={lukkModal} variant={'tertiary'}>
                            Avbryt
                        </Button>
                        {visAngreKnapp && (
                            <AngreKnapp
                                size={'small'}
                                onClick={angreKorrigering}
                                variant={'tertiary'}
                                loading={skjema.submitRessurs.status === RessursStatus.HENTER}
                                disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                                icon={<ArrowUndoIcon />}
                            >
                                Fjern korrigering
                            </AngreKnapp>
                        )}
                    </>
                )}
                {erLesevisning && <Button onClick={lukkModal}>Lukk</Button>}
            </Modal.Footer>
        </Modal>
    );
};

export default KorrigerVedtakModal;
