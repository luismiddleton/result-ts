export type Result<T, E> =
  | { ok: true; data: T }
  | { ok: false; error: E };
export type AsyncResult<T, E> = Promise<Result<T, E>>;