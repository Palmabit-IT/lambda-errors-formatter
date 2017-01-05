# Lambda errors formatters

An errors formatter for managing lambda error response

## Installation

```
npm install lambda-errors --save
```

## Usage

```js
const errorFormatter = require('lambda-errors')

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
errorFormatter.badRequest('error message')
```

Unauthorized

```js
errorFormatter.unauthorized('error message')
```

Forbidden

```js
errorFormatter.forbidden('error message')
```

Not found

```js
errorFormatter.notFound('error message')
```

Conflict

```js
errorFormatter.conflict('error message')
```

Internal server error

```js
errorFormatter.internalServerError('error message')
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
