import React from 'react';

import { Dropdown } from '@navikt/ds-react';

import { useAppContext } from '../../../../../context/AppContext';
import { ModalType } from '../../../../../context/ModalContext';
import { useModal } from '../../../../../hooks/useModal';
import { OpprettFagsakModal } from '../../../../../komponenter/HeaderMedSøk/OpprettFagsakModal';
import { FagsakType, type IMinimalFagsak } from '../../../../../typer/fagsak';
import type { IPersonInfo } from '../../../../../typer/person';
import { ToggleNavn } from '../../../../../typer/toggles';
import { useFagsakContext } from '../../../FagsakContext';

interface Props {
    fagsak: IMinimalFagsak;
    bruker: IPersonInfo;
}

function finnIdentForOpprettingAvFagsak(fagsak: IMinimalFagsak, bruker: IPersonInfo) {
    if (fagsak.fagsakType === FagsakType.SKJERMET_BARN) {
        return fagsak.fagsakeier;
    }
    return bruker.personIdent;
}

export function OpprettFagsak({ fagsak, bruker }: Props) {
    const [visModal, settVisModal] = React.useState(false);
    const { fagsakerPåBruker } = useFagsakContext();
    const { toggles } = useAppContext();
    const { åpneModal } = useModal(ModalType.OPPRETT_FAGSAK);

    return (
        <>
            <Dropdown.Menu.List.Item
                onClick={() => {
                    if (toggles[ToggleNavn.brukNyOpprettFagsakModal]) {
                        åpneModal({ ident: finnIdentForOpprettingAvFagsak(fagsak, bruker) });
                    } else {
                        settVisModal(true);
                    }
                }}
            >
                Opprett ny fagsak
            </Dropdown.Menu.List.Item>
            {visModal && (
                <OpprettFagsakModal
                    personInfo={bruker}
                    fagsakerPåBruker={fagsakerPåBruker}
                    lukkModal={() => {
                        settVisModal(false);
                    }}
                />
            )}
        </>
    );
}
