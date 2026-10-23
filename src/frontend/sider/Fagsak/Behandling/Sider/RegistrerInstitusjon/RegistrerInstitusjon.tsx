import { useBehandling } from '@hooks/useBehandling';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { SamhandlerTabell } from '@komponenter/Samhandler/SamhandlerTabell';
import { useSamhandlerRequest } from '@komponenter/Samhandler/useSamhandler';
import { Button, LocalAlert, VStack } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';
import { Steg } from '@sider/Fagsak/Behandling/Sider/Steg';
import { useInstitusjon } from './useInstitusjon';

const RegistrerInstitusjon = () => {
    const behandling = useBehandling();
    const { institusjon, onSubmitMottaker, submitFeilmelding } = useInstitusjon(behandling);
    const { hentOgSettSamhandler, samhandlerRessurs } = useSamhandlerRequest(true);
    const erLesevisning = useErLesevisning();

    if (institusjon && samhandlerRessurs.status === RessursStatus.IKKE_HENTET) {
        hentOgSettSamhandler(behandling.behandlingId);
    }

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
                {submitFeilmelding && (
                    <LocalAlert status="error">
                        <LocalAlert.Header>
                            <LocalAlert.Title>{submitFeilmelding}</LocalAlert.Title>
                        </LocalAlert.Header>
                    </LocalAlert>
                )}
                <div>
                    <Button variant={'primary'} onClick={onSubmitMottaker}>
                        {erLesevisning ? 'Neste' : 'Bekreft og fortsett'}
                    </Button>
                </div>
            </VStack>
        </Steg>
    );
};

export default RegistrerInstitusjon;
