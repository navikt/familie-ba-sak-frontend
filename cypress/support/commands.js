// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('authenticateUsingToken', window => {
    const clientId = Cypress.env('CLIENT_ID');
    const tenantId = Cypress.env('TENANT_ID');
    const client_secret = Cypress.env('CLIENT_SECRET');

    const myTokenName = Cypress.env('TOKEN_NAME');
    const username = Cypress.env('USERNAME');
    const password = Cypress.env('PASSWORD');
    const scope = Cypress.env('BA_SAK_SCOPE');

    cy.request({
        method: 'GET',
        url: 'http://localhost:8000/login?redirectUrl=/',
    }).then(res => {
        const cookieString = res.requestHeaders.cookie;
        cy.log(cookieString);

        // enten "familie-ba-soknad-v1=value" eller "cookie1=value1;cookie2=value2;familie-ba-soknad-v1=value;morecookies"
        // const containsSeveralCookies = cookieString.includes(';');
        // cy.log(`contains several cookies: ${containsSeveralCookies}`);
        //
        // let cookie;
        //
        // if (containsSeveralCookies) {
        //     const cookiesArray = cookieString.split(';');
        //     let myTokenNameIndex = cookiesArray.findIndex(s => s === myTokenName);
        //     cookie = cookiesArray[myTokenNameIndex].split('=')[1];
        // } else {
        //     cookie = cookieString.split('=')[1];
        // }
        //
        // cy.log(`the cookie is: ${cookie}`);
        //
        // cy.setCookie(myTokenName, cookie);
    });

    cy.request({
        // Given: I send auth request
        method: 'POST',
        url: `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
        header: {
            'cache-control': 'no-cache',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: true,
        body: {
            client_id: clientId,
            username: username,
            password: password,
            grant_type: 'password',
            client_secret: client_secret,
            scope: scope,
        },
    }).then(res => {
        cy.log(res);
    });
});
