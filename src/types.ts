export type Ok<T> = { readonly _tag: "ok"; value: T };
export type Err<E> = { readonly _tag: "error"; error: E };
export class UnwrapError {
  private readonly _tag = "UnwrapError";
  constructor() {}
}
export type Result<T, E> = Ok<T> | Err<E>;
