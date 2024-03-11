import convict from 'convict';
import * as process from "process";
import * as devConfig from "../configs/development";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let convictConfigurationProvider: convict.Config<any> | undefined;

export function initializeAndValidate() {
  // TODO load config per environment
  //const nodeEnv = process.env.NODE_ENV;
  convictConfigurationProvider = convict(devConfig.default);
  convictConfigurationProvider.validate();
}

// Meant mostly for testing purposes, to allow resetting the state between tests
export function reset() {
  convictConfigurationProvider = undefined;
}

export function getValue(keyName: string): string {
  if (convictConfigurationProvider === undefined) {
    throw new Error('Configuration has not been initialized yet');
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return convictConfigurationProvider.get(keyName) as string;
}
