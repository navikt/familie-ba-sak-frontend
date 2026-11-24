import { describe, expect, test } from 'vitest';

import { utledPersonstatus, Vilkårstatus } from './vilkårstatus';

describe('utledPersonstatus', () => {
    test('skal være ikke vurdert så lenge et vilkår ikke er vurdert, også når et annet ikke er oppfylt', () => {
        const status = utledPersonstatus([Vilkårstatus.IKKE_OPPFYLT, Vilkårstatus.IKKE_VURDERT]);

        expect(status).toBe(Vilkårstatus.IKKE_VURDERT);
    });

    test('skal være ikke oppfylt når alle vilkår er vurdert og minst ett ikke er oppfylt', () => {
        const status = utledPersonstatus([
            Vilkårstatus.OPPFYLT,
            Vilkårstatus.DELVIS_OPPFYLT,
            Vilkårstatus.IKKE_OPPFYLT,
        ]);

        expect(status).toBe(Vilkårstatus.IKKE_OPPFYLT);
    });

    test('skal være delvis oppfylt når alle vilkår er vurdert og minst ett er delvis oppfylt', () => {
        const status = utledPersonstatus([Vilkårstatus.OPPFYLT, Vilkårstatus.DELVIS_OPPFYLT]);

        expect(status).toBe(Vilkårstatus.DELVIS_OPPFYLT);
    });

    test('skal være oppfylt når alle vilkår er oppfylt', () => {
        const status = utledPersonstatus([Vilkårstatus.OPPFYLT, Vilkårstatus.OPPFYLT]);

        expect(status).toBe(Vilkårstatus.OPPFYLT);
    });
});
