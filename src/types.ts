export type Ok<T> = { readonly _tag: "ok"; value: T };
export type Err<E> = { readonly _tag: "error"; error: E };
export class UnwrapError<E> {
  private readonly _tag = "UnwrapError";
  error: E;
  constructor(error: E) {
    this.error = error;
  }
}
export type Result<T, E> = Ok<T> | Err<E>;
