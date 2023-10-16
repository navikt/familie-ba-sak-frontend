import * as React from 'react';

import { Button, Fieldset, Modal } from '@navikt/ds-react';
import { FamilieTextarea } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import { useRegistrerDødsfallDatoSkjemaContext } from '../../../context/RegistrerDødsfallDato/RegistrerDødsfallDatoSkjemaContext';
import type { IGrunnlagPerson } from '../../../typer/person';
import Datovelger from '../Datovelger';

interface IProps {
    lukkModal: () => void;
    person: IGrunnlagPerson;
    erLesevisning: boolean;
}

const RegistrerDødsfallDatoModal = ({ lukkModal, person, erLesevisning }: IProps) => {
    const { skjema, valideringErOk, registrerManuellDødsfall, restFeil } =
        useRegistrerDødsfallDatoSkjemaContext({
            lukkModal,
            person,
        });

    return (
        <Modal
            open
            onClose={lukkModal}
            header={{
                heading: 'Registrere dødsdato',
                size: 'medium',
            }}
            width={'35rem'}
            portal
        >
            <Modal.Body>
                <Fieldset
                    legend="Registrer dødsfall"
                    hideLegend
                    error={skjema.visFeilmeldinger && restFeil}
                    errorPropagation={false}
                >
                    <Datovelger
                        felt={skjema.felter.dødsfallDato}
                        label={'Dødsdato'}
                        visFeilmeldinger={skjema.visFeilmeldinger}
                        readOnly={erLesevisning}
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
                </Fieldset>
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
                    <Button onClick={lukkModal} variant={'tertiary'}>
                        Avbryt
                    </Button>
                </Modal.Footer>
            )}
        </Modal>
    );
};

export default RegistrerDødsfallDatoModal;
