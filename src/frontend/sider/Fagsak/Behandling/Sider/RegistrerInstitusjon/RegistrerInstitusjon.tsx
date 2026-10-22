import { useBehandling } from '@hooks/useBehandling';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { useFagsak } from '@hooks/useFagsak';
import { useRegistrerInstitusjon } from '@hooks/useRegistrerInstitusjon';
import { SamhandlerTabell } from '@komponenter/Samhandler/SamhandlerTabell';
import { useSamhandlerRequest } from '@komponenter/Samhandler/useSamhandler';
import { Button, LocalAlert, VStack } from '@navikt/ds-react';
import { byggSuksessRessurs, RessursStatus } from '@navikt/familie-typer';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { Steg } from '@sider/Fagsak/Behandling/Sider/Steg';
import { BehandlingSteg, BehandlingÅrsak } from '@typer/behandling';
import { useNavigate } from 'react-router';

const RegistrerInstitusjon = () => {
    const behandling = useBehandling();
    const fagsak = useFagsak();
    const navigate = useNavigate();
    const { settÅpenBehandling } = useBehandlingContext();
    const { hentOgSettSamhandler, samhandlerRessurs } = useSamhandlerRequest(true);
    const erLesevisning = useErLesevisning();
    const {
        mutate: registrerInstitusjon,
        isPending: registrererInstitusjon,
        error: registrerInstitusjonFeil,
    } = useRegistrerInstitusjon();

    if (fagsak.institusjon && samhandlerRessurs.status === RessursStatus.IKKE_HENTET) {
        hentOgSettSamhandler(behandling.behandlingId);
    }

    const nesteSide = behandling.årsak === BehandlingÅrsak.SØKNAD ? 'registrer-soknad' : 'vilkaarsvurdering';

    const gåTilNesteSide = () => navigate(`/fagsak/${fagsak.id}/${behandling.behandlingId}/${nesteSide}`);

    const bekreftOgGåVidere = () => {
        if (erLesevisning || behandling.steg !== BehandlingSteg.REGISTRERE_INSTITUSJON) {
            gåTilNesteSide();
            return;
        }
        registrerInstitusjon(
            { behandlingId: behandling.behandlingId },
            {
                onSuccess: oppdatertBehandling => {
                    settÅpenBehandling(byggSuksessRessurs(oppdatertBehandling));
                    gåTilNesteSide();
                },
            }
        );
    };

    return (
        <Steg tittel={'Info om institusjon'} maxWidth={'40rem'}>
            <VStack gap={'space-20'}>
                {samhandlerRessurs.status === RessursStatus.SUKSESS && (
                    <SamhandlerTabell samhandler={samhandlerRessurs.data} />
                )}
                {(samhandlerRessurs.status === RessursStatus.FUNKSJONELL_FEIL ||
                    samhandlerRessurs.status === RessursStatus.FEILET) && (
                    <LocalAlert status="error">
                        <LocalAlert.Header>
                            <LocalAlert.Title>{samhandlerRessurs.frontendFeilmelding}</LocalAlert.Title>
                        </LocalAlert.Header>
                    </LocalAlert>
                )}
                {registrerInstitusjonFeil && (
                    <LocalAlert status="error">
                        <LocalAlert.Header>
                            <LocalAlert.Title>{registrerInstitusjonFeil.message}</LocalAlert.Title>
                        </LocalAlert.Header>
                    </LocalAlert>
                )}
                <div>
                    <Button variant={'primary'} onClick={bekreftOgGåVidere} loading={registrererInstitusjon}>
                        {erLesevisning ? 'Neste' : 'Bekreft og fortsett'}
                    </Button>
                </div>
            </VStack>
        </Steg>
    );
};

export default RegistrerInstitusjon;
