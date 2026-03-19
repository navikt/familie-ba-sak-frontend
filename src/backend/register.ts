// Fjerner warningen: 'ExperimentalWarning: `--experimental-loader` may be removed in the future; instead use `register()`'

import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

register('ts-node/esm', pathToFileURL('./'));
