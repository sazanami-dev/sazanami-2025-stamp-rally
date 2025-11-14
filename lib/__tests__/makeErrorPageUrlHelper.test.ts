import test from "node:test";
import assert from "node:assert/strict";
import { makeErrorPageUrlHelper } from "../makeErrorPageUrlHelper";

test("makeErrorPageUrlHelper uses server BASE_URL when window undefined", () => {
  const url = makeErrorPageUrlHelper("CODE", "msg", "detail");
  assert.ok(url.startsWith("http://localhost:4000/error"));
  const parsed = new URL(url);
  assert.equal(parsed.searchParams.get("code"), "CODE");
  assert.equal(parsed.searchParams.get("message"), "msg");
  assert.equal(parsed.searchParams.get("detail"), "detail");
});

test("makeErrorPageUrlHelper uses window origin when available", () => {
  const originalWindow = globalThis.window;
  globalThis.window = {
    location: { origin: "https://client.example" }
  } as any;
  try {
    const url = makeErrorPageUrlHelper("CLIENT");
    assert.ok(url.startsWith("https://client.example/error"));
  } finally {
    globalThis.window = originalWindow;
  }
});
