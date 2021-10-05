import { fagsakMock } from '../../node_dist/backend/mock-data';
import { oppgaveMock } from '../../src/backend/mock-data';

describe('Oppgavebenken', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Redirects til /oppgaver', () => {
        cy.url().should('include', '/oppgaver');
    });

    it('Inneholder oppgaveliste', () => {
        cy.contains('Oppgaveliste');

        cy.get('[data-cy=select-Enhet]').select('E4833');
        cy.contains('Hent').click();

        cy.contains(oppgaveMock.data.oppgaver[0].beskrivelse);
    });
});

describe('Fagsak saksoversikt', () => {
    beforeEach(() => {
        cy.visit(`/fagsak/${fagsakMock.data.id}`);
    });

    it('Viser saksoversikt', () => {
        cy.contains('Saksoversikt');
    });
});
