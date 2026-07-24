// Sporer hvilke filer i node_modules som faktisk kreves av den bygde backend-koden,
// og kopierer kun disse til dist_backend/node_modules. Dette gjør at Docker-imaget kan
// kopiere dist_backend alene i stedet for hele node_modules-mappen.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { nodeFileTrace } from '@vercel/nft';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distBackendDir = path.join(rootDir, 'dist_backend');
const entryFile = path.join(distBackendDir, 'server.js');

async function main() {
    if (!fs.existsSync(entryFile)) {
        throw new Error(`Fant ikke ${entryFile}. Kjør 'yarn build:backend' (tsc) før dette scriptet.`);
    }

    // Filer som trekker inn store, irrelevante avhengighetstrær når @vercel/nft sporer
    // require-grafen statisk, selv om de aldri kjøres i vår bruk av backend:
    // - 'vite' importeres kun dynamisk når erLokal() er true (lokal utvikling).
    // - @dotenvx/dotenvx sin CLI (main.js -> .../cli/dotenvx.js -> executeDynamic.js /
    //   executeExtension.js) implementerer 'dotenvx run/ext/armor', som spawner
    //   vilkårlige binærfiler fra node_modules/.bin. Vi bruker kun dotenvx.config(),
    //   aldri CLI-funksjonene, så nft sin konservative "kan i teorie kjøre en hvilken
    //   som helst .bin-fil"-antakelse trekker inn eslint, typescript, husky, prettier,
    //   vitest osv. som ikke trengs i produksjon.
    const ignoredMønstre = [
        'node_modules/vite/',
        'node_modules/@dotenvx/dotenvx/src/lib/helpers/executeDynamic.js',
        'node_modules/@dotenvx/dotenvx/src/lib/helpers/executeExtension.js',
    ];

    const { fileList, warnings } = await nodeFileTrace([entryFile], {
        base: rootDir,
        ignore: fil => ignoredMønstre.some(mønster => fil.startsWith(mønster)),
    });

    for (const warning of warnings) {
        console.warn(`[nft] ${warning.message}`);
    }

    const nodeModuleFiler = [...fileList].filter(fil => fil.startsWith('node_modules/'));

    await Promise.all(
        nodeModuleFiler.map(async relativFil => {
            const kildesti = path.join(rootDir, relativFil);
            const målsti = path.join(distBackendDir, relativFil);

            await fs.promises.mkdir(path.dirname(målsti), { recursive: true });
            await fs.promises.copyFile(kildesti, målsti);
        })
    );

    console.log(
        `Kopierte ${nodeModuleFiler.length} filer fra node_modules til ${path.relative(rootDir, distBackendDir)}/node_modules.`
    );
}

main().catch(error => {
    console.error(error);
    process.exit(1);
});
