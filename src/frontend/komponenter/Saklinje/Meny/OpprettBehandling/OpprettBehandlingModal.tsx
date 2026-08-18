import { useFagsak } from '@hooks/useFagsak';
import { BegrunnelseFelt } from '@komponenter/Saklinje/Meny/OpprettBehandling/felter/BegrunnelseFelt';
import { BehandlingstemaFelt } from '@komponenter/Saklinje/Meny/OpprettBehandling/felter/BehandlingstemaFelt';
import { BehandlingstypeFelt } from '@komponenter/Saklinje/Meny/OpprettBehandling/felter/BehandlingstypeFelt';
import { BehandlingsårsakFelt } from '@komponenter/Saklinje/Meny/OpprettBehandling/felter/BehandlingsårsakFelt';
import { KlageMottattDatoFelt } from '@komponenter/Saklinje/Meny/OpprettBehandling/felter/KlageMottattDatoFelt';
import { MigreringsdatoFelt } from '@komponenter/Saklinje/Meny/OpprettBehandling/felter/MigreringsdatoFelt';
import { SøknadMottattDatoFelt } from '@komponenter/Saklinje/Meny/OpprettBehandling/felter/SøknadMottattDatoFelt';
import { ValgteBarnFelt } from '@komponenter/Saklinje/Meny/OpprettBehandling/felter/ValgteBarnFelt';
import { Button, Fieldset, Modal, VStack } from '@navikt/ds-react';
import { Behandlingstype, BehandlingÅrsak } from '@typer/behandling';
import { FagsakType } from '@typer/fagsak';
import { Klagebehandlingstype } from '@typer/klage';
import { FormProvider } from 'react-hook-form';

import { OpprettBehandlingFelt, useOpprettBehandlingSkjema } from './useOpprettBehandlingSkjema';

interface Props {
    lukkModal: () => void;
    onTilbakekrevingsbehandlingOpprettet: () => void;
}

export function OpprettBehandlingModal({ lukkModal, onTilbakekrevingsbehandlingOpprettet }: Props) {
    const fagsak = useFagsak();

    const { form, onSubmit } = useOpprettBehandlingSkjema({
        lukkModal,
        onTilbakekrevingsbehandlingOpprettet,
    });

    const {
        handleSubmit,
        formState: { isSubmitting, errors },
        watch,
    } = form;

    const behandlingstype = watch(OpprettBehandlingFelt.BEHANDLINGSTYPE);
    const behandlingsårsak = watch(OpprettBehandlingFelt.BEHANDLINGSÅRSAK);

    const skalViseBehandlingsårsakFelt =
        behandlingstype === Behandlingstype.REVURDERING || behandlingstype === Behandlingstype.MIGRERING_FRA_INFOTRYGD;
    const skalViseBehandlingstemaFelt =
        fagsak.fagsakType !== FagsakType.INSTITUSJON &&
        behandlingstype in Behandlingstype &&
        (
            [
                BehandlingÅrsak.SØKNAD,
                BehandlingÅrsak.ENDRE_MIGRERINGSDATO,
                BehandlingÅrsak.HELMANUELL_MIGRERING,
            ] as string[]
        ).includes(behandlingsårsak);
    const skalViseSøknadMottattDatoFelt =
        behandlingstype === Behandlingstype.FØRSTEGANGSBEHANDLING ||
        (behandlingstype === Behandlingstype.REVURDERING && behandlingsårsak === BehandlingÅrsak.SØKNAD);
    const skalViseKlageMottattDatoFelt = behandlingstype === Klagebehandlingstype.KLAGE;
    const skalViseBegrunnelseFelt = behandlingsårsak === BehandlingÅrsak.TEKNISK_ENDRING;

    // Migrering fra infotrygd
    const skalViseMigreringsdatoFelt =
        behandlingstype === Behandlingstype.MIGRERING_FRA_INFOTRYGD && behandlingsårsak in BehandlingÅrsak;
    const skalViseValgteBarnFelt =
        behandlingstype === Behandlingstype.MIGRERING_FRA_INFOTRYGD &&
        behandlingsårsak === BehandlingÅrsak.HELMANUELL_MIGRERING;

    return (
        <Modal
            open
            onClose={lukkModal}
            width={'35rem'}
            portal={true}
            header={{
                heading: 'Opprett ny behandling',
                size: 'medium',
            }}
        >
            <FormProvider {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Body>
                        <Fieldset error={errors.root?.message} legend={'Opprett ny behandling'} hideLegend>
                            <VStack gap={'space-16'}>
                                <BehandlingstypeFelt />
                                {skalViseBehandlingsårsakFelt && <BehandlingsårsakFelt />}
                                {skalViseValgteBarnFelt && <ValgteBarnFelt />}
                                {skalViseBehandlingstemaFelt && <BehandlingstemaFelt />}
                                {skalViseMigreringsdatoFelt && <MigreringsdatoFelt />}
                                {skalViseBegrunnelseFelt && <BegrunnelseFelt />}
                                {skalViseSøknadMottattDatoFelt && <SøknadMottattDatoFelt />}
                                {skalViseKlageMottattDatoFelt && <KlageMottattDatoFelt />}
                            </VStack>
                        </Fieldset>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant={'primary'} type={'submit'} loading={isSubmitting}>
                            Bekreft
                        </Button>
                        <Button type={'button'} variant={'tertiary'} disabled={isSubmitting} onClick={lukkModal}>
                            Avbryt
                        </Button>
                    </Modal.Footer>
                </form>
            </FormProvider>
        </Modal>
    );
}
