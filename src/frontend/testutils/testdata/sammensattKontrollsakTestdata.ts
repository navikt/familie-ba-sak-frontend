import type { IRestOpprettSammensattKontrollsak, IRestSammensattKontrollsak } from '@typer/sammensatt-kontrollsak';

export function lagSammensattKontrollsak(
    sammensattKontrollsak?: Partial<IRestSammensattKontrollsak>
): IRestSammensattKontrollsak {
    return {
        id: 1,
        behandlingId: 1,
        fritekst: 'Fritekst for sammensatt kontrollsak',
        ...sammensattKontrollsak,
    };
}

export function lagOpprettSammensattKontrollsak(
    opprettSammensattKontrollsak?: Partial<IRestOpprettSammensattKontrollsak>
): IRestOpprettSammensattKontrollsak {
    return {
        behandlingId: 1,
        fritekst: 'Fritekst for sammensatt kontrollsak',
        ...opprettSammensattKontrollsak,
    };
}

export * as SammensattKontrollsakTestdata from './sammensattKontrollsakTestdata';
