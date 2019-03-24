import 'react-testing-library/cleanup-after-each';

// eslint-disable-next-line no-console
const consoleError = console.error;

// eslint-disable-next-line no-console
console.error = (error: any, ...args: any) => {
  let errorMessage = typeof error === 'string' ? error : error.message;

  args.forEach((argument: any) => {
    errorMessage = errorMessage.replace(/%(s|d|i|o|O)/, argument);
  });

  // Comment when the "act(...)" warning is removed by an async act.
  consoleError(errorMessage);
  //throw new Error(errorMessage);
};
