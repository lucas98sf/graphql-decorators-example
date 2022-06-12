/* eslint-disable */
import { ApolloError } from "apollo-server-errors";
import { GraphQLError } from "graphql";
import { GraphQLFormattedError } from "graphql/error/formatError";
import { config } from "../configs";

export default function maskErrorMessages(
  error: GraphQLError,
): GraphQLFormattedError {
  try {
    console.log(error.originalError);

    if (error instanceof ApolloError) return error;

    const exception = error.extensions?.exception;
    if (!exception) return error;

    //unique value already exists on db
    const duplicatedValueErrorCode = 11000;
    if (exception.code === duplicatedValueErrorCode) {
      const [[key, value]]: any = Object.entries(exception.keyValue);

      error.message = `There's already an ${key} with the value '${value}'`;
    } else if (exception.validationErrors.length) {
      //class validator errors
      const mergedErrors: string = exception.validationErrors.reduce(
        (mergedString: string, error: { constraints: ArrayLike<unknown> }) => {
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
  } catch (err) {
    const { message, ...errorInfo } = error;
    return {
      message: "Internal server error",
      ...(config.IS_DEV ? errorInfo : {}),
    };
  }
}
