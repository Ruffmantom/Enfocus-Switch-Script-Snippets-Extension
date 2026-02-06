const vscode = require("vscode");
const { enfocusScriptingSnippets } = require("./snippets"); // Import snippets

function activate(context) {
    // console.log("Extension is now active!");

    let provider = vscode.languages.registerCompletionItemProvider(
        [
            { language: "typescript" },
            { language: "typescriptreact" },
            { language: "javascript" },
            { language: "javascriptreact" }
        ],
        {
            provideCompletionItems(document, position) {
                // console.log("Completion triggered!");

                const matchingSnippets = enfocusScriptingSnippets.map(snip => {
                    let snippet = new vscode.CompletionItem(snip.completionItem, vscode.CompletionItemKind.Snippet);
                    snippet.insertText = new vscode.SnippetString(snip.snippetString.trim()); // Trim snippet content
                    snippet.detail = `- ${snip.markdownString}`; // Short description (shows in dropdown)
                    snippet.documentation = new vscode.MarkdownString(`### Description\n${snip.markdownString}`); // Full hover text

                    // Ensure better filtering when user types
                    snippet.filterText = [
                        snip.completionItem,
                        snip.shortText,
                        ...(snip.tags || [])
                    ].filter(Boolean).join(" ");

                    // ✅ Add category label on the right side
                    snippet.sortText = "1"; // Ensures snippets appear at the top
                    snippet.label = { label: snip.completionItem, description: snip.shortText }; // Adds "Snippet" label

                    return snippet;
                });

                // console.log("Matching Snippets Found: ", matchingSnippets.length);

                return matchingSnippets;
            }
        },
        ..."abcdefghijklmnopqrstuvwxyz".split("") // Trigger suggestions on any letter
    );

    context.subscriptions.push(provider);
}

function deactivate() {
    // console.log("Extension deactivated");
}

module.exports = { activate, deactivate };
