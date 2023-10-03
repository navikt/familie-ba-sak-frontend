import * as React from 'react';

import styled, { css } from 'styled-components';

import { ArrowUndoIcon, ExclamationmarkTriangleIcon } from '@navikt/aksel-icons';
import { Alert, BodyLong, Button, Modal } from '@navikt/ds-react';
import { Dropdown } from '@navikt/ds-react';
import type { ISODateString } from '@navikt/familie-datovelger';
import { FamilieDatovelger } from '@navikt/familie-datovelger';
import { FamilieTextarea } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import { useKorrigerVedtakSkjemaContext } from '../../../../context/KorrigerVedtak/KorrigerVedtakSkjemaContext';
import type { IRestKorrigertVedtak } from '../../../../typer/vedtak';
import { datoformatNorsk } from '../../../../utils/formatter';

const AngreKnapp = styled(Button)`
    margin: 0.5rem 0rem;
`;

const baseSkjemaelementStyle = css`
    margin-bottom: 1.5rem;
`;

const StyledFamilieDatovelger = styled(FamilieDatovelger)`
    ${baseSkjemaelementStyle}
`;

const StyledFamilieTextarea = styled(FamilieTextarea)`
    ${baseSkjemaelementStyle}
`;

interface IKorrigerVedtak {
    korrigertVedtak?: IRestKorrigertVedtak;
    behandlingId: number;
    erLesevisning: boolean;
}

const KorrigerVedtak: React.FC<IKorrigerVedtak> = ({
    korrigertVedtak,
    behandlingId,
    erLesevisning,
}) => {
    const [visModal, settVisModal] = React.useState<boolean>(false);

    const {
        skjema,
        valideringErOk,
        lagreKorrigertVedtak,
        nullstillSkjema,
        angreKorrigering,
        settVisfeilmeldinger,
        settRestFeil,
        restFeil,
    } = useKorrigerVedtakSkjemaContext({
        onSuccess: () => settVisModal(false),
        korrigertVedtak,
        behandlingId,
    });

    const lukkModal = () => {
        nullstillSkjema();
        settVisfeilmeldinger(false);
        settRestFeil(undefined);
        settVisModal(false);
    };

    const visAngreKnapp = korrigertVedtak != null;

    return (
        <>
            <Dropdown.Menu.List.Item
                onClick={() => {
                    settVisModal(true);
                }}
            >
                <ExclamationmarkTriangleIcon fontSize={'1.4rem'} />
                {korrigertVedtak ? <>Vis korrigert vedtak</> : <>Korriger vedtak</>}
            </Dropdown.Menu.List.Item>
            {visModal && (
                <Modal
                    open={visModal}
                    onClose={lukkModal}
                    header={{ heading: 'Korriger vedtak', size: 'medium' }}
                    width={'35rem'}
                    portal
                >
                    <Modal.Body>
                        <BodyLong>
                            Dersom det har blitt gjort feil tidligere vedtak, kan denne teksten
                            legges til i vedtaksbrevet:
                        </BodyLong>
                        <ul>
                            <li>
                                Vi har oppdaget en feil i vedtaket vi gjorde [DATO]. Derfor har vi
                                vurdert saken din på nytt.
                            </li>
                        </ul>
                        <StyledFamilieDatovelger
                            {...skjema.felter.vedtaksdato?.hentNavBaseSkjemaProps(
                                skjema.visFeilmeldinger
                            )}
                            id={'korriger-vedtak-dato'}
                            label={'Vedtaksdato'}
                            erLesesvisning={erLesevisning}
                            value={
                                skjema.felter.vedtaksdato?.verdi !== null
                                    ? skjema.felter.vedtaksdato?.verdi
                                    : undefined
                            }
                            placeholder={datoformatNorsk.DATO}
                            onChange={(dato?: ISODateString) =>
                                skjema.felter.vedtaksdato?.validerOgSettFelt(dato)
                            }
                        />
                        <StyledFamilieTextarea
                            {...skjema.felter.begrunnelse?.hentNavBaseSkjemaProps(
                                skjema.visFeilmeldinger
                            )}
                            id={'korriger-vedtak-begrunnelse'}
                            label={'Begrunnelse (valgfri)'}
                            description={'Begrunn hva som er gjort feil i tidligere vedtak'}
                            erLesevisning={erLesevisning}
                            value={skjema.felter.begrunnelse.verdi}
                            onChange={changeEvent =>
                                skjema.felter.begrunnelse.validerOgSettFelt(
                                    changeEvent.target.value
                                )
                            }
                        />
                        {restFeil && (
                            <Alert variant="error" style={{ marginBottom: '1.5rem' }} inline>
                                {restFeil}
                            </Alert>
                        )}
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
                                        loading={
                                            skjema.submitRessurs.status === RessursStatus.HENTER
                                        }
                                        disabled={
                                            skjema.submitRessurs.status === RessursStatus.HENTER
                                        }
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
            )}
        </>
    );
};

export default KorrigerVedtak;
