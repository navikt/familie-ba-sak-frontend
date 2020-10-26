import { Knapp } from 'nav-frontend-knapper';
import * as React from 'react';
import UIModalWrapper from '../../Modal/UIModalWrapper';
import useBrevModul from './useBrevModul';
import Brevskjema from './Brevskjema';
interface IProps {
    onOkIModalClick: () => void;
}

const Brev = ({ onOkIModalClick }: IProps) => {
    const { hentForhåndsvisning, hentetForhåndsvisning, hentMuligeBrevMaler } = useBrevModul();
    const [visInnsendtBrevModal, settVisInnsendtBrevModal] = React.useState(false);

    return (
        <div className={'brev'}>
            <Brevskjema
                forhåndsvisningOnClick={hentForhåndsvisning}
                hentetForhåndsvisning={hentetForhåndsvisning}
                brevMaler={hentMuligeBrevMaler()}
                onSubmitSuccess={() => {
                    settVisInnsendtBrevModal(true);
                }}
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
                                    onOkIModalClick();
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
