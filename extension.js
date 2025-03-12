const vscode = require("vscode");
const { enfocusScriptingSnippets } = require("./snippets"); // Import snippets

function activate(context) {
    // console.log("Extension is now active!");

    let provider = vscode.languages.registerCompletionItemProvider(
        { scheme: "file", language: "typescript" }, // Target TypeScript
        {
            provideCompletionItems(document, position) {
                // console.log("Completion triggered!");

                // Get the current line text up to the cursor position
                const linePrefix = document.lineAt(position).text.substring(0, position.character).trim();
                // console.log("Typed so far:", linePrefix);

                // Find snippets where ANY tag matches what the user has typed
                const matchingSnippets = enfocusScriptingSnippets
                    .filter(snip => snip.tags.some(tag => {
                        // console.log("Found Tag: " + tag);
                        return tag.includes(linePrefix);
                    }))
                    .map(snip => {
                        // console.log(`Providing snippet for '${snip.completionItem}' (Tag match)`);

                        let snippet = new vscode.CompletionItem(snip.completionItem, vscode.CompletionItemKind.Snippet);
                        snippet.insertText = new vscode.SnippetString(snip.snippetString.trim()); // Trim snippet content
                        snippet.detail = `- ${snip.markdownString}`; // Short description (shows in dropdown)
                        snippet.documentation = new vscode.MarkdownString(`### Description\n${snip.markdownString}`); // Full hover text

                        // ✅ Add category label on the right side
                        snippet.sortText = "1"; // Ensures snippets appear at the top
                        snippet.label = { label: snip.completionItem, description: snip.shortText }; // Adds "Snippet" label

                        return snippet;
                    });

                // console.log("Matching Snippets Found: ", matchingSnippets.length);

                return matchingSnippets.length > 0 ? matchingSnippets : [];
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
