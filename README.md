# Lambda errors formatters

A class to invoke an AWS Lambda function from an other

## Installation

```
npm install lambda-errors --save
```

## Usage

```js
const errorFormatter = require('lambda-errors')

errorFormatter.error('error message')

errorFormatter.error({
    statusCode: 400,
    message: 'error message'
})
```

### Response

```
{
    statusCode: 'error code',
    body: "{message: 'error message'}",
    headers: {
      'Content-Type': 'application/json',
    }
  }
```

### Other functions

Set code

```js
errorFormatter.setCode(400, 'error message')
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
