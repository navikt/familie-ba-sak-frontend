import { useBehandling } from '@hooks/useBehandling';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { Behandlingstype, BehandlingÅrsak } from '@typer/behandling';

import { ActionMenu } from '@navikt/ds-react';

const relevanteBehandlingsårsaker = [
    BehandlingÅrsak.NYE_OPPLYSNINGER,
    BehandlingÅrsak.KLAGE,
    BehandlingÅrsak.KORREKSJON_VEDTAKSBREV,
    BehandlingÅrsak.TEKNISK_ENDRING,
    BehandlingÅrsak.IVERKSETTE_KA_VEDTAK,
    Behandlingstype.MIGRERING_FRA_INFOTRYGD,
];

interface Props {
    åpneModal: () => void;
}

export function LeggTilBarnPBehandling({ åpneModal }: Props) {
    const behandling = useBehandling();
    const erLesevisning = useErLesevisning();
    const erRelevantBehandlingsårsak = relevanteBehandlingsårsaker.includes(behandling.årsak);
    const erMigreringFraInfotrygd = behandling.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD;
    const skalViseLeggTilBarn = !erLesevisning && (erRelevantBehandlingsårsak || erMigreringFraInfotrygd);

    if (!skalViseLeggTilBarn) {
        return null;
    }

    return <ActionMenu.Item onClick={åpneModal}>Legg til barn</ActionMenu.Item>;
}
