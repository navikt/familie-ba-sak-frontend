import { useBehandling } from '@hooks/useBehandling';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { useFagsakId } from '@hooks/useFagsakId';
import { CheckmarkIcon, ExclamationmarkTriangleFillIcon, PadlockLockedFillIcon } from '@navikt/aksel-icons';
import { BodyShort, HStack } from '@navikt/ds-react';
import { BehandlingStatus, type IBehandling } from '@typer/behandling';
import classNames from 'classnames';
import { NavLink } from 'react-router';
import { erSidenAktiv, finnSideForBehandlingssteg, finnSiderForBehandling, type Side } from '../Sider/sider';
import Styles from './Stegvelger.module.css';

enum Stegstatus {
    UTFØRT = 'UTFØRT',
    LÅST = 'LÅST',
    PÅGÅR = 'PÅGÅR',
    ADVARSEL = 'ADVARSEL',
    IKKE_STARTET = 'IKKE_STARTET',
}

const stegstatusVisningsnavn: Record<Stegstatus, string> = {
    UTFØRT: 'Utført',
    LÅST: 'Utført og låst',
    PÅGÅR: 'Pågår',
    ADVARSEL: 'Krever handling',
    IKKE_STARTET: 'Ikke startet',
};

const stegstatusKlasse: Record<Stegstatus, string> = {
    UTFØRT: Styles.ferdig,
    LÅST: Styles.ferdig,
    PÅGÅR: Styles.paagaar,
    ADVARSEL: Styles.advarsel,
    IKKE_STARTET: Styles.ikkeStartet,
};

function utledStegstatus(
    side: Side,
    behandling: IBehandling,
    gjeldendeSide: Side | undefined,
    erLesevisning: boolean
): Stegstatus {
    if (!erSidenAktiv(side, behandling)) {
        return Stegstatus.IKKE_STARTET;
    }
    const harAksjonspunkter = (side.undersider?.(behandling) ?? []).some(
        underside => underside.antallAksjonspunkter() > 0
    );
    if (harAksjonspunkter) {
        return Stegstatus.ADVARSEL;
    }
    if (erLesevisning) {
        return Stegstatus.LÅST;
    }
    if (side.id === gjeldendeSide?.id && behandling.status !== BehandlingStatus.AVSLUTTET) {
        return Stegstatus.PÅGÅR;
    }
    return Stegstatus.UTFØRT;
}

function HalvfyltSirkelIkon({ title }: { title: string }) {
    return (
        <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24" role="img" className={Styles.ikonFerdig}>
            <title>{title}</title>
            <circle cx="12" cy="12" r="8.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M17.83 6.17A8.25 8.25 0 0 1 6.17 17.83Z" fill="currentColor" />
        </svg>
    );
}

function Stegikon({ status }: { status: Stegstatus }) {
    const tittel = stegstatusVisningsnavn[status];
    switch (status) {
        case Stegstatus.UTFØRT:
            return <CheckmarkIcon title={tittel} className={Styles.ikonFerdig} fontSize="1.25rem" />;
        case Stegstatus.LÅST:
            return <PadlockLockedFillIcon title={tittel} fontSize="1.25rem" />;
        case Stegstatus.PÅGÅR:
            return <HalvfyltSirkelIkon title={tittel} />;
        case Stegstatus.ADVARSEL:
            return (
                <ExclamationmarkTriangleFillIcon title={tittel} className={Styles.ikonAdvarsel} fontSize="1.25rem" />
            );
        case Stegstatus.IKKE_STARTET:
            return null;
    }
}

export function Stegvelger() {
    const fagsakId = useFagsakId();
    const behandling = useBehandling();
    const erLesevisning = useErLesevisning();

    const sider = finnSiderForBehandling(behandling);
    const gjeldendeSide = finnSideForBehandlingssteg(behandling);

    return (
        <HStack as="nav" aria-label="Behandlingssteg" wrap={false} gap="space-12" className={Styles.stegvelger}>
            {sider.map(side => {
                const status = utledStegstatus(side, behandling, gjeldendeSide, erLesevisning);
                const erTilgjengelig = status !== Stegstatus.IKKE_STARTET;
                return (
                    <NavLink
                        key={side.id}
                        to={`/fagsak/${fagsakId}/${behandling.behandlingId}/${side.href}`}
                        className={({ isActive }) =>
                            classNames(Styles.steg, stegstatusKlasse[status], { [Styles.valgt]: isActive })
                        }
                        aria-disabled={!erTilgjengelig}
                        tabIndex={erTilgjengelig ? undefined : -1}
                        onClick={event => {
                            if (!erTilgjengelig) {
                                event.preventDefault();
                            }
                        }}
                        draggable={false}
                    >
                        <HStack gap="space-6" align="center" justify="center" wrap={false}>
                            <Stegikon status={status} />
                            <BodyShort size="small" as="span" className={Styles.navn}>
                                {side.navn}
                            </BodyShort>
                        </HStack>
                    </NavLink>
                );
            })}
        </HStack>
    );
}
