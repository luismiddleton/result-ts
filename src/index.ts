import { AsyncResult, Result } from "./types";

export async function getAsyncResult<T, E>(
  fn: () => Promise<T>
): AsyncResult<T, E> {
  try {
    const data = await fn();
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      //@ts-ignore
      error,
    };
  }
}

export function getResult<T, E>(fn: () => T): Result<T, E> {
  try {
    const data = fn();
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      //@ts-ignore
      error,
    };
  }
}
