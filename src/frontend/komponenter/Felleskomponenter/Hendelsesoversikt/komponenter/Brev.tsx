import { Knapp } from 'nav-frontend-knapper';
import * as React from 'react';
import UIModalWrapper from '../../Modal/UIModalWrapper';
import Brevskjema from '../../BrevModul/BrevSkjema';
import useBrevModul from '../useBrevModul';

const Brev = () => {
    const { hentForhåndsvisning, hentetForhåndsvisning, hentMuligeBrevMaler } = useBrevModul();
    const [visInnsendtBrevModal, settVisInnsendtBrevModal] = React.useState(false);

    return (
        <div className={'brev'}>
            <Brevskjema
                forhåndsvisningOnClick={hentForhåndsvisning}
                hentetForhåndsvisning={hentetForhåndsvisning}
                brevMaler={hentMuligeBrevMaler()}
                onSubmitSuccess={() => settVisInnsendtBrevModal(true)}
            />
            {visInnsendtBrevModal && (
                <UIModalWrapper
                    modal={{
                        tittel: 'Brevet er sendt',
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
