
## Default rules

#### GET METHOD

Rule 1: Modify `url` from `/shopback/resource` to `/shopback/static/assets`

```js
Rules.modifyPath(['GET'], '/shopback/resource', '/shopback/static/assets');
```

> It seems this rule is used for redirection in migration from existing site to next.js project.

**original**

```json
{
  "url": "http://www.shopback.com/shopback/resource/",
  "method": "GET"
}
```

**modified**

```json
{
  "url": "http://www.shopback.com/shopback/static/assets/",
  "method": "GET"
}
```

Rule 2: Check cookies in header - If `sbcookie` don't exist, throw error.

```js
checkCookie(['GET'], '/shopback/me', 'sbcookie');
```


> Permission or session cookies

**passed**

```json
{
  "url": "http://www.shopback.com/shopback/me",
  "method": "GET",
  "header": {
    "Cookie": "sbcookie=djD7pWpLE"
  }
}
```

Rule 3: Check Referer in header - Referer: "http(s)://www.shopback.com " or throw error.

```js
checkRefererHeader(['GET'], 'www.shopback.com');
```

> Block request without correct referer , it's a classic way to prevent our own images using in other sites.

**passed**

```json
{
  "url": "http://www.shopback.com/shopback/static/assets/image.jpg",
  "method": "GET",
  "header": {
    "Referer": "http://www.shopback.com "
  }
}
```

Rule 4: add `From` in header when request from `shopback/api/*`

```js
addFromHeader([GET], '/shopback/api/*', 'hello@shopback.com', true);
```

**original**

```json
{
  "url": "http://www.shopback.com/shopback/api/products",
  "method": "GET"
}
```

**modified**

```json
{
  "url": "http://www.shopback.com/shopback/api/products",
  "method": "GET",
  "header": {
    "From": "hello@shopback.com"
  }
}
```

#### POST & PUT METHODS

Rule 5: Clean up query string

```js
removeQueryString(['POST','PUT']),
```

**original**

```json
{
  "url": "http://www.shopback.com/shopback/post?q=123&r=456",
  "method": "POST"
}
```

**modified**

```json
{
  "url": "http://www.shopback.com/shopback/post",
  "method": "POST"
}
```

Rule 6: Check if X-SHOPBACK-AGENT is existed, or throw error

```js
checkCustomHeader(['POST','PUT'], 'X-SHOPBACK-AGENT')
```

**passed**

```json
{
  "url": "http://www.shopback.com/shopback/post",
  "method": "POST",
  "headers": {
    "X-SHOPBACK-AGENT": "AGENT_007"
  }
}
```

Rule 7: Content Type is `application/json`, or throw error

```js
checkContentTypeHeader(['POST','PUT'], 'application/json')
```
**passed**

```json
{
  "url": "http://www.shopback.com/shopback/post",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json"
  }
}
```

#### DELETE METHOD

Rule 8: `X-SHOPBACK-AGENT` should be specific value as AGENT_1, or throw error

```js
checkCustomHeader(['DELETE'], 'X-SHOPBACK-AGENT', 'AGENT_1')
```

**passed**

```json
{
  "url": "http://www.shopback.com/shopback/post",
  "method": "DELETE",
  "headers": {
    "X-SHOPBACK-AGENT": "AGENT_1"
  }
}
```

#### GENERAL RULES FOR ALL METHODS

Rule 9: Add timestamp on `X-SHOPBACK-TIMESTAMP`

```js
addTimestamp(['CONNECT', 'DELETE', 'GET', 'HEAD', 'OPTIONS','PATCH', 'POST', 'PUT', 'TRACE'], 'X-SHOPBACK-TIMESTAMP', true)
```

> Should it be unix timestamp, or it can be other formats like ISO-8601 for human reading easily?

**original**

```json
{
  "url": "http://www.shopback.com/shopback/post",
  "method": "PUT"
}
```

**modified**

```json
{
  "url": "http://www.shopback.com/shopback/post",
  "method": "PUT",
  "headers": {
    "X-SHOPBACK-TIMESTAMP": "1564706208309"
  }
}
```

Rule 10 `Host`in header is`www.shopback.com`, or throw error.

```js
checkHostHeader(['CONNECT', 'DELETE', 'GET', 'HEAD', 'OPTIONS','PATCH', 'POST', 'PUT', 'TRACE'], hostname)
```

**passed**

```json
{
  "url": "http://www.shopback.com/user",
  "header": {
    "Host": "www.shopback.com"
  }
}
```

**failed**

```json
{
  "url": "http://www.shopback.com/user",
  "header": {
    "Host": "www.shopfornt.com"
  }
}
```
