import { Result as TResult, UnwrapError } from "./types";

/**
 * Represents a result that can be either Ok (containing a value) or Error (containing an error).
 * @template T The type of the value contained in the Ok result.
 * @template E The type of the error contained in the Error result.
 */
class Result<T, E> {
  /**
   * Constructs a new Result instance.
   * @private
   * @param {TResult<T, E>} opts The options object containing the value or error and the tag.
   */
  constructor(private opts: TResult<T, E>) {}

  /**
   * Creates an Ok (Result)
   * @template T The type of the value contained in the Ok result.
   * @param {T} value The value to wrap in the Ok result.
   * @example
   * ```js
   * const okResult = Result.ok(42);
   * ```
   * @returns {Result<T, never>} A new Ok Result containing the provided value.
   */
  static ok<T>(value: T) {
    return new Result({ value, _tag: "ok" });
  }

  /**
   * Creates an Error (Result)
   * @template E The type of the error contained in the Error result.
   * @param {E} error The error to wrap in the Error result.
   * @example
   * ```js
   * const errorResult = Result.err("Something went wrong");
   * ```
   * @returns {Result<never, E>} A new Error Result containing the provided error.
   */
  static err<E>(error: E) {
    return new Result({ error, _tag: "error" });
  }

  /**
   * Checks if the Result is an Error.
   * @example
   * ```js
   * const result = Result.err("Error");
   * console.log(result.isErr()); // true
   * ```
   * @returns {boolean} True if the Result is an Error, false otherwise.
   */
  isErr() {
    return this.opts._tag === "error";
  }

  /**
   * Checks if the Result is Ok.
   * @example
   * ```js
   * const result = Result.ok(123);
   * console.log(result.isOk()); // true
   * ```
   * @returns {boolean} True if the Result is Ok, false otherwise.
   */
  isOk() {
    return this.opts._tag === "ok";
  }

  /**
   * Unwraps the value from the Ok (Result) or throws an UnwrapError if it's an Error.
   * @example
   * ```js
   * const okResult = Result.ok("Success");
   * console.log(okResult.unwrap()); // "Success"
   *
   * const errorResult = Result.err("Failed");
   * try {
   * errorResult.unwrap();
   * } catch (error) {
   * console.error(error); // UnwrapError: Failed
   * }
   * ```
   * @returns {T} The value contained in the Ok result.
   * @throws {UnwrapError<E>} If the Result is an Error, an UnwrapError is thrown containing the error value.
   */
  unwrap() {
    if (this.opts._tag === "ok") {
      return this.opts.value as T;
    } else {
      throw new UnwrapError(this.opts.error);
    }
  }

  /**
   * Unwraps the value from the Ok (Result) or returns a fallback value if it's an Error.
   * @template F The type of the fallback value.
   * @param {F} fallback The fallback value to return if the Result is an Error.
   * @example
   * ```js
   * const okResult = Result.ok(10);
   * console.log(okResult.unwrapOrDefault(0)); // 10
   *
   * const errorResult = Result.err("No value");
   * console.log(errorResult.unwrapOrDefault(0)); // 0
   * ```
   * @returns {T | F} The value contained in the Ok result, or the fallback value if it's an Error.
   */
  unwrapOrDefault<F>(fallback: F) {
    return this.opts._tag === "error" ? fallback : this.opts.value;
  }
}

export default Result;
