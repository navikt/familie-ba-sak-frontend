import { type ISaksbehandler } from '@navikt/familie-typer';

export function lagSaksbehandler(saksbehandler: Partial<ISaksbehandler> = {}): ISaksbehandler {
    return {
        displayName: 'Saksbehandler',
        email: 'saksbehandler@nav.no',
        firstName: 'Sak',
        groups: ['d21e00a4-969d-4b28-8782-dc818abfae65'],
        identifier: '30987654321',
        lastName: 'Behandler',
        enhet: '0001',
        navIdent: 'A1',
        ...saksbehandler,
    };
}

export * as SaksbehandlerTestdata from './saksbehandlerTestdata';
