import * as React from 'react';

import { DocPencilIcon } from '@navikt/aksel-icons';
import { Dropdown } from '@navikt/ds-react';

import { ModalType } from '../../../../../../context/ModalContext';
import { useModal } from '../../../../../../hooks/useModal';
import type { IRestKorrigertEtterbetaling } from '../../../../../../typer/vedtak';

interface IKorrigerEtterbetaling {
    korrigertEtterbetaling?: IRestKorrigertEtterbetaling;
    behandlingId: number;
    erLesevisning: boolean;
}

const KorrigerEtterbetaling: React.FC<IKorrigerEtterbetaling> = ({ korrigertEtterbetaling }) => {
    const { åpneModal } = useModal(ModalType.KORRIGER_ETTERBETALING);

    return (
        <Dropdown.Menu.List.Item
            onClick={() => {
                åpneModal();
            }}
        >
            <DocPencilIcon fontSize={'1.4rem'} />
            {korrigertEtterbetaling ? (
                <>Vis korrigert etterbetaling</>
            ) : (
                <>Korriger etterbetaling</>
            )}
        </Dropdown.Menu.List.Item>
    );
};

export default KorrigerEtterbetaling;
