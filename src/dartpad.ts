import "monaco-editor/esm/vs/editor/edcore.main"

import "monaco-editor/esm/vs/basic-languages/dart/dart.contribution"

import { editor } from "monaco-editor/esm/vs/editor/editor.api"

import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker"

export const createEditor = editor.create

export const createModel = editor.createModel

export const setupEditorWorker = () => {
  self.MonacoEnvironment = {
    getWorker(workerId: any, label: string) {
      return new editorWorker()
    }
  }
}
