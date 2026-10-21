import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import { FagsakStatus } from '@typer/fagsak';
import { describe, expect, test } from 'vitest';

import { finnFagsakÅNavigereTil } from './finnFagsakÅNavigereTil';

describe('finnFagsakÅNavigereTil', () => {
    test('skal returnere undefined når det ikke finnes fagsaker', () => {
        expect(finnFagsakÅNavigereTil([])).toBeUndefined();
    });

    test('skal returnere fagsaken når det bare finnes én', () => {
        const fagsak = lagFagsak({ id: 1, status: FagsakStatus.AVSLUTTET });
        expect(finnFagsakÅNavigereTil([fagsak])).toBe(fagsak);
    });

    test('skal returnere den løpende fagsaken når det finnes flere og bare én er løpende', () => {
        const løpende = lagFagsak({ id: 1, status: FagsakStatus.LØPENDE });
        const avsluttet = lagFagsak({ id: 2, status: FagsakStatus.AVSLUTTET, underBehandling: true });
        expect(finnFagsakÅNavigereTil([avsluttet, løpende])).toBe(løpende);
    });

    test('skal returnere fagsaken under behandling når ingen entydig løpende fagsak finnes', () => {
        const underBehandling = lagFagsak({ id: 1, status: FagsakStatus.OPPRETTET, underBehandling: true });
        const avsluttet = lagFagsak({ id: 2, status: FagsakStatus.AVSLUTTET, underBehandling: false });
        expect(finnFagsakÅNavigereTil([avsluttet, underBehandling])).toBe(underBehandling);
    });

    test('skal returnere undefined når flere fagsaker er løpende og flere er under behandling', () => {
        const fagsaker = [
            lagFagsak({ id: 1, status: FagsakStatus.LØPENDE, underBehandling: true }),
            lagFagsak({ id: 2, status: FagsakStatus.LØPENDE, underBehandling: true }),
        ];
        expect(finnFagsakÅNavigereTil(fagsaker)).toBeUndefined();
    });
});
