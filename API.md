# API

The core philosophy of this project is use scurry-like function-return-function to separate configuration part and execution part.

## Default export

```js
const RequestRectifier = required('./request-rectifier').default;
import RequestRectifier from './request-rectifier'; // ESModule
```

### RequestRectifier (ruleSet, reversed) => (inputFilePath,outputFilePath, fileFormat, callback) 

Types: 

[Configuration]
* ruleSet?: RuleSet as Rule[]
* reversed: boolean = false

[Execution]
* inputFilePath: string
* outputFilePath: string
* fileFormat: string = 'json'
* callback?: (obj: { error?: any; result?: any }) => any

Read file form inputFilePath, then write file to outFilePath.

### useDefaultRules(inputFilePath,outputFilePath, fileFormat, callback) 
> Method `useDefaultRules` is shortcut to use default roles as `RequestRectifier()`.

## Files
> Files is the collection of file operation methods. Each method has same process to read the file, operate the data, and then write files. I wrapped them in main function of this project with switch-case in order to handle different file format.

```js
const Files = required('./request-rectifier').Files;
import { Files } from './request-rectifier'; // ESModule
```

### Files.handleJSON(ruleSet, reversed) => (inputFilePath, outputFilePath, callback)
### Files.handleXML(ruleSet, reversed) => (inputFilePath, outputFilePath, callback)
### Files.handleYAML(ruleSet, reversed) => (inputFilePath, outputFilePath, callback)

### Rules
> Rules is the collection of Rules generator methods and a default rule set. Each methods has its own condition parameter and return Rule function. See [DEFAULT_RULES](DEFAULT_RULES.md) for more information and exmaple to use.

```js
const Rules = required('./request-rectifier').Rules;
import { Rules } from './request-rectifier'; // ESModule
```

### Rules.defaultRuleSet = RuleSet as Rule[]

### Rules.addFromHeader(methods, path, value, overwrite) => Rule
### Rules.addTimestamp(methods, timestampName, overwrite) => Rule
### Rules.checkContentTypeHeader(methods, contentType) => Rules
### Rules.checkCustomHeader(methods, customHeaderName, value) => Rules
### Rules.checkHostHeader(methods, hostname) => Rules
### Rules.checkRefererHeader(methods, hostname) => Rules
### Rules.modifyPath(methods, selectedPath, destinationPath) => Rules
### Rules.removeQueryString(methods) => Rules

* methods should an array contain request method keywords, like:
```js
const CREATE_UPDATE = ['POST', 'PUT'];
const READ = ['GET'];
```

Types:
* methods: HttpRequestMethod[]
* Rule: (input: HttpRequestObject) => HttpRequestObject;
* RuleSet: Rule[];