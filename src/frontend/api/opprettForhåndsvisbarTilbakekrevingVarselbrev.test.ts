import { apiClient } from '@api/client/apiClient';
import { opprettForhåndsvisbarTilbakekrevingVarselbrev } from '@api/opprettForhåndsvisbarTilbakekrevingVarselbrev';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: { post: vi.fn() },
}));

afterEach(() => {
    vi.clearAllMocks();
});

describe('opprettForhåndsvisbarTilbakekrevingVarselbrev', () => {
    test('skal sende POST med fritekst og returnere base64-streng', async () => {
        // Arrange
        const bytes = 'JVBERi0xLjQK';
        vi.mocked(apiClient.post).mockResolvedValue(bytes);

        // Act
        const svar = await opprettForhåndsvisbarTilbakekrevingVarselbrev(123, { fritekst: 'Fritekst' });

        // Assert
        expect(apiClient.post).toHaveBeenCalledWith({
            url: '/familie-ba-sak/api/tilbakekreving/123/forhandsvis-varselbrev',
            data: { fritekst: 'Fritekst' },
        });
        expect(svar).toBe(bytes);
    });

    test('skal håndtere feil', async () => {
        // Arrange
        vi.mocked(apiClient.post).mockRejectedValue(new Error('Noe gikk galt'));

        // Act & assert
        await expect(opprettForhåndsvisbarTilbakekrevingVarselbrev(123, { fritekst: 'Fritekst' })).rejects.toThrow(
            'Noe gikk galt'
        );
    });
});
