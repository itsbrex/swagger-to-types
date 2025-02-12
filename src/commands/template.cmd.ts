import fs from 'fs'
import path from 'path'
import vscode from 'vscode'

import {
  WORKSPACE_PATH,
  TEMPLATE_FILE_NAME,
  DEFAULT_TEMPLATE_FILE_PATH,
  mkdirRecursive,
  log,
  localize,
  getWorkspaceTemplatePath,
} from '../tools'

export function registerTemplateCommands() {
  const commands: Record<string, any> = {
    edit() {
      const vscodeConfigFolderPath = path.join(WORKSPACE_PATH || '', '.vscode')
      const workspaceConfigPath = getWorkspaceTemplatePath()

      if (!fs.existsSync(vscodeConfigFolderPath)) {
        try {
          mkdirRecursive('.vscode')
        } catch (error) {
          log.error(error)
          return log.error(localize.getLocalize('error.action'), true)
        }
      }

      if (!fs.existsSync(workspaceConfigPath)) {
        const readable = fs.createReadStream(DEFAULT_TEMPLATE_FILE_PATH)
        const writable = fs.createWriteStream(workspaceConfigPath)
        readable.pipe(writable)
      }

      vscode.workspace.openTextDocument(workspaceConfigPath).then((doc) => {
        vscode.window.showTextDocument(doc)
      })
    },
  }

  for (const command in commands) {
    vscode.commands.registerCommand(`cmd.template.${command}`, commands[command])
  }
}
