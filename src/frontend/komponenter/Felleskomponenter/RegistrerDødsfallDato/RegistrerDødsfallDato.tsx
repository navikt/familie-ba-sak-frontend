import * as React from 'react';

import styled from 'styled-components';

import { Alert, Button, Modal } from '@navikt/ds-react';
import { Dropdown } from '@navikt/ds-react';
import { FamilieTextarea } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import { useRegistrerDødsfallDatoSkjemaContext } from '../../../context/RegistrerDødsfallDato/RegistrerDødsfallDatoSkjemaContext';
import type { IGrunnlagPerson } from '../../../typer/person';
import Datovelger from '../Datovelger';

const Feltmargin = styled.div`
    margin-bottom: 2rem;
`;

interface IRegistrerDødsfallDato {
    person: IGrunnlagPerson;
    erLesevisning: boolean;
}

const RegistrerDødsfallDato: React.FC<IRegistrerDødsfallDato> = ({ person, erLesevisning }) => {
    const [visModal, settVisModal] = React.useState<boolean>(false);

    const {
        skjema,
        valideringErOk,
        registrerManuellDødsfall,
        nullstillSkjema,
        settVisfeilmeldinger,
        settRestFeil,
        restFeil,
    } = useRegistrerDødsfallDatoSkjemaContext({
        onSuccess: () => settVisModal(false),
        person,
    });

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
                Registrer Dødsfall
            </Dropdown.Menu.List.Item>
            {visModal && (
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
                        <Feltmargin>
                            <Datovelger
                                felt={skjema.felter.dødsfallDato}
                                label={'Dødsdato'}
                                visFeilmeldinger={skjema.visFeilmeldinger}
                                readOnly={erLesevisning}
                            />
                        </Feltmargin>
                        <FamilieTextarea
                            {...skjema.felter.begrunnelse?.hentNavBaseSkjemaProps(
                                skjema.visFeilmeldinger
                            )}
                            id={'manuell-dødsdato-begrunnelse'}
                            label={'Begrunnelse'}
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
            )}
        </>
    );
};

export default RegistrerDødsfallDato;
