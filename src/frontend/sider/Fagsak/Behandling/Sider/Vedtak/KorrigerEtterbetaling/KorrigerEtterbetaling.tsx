import * as React from 'react';

import { isPending } from 'fork-ts-checker-webpack-plugin/lib/utils/async/is-pending';

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

    console.log(isPending);

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
