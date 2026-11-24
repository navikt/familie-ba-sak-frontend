import { useBehandling } from '@hooks/useBehandling';
import { useFagsakId } from '@hooks/useFagsakId';
import {
    CheckmarkIcon,
    ExclamationmarkTriangleFillIcon,
    PadlockLockedFillIcon,
    XMarkOctagonFillIcon,
} from '@navikt/aksel-icons';
import { BodyShort, HStack } from '@navikt/ds-react';
import classNames from 'classnames';
import { NavLink } from 'react-router';
import { erSidenAktiv, finnSideForBehandlingssteg, finnSiderForBehandling } from '../Sider/sider';
import Styles from './Stegvelger.module.css';
import { Stegstatus, utledStegstatus } from './stegstatus';

const stegstatusVisningsnavn: Record<Stegstatus, string> = {
    INNVILGET: 'Utført',
    AKSJONSPUNKT: 'Krever handling',
    AVSLAG: 'Avslag',
    IKKE_FULLFØRT: 'Ikke fullført',
    DELVIS_INNVILGET: 'Delvis innvilget',
    LÅST_INNVILGET: 'Utført og låst',
    LÅST_AVSLAG: 'Avslag og låst',
};

const stegstatusKlasse: Record<Stegstatus, string> = {
    INNVILGET: Styles.innvilget,
    AKSJONSPUNKT: Styles.aksjonspunkt,
    AVSLAG: Styles.avslag,
    IKKE_FULLFØRT: Styles.ikkeFullført,
    DELVIS_INNVILGET: Styles.delvisInnvilget,
    LÅST_INNVILGET: Styles.innvilget,
    LÅST_AVSLAG: Styles.avslag,
};

/** Ikonet for delvis innvilget i Figma: en sirkel der halvparten er fylt. */
function DelvisInnvilgetIkon({ title }: { title: string }) {
    return (
        <svg
            width="1.5rem"
            height="1.5rem"
            viewBox="0 0 24 24"
            role="img"
            className={Styles.ikonInnvilget}
            style={{ transform: 'rotate(90deg)' }}
        >
            <title>{title}</title>
            <path
                fill="currentColor"
                d="M12 2.25C17.3848 2.25 21.75 6.61522 21.75 12C21.75 17.3848 17.3848 21.75 12 21.75C6.61522 21.75 2.25 17.3848 2.25 12C2.25 9.31161 3.33787 6.87706 5.09766 5.11328L5.11328 5.09766C6.87706 3.33787 9.31161 2.25 12 2.25ZM5.66016 6.7207C4.46758 8.15132 3.75 9.99188 3.75 12C3.75 16.5563 7.44365 20.25 12 20.25C14.0081 20.25 15.8487 19.5324 17.2793 18.3398L5.66016 6.7207Z"
            />
        </svg>
    );
}

function Stegikon({ status }: { status: Stegstatus }) {
    const tittel = stegstatusVisningsnavn[status];
    switch (status) {
        case Stegstatus.INNVILGET:
            return <CheckmarkIcon title={tittel} className={Styles.ikonInnvilget} fontSize="1.5rem" />;
        case Stegstatus.AKSJONSPUNKT:
            return (
                <ExclamationmarkTriangleFillIcon title={tittel} className={Styles.ikonAksjonspunkt} fontSize="1.5rem" />
            );
        case Stegstatus.AVSLAG:
            return <XMarkOctagonFillIcon title={tittel} className={Styles.ikonAvslag} fontSize="1.5rem" />;
        case Stegstatus.DELVIS_INNVILGET:
            return <DelvisInnvilgetIkon title={tittel} />;
        case Stegstatus.LÅST_INNVILGET:
        case Stegstatus.LÅST_AVSLAG:
            return <PadlockLockedFillIcon title={tittel} fontSize="1.5rem" />;
        case Stegstatus.IKKE_FULLFØRT:
            return null;
    }
}

export function Stegvelger() {
    const fagsakId = useFagsakId();
    const behandling = useBehandling();

    const sider = finnSiderForBehandling(behandling);
    const gjeldendeSide = finnSideForBehandlingssteg(behandling);

    return (
        <HStack as="nav" aria-label="Behandlingssteg" wrap={false} gap="space-16" className={Styles.stegvelger}>
            {sider.map(side => {
                const status = utledStegstatus(side, behandling, gjeldendeSide);
                const erTilgjengelig = erSidenAktiv(side, behandling);
                return (
                    <NavLink
                        key={side.id}
                        to={`/fagsak/${fagsakId}/${behandling.behandlingId}/${side.href}`}
                        className={({ isActive }) =>
                            classNames(Styles.steg, stegstatusKlasse[status], {
                                [Styles.valgt]: isActive,
                                [Styles.utilgjengelig]: !erTilgjengelig,
                            })
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
                        <HStack gap="space-4" align="center" justify="center" wrap={false} minHeight="1.5rem">
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
