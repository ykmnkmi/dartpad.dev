import appUrl from './archives/app.tar.bz';
import sdkUrl from './archives/sdk.tar.bz';

(globalThis as any).loadApp = async (
  onData: (data: Uint8Array) => void,
  onError: (reason: string) => void,
) => {
  try {
    let response = await fetch(appUrl);
    let buffer = await response.arrayBuffer();
    onData(new Uint8Array(buffer));
  } catch (error) {
    let message = "An error occurred while loading the app archive.";

    if (error instanceof Error) {
      message += `\n${error.message}`;
    }

    onError(message);
  }
};

(globalThis as any).loadSdk = async (
  onData: (data: Uint8Array) => void,
  onError: (reason: string) => void,
) => {
  try {
    let response = await fetch(sdkUrl);
    let buffer = await response.arrayBuffer();
    onData(new Uint8Array(buffer));
  } catch (error) {
    let message = "An error occurred while loading the SDK archive.";

    if (error instanceof Error) {
      message += `\n${error.message}`;
    }

    onError(message);
  }
};
