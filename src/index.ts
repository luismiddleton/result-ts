import { UnwrapError, type Result as TResult } from "./types";

class Result<T, E> {
  constructor(private opts: TResult<T, E>) {}

  static ok<T>(value: T) {
    return new Result({ value, _tag: "ok" });
  }

  static err<E>(error: E) {
    return new Result({ error, _tag: "error" });
  }

  static fromSync<V, E>(value: V, error: E) {
    try {
      return Result.ok(value);
    } catch {
      return Result.err(error);
    }
  }

  isErr() {
    return this.opts._tag === "error";
  }

  isOk() {
    return this.opts._tag === "ok";
  }

  unwrap() {
    if (this.opts._tag === "ok") {
      return this.opts.value as T;
    } else {
      throw new UnwrapError();
    }
  }

  unwrapOrDefault<F>(fallback: F) {
    return this.opts._tag === "error" ? fallback : this.opts.value;
  }
}

export default Result;
