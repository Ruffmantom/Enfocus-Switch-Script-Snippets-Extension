class Snippet {
    constructor(completionItem, snippetString, markdownString, tags, shortText) {
        this.completionItem = completionItem;
        this.snippetString = snippetString;
        this.markdownString = markdownString;
        this.tags = tags
        this.shortText = shortText
    }
}

// try catch snips
var tryCatchSnippet = new Snippet(
    'entc',
    `
    try {
        // try code here
        $1
        // send job on it's way
        await job.log(LogLevel.Info, "About to Send job on its way!");
        // await job.sendToChannel(Connection.Level.Success);
    } catch (error) {
        await job.log(LogLevel.Error, "There was an error" + error);
        // await job.sendToChannel(Connection.Level.Error);
    }
    `,
    `Adds a Try Catch Block with a job.log Error and a job.SendToChannel Error.`,
    ['enfocus', 'en', 'try', 'switch', 'entc'],
    "Adds Try Catch sendToChannel"
)

// Log Snips
var jobLogInfoSnippet = new Snippet(
    'enli',
    `
    await job.log(LogLevel.Info, "$1")
    `,
    'Add a job.log Info message',
    ['enfocus', 'en', 'log', 'switch', 'info', 'enli'],
    "log info"
)


var jobLogWarningSnippet = new Snippet(
    'enlw',
    `
    await job.log(LogLevel.Warning, "$1")
    `,
    'Add a job.log Warning message',
    ['enfocus', 'en', 'log', 'switch', 'warning', 'enlw'],
    "log warning"
)

var jobLogErrorSnippet = new Snippet(
    'enle',
    `
    await job.log(LogLevel.Error, "$1")
    `,
    'Add a job.log Error message',
    ['enfocus', 'en', 'log', 'switch', 'error', 'enle'],
    "log error"
)

var getNameWithExtensionSnippet = new Snippet(
    'enjne',
    `
    // get the file name
    let jobName: string = await job.getName(true)`,
    'Adds jobName Variable with the extension. Example: "my-artwork.pdf"',
    ['name'],
    "Gets name of Job with extension"
)

var getNameWithOutExtensionSnippet = new Snippet(
    'enjn',
    `
    // get the file name without extension
    let jobName: string = await job.getName(false)`,
    'Adds jobName Variable with the extension. Example: "my-artwork"',
    ['name'],
    "Gets name of Job with out extension"
)


var getJobDatasetPathSnippet = new Snippet(
    'enjdp',
    `
    // get the jobs dataset path
    const jobDataPath: string = await job.getDataSet("DATASET_NAME_HERE", AccessLevel.ReadOnly)
    `,
    'Adds the path of specified dataset',
    ['tags'],
    "Get full path of the jobs Dataset"
)

var convertXMLtoJSONSnippet = new Snippet(
    'encxj',
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
    ['json', 'xml', 'dataset'],
    "Convert XML Dataset to JSON"
)


var getJobPathSnippet = new Snippet(
    'engjp',
    `let jobPath = await job.get(AccessLevel.ReadOnly);`,
    'Gets the full path to the job',
    ['tags'],
    "Get Path of Job File"
)

var getPropertyValueSnippet = new Snippet(
    'engav',
    `let VARIABLE_NAME: string = (await flowElement.getPropertyStringValue(
      "PROPERTY_NAME"
    )) as string;`,
    'Get the Property value from the',
    ['tags'],
    "Get a Property Value"
)
/*
var Snippet = new Snippet(
    'completionItem',
    `snippetString`,
    'markdownString',
    ['tags'],
    "shortText"
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
]

module.exports = {
    enfocusScriptingSnippets
}