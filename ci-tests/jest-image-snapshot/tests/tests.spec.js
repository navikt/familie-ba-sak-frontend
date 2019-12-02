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

        test('opprett-behandling', async () => {
            await page.goto('http://ci-test-server:8000/fagsak/opprett');
            await page.waitFor('.opprettbehandling');
            await takeSnapshot(`opprett-behandling-${name}`, page);
        });

        test('behandle', async () => {
            await page.goto('http://ci-test-server:8000/fagsak/1/behandle');
            await page.waitFor('.fastsett');
            await takeSnapshot(`behandle-${name}`, page);
        });
    });

    afterAll(async () => {
        await browser.close();
    });
});
