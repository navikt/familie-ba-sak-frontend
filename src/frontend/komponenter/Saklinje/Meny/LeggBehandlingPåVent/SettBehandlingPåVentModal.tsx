import React from 'react';

import styled from 'styled-components';

import { BodyShort, Button, Fieldset, Modal, Select } from '@navikt/ds-react';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import { hentVelgbareÅrsaker } from './settPåVentUtils';
import { useSettPåVentSkjema } from './useSettPåVentSkjema';
import { useBehandlingContext } from '../../../../sider/Fagsak/Behandling/context/BehandlingContext';
import type { IBehandling, ISettPåVent } from '../../../../typer/behandling';
import { settPåVentÅrsaker } from '../../../../typer/behandling';
import { dateTilIsoDatoString } from '../../../../utils/dato';
import { hentFrontendFeilmelding } from '../../../../utils/ressursUtils';
import Datovelger from '../../../Datovelger/Datovelger';

const Feltmargin = styled.div`
    margin-bottom: 2rem;
`;
const StyledBodyShort = styled(BodyShort)`
    margin-bottom: 2.5rem;
    margin-top: 0.5rem;
`;

interface IProps {
    lukkModal: () => void;
}

export const SettBehandlingPåVentModal: React.FC<IProps> = ({ lukkModal }) => {
    const { behandling, settÅpenBehandling } = useBehandlingContext();
    const årsaker = hentVelgbareÅrsaker();
    const { skjema, kanSendeSkjema, onSubmit } = useSettPåVentSkjema(behandling.aktivSettPåVent);

    const { årsak, frist } = skjema.felter;

    const erBehandlingAlleredePåVent = !!behandling.aktivSettPåVent;

    const settBehandlingPåVent = () => {
        if (kanSendeSkjema() && årsak.verdi && frist.verdi) {
            onSubmit<ISettPåVent>(
                {
                    method: erBehandlingAlleredePåVent ? 'PUT' : 'POST',
                    data: {
                        frist: dateTilIsoDatoString(frist.verdi),
                        årsak: årsak.verdi,
                    },
                    url: `/familie-ba-sak/api/sett-på-vent/${behandling.behandlingId}`,
                },
                (ressurs: Ressurs<IBehandling>) => {
                    settÅpenBehandling(ressurs);
                    lukkModal();
                }
            );
        }
    };

    return (
        <Modal
            open
            onClose={lukkModal}
            width={'35rem'}
            header={{
                heading: erBehandlingAlleredePåVent ? 'Endre ventende behandling' : 'Sett behandling på vent',
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
                    {erBehandlingAlleredePåVent && <StyledBodyShort>Behandlingen er satt på vent.</StyledBodyShort>}

                    <Feltmargin>
                        <Datovelger
                            felt={skjema.felter.frist}
                            label={'Frist'}
                            visFeilmeldinger={skjema.visFeilmeldinger}
                            kanKunVelgeFremtid
                        />
                    </Feltmargin>
                    <Select {...skjema.felter.årsak.hentNavInputProps(skjema.visFeilmeldinger)} label={'Årsak'}>
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
                <Button variant={'tertiary'} key={'Avbryt'} size="medium" onClick={lukkModal} children={'Avbryt'} />
            </Modal.Footer>
        </Modal>
    );
};
