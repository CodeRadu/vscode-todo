import * as vscode from "vscode";
import debug from "./debug";
import { TodosPanel } from "./TodosPanel";

export function activate(context: vscode.ExtensionContext) {
  debug("enabling");
  context.subscriptions.push(
    vscode.commands.registerCommand("todo.show", () => {
      TodosPanel.createOrShow(context.extensionUri);
    })
  );
}
export function deactivate() {
  debug("disabling");
}
