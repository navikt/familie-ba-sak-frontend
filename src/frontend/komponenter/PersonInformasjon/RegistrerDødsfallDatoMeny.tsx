import * as React from 'react';

import { MenuElipsisHorizontalCircleIcon } from '@navikt/aksel-icons';
import { ActionMenu, Button } from '@navikt/ds-react';

import { RegistrerDødsfallDatoModal } from './RegistrerDødsfallDatoModal';
import type { IGrunnlagPerson } from '../../typer/person';

interface IRegistrerDødsfallDato {
    person: IGrunnlagPerson;
}

const RegistrerDødsfallDatoMeny: React.FC<IRegistrerDødsfallDato> = ({ person }) => {
    const [visModal, settVisModal] = React.useState<boolean>(false);

    return (
        <>
            <ActionMenu>
                <ActionMenu.Trigger>
                    <Button
                        aria-label="Åpne valgmeny"
                        icon={<MenuElipsisHorizontalCircleIcon aria-hidden />}
                        variant="tertiary"
                    />
                </ActionMenu.Trigger>
                <ActionMenu.Content>
                    <ActionMenu.Item
                        onSelect={() => {
                            settVisModal(true);
                        }}
                    >
                        Registrer Dødsfall
                    </ActionMenu.Item>
                </ActionMenu.Content>
            </ActionMenu>
            {visModal && <RegistrerDødsfallDatoModal lukkModal={() => settVisModal(false)} person={person} />}
        </>
    );
};

export default RegistrerDødsfallDatoMeny;
