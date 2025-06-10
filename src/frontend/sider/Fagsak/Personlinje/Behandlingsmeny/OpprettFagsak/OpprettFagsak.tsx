import React from 'react';

import { Dropdown } from '@navikt/ds-react';

import { OpprettFagsakModal } from '../../../../../komponenter/HeaderMedSøk/OpprettFagsakModal';
import type { IPersonInfo } from '../../../../../typer/person';
import { useFagsakContext } from '../../../FagsakContext';

interface IProps {
    personInfo: IPersonInfo;
}

const OpprettFagsak: React.FC<IProps> = ({ personInfo }) => {
    const [visModal, settVisModal] = React.useState(false);
    const { fagsakerPåBruker } = useFagsakContext();

    return (
        <>
            <Dropdown.Menu.List.Item onClick={() => settVisModal(true)}>
                Opprett ny fagsak
            </Dropdown.Menu.List.Item>
            {visModal && (
                <OpprettFagsakModal
                    personInfo={personInfo}
                    fagsakerPåBruker={fagsakerPåBruker}
                    lukkModal={() => {
                        settVisModal(false);
                    }}
                />
            )}
        </>
    );
};

export default OpprettFagsak;
