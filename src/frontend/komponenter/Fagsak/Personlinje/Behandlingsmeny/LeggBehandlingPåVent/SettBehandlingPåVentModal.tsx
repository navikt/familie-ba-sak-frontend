import React from 'react';

import styled from 'styled-components';

import { BodyShort, Button, Fieldset, Modal } from '@navikt/ds-react';
import { FamilieSelect } from '@navikt/familie-form-elements';
import type { ISkjema } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';

import { hentAlleÅrsaker } from './settPåVentUtils';
import type { IBehandling, SettPåVentÅrsak } from '../../../../../typer/behandling';
import { settPåVentÅrsaker } from '../../../../../typer/behandling';
import type { FamilieIsoDate } from '../../../../../utils/kalender';
import { hentFrontendFeilmelding } from '../../../../../utils/ressursUtils';
import { FamilieDatovelgerWrapper } from '../../../../../utils/skjema/FamilieDatovelgerWrapper';

const Feltmargin = styled.div`
    margin-bottom: 2rem;
`;
const StyledBodyShort = styled(BodyShort)`
    margin-bottom: 2.5rem;
    margin-top: 0.5rem;
`;

interface IProps {
    visModal: boolean;
    onAvbryt: () => void;
    settBehandlingPåVent: () => void;
    skjema: ISkjema<
        { frist: FamilieIsoDate | undefined; årsak: SettPåVentÅrsak | undefined },
        IBehandling
    >;
    erBehandlingAlleredePåVent: boolean;
}

export const SettBehandlingPåVentModal: React.FC<IProps> = ({
    visModal,
    onAvbryt,
    settBehandlingPåVent,
    skjema,
    erBehandlingAlleredePåVent,
}) => {
    const årsaker = hentAlleÅrsaker();

    return (
        <Modal
            open={visModal}
            onClose={onAvbryt}
            width={'small'}
            header={{
                heading: erBehandlingAlleredePåVent
                    ? 'Endre ventende behandling'
                    : 'Sett behandling på vent',
                size: 'small',
            }}
            portal
        >
            <Modal.Body>
                <Fieldset
                    error={hentFrontendFeilmelding(skjema.submitRessurs)}
                    errorPropagation={false}
                    legend="Sett behandling på vent"
                    hideLegend
                >
                    {erBehandlingAlleredePåVent && (
                        <StyledBodyShort>Behandlingen er satt på vent.</StyledBodyShort>
                    )}

                    <Feltmargin>
                        <FamilieDatovelgerWrapper
                            {...skjema.felter.frist.hentNavInputProps(skjema.visFeilmeldinger)}
                            value={skjema.felter.frist.verdi}
                            label={'Frist'}
                            placeholder={'DD.MM.ÅÅÅÅ'}
                        />
                    </Feltmargin>
                    <Feltmargin>
                        <FamilieSelect
                            {...skjema.felter.årsak.hentNavInputProps(skjema.visFeilmeldinger)}
                            label={'Årsak'}
                            placeholder={'Årsak'}
                        >
                            <option value={undefined}>Velg årsak</option>
                            {årsaker.map(årsak => (
                                <option value={årsak.valueOf()} key={årsak.valueOf()}>
                                    {settPåVentÅrsaker[årsak]}
                                </option>
                            ))}
                        </FamilieSelect>
                    </Feltmargin>
                </Fieldset>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant={'primary'}
                    key={erBehandlingAlleredePåVent ? 'Oppdater' : 'Bekreft'}
                    size={'medium'}
                    onClick={settBehandlingPåVent}
                    children={erBehandlingAlleredePåVent ? 'Oppdater' : 'Bekreft'}
                    loading={skjema.submitRessurs.status === RessursStatus.HENTER}
                    disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                />
                <Button
                    variant={'tertiary'}
                    key={'Avbryt'}
                    size="medium"
                    onClick={onAvbryt}
                    children={'Avbryt'}
                />
            </Modal.Footer>
        </Modal>
    );
};
