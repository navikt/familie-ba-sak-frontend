import { useVisManglerTilgangModal } from '@context/ManglerTilgangModalContext';
import { useVisTekniskFeilModal } from '@context/TekniskFeilModalContext';
import { useFordelOppgave } from '@hooks/useFordelOppgave';
import { useHentFagsakerPåPerson } from '@hooks/useHentFagsakerPåPerson';
import { useHentFagsakPåPerson } from '@hooks/useHentFagsakPåPerson';
import { useSaksbehandler } from '@hooks/useSaksbehandler';
import { useSjekkSaksbehandlertilgangTilIdent } from '@hooks/useSjekkSaksbehandlertilgangTilIdent';
import { Button } from '@navikt/ds-react';
import { BehandlingstypeFilter, type IOppgave, OppgavetypeFilter } from '@typer/oppgave';
import { hentFnrFraOppgaveIdenter } from '@utils/oppgave';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { finnFagsakÅNavigereTil } from './finnFagsakÅNavigereTil';

interface Props {
    oppgave: IOppgave;
}

export function FordelOppgave({ oppgave }: Props) {
    const navigate = useNavigate();
    const saksbehandler = useSaksbehandler();

    const visTekniskFeilModal = useVisTekniskFeilModal();
    const visManglerTilgangModal = useVisManglerTilgangModal();

    const { mutateAsync: sjekkSaksbehandlertilgangTilIdent } = useSjekkSaksbehandlertilgangTilIdent();
    const { mutateAsync: hentFagsakPåPerson } = useHentFagsakPåPerson({ visSystemetLaster: false });
    const { mutateAsync: hentFagsakerPåPerson } = useHentFagsakerPåPerson({ visSystemetLaster: false });
    const { mutateAsync: fordelOppgave } = useFordelOppgave();

    const [laster, settLaster] = useState(false);

    async function onFordelOppgave() {
        if (laster) {
            return;
        }

        settLaster(true);

        let navigerer = false;

        try {
            const brukerIdent = hentFnrFraOppgaveIdenter(oppgave.identer);
            const oppgavetype = OppgavetypeFilter[oppgave.oppgavetype as keyof typeof OppgavetypeFilter];
            const erTilbakekreving = oppgave.behandlingstype === BehandlingstypeFilter.ae0161;

            if (brukerIdent) {
                const tilgangsresultat = await sjekkSaksbehandlertilgangTilIdent({ brukerIdent });
                if (!tilgangsresultat.saksbehandlerHarTilgang) {
                    visManglerTilgangModal(tilgangsresultat);
                    return;
                }
            }

            await fordelOppgave({ oppgaveId: oppgave.id, saksbehandler: saksbehandler.navIdent });

            // TODO : Invalidate oppgaver når det er flyttet til react-query. Metoden "fordelOppgaver" returnerer kun en ID, så da må vi invalidere istedenfor å sette dataen manuelt.

            if (oppgavetype === OppgavetypeFilter.JFR || oppgavetype === OppgavetypeFilter.BEH_SED) {
                navigate(`/oppgaver/journalfor/${oppgave.id}`);
                navigerer = true;
                return;
            }

            if (erTilbakekreving) {
                if (!brukerIdent) {
                    visTekniskFeilModal(
                        new Error('Klarte ikke å navigere til tilbakekreving fordi ident ikke finnes.')
                    );
                    return;
                }
                const fagsak = await hentFagsakPåPerson({ personIdent: brukerIdent });
                window.location.href = `/redirect/familie-tilbake/fagsystem/BA/fagsak/${fagsak.id}/behandling/${oppgave.saksreferanse}`;
                navigerer = true;
                return;
            }

            if (oppgave.aktoerId) {
                if (!brukerIdent) {
                    visTekniskFeilModal(new Error('Klarte ikke å navigere til fagsak fordi ident ikke finnes.'));
                    return;
                }
                const fagsaker = await hentFagsakerPåPerson({ personIdent: brukerIdent });
                if (fagsaker.length === 0) {
                    visTekniskFeilModal(new Error('Fant ikke fagsak å navigere til.'));
                    return;
                }
                const fagsak = finnFagsakÅNavigereTil(fagsaker);
                if (!fagsak) {
                    visTekniskFeilModal(new Error('Fant ikke fagsak å navigere til.'));
                    return;
                }
                navigate(`/fagsak/${fagsak.id}/saksoversikt`);
                navigerer = true;
                return;
            }
        } catch (error) {
            visTekniskFeilModal(error);
        } finally {
            // Beholder lastestatus til siden byttes, slik at oppgaven ikke kan fordeles på nytt.
            if (!navigerer) {
                settLaster(false);
            }
        }
    }

    return (
        <Button type={'button'} variant={'secondary'} size={'small'} onClick={onFordelOppgave} loading={laster}>
            Tildel meg
        </Button>
    );
}
