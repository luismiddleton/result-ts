import { describe, expect, test } from "vitest";
import Result from "..";
import { UnwrapError } from "../types";

describe("result", () => {
  test("returns the shape of a valid result", () => {
    const result = Result.ok(5);

    expect(result.isOk).toBeTruthy();
    expect(result.unwrap()).toBe(5);
    expect(result.unwrapOrDefault("fallback")).toBe(5);
  });

  test("returns the shape of an error", () => {
    const result = Result.err("some error");
    
    expect(result.isErr()).toBeTruthy();
    expect(result.isOk()).toBeFalsy();
    expect(() => result.unwrap()).toThrow(UnwrapError);
    expect(result.unwrapOrDefault("fallback")).toEqual("fallback");
  });
});
