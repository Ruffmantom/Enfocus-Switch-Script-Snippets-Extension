# Enfocus Scripting Snippets - VS Code Extension

## 📌 Overview
This **Visual Studio Code extension** provides **auto-completion snippets** for **Enfocus Switch scripting** in **TypeScript**. It helps developers write Switch scripts faster by suggesting relevant snippets based on typed keywords.

## 🚀 Features
- **Auto-completion for Enfocus Switch scripting**
- **Snippets for logging, job handling, and XML processing**
- **Triggers on any letter** for seamless snippet suggestions
- **Detailed descriptions and documentation for each snippet**

## 🛠️ Installation
1. Clone this repository or download the source files.
2. Open the folder in **VS Code**.
3. Run `npm install` to install dependencies (if needed).
4. Press `F5` to launch an **Extension Development Host**.

## 🎯 Usage
1. Open a **TypeScript** file in VS Code.
2. Start typing an **Enfocus Switch-related term** (e.g., `log`, `try`, `xml`).
3. Select a snippet from the auto-complete suggestions.
4. Press `Enter` or `Tab` to insert the snippet.

## 📜 Snippets Included
| Trigger  | Snippet Functionality |
|----------|----------------------|
| `entc`   | Adds a Try-Catch block with `job.log` for error handling. |
| `enli`   | Inserts a `job.log(LogLevel.Info, "...")` message. |
| `enlw`   | Inserts a `job.log(LogLevel.Warning, "...")` message. |
| `enle`   | Inserts a `job.log(LogLevel.Error, "...")` message. |
| `enjne`  | Gets the job name **with** extension. |
| `enjn`   | Gets the job name **without** extension. |
| `enjdp`  | Gets the dataset path for a job. |
| `encxj`  | Converts an XML dataset to a JSON object. |

## ✨ How It Works
- The extension **listens for typed text** and **matches it with predefined snippet tags**.
- If a match is found, it suggests the corresponding **Enfocus Switch snippet**.
- Selecting a snippet **inserts the predefined code block** into the file.

## 🔧 Development & Customization
To add or modify snippets:
1. Open `snippets.js`.
2. Add new snippets following the `Snippet` class structure.
3. Register the new snippet in the `enfocusScriptingSnippets` array.
4. Restart VS Code to apply changes.

## 📦 Extension Structure
```
├── extension.js   # Main extension logic
├── snippets.js    # Enfocus Switch snippets
├── package.json   # Extension metadata
└── README.md      # This documentation
```

## ❌ Uninstallation
To remove the extension:
1. Open **VS Code**.
2. Go to **Extensions (`Ctrl+Shift+X`)**.
3. Find the extension and click **Uninstall**.

## 🤝 Contributions
Feel free to **fork**, **modify**, and **submit pull requests** for improvements!