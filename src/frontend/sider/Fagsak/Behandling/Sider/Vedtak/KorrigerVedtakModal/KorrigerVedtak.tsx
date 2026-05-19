import type { IRestKorrigertVedtak } from '@typer/vedtak';

import { ExclamationmarkTriangleIcon } from '@navikt/aksel-icons';
import { ActionMenu } from '@navikt/ds-react';

interface Props {
    åpneModal: () => void;
    korrigertVedtak?: IRestKorrigertVedtak;
}

const KorrigerVedtak = ({ åpneModal, korrigertVedtak }: Props) => {
    return (
        <ActionMenu.Item onSelect={åpneModal}>
            <ExclamationmarkTriangleIcon fontSize={'1.4rem'} />
            {korrigertVedtak ? <>Vis korrigert vedtak</> : <>Korriger vedtak</>}
        </ActionMenu.Item>
    );
};

export default KorrigerVedtak;
