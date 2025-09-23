import React, { useState } from 'react';

import { addDays } from 'date-fns';
import styled from 'styled-components';

import { BodyShort, Button, DatePicker, Fieldset, Modal, Select, useDatepicker } from '@navikt/ds-react';
import { useHttp } from '@navikt/familie-http';
import { byggHenterRessurs, byggTomRessurs, type Ressurs, RessursStatus } from '@navikt/familie-typer';

import { dagerFristForAvventerSamtykkeUlovfestetMotregning } from './useTilbakekrevingsvedtakMotregning';
import {
    type IBehandling,
    type ISettPåVent,
    SettPåVentÅrsak,
    settPåVentÅrsaker,
} from '../../../../../../typer/behandling';
import { dagensDato, dateTilIsoDatoString } from '../../../../../../utils/dato';
import { hentFrontendFeilmelding } from '../../../../../../utils/ressursUtils';
import { useBehandlingContext } from '../../../context/BehandlingContext';

const Feltmargin = styled.div`
    margin-bottom: 2rem;
`;
const StyledBodyShort = styled(BodyShort)`
    margin-bottom: 2rem;
`;

interface IProps {
    lukkModal: () => void;
    behandling: IBehandling;
}

export const SettBehandlingPåVentModalMotregning: React.FC<IProps> = ({ lukkModal, behandling }) => {
    const { settÅpenBehandling } = useBehandlingContext();

    const { request } = useHttp();

    const årsak = SettPåVentÅrsak.AVVENTER_SAMTYKKE_ULOVFESTET_MOTREGNING;
    const frist = addDays(dagensDato, dagerFristForAvventerSamtykkeUlovfestetMotregning);

    const erBehandlingAlleredePåVent = !!behandling.aktivSettPåVent;

    const [submitRessurs, settSubmitRessurs] = useState<Ressurs<IBehandling>>(byggTomRessurs());

    const settBehandlingPåVent = () => {
        settSubmitRessurs(byggHenterRessurs());
        request<ISettPåVent, IBehandling>({
            method: erBehandlingAlleredePåVent ? 'PUT' : 'POST',
            data: {
                frist: dateTilIsoDatoString(frist),
                årsak: årsak,
            },
            url: `/familie-ba-sak/api/sett-på-vent/${behandling.behandlingId}`,
        }).then(ressurs => {
            settSubmitRessurs(ressurs);
            if (ressurs.status === RessursStatus.SUKSESS) {
                settÅpenBehandling(ressurs);
                lukkModal();
            }
        });
    };

    const { datepickerProps, inputProps } = useDatepicker({ defaultSelected: frist });

    return (
        <Modal
            open
            onClose={lukkModal}
            width={'37rem'}
            header={{
                heading: erBehandlingAlleredePåVent ? 'Endre ventende behandling' : 'Sett behandling på vent',
                size: 'small',
            }}
            portal
        >
            <Modal.Body>
                <Fieldset
                    error={hentFrontendFeilmelding(submitRessurs)}
                    errorPropagation={false}
                    legend="Sett behandling på vent"
                    hideLegend
                >
                    {erBehandlingAlleredePåVent && <StyledBodyShort>Behandlingen er satt på vent.</StyledBodyShort>}

                    <StyledBodyShort>
                        Behandlingen settes på vent i {dagerFristForAvventerSamtykkeUlovfestetMotregning} dager mens vi
                        venter på svar fra bruker.
                    </StyledBodyShort>

                    <Feltmargin>
                        <DatePicker dropdownCaption {...datepickerProps}>
                            <DatePicker.Input {...inputProps} label={'Frist'} readOnly={true} />
                        </DatePicker>
                    </Feltmargin>
                    <Select label={'Årsak'} readOnly={true}>
                        <option value={årsak.valueOf()} key={årsak.valueOf()}>
                            {settPåVentÅrsaker[årsak]}
                        </option>
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
                    loading={submitRessurs.status === RessursStatus.HENTER}
                    disabled={submitRessurs.status === RessursStatus.HENTER}
                />
                <Button variant={'tertiary'} key={'Avbryt'} size="medium" onClick={lukkModal} children={'Avbryt'} />
            </Modal.Footer>
        </Modal>
    );
};
