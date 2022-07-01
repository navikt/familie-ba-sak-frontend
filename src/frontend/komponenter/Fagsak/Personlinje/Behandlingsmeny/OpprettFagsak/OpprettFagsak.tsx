import React from 'react';

import KnappBase from 'nav-frontend-knapper';

import type { IPersonInfo } from '../../../../../typer/person';
import OpprettFagsakModal from '../../../../Felleskomponenter/HeaderMedSøk/OpprettFagsakModal';

interface IProps {
    onListElementClick: () => void;
    personInfo: IPersonInfo;
}

const OpprettFagsak: React.FC<IProps> = ({ onListElementClick, personInfo }) => {
    const [visModal, settVisModal] = React.useState(false);

    return (
        <>
            <KnappBase
                mini={true}
                onClick={() => {
                    onListElementClick();
                    settVisModal(true);
                }}
            >
                Opprett ny fagsak
            </KnappBase>
            {visModal && (
                <OpprettFagsakModal
                    personInfo={personInfo}
                    lukkModal={() => {
                        settVisModal(false);
                    }}
                />
            )}
        </>
    );
};

export default OpprettFagsak;
