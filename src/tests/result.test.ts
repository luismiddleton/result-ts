import { describe, expect, test } from "vitest";
import { getAsyncResult, getResult } from "..";

describe("result", () => {
  describe("Sync", () => {
    test("returns the shape of a valid result", () => {
      const result = getResult(() => 5);

      expect(result).toEqual<typeof result>({
        data: 5,
        ok: true,
      });
    });

    test("returns the shape of an error", () => {
      const throwResultError = () => {
        throw new Error("test");
      };

      const result = getResult<unknown, Error>(throwResultError);

      expect(result.ok).toBeFalsy();
    });
  });

  describe("Async", () => {
    test("returns the shape of an awaited result", async () => {
      const result = await getAsyncResult(() => Promise.resolve(5));

      expect(result).toEqual<typeof result>({ ok: true, data: 5 });
    });

    test("returns the shape of an awaited error", async () => {
      const result = await getAsyncResult(() => Promise.reject(5));

      expect(result).toEqual<typeof result>({ ok: false, error: 5 });
    });
  });
});
