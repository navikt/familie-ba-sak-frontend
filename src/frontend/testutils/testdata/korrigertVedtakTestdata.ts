import type { IRestKorrigertVedtak } from '@typer/vedtak';

export function lagKorrigertVedtak(korrigertVedtak?: Partial<IRestKorrigertVedtak>): IRestKorrigertVedtak {
    return {
        vedtaksdato: '2024-01-01',
        begrunnelse: 'Begrunnelse for korrigering',
        ...korrigertVedtak,
    };
}

export * as KorrigertVedtakTestdata from './korrigertVedtakTestdata';
