import 'monaco-editor/esm/vs/editor/edcore.main';

import 'monaco-editor/esm/vs/basic-languages/dart/dart.contribution';

import { editor, languages, CancellationToken, Position } from 'monaco-editor/esm/vs/editor/editor.api';

import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';

import dartWorker from './dartWorker?worker';

import { cleanDocumentation } from './utils';

self.MonacoEnvironment = {
  getWorker(workerId: any, label: string) {
    return new editorWorker();
  }
};

type Resolve = (value: any | PromiseLike<any>) => void;

type Reject = (reason?: any) => void;

const worker = new dartWorker();

const main = async () => {
  try {
    await new Promise<void>((resolve, reject) => {
      worker.onmessage = (event: MessageEvent<string | undefined>) => {
        if (event.data) {
          let model = editor.createModel(event.data, 'dart');

          editor.create(document.querySelector('#editor')!, {
            automaticLayout: true,
            model: model,
            scrollBeyondLastLine: false,
            tabSize: 2,
          });

          resolve();
        } else {
          reject();
        }
      }
    });

    let messageMap = new Map<number, { resolve: Resolve, reject: Reject }>();
    let messageID = 0;

    worker.onmessage = (event: MessageEvent<{ id: number, success: boolean | null, data: any }>) => {
      let promise = messageMap.get(event.data.id);

      if (promise) {
        messageMap.delete(event.data.id);

        if (event.data.success) {
          promise.resolve(event.data.data);
        } else {
          promise.reject();
        }
      }
    };

    languages.registerHoverProvider('dart', {
      async provideHover(model: editor.ITextModel, position: Position, token: CancellationToken): Promise<languages.Hover | undefined> {
        let currentMessageID = ++messageID;

        let promise = new Promise<languages.Hover | undefined>((resolve, reject) => {
          messageMap.set(currentMessageID, { resolve, reject });
        })

        worker.postMessage({ id: currentMessageID, type: 'hover', offset: model.getOffsetAt(position) });

        try {
          let response = await promise;

          if (token.isCancellationRequested) {
            return;
          }

          return response;
        } catch (error) {
          return;
        }
      },
    });

    document.querySelector('#loading')!.remove();
  } catch (error) {
    document.querySelector('#loading')!.textContent = `${error}`;
  }
};

main();