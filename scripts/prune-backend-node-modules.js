// Sporer hvilke filer i node_modules som faktisk kreves av den bygde backend-koden,
// og kopierer kun disse til dist_backend/node_modules.
import { existsSync } from 'node:fs';
import { cp, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import { nodeFileTrace } from '@vercel/nft';

const rootDir = fileURLToPath(new URL('..', import.meta.url));
const distBackendDir = path.join(rootDir, 'dist_backend');
const entryFile = path.join(distBackendDir, 'server.js');
const nodeModulesDir = path.join(distBackendDir, 'node_modules');

async function main() {
    if (!existsSync(entryFile)) {
        throw new Error(`Fant ikke ${entryFile}. Kjør 'yarn build:backend' (tsc) før dette scriptet.`);
    }

    const ignoredFiles = [
        'node_modules/vite',
        'node_modules/@dotenvx/dotenvx/src/lib/helpers/executeDynamic.js',
        'node_modules/@dotenvx/dotenvx/src/lib/helpers/executeExtension.js',
    ];

    const { fileList } = await nodeFileTrace([entryFile], {
        base: rootDir,
        ignore: fil => ignoredFiles.some(fileName => fil.startsWith(fileName)),
    });

    const nodeModuleFiles = [...fileList].filter(fil => fil.startsWith('node_modules/'));

    await rm(nodeModulesDir, { recursive: true, force: true });

    await Promise.all(
        nodeModuleFiles.map(async relativFil => {
            const sourcePath = path.join(rootDir, relativFil);
            const destinationPath = path.join(distBackendDir, relativFil);

            await mkdir(path.dirname(destinationPath), { recursive: true });
            await cp(sourcePath, destinationPath);
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
