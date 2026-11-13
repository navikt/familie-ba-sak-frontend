import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import { FagsakStatus } from '@typer/fagsak';
import { describe, expect, test } from 'vitest';

import { finnFagsakÅNavigereTil } from './finnFagsakÅNavigereTil';

describe('finnFagsakÅNavigereTil', () => {
    test('skal returnere INGEN_FAGSAKER når det ikke finnes fagsaker', () => {
        expect(finnFagsakÅNavigereTil([])).toEqual({ status: 'INGEN_FAGSAKER' });
    });

    test('skal returnere fagsaken når det bare finnes én', () => {
        const fagsak = lagFagsak({ id: 1, status: FagsakStatus.AVSLUTTET });
        expect(finnFagsakÅNavigereTil([fagsak])).toEqual({ status: 'FUNNET', fagsak });
    });

    test('skal returnere den løpende fagsaken når det finnes flere og bare én er løpende', () => {
        const løpende = lagFagsak({ id: 1, status: FagsakStatus.LØPENDE });
        const avsluttet = lagFagsak({ id: 2, status: FagsakStatus.AVSLUTTET, underBehandling: true });
        expect(finnFagsakÅNavigereTil([avsluttet, løpende])).toEqual({ status: 'FUNNET', fagsak: løpende });
    });

    test('skal returnere fagsaken under behandling når ingen entydig løpende fagsak finnes', () => {
        const underBehandling = lagFagsak({ id: 1, status: FagsakStatus.OPPRETTET, underBehandling: true });
        const avsluttet = lagFagsak({ id: 2, status: FagsakStatus.AVSLUTTET, underBehandling: false });
        expect(finnFagsakÅNavigereTil([avsluttet, underBehandling])).toEqual({
            status: 'FUNNET',
            fagsak: underBehandling,
        });
    });

    test('skal returnere FLERE_FAGSAKER når flere fagsaker er løpende og flere er under behandling', () => {
        const fagsaker = [
            lagFagsak({ id: 1, status: FagsakStatus.LØPENDE, underBehandling: true }),
            lagFagsak({ id: 2, status: FagsakStatus.LØPENDE, underBehandling: true }),
        ];
        expect(finnFagsakÅNavigereTil(fagsaker)).toEqual({ status: 'FLERE_FAGSAKER' });
    });
});
