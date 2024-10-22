# RequestRectifier

> Modification of HTTP Requests from file IO.

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

## Usage

This module is build via yarn and tsc:

```
yarn install
yarn run build
```

- build/module is for enivoronment with build system(like babel).
- build/main is for any runtime(es5).

Copy, rename and move to where your need, and import it as below example (rename to request-rectifier):

> Attention: this module has some dependencies, please make sure you install in your environment.
``` JSON
{
    "fast-xml-parser": "^3.12.20",
    "fs-extra": "^8.1.0",
    "micromatch": "^4.0.2",
    "yaml": "^1.6.0"
}
```

```js
const RequestRectifier = required('./request-rectifier').default;
import RequestRectifier from './request-rectifier';
```

Then,

```js
RequestRectifier()(inputFilePath, outputFilePath, fileFormat);
```

You can some implementation in `/examples`

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

Finally, You should take care of that the rule execute previously might involve following rules and results.

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

## API
reference: [API.md](API.md)


## Support Data Format

Each data format should have `url`, `method`, and `header` properties.
* `url` should be able to parsed by WHATWG URL API.
* `method` should be uppercase request method name.

JSON
```json
{
  "url": "http://www.shopback.com/shopback/me",
  "method": "GET",
  "headers": {
    "Cookie": "sbcookie=test; area=taiwan",
    "Host": "www.shopback.com",
    "Referer": "http://www.shopback.com/"
  }
}
```

XML
> Because XML should have a root element, you can use `<any>` as root tag.
```xml
<request>
  <url>http://www.shopback.com/shopback/me</url>
  <method>GET</method>
  <headers>
    <Cookie>sbcookie=test; area=taiwan</Cookie>
    <Host>www.shopback.com</Host>
    <Referer>http://www.shopback.com/</Referer>
  </headers>
</request>
```

```xml
<req>
  <url>http://www.shopback.com/shopback/me</url>
  <method>GET</method>
  <headers>
    <Cookie>sbcookie=test; area=taiwan</Cookie>
    <Host>www.shopback.com</Host>
    <Referer>http://www.shopback.com/</Referer>
  </headers>
</req>
```

YAML
```yaml
url: http://www.shopback.com/shopback/me
method: GET
headers:
  Cookie: sbcookie=test; area=taiwan
  Host: www.shopback.com
  Referer: http://www.shopback.com/
```

