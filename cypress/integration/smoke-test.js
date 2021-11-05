import { fagsakMock } from '../../node_dist/backend/mock-data';
import { oppgaveMock } from '../../src/backend/mock-data';

describe('Oppgavebenken', () => {
    beforeEach(() => {
        cy.window().then(win => {
            // ensure session storage is cleared
            win.sessionStorage.clear();

            // set the token
            cy.authenticateUsingToken(win);
        });
    });

    it('Redirects til /oppgaver', () => {
        // cy.getCookies().then(cookies => {
        //     const cookie = cookies.find(c => c.name === cookieName);
        //
        //     cy.log(`preparing cy.visit using cookie: ${cookie.value}`);
        //
        //     cy.visit('/', {
        //         headers: {
        //             cookie: `${cookieName}=${cookie}`,
        //         },
        //     });
        // });
        // cy.window().then(win => {
        //     const token = win.sessionStorage.getItem(cookieName);
        //     cy.setCookie(cookieName, token);
        // });
        // cy.getCookie(cookieName).then(c => {
        //     cy.log(c.value);
        //     cy.visit('/', {
        //         method: 'GET',
        //         headers: {
        //             cookie: `${cookieName}=${c.value}`,
        //         },
        //     });
        // });
        // cy.visit('/', {
        //     onBeforeLoad(win) {
        //         const token = win.sessionStorage.getItem('familie-ba-sak-v1');
        //         cy.log(token);
        //     },
        // });
        // cy.url().should('include', '/oppgaver');
    });

    // it('Inneholder oppgaveliste', () => {
    //     cy.contains('Oppgaveliste');
    //
    //     cy.get('[data-cy=select-Enhet]').select('E4833');
    //     cy.contains('Hent').click();
    //
    //     cy.contains(oppgaveMock.data.oppgaver[0].beskrivelse);
    // });
});
//
// describe('Fagsak saksoversikt', () => {
//     beforeEach(() => {
//         cy.visit(`/fagsak/${fagsakMock.data.id}`);
//     });
//
//     it('Viser saksoversikt', () => {
//         cy.contains('Saksoversikt');
//     });
// });
