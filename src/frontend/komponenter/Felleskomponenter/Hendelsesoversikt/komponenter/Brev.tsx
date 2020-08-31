import { Knapp } from 'nav-frontend-knapper';
import * as React from 'react';
import { RessursStatus } from '@navikt/familie-typer';
import UIModalWrapper from '../../Modal/UIModalWrapper';
import Brevskjema from '../../BrevModul/BrevSkjema';
import useBrevApi from '../useBrevApi';
import { useEffect } from 'react';

const Brev = () => {
    const { sendBrev, hentForhåndsvisning, innsendtBrev, hentetForhåndsvisning } = useBrevApi();
    const [visInnsendtBrevModal, settVisInnsendtBrevModal] = React.useState(false);

    useEffect(() => {
        if (innsendtBrev.status === RessursStatus.SUKSESS) {
            settVisInnsendtBrevModal(true);
        }
    }, [innsendtBrev]);

    return (
        <div className={'brev'}>
            <Brevskjema
                sendBrevOnClick={sendBrev}
                innsendtBrev={innsendtBrev}
                forhåndsvisningOnClick={hentForhåndsvisning}
                hentetForhåndsvisning={hentetForhåndsvisning}
            />
            {visInnsendtBrevModal && (
                <UIModalWrapper
                    modal={{
                        tittel: 'Brevet er bestilt',
                        lukkKnapp: false,
                        visModal: visInnsendtBrevModal,
                        actions: [
                            <Knapp
                                key={'ok'}
                                mini={true}
                                onClick={() => {
                                    settVisInnsendtBrevModal(false);
                                }}
                                children={'Ok'}
                            />,
                        ],
                    }}
                />
            )}
        </div>
    );
};
export default Brev;
