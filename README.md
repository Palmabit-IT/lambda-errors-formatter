# Lambda errors formatters

An errors formatter for managing lambda error response

## Installation

```
npm install lambda-errors-formatter --save
```

## Usage

```js
const errorFormatter = require('lambda-errors-formatter')

errorFormatter.format('error message')

errorFormatter.format({
    statusCode: 400,
    message: 'error message'
})
```

### Response

```
{
    statusCode: 'error code',
    message: 'error message',
    body: "{message: 'error message'}",
    headers: {
      'Content-Type': 'application/json',
    }
  }
```

### Other functions

Format error with custom code

```js
errorFormatter.formatCode(400, 'error message')
```

Bad request

```js
errorFormatter.badRequest('error message') //status code 400
```

Unauthorized

```js
errorFormatter.unauthorized('error message') //status code 401
```

Forbidden

```js
errorFormatter.forbidden('error message') //status code 403
```

Not found

```js
errorFormatter.notFound('error message') //status code 404
```

Conflict

```js
errorFormatter.conflict('error message') //status code 409
```

Internal server error

```js
errorFormatter.internalServerError('error message') //status code 500
```

## Tests
```
npm test
```

### Coverage

```
npm run-script test-travis
```

## Author

[Palmabit](https://palmabit.com)

## License

[MIT license](LICENSE)
