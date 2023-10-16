import * as React from 'react';

import styled from 'styled-components';

import { Alert, Button, Modal } from '@navikt/ds-react';
import type { ISODateString } from '@navikt/familie-datovelger';
import { FamilieDatovelger } from '@navikt/familie-datovelger';
import { FamilieTextarea } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import { useRegistrerDødsfallDatoSkjemaContext } from '../../../context/RegistrerDødsfallDato/RegistrerDødsfallDatoSkjemaContext';
import type { IGrunnlagPerson } from '../../../typer/person';
import { DatoformatNorsk } from '../../../utils/formatter';

const StyledFamilieDatovelger = styled(FamilieDatovelger)`
    margin-bottom: 1.5rem;
`;

interface IProps {
    lukkModal: () => void;
    person: IGrunnlagPerson;
    erLesevisning: boolean;
}

const RegistrerDødsfallDatoModal = ({ lukkModal, person, erLesevisning }: IProps) => {
    const {
        skjema,
        valideringErOk,
        registrerManuellDødsfall,
        nullstillSkjema,
        settVisfeilmeldinger,
        settRestFeil,
        restFeil,
    } = useRegistrerDødsfallDatoSkjemaContext({
        onSuccess: lukkModal,
        person,
    });

    const lukkModalOgNullstillSkjema = () => {
        nullstillSkjema();
        settVisfeilmeldinger(false);
        settRestFeil(undefined);
        lukkModal();
    };

    return (
        <Modal
            open
            onClose={lukkModalOgNullstillSkjema}
            header={{
                heading: 'Registrere dødsdato',
                size: 'medium',
            }}
            width={'35rem'}
            portal
        >
            <Modal.Body>
                <div>
                    <StyledFamilieDatovelger
                        {...skjema.felter.dødsfallDato?.hentNavBaseSkjemaProps(
                            skjema.visFeilmeldinger
                        )}
                        id={'registrer-døds-dato'}
                        label={'Dødsdato'}
                        erLesesvisning={erLesevisning}
                        value={
                            skjema.felter.dødsfallDato?.verdi !== null
                                ? skjema.felter.dødsfallDato?.verdi
                                : undefined
                        }
                        placeholder={DatoformatNorsk.DATO}
                        onChange={(dato?: ISODateString) =>
                            skjema.felter.dødsfallDato?.validerOgSettFelt(dato)
                        }
                    />
                    <FamilieTextarea
                        {...skjema.felter.begrunnelse?.hentNavBaseSkjemaProps(
                            skjema.visFeilmeldinger
                        )}
                        id={'manuell-dødsdato-begrunnelse'}
                        label={'Begrunnelse'}
                        erLesevisning={erLesevisning}
                        value={skjema.felter.begrunnelse.verdi}
                        onChange={changeEvent =>
                            skjema.felter.begrunnelse.validerOgSettFelt(changeEvent.target.value)
                        }
                    />
                    {restFeil && (
                        <Alert variant="error" style={{ marginBottom: '1.5rem' }} inline>
                            {restFeil}
                        </Alert>
                    )}
                </div>
            </Modal.Body>
            {!erLesevisning && (
                <Modal.Footer>
                    <Button
                        onClick={registrerManuellDødsfall}
                        variant={valideringErOk() ? 'primary' : 'secondary'}
                        loading={skjema.submitRessurs.status === RessursStatus.HENTER}
                        disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                    >
                        Bekreft
                    </Button>
                    <Button onClick={lukkModalOgNullstillSkjema} variant={'tertiary'}>
                        Avbryt
                    </Button>
                </Modal.Footer>
            )}
        </Modal>
    );
};

export default RegistrerDødsfallDatoModal;
