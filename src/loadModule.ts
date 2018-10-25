import { getModuleLoader } from 'emscripten-wasm-loader';
import { SassAsmModule } from './SassAsmModule';
import { SassFactory } from './SassFactory';
import { sassLoader } from './sassLoader';
import { log } from './util/logger';

/**
 * Load, initialize wasm binary to use actual sass instance.
 *
 * @returns {Promise<SassFactory>} Function to load module
 */
const loadModule = async (): Promise<SassFactory> => {
  log(`loadModule: loading libsass module`);

  //imports MODULARIZED emscripten preamble
  const runtimeModule = await import('./bin/libsass');
  const { default: defaultModule } = runtimeModule;
  const moduleLoader = await getModuleLoader<SassFactory, SassAsmModule>(sassLoader, defaultModule || runtimeModule);

  return moduleLoader();
};

export { loadModule };
