# Club Event

A simple form to register to a club event.

Not generic at all.

## Getting Started

To start the dev server.

```bash
yarn
npm start
```

## Starting frontend and backend with Docker

To test the PHP stuff.

```bash
yarn
yarn build
docker-compose up php db
```

## Full validation

Lint, test, e2e.

```bash
yarn validate
```

## e2e

Run the e2e tests in Docker with:

```bash
yarn build
yarn test:e2e
```

## Acknowledgements

Thanks to the open source community for all the tools, especially:

- [React](https://reactjs.org/)
- [react-testing-library](https://github.com/kentcdodds/react-testing-library)
- [wait-for-it.sh](https://github.com/vishnubob/wait-for-it)
- [Docker](https://www.docker.com/)
- And others...

## License

Copyright 2019 Pierre-Dominique Putallaz

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
