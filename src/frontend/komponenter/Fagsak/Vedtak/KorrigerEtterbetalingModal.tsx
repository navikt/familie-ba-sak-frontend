import * as React from 'react';

import { BodyLong, Heading, Modal } from '@navikt/ds-react';

interface IKorrigerEtterbetalingModal {
    visModal: boolean;
    setVisModal: () => void;
}

export const KorrigerEtterbetalingModal: React.FC<IKorrigerEtterbetalingModal> = ({
    visModal,
    setVisModal,
}) => {
    return (
        <Modal open={visModal} onClose={setVisModal}>
            <Modal.Content>
                <Heading spacing size="large">
                    Korriger etterbetaling
                </Heading>
                <BodyLong spacing>
                    Culpa aliquip ut cupidatat laborum minim quis ex in aliqua. Qui incididunt dolor
                    do ad ut. Incididunt eiusmod nostrud deserunt duis laborum. Proident aute culpa
                    qui nostrud velit adipisicing minim. Consequat aliqua aute dolor do sit Lorem
                    nisi mollit velit. Aliqua exercitation non minim minim pariatur sunt laborum
                    ipsum. Exercitation nostrud est laborum magna non non aliqua qui esse.
                </BodyLong>
            </Modal.Content>
        </Modal>
    );
};
