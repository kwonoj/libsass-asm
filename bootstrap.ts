/*tslint:disable:no-console*/

/**
 * Script to download libsass wasm binary from https://github.com/kwonoj/docker-libsass-wasm.
 */

import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { exec, rm } from 'shelljs';
import { promisify } from 'util';
//tslint:disable-next-line: no-require-imports no-var-requires
const { config } = require('./package.json');

// Package.json defines `libsass-version` under `config` section to find corresponding release version
const version = config['libsass-version'];
const readFile = promisify(fs.readFile);
const asyncExec = promisify(exec);

/**
 * Generate sha512 checksum from given string.
 */
const calculateChecksumFromFile = async (filePath: string) =>
  crypto
    .createHash('sha512')
    .update(await readFile(filePath, { encoding: 'utf-8' }), 'utf8')
    .digest('hex');

/**
 * Get remote release checksum.
 */
const getRemoteChecksum = (url: string) => {
  const { stdout } = exec(`wget -qO- ${url}.sha512`, { silent: true });
  return (stdout as string).slice(0, (stdout as string).indexOf(' '));
};

/**
 * Main script execution
 */
(async () => {
  const libPath = path.resolve('./src/bin');
  const fileName = 'libsass.js';
  const localBinarypath = path.join(libPath, fileName);

  const url = `https://github.com/kwonoj/docker-libsass-wasm/releases/download/${version}/${fileName}`;

  //Create checksum validator
  const remoteChecksum = getRemoteChecksum(url);
  const validateBinary = async () => (await calculateChecksumFromFile(localBinarypath)) === remoteChecksum;
  const isBinaryExists = () => fs.existsSync(localBinarypath);

  if (isBinaryExists() && (await validateBinary())) {
    return;
  }

  console.log(`Downloading libsass wasm binary version '${version}'`);

  rm('-f', path.join(libPath, fileName));
  await asyncExec(`wget -q --directory-prefix=${libPath} ${url}`);

  if (!isBinaryExists() || !(await validateBinary())) {
    throw new Error(`Downloaded binary checksum mismatch, cannot complete bootstrap`);
  }
})();
