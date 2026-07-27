// Sporer hvilke filer i node_modules som faktisk kreves av den bygde backend-koden,
// og kopierer kun disse til dist_backend/node_modules.
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

    const ignoredFiles = [
        'node_modules/@dotenvx/dotenvx/src/lib/helpers/executeDynamic.js',
        'node_modules/@dotenvx/dotenvx/src/lib/helpers/executeExtension.js',
    ];

    const { fileList, warnings } = await nodeFileTrace([entryFile], {
        base: rootDir,
        ignore: fil => ignoredFiles.some(fileName => fil.startsWith(fileName)),
    });

    for (const warning of warnings) {
        console.warn(`[nft] ${warning.message}`);
    }

    const nodeModuleFiles = [...fileList].filter(fil => fil.startsWith('node_modules/'));

    await Promise.all(
        nodeModuleFiles.map(async relativFil => {
            const sourcePath = path.join(rootDir, relativFil);
            const destinationPath = path.join(distBackendDir, relativFil);

            await fs.promises.mkdir(path.dirname(destinationPath), { recursive: true });
            await fs.promises.copyFile(sourcePath, destinationPath);
        })
    );

    console.log(
        `Kopierte ${nodeModuleFiles.length} filer fra node_modules til ${path.relative(rootDir, distBackendDir)}/node_modules.`
    );
}

main().catch(error => {
    console.error(error);
    process.exit(1);
});
