import 'monaco-editor/esm/vs/editor/edcore.main'

import 'monaco-editor/esm/vs/basic-languages/dart/dart.contribution'

import { editor, languages, CancellationToken, Position } from 'monaco-editor/esm/vs/editor/editor.api'

import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'

import dartWorker from './dartWorker?worker'

self.MonacoEnvironment = {
  getWorker(workerId: any, label: string) {
    return new editorWorker()
  }
}

const worker = new dartWorker()

const init = new Promise<void>((resolve) => {
  worker.onmessage = (event: MessageEvent<string>) => {
    let model = editor.createModel(event.data, 'dart')

    editor.create(document.querySelector('#editor')!, {
      automaticLayout: true,
      model: model,
      scrollBeyondLastLine: false,
      tabSize: 2,
    })

    resolve()
  }
})

type Resolve = (value: any | PromiseLike<any>) => void

type Reject = (reason?: any) => void

init.then(() => {
  let messageMap = new Map<number, { resolve: Resolve, reject: Reject }>()

  let messageID = 0

  worker.onmessage = (event: MessageEvent<{ id: number, success: boolean | null, data: any }>) => {
    console.log(event.data)

    let promise = messageMap.get(event.data.id)

    if (promise) {
      messageMap.delete(event.data.id)

      if (event.data.success) {
        promise.resolve(event.data.data)
      } else {
        promise.resolve(null)
      }
    }
  }

  languages.registerHoverProvider('dart', {
    async provideHover(model: editor.ITextModel, position: Position, token: CancellationToken): Promise<languages.Hover | undefined> {
      console.log(model, position, token)

      let currentMessageID = ++messageID

      let promise = new Promise<string | undefined>((resolve, reject) => {
        messageMap.set(currentMessageID, { resolve, reject })
      })

      worker.postMessage({ id: currentMessageID, type: 'hover', offset: model.getOffsetAt(position) })

      try {
        let response = await promise

        if (response == null || token.isCancellationRequested) {
          return
        }

        return { contents: [{ value: cleanDocumentation(response) }] }
      } catch (error) {
        console.log('error')
        return
      }
    },
  })

  document.querySelector('#loading')!.remove()
})

// from DartCode
// TODO: import if possible

const dartDocDirectives = new RegExp('(\\n\\s*{@.*?}$)|(^{@.*?}\\s*\\n)|(^{@.*?}$)', 'gim')

const dartDocCodeBlockSections = new RegExp('(\`\`\`\\w+) +\\w+', 'gi')

const cleanDocumentation = (documentation: string): string => {
  // Remove colons from old-style references like [:foo:].
  documentation = documentation.replace(/\[:\S+:\]/g, (match) => `[${match.substring(2, match.length - 2)}]`)

  // Remove any directives like {@template xxx}
  documentation = documentation.replace(dartDocDirectives, '')

  // Remove any code block section names like ```dart preamble
  documentation = documentation.replace(dartDocCodeBlockSections, '$1')
  return documentation
}
