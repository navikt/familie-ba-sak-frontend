import type { ISaksbehandler } from '@navikt/familie-typer';

import { BehandlerRolle } from '../../typer/behandling';
import type { Saksbehandler } from '../../typer/saksbehandler';

export function lagSaksbehandler(saksbehandler: Partial<Saksbehandler> = {}): Saksbehandler {
    return {
        displayName: 'Sak Behandler',
        email: 'saksbehandler@nav.no',
        firstName: 'Sak',
        groups: ['d21e00a4-969d-4b28-8782-dc818abfae65'],
        identifier: '30987654321',
        lastName: 'Behandler',
        enhet: '0001',
        navIdent: 'A1',
        rolle: BehandlerRolle.SAKSBEHANDLER,
        harSkrivetilgang: true,
        harSuperbrukertilgang: false,
        ...saksbehandler,
    };
}

export function lagISaksbehandler(iSaksbehandler: Partial<ISaksbehandler> = {}): ISaksbehandler {
    return {
        displayName: 'Sak Behandler',
        email: 'saksbehandler@nav.no',
        firstName: 'Sak',
        groups: ['d21e00a4-969d-4b28-8782-dc818abfae65'],
        identifier: '30987654321',
        lastName: 'Behandler',
        enhet: '0001',
        navIdent: 'A1',
        ...iSaksbehandler,
    };
}

export * as SaksbehandlerTestdata from './saksbehandlerTestdata';
