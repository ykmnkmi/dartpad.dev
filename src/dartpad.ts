import "monaco-editor/esm/vs/editor/edcore.main"

import "monaco-editor/esm/vs/basic-languages/dart/dart.contribution"

import { editor, languages, CancellationToken, Position } from "monaco-editor/esm/vs/editor/editor.api"

import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker"

interface ProvideHover {
  (model: editor.ITextModel, position: Position, token: CancellationToken): languages.ProviderResult<languages.Hover>
}

export const createEditor = (selector: string, options?: editor.IStandaloneEditorConstructionOptions): editor.IStandaloneCodeEditor | null => {
  const domElement = document.querySelector(selector);

  if (domElement instanceof HTMLElement) {
    return editor.create(domElement, options)
  }

  return null;
}

export const createModel = editor.createModel

export const setupEditorWorker = () => {
  self.MonacoEnvironment = {
    getWorker(workerId: any, label: string) {
      return new editorWorker()
    }
  }
}

export const enableDartLanguageService = (provideHover: ProvideHover) => {
  return languages.registerHoverProvider('dart', { provideHover: provideHover })
}

export const log = console.log;