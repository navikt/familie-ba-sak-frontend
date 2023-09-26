import * as React from 'react';

import styled, { css } from 'styled-components';

import { Alert, Button, Modal } from '@navikt/ds-react';
import { Dropdown } from '@navikt/ds-react';
import type { ISODateString } from '@navikt/familie-datovelger';
import { FamilieDatovelger } from '@navikt/familie-datovelger';
import { FamilieTextarea } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import { useRegistrerDødsfallDatoSkjemaContext } from '../../../context/RegistrerDødsfallDato/RegistrerDødsfallDatoSkjemaContext';
import type { IGrunnlagPerson } from '../../../typer/person';
import { datoformatNorsk } from '../../../utils/formatter';

const StyledModalContent = styled(Modal.Body)`
    width: 40rem;
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
                    open={visModal}
                    onClose={lukkModal}
                    header={{
                        heading: 'Registrere dødsdato',
                        size: 'medium',
                    }}
                    portal
                >
                    <StyledModalContent>
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
                                placeholder={datoformatNorsk.DATO}
                                onChange={(dato?: ISODateString) =>
                                    skjema.felter.dødsfallDato?.validerOgSettFelt(dato)
                                }
                            />
                            <StyledFamilieTextarea
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
                        </div>
                    </StyledModalContent>
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
