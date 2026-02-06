class Snippet {
    constructor(completionItem, snippetString, markdownString, tags, shortText) {
        this.completionItem = completionItem; // the name or command of the snippet
        this.snippetString = snippetString; // the actual snippet
        this.markdownString = markdownString; // the description that shows up when hovering dropdown item
        this.tags = tags // these help filter the snippet but is actually is broken at the moment
        this.shortText = shortText // this is the descriptor in the drop down item line
    }
}

// try catch snips
var tryCatchSnippet = new Snippet(
    'en.tryCatchLog',
    `
    try {
        // try code here
        $1
        // send job on it's way
        await job.log(LogLevel.Info, "About to Send job on its way!");
        // await job.sendToData(Connection.Level.Success);
    } catch (error) {
        await job.log(LogLevel.Error, "There was an error" + error);
        // await job.sendToData(Connection.Level.Error);
    }
    `,
    `Adds a Try Catch Block with a job.log Error and a job.sendToData Error.`,
    ['enfocus', 'en', 'try', 'catch', 'trycatch', 'log', 'error'],
    "Try/catch with job.log"
)

// Log Snips
var jobLogInfoSnippet = new Snippet(
    'en.logInfo',
    `
    await job.log(LogLevel.Info, "$1")
    `,
    'Add a job.log Info message',
    ['enfocus', 'en', 'log', 'info'],
    "job.log info"
)


var jobLogWarningSnippet = new Snippet(
    'en.logWarn',
    `
    await job.log(LogLevel.Warning, "$1")
    `,
    'Add a job.log Warning message',
    ['enfocus', 'en', 'log', 'warn', 'warning'],
    "job.log warning"
)

var jobLogErrorSnippet = new Snippet(
    'en.logError',
    `
    await job.log(LogLevel.Error, "$1")
    `,
    'Add a job.log Error message',
    ['enfocus', 'en', 'log', 'error'],
    "job.log error"
)

var getNameWithExtensionSnippet = new Snippet(
    'en.jobNameWithExt',
    `
    // get the file name
    let jobName: string = await job.getName(true)`,
    'Adds jobName Variable with the extension. Example: "my-artwork.pdf"',
    ['enfocus', 'en', 'job', 'name', 'extension', 'filename'],
    "Job name with extension"
)

var getNameWithOutExtensionSnippet = new Snippet(
    'en.jobNameNoExt',
    `
    // get the file name without extension
    let jobName: string = await job.getName(false)`,
    'Adds jobName Variable with the extension. Example: "my-artwork"',
    ['enfocus', 'en', 'job', 'name', 'noext', 'filename'],
    "Job name without extension"
)


var getJobDatasetPathSnippet = new Snippet(
    'en.datasetPath',
    `
    // get the jobs dataset path
    const DATASET: string = await job.getDataset("DATASET_NAME", AccessLevel.ReadOnly)
    // make sure dataset is there
    if (!DATASET) {
        await job.log(LogLevel.Error, "** Could not find the path for the standardized data")
    }
    // Read the file synchronously
    const DATASET_READY = fs.readFileSync(DATASET, 'utf-8');
    `,
    'Adds the path of specified dataset',
    ['enfocus', 'en', 'dataset', 'path', 'file'],
    "Get dataset full path"
)

var convertXMLtoJSONSnippet = new Snippet(
    'en.xmlToJson',
    `
    // ****************
    
    // Make Sure to install these and add these and at the top of the file if they do not exist
    /*
        npm install @types/tmp @types/xml2js @types/xmldom --save-dev

        import * as fs from "fs";
        import * as tmp from "tmp";
        import { DOMParser } from "xmldom";
        import { parseStringPromise } from "xml2js";
    */

    // Helper Function to find a specific value
    const extractFieldValue = (jobData: any, searchId: string): string => {
        const field = jobData["field-list"]["field"].find(
        (f: any) => f.$.Id === searchId
    );
        return field ? field.value.toString() : "N/A";
    };

    // function to convert XML to JSON
    async function convertXmlToJson(xmlString: string): Promise<Record<string, any>> {
        try {
            const jsonResult = await parseStringPromise(xmlString, {explicitArray: false});
            // this will return an object
            return jsonResult;
        } catch (error) {
            return {
                message: "There was an error converting the XML: " + error
            }
        }
    }

    // Retrieve the XML metadata file associated with the job
    const metadataPath: string | null = await job.getDataset("DATASET_NAME_HERE", AccessLevel.ReadOnly);

    // Read the XML metadata file
    const metadataContent: string = fs.readFileSync(metadataPath, "utf-8");

    // Parse XML metadata using DOMParser
    const parser: DOMParser = new DOMParser();
    const xmlDOM = parser.parseFromString(metadataContent, "text/xml");

    // Make XML a string to be converted
    const xmlString: string = xmlDOM.toString();

    // Convert XML to JSON
    const metadataJson: Record<string, any> = await convertXmlToJson(xmlString);
    
    // ****************


    `,
    'Takes the XML dataset and turns it into JSON object for editing',
    ['enfocus', 'en', 'json', 'xml', 'dataset'],
    "Convert XML dataset to JSON"
)


var getJobPathSnippet = new Snippet(
    'en.jobPath',
    `let jobPath = await job.get(AccessLevel.ReadOnly);`,
    'Gets the full path to the job',
    ['enfocus', 'en', 'job', 'path', 'file'],
    "Get job file path"
)

var getPropertyValueSnippet = new Snippet(
    'en.flowPropValue',
    `let VARIABLE_NAME: string = (await flowElement.getPropertyStringValue(
      "PROPERTY_NAME"
    )) as string;`,
    'Get the Property value from the flow element.',
    ['enfocus', 'en', 'flow', 'property', 'value'],
    "Flow element property value"
)

var updateValueInXmlString = new Snippet(
    'en.xmlUpdateValue',
    `
    const updateFieldValue = (jobDataXML: string, searchId: string, newValue: string): string => {
        const fieldRegex = new RegExp(
            '(<field[^>]*Id="' + searchId + '"[^>]*>[\\s\\S]*?<value>)(.*?)(</value>)',
            "i"
        );

        return jobDataXML.replace(fieldRegex, (_, before, _oldValue, after) => {
            return before + newValue + after;
        });
    };

    `,
    'Updates a specific field value from the XML dataset string without having to install any packages.',
    ['enfocus', 'en', 'xml', 'update', 'field', 'value'],
    "Update XML value from string"
)


var extractValueInXmlString = new Snippet(
    'en.xmlExtractValue',
    `
    const extractFieldValue = (jobDataXML: string, searchId: string, newValue: string = ""): string => {
        const fieldRegex = new RegExp(
            '<field[^>]*Id="' + searchId + '"[^>]*>([\\s\\S]*?)<\\/field>',
            "i"
        );
        const fieldMatch = jobDataXML.match(fieldRegex);

        if (fieldMatch && fieldMatch[1]) {
            const valueMatch = fieldMatch[1].match(/<value>(.*?)<\/value>/);
            if (valueMatch && valueMatch[1]) {
                return valueMatch[1].trim();
            }
        }

        return "N/A";
    };

    `,
    'Extract a specific field value from the XML dataset string without having to install any packages.',
    ['enfocus', 'en', 'xml', 'extract', 'field', 'value'],
    "Extract XML value from string"
)
var extractTagValueInXmlString = new Snippet(
    'en.xmlExtractTag',
    `
    const extractTagValue = async (xml, tagName) => {
        const tagRegex = new RegExp(\`<\${tagName}>(.*?)<\\/\\${tagName}>\`, "s");
        await logger(\`About to try and match: \${tagRegex}\`);

        const match = xml.match(tagRegex);

        if (match) {
            const value = match[1]?.trim();
            if (value) {
                await logger(\`Found value for \${tagName}: "\${value}"\`);
                return value;
            } else {
                await logger(\`Tag \${tagName} is empty. Returning empty string.\`);
                return "";
            }
        } else {
            await logger(\`Could not find \${tagName} in XML. Returning undefined.\`);
            return undefined;
        }
    };
    `,
    'Extract a specific field value from the XML dataset string without having to install any packages.',
    ['enfocus', 'en', 'xml', 'extract', 'tag', 'value'],
    "Extract XML tag value"
)
var addLogger = new Snippet(
    'en.addLogger',
    `
    const logger = async (log: string) => {
        await job.log(LogLevel.Info, log)
    }
    `
    ,
    'Simplifies the job.log function',
    ['enfocus', 'en', 'log', 'helper'],
    "job.log helper"
)



/*

---------- Template ----------
var Snippet = new Snippet(
    'COMPLETION_ITEM_HERE',
    `SNIPPET_STRING_HERE`,
    'MARKDOWN_STRING_HERE',
    ['TAGS_HERE'],
    "SHORT_TEXT_HERE"
)

*/

const enfocusScriptingSnippets = [
    tryCatchSnippet,
    jobLogInfoSnippet,
    jobLogWarningSnippet,
    jobLogErrorSnippet,
    getNameWithExtensionSnippet,
    getNameWithOutExtensionSnippet,
    getJobDatasetPathSnippet,
    convertXMLtoJSONSnippet,
    getJobPathSnippet,
    getPropertyValueSnippet,
    updateValueInXmlString,
    extractValueInXmlString,
    extractTagValueInXmlString,
    addLogger,
]

module.exports = {
    enfocusScriptingSnippets
}
