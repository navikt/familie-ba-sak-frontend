import * as React from 'react';

import { ExclamationmarkTriangleIcon } from '@navikt/aksel-icons';
import { Dropdown } from '@navikt/ds-react';

import KorrigerVedtakModal from './KorrigerVedtakModal';
import type { IRestKorrigertVedtak } from '../../../../../../typer/vedtak';

interface IKorrigerVedtak {
    korrigertVedtak?: IRestKorrigertVedtak;
    behandlingId: number;
    erLesevisning: boolean;
}

const KorrigerVedtak: React.FC<IKorrigerVedtak> = ({ korrigertVedtak, behandlingId, erLesevisning }) => {
    const [visModal, settVisModal] = React.useState<boolean>(false);

    return (
        <>
            <Dropdown.Menu.List.Item
                onClick={() => {
                    settVisModal(true);
                }}
            >
                <ExclamationmarkTriangleIcon fontSize={'1.4rem'} />
                {korrigertVedtak ? <>Vis korrigert vedtak</> : <>Korriger vedtak</>}
            </Dropdown.Menu.List.Item>
            {visModal && (
                <KorrigerVedtakModal
                    behandlingId={behandlingId}
                    korrigertVedtak={korrigertVedtak}
                    erLesevisning={erLesevisning}
                    lukkModal={() => settVisModal(false)}
                />
            )}
        </>
    );
};

export default KorrigerVedtak;
