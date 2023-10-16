import React from 'react';

import styled from 'styled-components';

import { BodyShort, Button, Fieldset, Modal, Select } from '@navikt/ds-react';
import type { ISkjema } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';

import { hentAlleÅrsaker } from './settPåVentUtils';
import type { IBehandling, SettPåVentÅrsak } from '../../../../../typer/behandling';
import { settPåVentÅrsaker } from '../../../../../typer/behandling';
import { hentFrontendFeilmelding } from '../../../../../utils/ressursUtils';
import Datovelger from '../../../../Felleskomponenter/Datovelger';

const Feltmargin = styled.div`
    margin-bottom: 2rem;
`;
const StyledBodyShort = styled(BodyShort)`
    margin-bottom: 2.5rem;
    margin-top: 0.5rem;
`;

interface IProps {
    onAvbryt: () => void;
    settBehandlingPåVent: () => void;
    skjema: ISkjema<{ frist: Date | undefined; årsak: SettPåVentÅrsak | undefined }, IBehandling>;
    erBehandlingAlleredePåVent: boolean;
}

export const SettBehandlingPåVentModal: React.FC<IProps> = ({
    onAvbryt,
    settBehandlingPåVent,
    skjema,
    erBehandlingAlleredePåVent,
}) => {
    const årsaker = hentAlleÅrsaker();

    return (
        <Modal
            open
            onClose={onAvbryt}
            width={'35rem'}
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
                        <Datovelger
                            felt={skjema.felter.frist}
                            label={'Frist'}
                            visFeilmeldinger={skjema.visFeilmeldinger}
                            kanKunVelgeFremtid
                        />
                    </Feltmargin>
                    <Select
                        {...skjema.felter.årsak.hentNavInputProps(skjema.visFeilmeldinger)}
                        label={'Årsak'}
                    >
                        <option value={undefined}>Velg årsak</option>
                        {årsaker.map(årsak => (
                            <option value={årsak.valueOf()} key={årsak.valueOf()}>
                                {settPåVentÅrsaker[årsak]}
                            </option>
                        ))}
                    </Select>
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
