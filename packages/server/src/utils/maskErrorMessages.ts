/* eslint-disable */
// @ts-nocheck (WIP file)
import { GraphQLError } from "graphql";
import { GraphQLFormattedError } from "graphql/error/formatError";
import { config } from "../configs";

export default function maskErrorMessages(
  error: GraphQLError,
): GraphQLFormattedError {
  console.log(error.originalError);

  const exception = error.extensions?.exception;
  if (!exception) return error;

  const duplicatedValueErrorCode = 11000;
  if (exception.code === duplicatedValueErrorCode) {
    const [[key, value]] = Object.entries(exception.keyValue);

    error.message = `There's already an ${key} with the value '${value}'`;
  } else if (exception.validationErrors.length) {
    const mergedErrors: string = exception.validationErrors.reduce(
      (
        mergedString: string,
        error: { constraints: ArrayLike<unknown> | { [s: string]: unknown } },
      ) => {
        if (!error.constraints) return mergedString;
        const message = Object.values(error.constraints).join(", ");
        mergedString += message;
        return mergedString;
      },
      "There are errors on input: ",
    );

    error.message = mergedErrors;
  }

  const { message, ...errorInfo } = error;
  return {
    message,
    ...(config.IS_DEV ? errorInfo : {}),
  };
}
