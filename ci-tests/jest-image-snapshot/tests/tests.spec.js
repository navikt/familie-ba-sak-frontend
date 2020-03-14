// @ts-nocheck

const puppeteer = require('puppeteer');

const large = { width: 1920, height: 1080 };

const config = [['large', large]];

describe('dsop-kontroll', () => {
    let browser;
    beforeAll(async () => {
        browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    });

    describe.each(config)('%s', (name, size) => {
        let page;

        beforeAll(async () => {
            page = await browser.newPage();
            page.setViewport(size);
            await page.goto('http://ci-test-server:8000/');
        });

        test('startside', async () => {
            await page.waitFor(1000);
            await takeSnapshot(`startside-${name}`, page);
        });

        test('saksoversikt', async () => {
            await page.goto('http://ci-test-server:8000/fagsak/1/saksoversikt');
            await page.waitFor('.saksoversikt');
            await page.waitFor(1000);
            await takeSnapshot(`saksoversikt-${name}`, page);
        });

        test('opprett-fagsak', async () => {
            await page.goto('http://ci-test-server:8000/fagsak/ny-fagsak');
            await page.waitFor('.opprettfagsak');
            await page.waitFor(1000);
            await takeSnapshot(`opprett-fagsak-${name}`, page);
        });

        test('opprett-behandling', async () => {
            await page.goto('http://ci-test-server:8000/fagsak/1/ny-behandling');
            await page.waitFor('.opprettbehandling');
            await page.waitFor(1000);
            await takeSnapshot(`opprett-behandling-${name}`, page);
        });

        test('vilkår', async () => {
            await page.goto('http://ci-test-server:8000/fagsak/1/vilkårsvurdering');
            await page.waitFor('.vilkår');
            await page.waitFor(1000);
            await takeSnapshot(`vilkår-${name}`, page);
        });

        test('beregning', async () => {
            await page.goto('http://ci-test-server:8000/fagsak/1/beregning');
            await page.waitFor('.beregning');
            await page.waitFor(1000);
            await takeSnapshot(`beregning-${name}`, page);
        });

        test('vedtak', async () => {
            await page.goto('http://ci-test-server:8000/fagsak/1/vedtak');
            await page.waitFor('.oppsummering');
            await page.waitFor(1000);
            await takeSnapshot(`vedtak-${name}`, page);
        });
    });

    afterAll(async () => {
        await browser.close();
    });
});
