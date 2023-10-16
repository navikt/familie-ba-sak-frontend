import * as React from 'react';

import { Dropdown } from '@navikt/ds-react';

import RegistrerDødsfallDatoModal from './RegistrerDødsfallDatoModal';
import type { IGrunnlagPerson } from '../../../typer/person';

interface IRegistrerDødsfallDato {
    person: IGrunnlagPerson;
    erLesevisning: boolean;
}

const RegistrerDødsfallDato: React.FC<IRegistrerDødsfallDato> = ({ person, erLesevisning }) => {
    const [visModal, settVisModal] = React.useState<boolean>(false);

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
                <RegistrerDødsfallDatoModal
                    lukkModal={() => settVisModal(false)}
                    person={person}
                    erLesevisning={erLesevisning}
                />
            )}
        </>
    );
};

export default RegistrerDødsfallDato;
