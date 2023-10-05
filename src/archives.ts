import appUrl from './archives/app.tar.bz';
import sdkUrl from './archives/sdk.tar.bz';

(globalThis as any).loadApp = async () => {
  let response = await fetch(appUrl);
  let buffer = await response.arrayBuffer();
  return new Uint8Array(buffer);
};

(globalThis as any).loadSdk = async () => {
  let response = await fetch(sdkUrl);
  let buffer = await response.arrayBuffer();
  return new Uint8Array(buffer);
};