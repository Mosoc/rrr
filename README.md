# RequestRectifier

> Modification of HTTP Requests

```
 ____  ____  __   _  _  ____  ____  ____
(  _ \(  __)/  \ / )( \(  __)/ ___)(_  _)   ___
 )   / ) _)(  O )) \/ ( ) _) \___ \  )(    (___)
(__\_)(____)\__\)\____/(____)(____/ (__)
 ____  ____  ___  ____  __  ____  __  ____  ____
(  _ \(  __)/ __)(_  _)(  )(  __)(  )(  __)(  _ \
 )   / ) _)( (__   )(   )(  ) _)  )(  ) _)  )   /
(__\_)(____)\___) (__) (__)(__)  (__)(____)(__\_)

```

The core concept of this project is use scurry-like function-return-function to separate configuration part and execution part.

## Usage

This module is build via yarn and tsc:

```
yarn install
yarn run build
```

- build/module is for enivoronment with build system(like babel).
- build/main is for any runtime(es5).

copy, rename and move to where your need, and import it as below example (rename to request-rectifier):

```js
const RequestRectifier = required('./request-rectifier').default;
import RequestRectifier from './request-rectifier';
```

Then,

```js
RequestRectifier()(inputFilePath, outputFilePath, fileFormat);
```

You can some implementation in `/example`

### with Build-in rules

See introduction in [DEFAULT_RULES.md](DEFAULT_RULES.md#default-rules)

the default rules export has been exportrfed.

```js
import RequestRectifier, { Rules } from './request-rectifier';
const { defaultRuleSet } = Rules;
```

so, you can use array methods or helpers to operate it.

```js
const selectedRuleSet = defaultRuleSet.filter((rule, index) => index < 5);
// Select index from 0 to 4, use rule#1 to rule#5
RequestRectifier(selectedRules)(inputFilePath, outputFilePath, fileFormat);
```

### with Rule generator

pick up your want and pass it to RequestRectifier

```js
import RequestRectifier, { Rules } from './request-rectifier';
const ruleSet = [
  Rules.modifyPath([GET], '/shopback/resource', '/shopback/static/assets'), // Rule #1
  Rules.checkRefererHeader([GET], 'www.shopback.com') // Rule #3
];

RequestRectifier(ruleset)(inputFilePath, outputFilePath, 'json');
```

### Custom rules

Actually, you can put your own custom rule function in rule set array
The format of function should be `(input: HttpRequestObject) => HttpRequestObject;`

```js
const addContentLanguageHeader = input => {
  const output = {
    ...input,
    headers: {
      ...input.headers,
      'Content-Language': 'en-US, de-DU'
    }
  };
  return output;
};
RequestRectifier([addContentLanguageHeader])(inputFilePath, outputFilePath, 'json');
```
