import { useSettPåVent } from '@hooks/useSettPåVent';
import { BodyShort, Button, DatePicker, Fieldset, Modal, Select, useDatepicker, VStack } from '@navikt/ds-react';
import { byggSuksessRessurs } from '@navikt/familie-typer';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { dagerFristForAvventerSamtykkeUlovfestetMotregning } from '@sider/Fagsak/Behandling/Sider/Simulering/UlovfestetMotregning/konstanter';
import { SettPåVentÅrsak, settPåVentÅrsaker } from '@typer/behandling';
import { dagensDato, dateTilIsoDatoString } from '@utils/dato';
import { addDays } from 'date-fns';

interface Props {
    lukkModal: () => void;
}

export function SettBehandlingPåVentModalMotregning({ lukkModal }: Props) {
    const { behandling, settÅpenBehandling } = useBehandlingContext();

    const årsak = SettPåVentÅrsak.AVVENTER_SAMTYKKE_ULOVFESTET_MOTREGNING;
    const frist = addDays(dagensDato, dagerFristForAvventerSamtykkeUlovfestetMotregning);

    const erBehandlingAlleredePåVent = !!behandling.aktivSettPåVent;

    const {
        mutate: settPåVent,
        isPending: setterPåVent,
        error,
    } = useSettPåVent({
        onSuccess: oppdatertBehandling => {
            settÅpenBehandling(byggSuksessRessurs(oppdatertBehandling));
            lukkModal();
        },
    });

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
                <Fieldset error={error?.message} errorPropagation={false} legend="Sett behandling på vent" hideLegend>
                    <VStack gap={'space-32'}>
                        {erBehandlingAlleredePåVent && <BodyShort>Behandlingen er satt på vent.</BodyShort>}

                        <BodyShort>
                            Behandlingen settes på vent i {dagerFristForAvventerSamtykkeUlovfestetMotregning} dager mens
                            vi venter på svar fra bruker.
                        </BodyShort>

                        <DatePicker dropdownCaption {...datepickerProps}>
                            <DatePicker.Input {...inputProps} label={'Frist'} readOnly={true} />
                        </DatePicker>
                        <Select label={'Årsak'} readOnly={true}>
                            <option value={årsak.valueOf()} key={årsak.valueOf()}>
                                {settPåVentÅrsaker[årsak]}
                            </option>
                        </Select>
                    </VStack>
                </Fieldset>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant={'primary'}
                    size={'medium'}
                    onClick={() =>
                        settPåVent({
                            behandlingId: behandling.behandlingId,
                            erBehandlingAlleredePåVent,
                            frist: dateTilIsoDatoString(frist),
                            årsak,
                        })
                    }
                    loading={setterPåVent}
                    disabled={setterPåVent}
                >
                    {erBehandlingAlleredePåVent ? 'Oppdater' : 'Bekreft'}
                </Button>
                <Button variant={'tertiary'} size="medium" onClick={lukkModal}>
                    Avbryt
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
