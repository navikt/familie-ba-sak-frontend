import * as React from 'react';

import { ExclamationmarkTriangleIcon } from '@navikt/aksel-icons';
import { ActionMenu } from '@navikt/ds-react';

import type { IRestKorrigertVedtak } from '../../../../../../typer/vedtak';

interface Props {
    åpneModal: () => void;
    korrigertVedtak?: IRestKorrigertVedtak;
}

const KorrigerVedtak: React.FC<Props> = ({ åpneModal, korrigertVedtak }) => {
    return (
        <ActionMenu.Item onSelect={åpneModal}>
            <ExclamationmarkTriangleIcon fontSize={'1.4rem'} />
            {korrigertVedtak ? <>Vis korrigert vedtak</> : <>Korriger vedtak</>}
        </ActionMenu.Item>
    );
};

export default KorrigerVedtak;
