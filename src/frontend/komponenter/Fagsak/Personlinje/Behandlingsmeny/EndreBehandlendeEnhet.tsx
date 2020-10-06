import { Knapp } from 'nav-frontend-knapper';
import React from 'react';
import { IModal } from '../../../../context/AppContext';

export const endreBehandlendeEnhet = (lukkModal: () => void): IModal => ({
    actions: [
        <Knapp key={'avbryt'} mini={true} onClick={lukkModal} children={'Avbryt'} />,
        <Knapp
            key={'bekreft'}
            type={'hoved'}
            mini={true}
            onClick={() => {
                axiosRequest({
                    data: {},
                });
                window.location.reload();
            }}
            children={'Bekreft'}
        />,
    ],
    onClose: lukkModal,
    lukkKnapp: true,
    tittel: 'Endre behandlende enhet for valgt behandling',
    innhold: () => 'Hei',
    visModal: true,
});
